// Gera davet/gtm-container-site-sol.json, a configuração do GTM-K4ZPB6FJ
// (Google tag G-63NHQJF2HE, eventos do dataLayer de app/tracking.ts e rolagem).
// Importado em Administrador > Importar contêiner; publicado como versão 2 em 10/11/2026.
import { writeFileSync } from "node:fs";
const GA4 = "G-63NHQJF2HE";
const PARAMS = ["link_url","link_text","link_type","click_location","item_id","item_name","item_brand","item_category","form_name","error_message","marketing_optin","search_term","results_count","filter_value","compare_items","file_name","consent_analytics","consent_ads"];
const EVENTS = ["whatsapp_click","phone_click","email_click","download_click","outbound_link_click","select_category","select_item","menu_click","cta_click","button_click","view_item","search","filter_products","compare_products","form_start","form_error","generate_lead","cookie_consent"];
const ids = { a: "0", c: "0" };
const base = { accountId: ids.a, containerId: ids.c };
const t = (key, value) => ({ type: "TEMPLATE", key, value });
let n = 1;
const variable = PARAMS.map((p) => ({ ...base, variableId: String(n++), name: `DLV - ${p}`, type: "v", parameter: [{ type: "INTEGER", key: "dataLayerVersion", value: "2" }, { type: "BOOLEAN", key: "setDefaultValue", value: "false" }, t("name", p)] }));
const trigEvents = String(n++), trigScroll = String(n++);
const trigger = [
  { ...base, triggerId: trigEvents, name: "Evento - Interações do site", type: "CUSTOM_EVENT", customEventFilter: [{ type: "MATCH_REGEX", parameter: [t("arg0", "{{_event}}"), t("arg1", `^(${EVENTS.join("|")})$`)] }] },
  { ...base, triggerId: trigScroll, name: "Rolagem - 25, 50, 75 e 90%", type: "SCROLL_DEPTH", parameter: [{ type: "BOOLEAN", key: "verticalThresholdOn", value: "true" }, t("verticalThresholdUnits", "PERCENT"), t("verticalThresholdsPercent", "25,50,75,90"), { type: "BOOLEAN", key: "horizontalThresholdOn", value: "false" }, t("triggerStartOption", "WINDOW_LOAD")] },
];
const row = (k, v) => ({ type: "MAP", map: [t("parameter", k), t("parameterValue", v)] });
const tag = [
  { ...base, tagId: String(n++), name: "GA4 - Google tag (G-63NHQJF2HE)", type: "googtag", parameter: [t("tagId", GA4)], firingTriggerId: ["2147479573"], tagFiringOption: "ONCE_PER_EVENT" },
  { ...base, tagId: String(n++), name: "GA4 - Eventos do site", type: "gaawe", parameter: [{ type: "BOOLEAN", key: "sendEcommerceData", value: "false" }, t("eventName", "{{Event}}"), t("measurementIdOverride", GA4), { type: "LIST", key: "eventSettingsTable", list: PARAMS.map((p) => row(p, `{{DLV - ${p}}}`)) }], firingTriggerId: [trigEvents], tagFiringOption: "ONCE_PER_EVENT" },
  { ...base, tagId: String(n++), name: "GA4 - Rolagem da página", type: "gaawe", parameter: [{ type: "BOOLEAN", key: "sendEcommerceData", value: "false" }, t("eventName", "scroll_depth"), t("measurementIdOverride", GA4), { type: "LIST", key: "eventSettingsTable", list: [row("percent_scrolled", "{{Scroll Depth Threshold}}")] }], firingTriggerId: [trigScroll], tagFiringOption: "ONCE_PER_EVENT" },
];
const builtInVariable = [["EVENT","Event"],["PAGE_URL","Page URL"],["PAGE_PATH","Page Path"],["PAGE_HOSTNAME","Page Hostname"],["REFERRER","Referrer"],["SCROLL_DEPTH_THRESHOLD","Scroll Depth Threshold"],["SCROLL_DEPTH_UNITS","Scroll Depth Units"],["SCROLL_DEPTH_DIRECTION","Scroll Direction"]].map(([type, name]) => ({ ...base, type, name }));
const out = { exportFormatVersion: 2, exportTime: "2026-11-10 12:00:00", containerVersion: { path: "accounts/0/containers/0/versions/0", ...base, containerVersionId: "0", tag, trigger, variable, builtInVariable } };
writeFileSync("C:/Projetos/Site-Sol-Davet/davet/gtm-container-site-sol.json", JSON.stringify(out, null, 2));
console.log(tag.length, trigger.length, variable.length, builtInVariable.length);
