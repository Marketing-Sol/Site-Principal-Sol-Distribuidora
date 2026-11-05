<?php
// Contact form for the static site on the Davet hosting: the same checks as
// app/api/contato/route.ts, then the lead goes to the Google Apps Script that
// records it in the spreadsheet.
//
// Optional settings live outside the public folder, in ../../private/sol-contato.php
// (the "private" folder next to "web" on the hosting):
//   <?php return ['token' => '...', 'endpoint' => 'https://script.google.com/...'];
// While no token is set, leads are sent without it, as on the previous hosting.

declare(strict_types=1);

const DEFAULT_LEADS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwN1U6lRr3ZYtpF8mlgUeQGr7FpC9YculkBb67sDmMdF9bMgMDCPtmNd9e_iDBwLXmr/exec';
const MAX_BODY_BYTES = 10000;
const FORWARD_TIMEOUT_S = 10;
const RATE_LIMIT = 5;
const RATE_WINDOW_S = 600;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function reply(array $body, int $status = 200): void {
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function fail(string $message, int $status): void {
    reply(['error' => $message], $status);
}

function settings(): array {
    $file = dirname(__DIR__, 2) . '/private/sol-contato.php';
    if (!is_file($file)) return [];
    $loaded = include $file;
    return is_array($loaded) ? $loaded : [];
}

// Plain text only, and never something a spreadsheet would run as a formula.
function clean($value, int $maxLength): string {
    $text = is_scalar($value) ? (string) $value : '';
    $text = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $text) ?? '';
    $text = mb_substr(trim($text), 0, $maxLength);
    return preg_match('/^[=+\-@\t\r]/', $text) ? "'" . $text : $text;
}

function client_ip(): string {
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

// Best effort: one small file per address in the hosting's tmp folder.
function is_rate_limited(string $key): bool {
    $dir = dirname(__DIR__, 2) . '/tmp/sol-contato';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) {
        $dir = sys_get_temp_dir() . '/sol-contato';
        if (!is_dir($dir) && !@mkdir($dir, 0700, true)) return false;
    }
    $file = $dir . '/' . hash('sha256', $key);
    $now = time();
    $handle = @fopen($file, 'c+');
    if (!$handle) return false;
    flock($handle, LOCK_EX);
    $times = json_decode(stream_get_contents($handle) ?: '[]', true);
    $recent = array_values(array_filter(is_array($times) ? $times : [], fn($time) => is_int($time) && $now - $time < RATE_WINDOW_S));
    $limited = count($recent) >= RATE_LIMIT;
    if (!$limited) $recent[] = $now;
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($recent));
    flock($handle, LOCK_UN);
    fclose($handle);
    return $limited;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail('Método não permitido.', 405);
}

// Browsers always send Origin with this POST; requests without it or from
// another site are refused.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$originHost = $origin ? (parse_url($origin, PHP_URL_HOST) ?? '') . (parse_url($origin, PHP_URL_PORT) ? ':' . parse_url($origin, PHP_URL_PORT) : '') : '';
if ($originHost === '' || strcasecmp($originHost, $_SERVER['HTTP_HOST'] ?? '') !== 0) {
    fail('Origem não permitida.', 403);
}
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_BODY_BYTES) {
    fail('Mensagem muito longa.', 413);
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false || strlen($raw) > MAX_BODY_BYTES) fail('Mensagem muito longa.', 413);
$body = json_decode($raw, true);
if (!is_array($body)) fail('Não foi possível ler os dados enviados.', 400);

// Honeypot filled in: answer as if it worked so bots do not retry.
if (trim(is_scalar($body['website'] ?? '') ? (string) ($body['website'] ?? '') : '') !== '') reply(['ok' => true]);

if (($body['consentimento'] ?? null) !== true) {
    fail('É preciso aceitar a Política de Privacidade.', 400);
}

$payload = [
    'nome' => clean($body['nome'] ?? '', 120),
    'empresa' => clean($body['empresa'] ?? '', 120),
    'telefone' => clean($body['telefone'] ?? '', 30),
    'email' => clean($body['email'] ?? '', 160),
    'mensagem' => clean($body['mensagem'] ?? '', 2000),
];
if (mb_strlen($payload['nome']) < 2) fail('Informe seu nome completo.', 400);
$phoneDigits = preg_replace('/\D/', '', $payload['telefone']);
if (strlen($phoneDigits) < 10 || strlen($phoneDigits) > 13) fail('Informe um telefone com DDD.', 400);
if (!preg_match("/^[^\\s@'][^\\s@]*@[^\\s@]+\\.[^\\s@]{2,}$/u", $payload['email'])) fail('Informe um e-mail válido.', 400);
if (mb_strlen($payload['mensagem']) < 5) fail('Conte um pouco mais sobre como podemos ajudar.', 400);

if (is_rate_limited(client_ip())) {
    fail('Recebemos várias mensagens em sequência. Tente novamente em alguns minutos.', 429);
}

$config = settings();
$endpoint = is_string($config['endpoint'] ?? null) && $config['endpoint'] !== '' ? $config['endpoint'] : DEFAULT_LEADS_ENDPOINT;
$token = is_string($config['token'] ?? null) ? $config['token'] : '';

$curl = curl_init($endpoint);
curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Content-Type: text/plain;charset=utf-8'],
    CURLOPT_POSTFIELDS => json_encode($payload + ['consentimento' => true, 'token' => $token], JSON_UNESCAPED_UNICODE),
    CURLOPT_RETURNTRANSFER => true,
    // Apps Script answers with a redirect to the result; follow it as a GET.
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_POSTREDIR => 0,
    CURLOPT_MAXREDIRS => 5,
    CURLOPT_TIMEOUT => FORWARD_TIMEOUT_S,
    CURLOPT_CONNECTTIMEOUT => FORWARD_TIMEOUT_S,
]);
$response = curl_exec($curl);
$status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
$curlError = curl_error($curl);
curl_close($curl);

// The script always answers 200; success is the `ok` flag in its JSON.
$result = is_string($response) ? json_decode($response, true) : null;
if ($status < 200 || $status >= 300 || !is_array($result) || ($result['ok'] ?? null) !== true) {
    error_log('contato: falha ao registrar o lead: ' . $status . ' ' . $curlError . ' ' . (is_array($result) ? (string) ($result['error'] ?? '') : ''));
    fail('Não foi possível enviar seus dados agora. Tente novamente em instantes.', 502);
}

reply(['ok' => true]);
