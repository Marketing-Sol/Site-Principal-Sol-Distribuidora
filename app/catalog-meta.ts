// Product images, BLUETTI comparison data and search metadata. Kept out of the
// "use client" site module so server code (page metadata, sitemap) can read them.
import type { Product } from "./data";
import { PRODUCT_SPECS, productSpecKey } from "./product-specs";

export const PRODUCT_IMAGES: Record<string, string> = {
  "freedom-df300": "/freedom-df300.webp",
  "freedom-df500": "/freedom-df500.webp",
  "freedom-df700": "/freedom-df700.webp",
  "freedom-df1000": "/freedom-df1000.webp",
  "freedom-df1500": "/freedom-df1500.webp",
  "freedom-df2000": "/freedom-df2000.webp",
  "freedom-df2500": "/freedom-df2500.webp",
  "freedom-df3000": "/freedom-df3000.webp",
  "freedom-df4100": "/freedom-df4100.webp",
  "heliar-h40jd": "/Imagens%20baterias/Heliar/Webp/H40JD%20-%20superior.webp",
  "heliar-h40jd-jis": "/Imagens%20baterias/Heliar/Faltantes/Antigas/webp/H40JD%20JIS%20-%20antiga%20H40FD.webp",
  "heliar-hefb225td": "/Imagens%20baterias/Heliar/Faltantes/Antigas/EFB/webp/HEFB225TD%20-%20antiga%20HEFB225TD.webp",
  "heliar-hefb225te": "/Imagens%20baterias/Heliar/Faltantes/Antigas/EFB/webp/HEFB225TE%20-%20antiga%20HEFB225TE.webp",
  "heliar-hagm70pd": "/Imagens%20baterias/Heliar/Faltantes/Genericas/webp/HAGM%20-%20perspectiva%20.webp",
  "heliar-hagm80kd": "/Imagens%20baterias/Heliar/Faltantes/Genericas/webp/HAGM%20-%20perspectiva%20.webp",
  "heliar-hagm95md": "/Imagens%20baterias/Heliar/Faltantes/Genericas/webp/HAGM%20-%20perspectiva%20.webp",
  "heliar-hagm105sd": "/Imagens%20baterias/Heliar/Faltantes/Genericas/webp/HAGM%20-%20perspectiva%20.webp",
  "heliar-he48bd": "/Imagens%20baterias/Heliar/Faltantes/Genericas/webp/HE%20-%2060%20-%20perspectiva.webp",
  "heliar-he45be": "/Imagens%20baterias/Heliar/Faltantes/SLI/Superior/Webp/HE45BE%20-%20superior.webp",
  "heliar-he50gd": "/Imagens%20baterias/Heliar/Webp/HE50GD%20-%20perspectiva.webp",
  "heliar-he60dd": "/Imagens%20baterias/Heliar/Faltantes/Genericas/webp/HE%20-%2060%20-%20perspectiva.webp",
  "heliar-he60de": "/Imagens%20baterias/Heliar/Webp/HE60DE%20-%20perspectiva.webp",
  "heliar-he60hd": "/Imagens%20baterias/Heliar/Webp/HE60HD%20-%20perspectiva.webp",
  "heliar-h45je": "/Imagens%20baterias/Heliar/Faltantes/Antigas/webp/H45JE%20-%20antiga%20H45JE.webp",
  "heliar-h50jd": "/Imagens%20baterias/Heliar/Faltantes/Antigas/webp/H50JD%20-%20antiga%20H45JE.webp",
  "heliar-h65hd": "/Imagens%20baterias/Heliar/Webp/H65HD%20-%20perspectiva.webp",
  "heliar-h70nd": "/Imagens%20baterias/Heliar/Webp/H70ND%20-%20lateral.webp",
  "heliar-h70ne": "/Imagens%20baterias/Heliar/Webp/H70NE%20-%20perspectiva.webp",
  "heliar-h75pd": "/Imagens%20baterias/Heliar/Faltantes/Genericas/webp/H%20-%2065%20ou%20maior%20-%20frontal%20branca.webp",
  "heliar-h75ld": "/Imagens%20baterias/Heliar/Faltantes/Genericas/webp/H%20-%2065%20ou%20maior%20-%20frontal%20branca.webp",
  "heliar-h75le": "/Imagens%20baterias/Heliar/Faltantes/Genericas/webp/H%20-%2065%20ou%20maior%20-%20frontal%20branca.webp",
  "heliar-h90ld": "/Imagens%20baterias/Heliar/Webp/H90LD%20-%20perspectiva.webp",
  "heliar-h90le": "/Imagens%20baterias/Heliar/Webp/H90LE%20-%20perspectiva.webp",
  "heliar-hagm60hd": "/Imagens%20baterias/Heliar/Webp/HAGM60HD%20-%20perspectiva.webp",
  "heliar-hefb50gd": "/Imagens%20baterias/Heliar/Webp/HEFB50GD%20-%20perspectiva.webp",
  "heliar-hefb60hd": "/Imagens%20baterias/Heliar/Webp/HEFB60HD%20-%20perspectiva.webp",
  "heliar-hefb72pd": "/Imagens%20baterias/Heliar/Webp/HEFB72PD%20-%20perspectiva.webp",
  "heliar-h95md": "/Imagens%20baterias/Heliar/Webp/H95MD%20-%20perspectiva.webp",
  "heliar-h100le": "/Imagens%20baterias/Heliar/Faltantes/Antigas/Frota/webp/H100LE%20-%20antiga%20H100LE.webp",
  "heliar-hs100le": "/Imagens%20baterias/Heliar/Faltantes/Antigas/Frota/webp/HS100LE%20-%20antiga%20HS100LE.webp",
  "heliar-h150td": "/Imagens%20baterias/Heliar/Faltantes/Antigas/Frota/webp/H150TD%20-%20antiga%20H150TD.webp",
  "heliar-hs150td": "/Imagens%20baterias/Heliar/Faltantes/Antigas/Frota/webp/HS150TD%20-%20antiga%20HS150TD.webp",
  "heliar-h180td": "/Imagens%20baterias/Heliar/Faltantes/Antigas/Frota/webp/H180TD%20-%20antiga%20H180TD.webp",
  "heliar-hs180td": "/Imagens%20baterias/Heliar/Faltantes/Antigas/Frota/webp/HS180TD%20-%20antiga%20HS150TD.webp",
  "heliar-hs180te": "/Imagens%20baterias/Heliar/Faltantes/Antigas/Frota/webp/HS180TE%20-%20antiga%20HT180TE.webp",
  "heliar-ht180te": "/Imagens%20baterias/Heliar/Faltantes/Antigas/Frota/webp/HT180TE%20-%20antiga%20HT180TE.webp",
  "econ-egm60hd-24": "/Imagens%20baterias/eCON/webp/EGM60HD-24.webp",
  "econ-egm70pd-24": "/Imagens%20baterias/eCON/webp/EGM70PD-24.webp",
  "econ-egm80kd-24": "/Imagens%20baterias/eCON/webp/EGM80KD-24.webp",
  "econ-egm92md-24": "/Imagens%20baterias/eCON/webp/EGM92MD-24.webp",
  "econ-efb50gd-24": "/Imagens%20baterias/eCON/webp/EFB50GD-24.webp",
  "econ-efb60hd-24": "/Imagens%20baterias/eCON/webp/EFB60HD-24.webp",
  "econ-efb72pd-24": "/Imagens%20baterias/eCON/webp/EFB72PD-24.webp",
  "econ-e45bd-18": "/Imagens%20baterias/eCON/webp/E45BD-18.webp",
  "econ-e50gd-18": "/Imagens%20baterias/eCON/webp/E50GD-18.webp",
  "econ-e60dd-18": "/Imagens%20baterias/eCON/webp/E60DD-18.webp",
  "econ-e60hd-18": "/Imagens%20baterias/eCON/webp/E60HD-18.webp",
  "econ-e70nd-15": "/Imagens%20baterias/eCON/webp/E70ND-18.webp",
  "econ-e95md-15": "/Imagens%20baterias/eCON/webp/E95MD-18.webp",
  "econ-es100le-15": "/Imagens%20baterias/eCON/webp/ES100LE-15.webp",
  "econ-em100le-12": "/Imagens%20baterias/eCON/webp/E100LE-15.webp",
  "econ-e150td-12": "/Imagens%20baterias/eCON/webp/E150TD-15.webp",
  "econ-e180td-12": "/Imagens%20baterias/eCON/webp/E180TD-15.webp",
  "econ-e180te-12": "/Imagens%20baterias/eCON/webp/ES180TE-15.webp",
  "econ-es150td-15": "/Imagens%20baterias/eCON/webp/ES150TD-15.webp",
  "econ-vrla-ep12-5": "/econ-vrla-ep12-5.webp",
  "econ-vrla-ep12-7w": "/econ-vrla-ep12-7w.webp",
  "econ-vrla-ep12-7": "/econ-vrla-ep12-7.webp",
  "econ-vrla-ep12-9": "/econ-vrla-ep12-9.webp",
  "econ-vrla-ep12-12": "/econ-vrla-ep12-12.webp",
  "econ-vrla-ep12-18": "/econ-vrla-ep12-18.webp",
  "bluetti-premium-30-v2": "/bluetti-premium-30-v2.webp",
  "bluetti-ac50": "/bluetti-ac50.webp",
  "bluetti-ac50p": "/bluetti-ac50p.webp",
  "bluetti-ac70p": "/bluetti-ac70p.webp",
  "bluetti-ac180p": "/bluetti-ac180p.webp",
  "bluetti-premium-100-v2": "/bluetti-premium-100-v2.webp",
  "bluetti-ac200pl": "/bluetti-ac200pl.webp",
  "bluetti-elite-200-v2": "/bluetti-elite-200-v2.webp",
  "bluetti-premium-200-v2": "/bluetti-premium-200-v2.webp",
  "bluetti-elite-300": "/bluetti-elite-300-produto.webp",
  "bluetti-apex-300": "/bluetti-apex-300.webp",
  "bluetti-sora-60": "/bluetti-sora-60.webp",
  "bluetti-pv100": "/bluetti-pv100.webp",
  "bluetti-sora-130": "/bluetti-sora-130.webp",
  "bluetti-sora-220": "/bluetti-sora-220.webp",
};

export type BluettiComparisonModel = { slug: string; model: string; watts: number; wattHours: number; powerLiftingWatts: number; surgeWatts?: number; modeNote?: string };
export const BLUETTI_COMPARISON: BluettiComparisonModel[] = [
  { slug: "bluetti-premium-30-v2", model: "Premium 30 v2", watts: 600, wattHours: 320, powerLiftingWatts: 1500, modeNote: "Power Lifting atende cargas puramente resistivas; potência CA+CC combinada limitada a 600 W." },
  { slug: "bluetti-ac50", model: "AC50", watts: 700, wattHours: 448, powerLiftingWatts: 1000 },
  { slug: "bluetti-ac50p", model: "AC50P", watts: 700, wattHours: 504, powerLiftingWatts: 1200 },
  { slug: "bluetti-ac70p", model: "AC70P", watts: 1000, wattHours: 864, powerLiftingWatts: 2000 },
  { slug: "bluetti-ac180p", model: "AC180P", watts: 1800, wattHours: 1440, powerLiftingWatts: 2700 },
  { slug: "bluetti-premium-100-v2", model: "Premium 100 v2", watts: 1800, wattHours: 1024, powerLiftingWatts: 2700 },
  { slug: "bluetti-ac200pl", model: "AC200PL", watts: 2400, wattHours: 2304, powerLiftingWatts: 3600, surgeWatts: 2500, modeNote: "Saída nominal de 2.400 W; Power Lifting de 3.600 W; potência de pico de 2.500 W. São condições distintas." },
  { slug: "bluetti-elite-200-v2", model: "Elite 200 v2", watts: 2600, wattHours: 2073.6, powerLiftingWatts: 3900, modeNote: "Power Lifting até 3.900 W somente para cargas puramente resistivas; a saída nominal permanece limitada a 2.600 W." },
  { slug: "bluetti-premium-200-v2", model: "Premium 200 v2", watts: 2700, wattHours: 2073.6, powerLiftingWatts: 3900 },
  { slug: "bluetti-elite-300", model: "Elite 300", watts: 2400, wattHours: 3014.4, powerLiftingWatts: 4800 },
  { slug: "bluetti-apex-300", model: "Apex 300", watts: 3840, wattHours: 2764.8, powerLiftingWatts: 7680 },
];

export const SITE_URL = "https://www.distribuidorasol.com.br";
export const SITE_NAME = "Sol Distribuidora";

const formatNumber = (value: number) => value.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
const firstAmount = (text: string | undefined, unit: string) => text?.match(new RegExp(`[\\d.,]+\\s*${unit}`))?.[0].replace(/\s+/, " ");
const shorten = (text: string, max = 158) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};
const usableWeight = (weight?: string) => weight && /\d/.test(weight) ? weight : undefined;
const cleanDimensions = (dimensions?: string) => dimensions?.replace(" (C × L × A)", "").replace(/ x /g, " × ");
const automotiveTechnology = (technology: string) => /AGM/.test(technology) ? "AGM" : /EFB/.test(technology) ? "EFB" : /SLI|convencional/i.test(technology) ? "SLI" : "";
const panelWatts = (model: string) => model.match(/\d+/)?.[0];

export type ProductSeo = { title: string; description: string; category: string; properties: Array<[string, string]> };

// Title, description and schema.org properties for a product page, built from
// the same technical data the page shows.
export function productSeo(product: Product): ProductSeo {
  const spec = PRODUCT_SPECS[productSpecKey(product.brand, product.model)];
  const name = `${product.brand === "Bluetti" ? "BLUETTI" : product.brand} ${product.model}`;

  if (product.brand === "Bluetti") {
    const station = BLUETTI_COMPARISON.find((item) => item.slug === product.slug);
    if (product.segment === "solar") {
      const watts = panelWatts(product.model);
      return {
        title: `Painel solar ${name}${watts ? ` de ${watts} W` : ""}`,
        description: shorten(`${name}: painel solar portátil${watts ? ` de ${watts} W` : ""} para recarregar estações de energia BLUETTI dentro e fora da rede. Distribuição e atendimento B2B da Sol Distribuidora.`),
        category: "Painel solar portátil",
        properties: watts ? [["Potência", `${watts} W`]] : [],
      };
    }
    return {
      title: `Estação de energia ${name}${station ? ` ${formatNumber(station.wattHours)} Wh` : ""}`,
      description: shorten(station
        ? `${name}: estação de energia portátil com ${formatNumber(station.wattHours)} Wh de capacidade e ${formatNumber(station.watts)} W de saída nominal. Distribuição e atendimento B2B da Sol Distribuidora.`
        : `${name}: estação de energia portátil BLUETTI. Distribuição e atendimento B2B da Sol Distribuidora.`),
      category: "Estação de energia portátil",
      properties: station ? [["Capacidade", `${formatNumber(station.wattHours)} Wh`], ["Saída nominal", `${formatNumber(station.watts)} W`]] : [],
    };
  }

  const dimensions = cleanDimensions(spec?.dimensions);
  const weight = usableWeight(spec?.weight);
  const baseProperties: Array<[string, string]> = [
    ...(spec?.voltage ? [["Tensão", spec.voltage] as [string, string]] : []),
    ...(dimensions ? [["Dimensões (C × L × A)", dimensions] as [string, string]] : []),
    ...(weight ? [["Peso", weight] as [string, string]] : []),
  ];

  if (product.brand === "Freedom") {
    const rates = spec?.capacityByRate;
    return {
      title: `Bateria estacionária ${name} 12 V${rates ? ` ${rates.c20} (C20)` : ""}`,
      description: shorten(`${name}: bateria estacionária ventilada 12 V${rates ? ` com ${rates.c10} (C10), ${rates.c20} (C20) e ${rates.c100} (C100)` : ""}${dimensions ? `, ${dimensions}` : ""}. Para nobreak, telecom e energia solar.`),
      category: "Bateria estacionária",
      properties: [...(rates ? [["Capacidade C20", rates.c20] as [string, string]] : []), ...baseProperties],
    };
  }

  if (product.brand === "eCON VRLA") {
    const amps = firstAmount(spec?.capacity, "Ah");
    return {
      title: `Bateria VRLA AGM eCON ${product.model} 12 V${amps ? ` ${amps}` : ""}`,
      description: shorten(`eCON ${product.model}: bateria VRLA AGM selada 12 V${amps ? ` de ${amps}` : ""}${dimensions ? `, ${dimensions}` : ""}${weight ? `, ${weight}` : ""}. Para nobreak, alarme, telecom e iluminação de emergência.`),
      category: "Bateria estacionária VRLA",
      properties: [...(amps ? [["Capacidade C20", amps] as [string, string]] : []), ...baseProperties],
    };
  }

  // Heliar and eCON automotive.
  const amps = firstAmount(spec?.capacity, "Ah");
  const cca = spec?.cca?.match(/[\d.]+/)?.[0];
  const technology = spec ? automotiveTechnology(spec.technology) : "";
  return {
    title: `Bateria automotiva ${name}${technology ? ` ${technology}` : ""}${amps ? ` ${amps}` : ""}`,
    description: shorten(`${name}: bateria automotiva${technology ? ` ${technology}` : ""} 12 V${amps ? `, ${amps}` : ""}${cca ? `, CCA ${cca} A` : ""}${dimensions ? `, ${dimensions}` : ""}. Distribuição para revendas e frotas com a Sol Distribuidora.`),
    category: "Bateria automotiva",
    properties: [...(amps ? [["Capacidade C20", amps] as [string, string]] : []), ...(cca ? [["CCA", `${cca} A`] as [string, string]] : []), ...baseProperties],
  };
}

// Search titles and descriptions for the category and brand listings.
export const CATEGORY_SEO: Record<string, { title: string; description: string }> = {
  "baterias-automotivas": { title: "Baterias automotivas Heliar e eCON", description: "Baterias automotivas Heliar e eCON nas linhas SLI, EFB, AGM e Frota, para veículos leves e pesados. Distribuição B2B para revendas e frotas em todo o Brasil." },
  "baterias-estacionarias": { title: "Baterias estacionárias Freedom e eCON VRLA", description: "Baterias estacionárias Freedom (ventiladas, 26 a 220 Ah) e eCON VRLA AGM (5 a 18 Ah) para nobreak, telecom, energia solar e sistemas de emergência." },
  "heliar-baterias-de-motos": { title: "Baterias para motos", description: "Baterias para motocicletas com atendimento especializado da Sol Distribuidora para revendas." },
  "bluetti-estacoes-de-energia": { title: "Estações de energia e painéis solares BLUETTI", description: "Estações de energia portáteis BLUETTI de 320 a 3.014 Wh e painéis solares de 60 a 220 W, para backup, mobilidade e uso fora da rede. Distribuição B2B Sol." },
  "freedom-baterias-estacionarias": { title: "Baterias estacionárias Freedom 12 V", description: "Linha Freedom de baterias estacionárias ventiladas 12 V, de 26 a 220 Ah (C20), para nobreak, telecom e energia solar. Fichas técnicas e atendimento B2B." },
  "heliar-baterias-automotivas": { title: "Baterias automotivas Heliar SLI, EFB, AGM e Frota", description: "Baterias Heliar SLI, EFB, AGM e Frota, de 40 a 225 Ah, para carros, start-stop e veículos pesados. Distribuição para revendas com a Sol Distribuidora." },
  "econ-baterias-automotivas": { title: "Baterias automotivas eCON", description: "Baterias automotivas eCON nas linhas Convencional, EFB, AGM e Frota, de 45 a 180 Ah. Distribuição para revendas e frotas com a Sol Distribuidora." },
  "econ-vrla-baterias-estacionarias": { title: "Baterias VRLA AGM eCON 12 V", description: "Baterias VRLA AGM seladas eCON 12 V de 5 a 18 Ah para nobreak, alarme, telecom e iluminação de emergência, com tabelas de descarga e catálogo técnico." },
};
