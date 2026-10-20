import type { MetadataRoute } from "next";
import { CATEGORY_META, PRODUCTS } from "./data";
import { SITE_URL } from "./catalog-meta";

const PAGES = ["", "produtos", "sobre-nos", "sustentabilidade", "contato", "politica-de-privacidade"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  // Categories with no products yet (motorcycles) stay out until they have items.
  const categories = Object.entries(CATEGORY_META)
    .filter(([, [, , filter]]) => PRODUCTS.some((product) => product.segment === filter || product.brand === filter))
    .map(([slug]) => slug);
  return [
    ...PAGES.map((path) => ({ url: `${SITE_URL}/${path}`, lastModified, changeFrequency: "monthly" as const, priority: path ? 0.7 : 1 })),
    ...categories.map((slug) => ({ url: `${SITE_URL}/${slug}`, lastModified, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...PRODUCTS.map((product) => ({ url: `${SITE_URL}/${product.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
