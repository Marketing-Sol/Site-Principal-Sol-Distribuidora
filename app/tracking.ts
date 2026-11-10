// Visitor activity sent to Google Tag Manager (GTM-K4ZPB6FJ), which forwards it
// to Google Analytics 4. Nothing is stored here: GTM only uses analytics storage
// when the visitor allows it in the cookie banner (Consent Mode, app/layout.tsx).
//
// Every event carries the same parameter keys, unset ones as undefined, so a
// value from an earlier event never leaks into the next one in the GTM data layer.

import { PRODUCTS, CATEGORY_META } from "./data";

const PARAM_KEYS = [
  "link_url", "link_text", "link_type", "click_location",
  "item_id", "item_name", "item_brand", "item_category",
  "form_name", "error_message", "marketing_optin",
  "search_term", "results_count", "filter_value", "compare_items",
  "file_name", "consent_analytics", "consent_ads",
] as const;

type ParamKey = typeof PARAM_KEYS[number];
export type TrackParams = Partial<Record<ParamKey, string | number | boolean>>;

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function track(event: string, params: TrackParams = {}, onSent?: () => void) {
  if (typeof window === "undefined") return;
  const layer = ((window as DataLayerWindow).dataLayer ||= []);
  const message: Record<string, unknown> = { event };
  for (const key of PARAM_KEYS) message[key] = params[key];
  if (onSent) {
    // GTM calls eventCallback once its tags have run; the timeout covers GTM
    // being blocked or not loaded, so the visitor is never held back.
    let done = false;
    const finish = () => { if (!done) { done = true; onSent(); } };
    message.eventCallback = finish;
    message.eventTimeout = 1200;
    window.setTimeout(finish, 1500);
  }
  layer.push(message);
}

export function productParams(product: { slug: string; brand: string; model: string; segment: string }): TrackParams {
  return { item_id: product.slug, item_name: `${product.brand} ${product.model}`, item_brand: product.brand, item_category: product.segment };
}

const PRODUCT_BY_SLUG = new Map(PRODUCTS.map((product) => [product.slug, product]));
const CATEGORY_SLUGS = new Set([...Object.keys(CATEGORY_META), "produtos"]);

function clickLocation(element: Element) {
  if (element.closest("header")) return "cabecalho";
  if (element.closest("footer")) return "rodape";
  if (element.closest(".whatsapp")) return "botao_flutuante";
  if (element.closest(".cookie-consent")) return "aviso_cookies";
  const section = element.closest("section, article, nav, aside");
  if (!section) return "pagina";
  return section.id || section.getAttribute("aria-label") || section.className.split(" ")[0] || section.tagName.toLowerCase();
}

function linkText(element: Element) {
  const label = element.getAttribute("aria-label") || (element as HTMLElement).innerText || element.textContent || "";
  return label.replace(/\s+/g, " ").trim().slice(0, 100);
}

function fileName(url: URL) {
  const disposition = url.searchParams.get("response-content-disposition");
  const named = disposition && /filename="?([^";]+)"?/.exec(disposition)?.[1];
  return named || decodeURIComponent(url.pathname.split("/").pop() || "");
}

// One listener for the whole page classifies every link and button click.
export function handleTrackedClick(event: MouseEvent) {
  const target = event.target instanceof Element ? event.target : null;
  const element = target?.closest("a[href], button");
  if (!element) return;
  const location = clickLocation(element);
  const text = linkText(element);

  if (element.tagName === "BUTTON") {
    // The contact form reports its own submit; cookie choices are sent with the consent itself.
    if ((element as HTMLButtonElement).type === "submit" || element.closest(".cookie-consent")) return;
    track("button_click", { link_text: text, click_location: location });
    return;
  }

  const href = element.getAttribute("href") ?? "";
  let url: URL;
  try { url = new URL(href, window.location.href); } catch { return; }
  const base = { link_url: url.href, link_text: text, click_location: location };

  if (/(^|\.)wa\.me$|whatsapp\.com$/.test(url.hostname)) return track("whatsapp_click", { ...base, link_type: "whatsapp" });
  if (url.protocol === "tel:") return track("phone_click", { ...base, link_type: "telefone" });
  if (url.protocol === "mailto:") return track("email_click", { ...base, link_type: "email" });
  if (/\.pdf$/i.test(url.pathname)) {
    const product = PRODUCT_BY_SLUG.get(window.location.pathname.slice(1));
    return track("download_click", { ...base, link_type: "pdf", file_name: fileName(url), ...(product ? productParams(product) : {}) });
  }
  if (url.origin !== window.location.origin) return track("outbound_link_click", { ...base, link_type: "externo" });

  if (url.hash && url.pathname === window.location.pathname) return track("select_category", { ...base, link_type: "ancora", filter_value: url.hash.slice(1) });
  const slug = url.pathname.slice(1);
  const product = PRODUCT_BY_SLUG.get(slug);
  if (product) return track("select_item", { ...base, link_type: "produto", ...productParams(product) });
  if (CATEGORY_SLUGS.has(slug)) return track("select_category", { ...base, link_type: "categoria", filter_value: slug });
  track(location === "cabecalho" || location === "rodape" ? "menu_click" : "cta_click", { ...base, link_type: "interno" });
}

// Search boxes report what was searched once the visitor stops typing.
export function trackSearchLater(timer: { current: number | undefined }, term: string, results: number, location: string) {
  if (typeof window === "undefined") return;
  window.clearTimeout(timer.current);
  const searched = term.trim();
  if (searched.length < 2) return;
  timer.current = window.setTimeout(() => track("search", { search_term: searched.slice(0, 100), results_count: results, click_location: location }), 1200);
}
