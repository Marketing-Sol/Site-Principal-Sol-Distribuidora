// Receives the contact form, validates it and forwards it to the Google Apps
// Script that records the leads. Keeping the script URL on the server means the
// browser no longer talks to it directly, and failures are reported back to
// the visitor instead of being lost.

const LEADS_ENDPOINT = "https://script.google.com/macros/s/AKfycbwN1U6lRr3ZYtpF8mlgUeQGr7FpC9YculkBb67sDmMdF9bMgMDCPtmNd9e_iDBwLXmr/exec";
const MAX_BODY_BYTES = 10_000;
const FORWARD_TIMEOUT_MS = 10_000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

// Best effort: counts live in this worker instance only, so they reset on
// redeploys and are not shared between instances.
const recentSubmissions = new Map<string, number[]>();

type ContactPayload = {
  nome: string;
  empresa: string;
  telefone: string;
  email: string;
  mensagem: string;
};

function error(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function clientKey(request: Request) {
  return request.headers.get("cf-connecting-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (recentSubmissions.get(key) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    recentSubmissions.set(key, recent);
    return true;
  }
  recent.push(now);
  recentSubmissions.set(key, recent);
  if (recentSubmissions.size > 5000) {
    for (const [storedKey, times] of recentSubmissions) {
      if (times.every((time) => now - time >= RATE_WINDOW_MS)) recentSubmissions.delete(storedKey);
    }
  }
  return false;
}

// Plain text only, and never something a spreadsheet would run as a formula.
function clean(value: unknown, maxLength: number) {
  const text = String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
  return /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
}

function validate(body: Record<string, unknown>): ContactPayload | string {
  const payload = {
    nome: clean(body.nome, 120),
    empresa: clean(body.empresa, 120),
    telefone: clean(body.telefone, 30),
    email: clean(body.email, 160),
    mensagem: clean(body.mensagem, 2000),
  };
  if (payload.nome.length < 2) return "Informe seu nome completo.";
  const phoneDigits = payload.telefone.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 13) return "Informe um telefone com DDD.";
  if (!/^[^\s@'][^\s@]*@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) return "Informe um e-mail válido.";
  if (payload.mensagem.length < 5) return "Conte um pouco mais sobre como podemos ajudar.";
  return payload;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return error("Origem não permitida.", 403);
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return error("Mensagem muito longa.", 413);
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return error("Mensagem muito longa.", 413);
    body = JSON.parse(raw);
  } catch {
    return error("Não foi possível ler os dados enviados.", 400);
  }

  // Honeypot filled in: answer as if it worked so bots do not retry.
  if (String(body.website ?? "").trim()) return Response.json({ ok: true });

  if (body.consentimento !== true) {
    return error("É preciso aceitar a Política de Privacidade.", 400);
  }

  const payload = validate(body);
  if (typeof payload === "string") return error(payload, 400);

  if (isRateLimited(clientKey(request))) {
    return error("Recebemos várias mensagens em sequência. Tente novamente em alguns minutos.", 429);
  }

  try {
    const response = await fetch(LEADS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...payload, consentimento: true }),
      redirect: "follow",
      signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
    });
    // The script always answers 200; success is the `ok` flag in its JSON.
    const result = await response.json().catch(() => null) as { ok?: boolean; error?: string } | null;
    if (!response.ok || result?.ok !== true) throw new Error(`Leads endpoint refused: ${response.status} ${result?.error ?? ""}`);
  } catch (forwardError) {
    console.error("contato: falha ao registrar o lead", forwardError);
    return error("Não foi possível enviar seus dados agora. Tente novamente em instantes.", 502);
  }

  return Response.json({ ok: true });
}
