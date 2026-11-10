// Gera davet/gtm-container-site-sol.json, a configuração do GTM-K4ZPB6FJ:
// Google tag G-63NHQJF2HE, eventos do dataLayer de app/tracking.ts, rolagem e
// leads. Os dois caminhos de lead chegam ao GA4 como generate_lead, com
// lead_type "formulario" (formulário de contato enviado) ou "whatsapp" (clique
// no WhatsApp). Importar em Administrador > Importar contêiner > Combinar.
import { writeFileSync } from "node:fs";
const A = "6320143228", C = "233090592", GA4 = "G-63NHQJF2HE";
const PARAMS = ["link_url","link_text","link_type","click_location","item_id","item_name","item_brand","item_category","form_name","error_message","marketing_optin","search_term","results_count","filter_value","compare_items","file_name","consent_analytics","consent_ads"];
const EVENTS = ["whatsapp_click","phone_click","email_click","download_click","outbound_link_click","select_category","select_item","menu_click","cta_click","button_click","view_item","search","filter_products","compare_products","form_start","form_error","generate_lead","cookie_consent"];
const base = { accountId: A, containerId: C };
const t = (key, value) => ({ type: "TEMPLATE", key, value });
const row = (k, v) => ({ type: "MAP", map: [t("parameter", k), t("parameterValue", v)] });
const settings = (rows) => ({ type: "LIST", key: "eventSettingsTable", list: rows });
const ga4Event = (tagId, name, eventName, rows, trigger) => ({ ...base, tagId, name, type: "gaawe", parameter: [{ type: "BOOLEAN", key: "sendEcommerceData", value: "false" }, t("eventName", eventName), t("measurementIdOverride", GA4), settings(rows)], firingTriggerId: [trigger], tagFiringOption: "ONCE_PER_EVENT" });

let n = 1;
const variable = PARAMS.map((p) => ({ ...base, variableId: String(n++), name: `DLV - ${p}`, type: "v", parameter: [{ type: "INTEGER", key: "dataLayerVersion", value: "2" }, { type: "BOOLEAN", key: "setDefaultValue", value: "false" }, t("name", p)] }));
// The site only pushes generate_lead after a successful contact form, so that
// event name means "formulario"; every other event gets no lead type.
variable.push({ ...base, variableId: String(n++), name: "Tipo de lead (formulário)", type: "smm", parameter: [t("input", "{{Event}}"), { type: "BOOLEAN", key: "setDefaultValue", value: "false" }, { type: "LIST", key: "map", list: [{ type: "MAP", map: [t("key", "generate_lead"), t("value", "formulario")] }] }] });

const trigger = [
  { ...base, triggerId: "19", name: "Evento - Interações do site", type: "CUSTOM_EVENT", customEventFilter: [{ type: "MATCH_REGEX", parameter: [t("arg0", "{{_event}}"), t("arg1", `^(${EVENTS.join("|")})$`)] }] },
  { ...base, triggerId: "20", name: "Rolagem - 25, 50, 75 e 90%", type: "SCROLL_DEPTH", parameter: [{ type: "BOOLEAN", key: "verticalThresholdOn", value: "true" }, t("verticalThresholdUnits", "PERCENT"), t("verticalThresholdsPercent", "25,50,75,90"), { type: "BOOLEAN", key: "horizontalThresholdOn", value: "false" }, t("triggerStartOption", "WINDOW_LOAD")] },
  { ...base, triggerId: "101", name: "Evento - Clique no WhatsApp", type: "CUSTOM_EVENT", customEventFilter: [{ type: "EQUALS", parameter: [t("arg0", "{{_event}}"), t("arg1", "whatsapp_click")] }] },
];
const tag = [
  { ...base, tagId: "21", name: "GA4 - Google tag (G-63NHQJF2HE)", type: "googtag", parameter: [t("tagId", GA4)], firingTriggerId: ["2147479573"], tagFiringOption: "ONCE_PER_EVENT" },
  ga4Event("22", "GA4 - Eventos do site", "{{Event}}", [...PARAMS.map((p) => row(p, `{{DLV - ${p}}}`)), row("lead_type", "{{Tipo de lead (formulário)}}")], "19"),
  ga4Event("23", "GA4 - Rolagem da página", "scroll_depth", [row("percent_scrolled", "{{Scroll Depth Threshold}}")], "20"),
  ga4Event("102", "GA4 - Lead pelo WhatsApp (generate_lead)", "generate_lead", [row("lead_type", "whatsapp"), row("form_name", "whatsapp"), ...["click_location", "link_text", "item_id", "item_name", "item_brand"].map((p) => row(p, `{{DLV - ${p}}}`))], "101"),
];
const builtInVariable = [["EVENT","Event"],["PAGE_URL","Page URL"],["PAGE_PATH","Page Path"],["PAGE_HOSTNAME","Page Hostname"],["REFERRER","Referrer"],["SCROLL_DEPTH_THRESHOLD","Scroll Depth Threshold"],["SCROLL_DEPTH_UNITS","Scroll Depth Units"],["SCROLL_DEPTH_DIRECTION","Scroll Direction"]].map(([type, name]) => ({ ...base, type, name }));
const out = { exportFormatVersion: 2, exportTime: "2026-11-10 13:30:00", containerVersion: { path: `accounts/${A}/containers/${C}/versions/0`, ...base, containerVersionId: "0", container: { path: `accounts/${A}/containers/${C}`, ...base, name: "www.distribuidorasol.com.br", publicId: "GTM-K4ZPB6FJ", usageContext: ["WEB"] }, tag, trigger, variable, builtInVariable } };
writeFileSync(new URL("../davet/gtm-container-site-sol.json", import.meta.url), JSON.stringify(out, null, 2));
// Only what changed is imported now: the lead-type lookup and the two tags that use it.
const delta = { ...out, containerVersion: { ...out.containerVersion, tag: tag.filter((x) => ["22", "102"].includes(x.tagId)), trigger: trigger.filter((x) => ["19", "101"].includes(x.triggerId)), variable: variable.slice(-1), builtInVariable: [] } };
process.stdout.write(Buffer.from(JSON.stringify(delta)).toString("base64"));
