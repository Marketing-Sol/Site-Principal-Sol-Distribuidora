import type { Metadata } from "next";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { CATEGORY_META, HIDDEN_PRODUCTS, LEGACY_URLS, PAGE_IDS, PRODUCTS, type Product } from "../data";
import { CATEGORY_SEO, PRODUCT_IMAGES, SITE_NAME, SITE_URL, productSeo } from "../catalog-meta";
import { SitePage } from "../site";

const PAGE_METADATA: Record<string, { title: string; description: string; image: string }> = {
  produtos: { title: "Produtos e soluções", description: "Portfólio profissional de baterias automotivas e estacionárias, estações de energia e soluções solares.", image: "/linha-automotiva-card.webp" },
  "sobre-nos": { title: "Sobre a Sol", description: "Conheça a estrutura, a história e a atuação nacional da Sol Distribuidora.", image: "/sol-drive-01.jpg" },
  sustentabilidade: { title: "Sustentabilidade", description: "Logística reversa, reciclagem de baterias e práticas para um futuro energético mais responsável.", image: "/sustentabilidade-hero.webp" },
  contato: { title: "Contato", description: "Fale com a equipe da Sol Distribuidora para encontrar a solução ideal para sua empresa ou revenda.", image: "/sol-drive-02.jpg" },
  "politica-de-privacidade": { title: "Política de Privacidade", description: "Entenda como a Sol Distribuidora trata os dados pessoais enviados pelos seus canais digitais.", image: "/og.jpg" },
};

const CATEGORY_IMAGES: Record<string, string> = {
  automotiva: "/linha-automotiva-card.webp",
  Heliar: "/linha-automotiva-card.webp",
  eCON: "/linha-automotiva-card.webp",
  moto: "/linha-automotiva-card.webp",
  Bluetti: "/linha-bluetti-card.webp",
};

// Where each product sits in the breadcrumb trail.
const PRODUCT_CATEGORY: Record<Product["segment"], { slug: string; name: string }> = {
  automotiva: { slug: "baterias-automotivas", name: "Baterias automotivas" },
  moto: { slug: "heliar-baterias-de-motos", name: "Baterias para motos" },
  estacionaria: { slug: "baterias-estacionarias", name: "Baterias estacionárias" },
  energia: { slug: "bluetti-estacoes-de-energia", name: "Estações de energia" },
  solar: { slug: "bluetti-estacoes-de-energia", name: "Estações de energia" },
};

function createMetadata(title: string, description: string, image: string, canonical: string, type: "website" | "article" = "website"): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    openGraph: { title: fullTitle, description, type, url: canonical, locale: "pt_BR", siteName: SITE_NAME, images: [{ url: image }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resolved = PAGE_IDS[slug] || slug;
  const canonical = resolved === "home" || resolved === "home-nova" ? "/" : `/${resolved}`;
  const product = PRODUCTS.find((item) => item.slug === resolved);
  if (product) {
    const seo = productSeo(product);
    return createMetadata(seo.title, seo.description, PRODUCT_IMAGES[product.slug] ?? "/og.jpg", canonical);
  }
  const category = CATEGORY_META[resolved as keyof typeof CATEGORY_META];
  if (category) {
    const seo = CATEGORY_SEO[resolved] ?? { title: category[0], description: category[1] };
    const metadata = createMetadata(seo.title, seo.description, CATEGORY_IMAGES[category[2]] ?? "/linha-estacionarias-card.webp", canonical);
    // The motorcycle category has no products yet: keep it out of search results.
    const isEmpty = !PRODUCTS.some((item) => item.segment === category[2] || item.brand === category[2]);
    return isEmpty ? { ...metadata, robots: { index: false, follow: true } } : metadata;
  }
  const page = PAGE_METADATA[resolved];
  if (page) return createMetadata(page.title, page.description, page.image, canonical);
  return {
    title: `Página não encontrada | ${SITE_NAME}`,
    description: "A página solicitada não está disponível na Sol Distribuidora.",
    alternates: { canonical: null },
    robots: { index: false, follow: true },
  };
}

function productJsonLd(product: Product) {
  const seo = productSeo(product);
  const url = `${SITE_URL}/${product.slug}`;
  const image = PRODUCT_IMAGES[product.slug];
  const category = PRODUCT_CATEGORY[product.segment];
  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${product.brand === "Bluetti" ? "BLUETTI" : product.brand} ${product.model}`,
      model: product.model,
      sku: product.model,
      brand: { "@type": "Brand", name: product.brand === "Bluetti" ? "BLUETTI" : product.brand },
      category: seo.category,
      description: seo.description,
      url,
      ...(image ? { image: `${SITE_URL}${image}` } : {}),
      ...(seo.properties.length ? { additionalProperty: seo.properties.map(([name, value]) => ({ "@type": "PropertyValue", name, value })) } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: category.name, item: `${SITE_URL}/${category.slug}` },
        { "@type": "ListItem", position: 3, name: `${product.brand} ${product.model}`, item: url },
      ],
    },
  ];
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (LEGACY_URLS[slug]) permanentRedirect(`/${LEGACY_URLS[slug]}`);
  // Hidden products may come back, so their address redirects only temporarily.
  if (HIDDEN_PRODUCTS[slug]) redirect(`/${HIDDEN_PRODUCTS[slug]}`);
  // Old WordPress ids (/979, /elementor-601…) move permanently to the current address.
  const resolved = PAGE_IDS[slug];
  if (resolved && resolved !== slug) permanentRedirect(resolved === "home" ? "/" : `/${resolved}`);
  const product = PRODUCTS.find((item) => item.slug === slug);
  // Unknown addresses answer with a real 404 status (app/not-found.tsx).
  if (!product && !PAGE_METADATA[slug] && !(slug in CATEGORY_META)) notFound();
  return <>
    {product && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)).replace(/</g, "\\u003c") }} />}
    <SitePage slug={slug} />
  </>;
}
