import type { Metadata } from "next";
import { CATEGORY_META, PAGE_IDS, PRODUCTS } from "../data";
import { PRODUCT_IMAGES, SitePage } from "../site";

const PAGE_METADATA: Record<string, { title: string; description: string; image: string }> = {
  produtos: { title: "Produtos e soluções", description: "Portfólio profissional de baterias automotivas e estacionárias, estações de energia e soluções solares.", image: "/linha-automotiva copiar.webp" },
  "sobre-nos": { title: "Sobre a Sol", description: "Conheça a estrutura, a história e a atuação nacional da Sol Distribuidora.", image: "/sol-drive-01.jpg" },
  sustentabilidade: { title: "Sustentabilidade", description: "Logística reversa, reciclagem de baterias e práticas para um futuro energético mais responsável.", image: "/Sustentabilida-hero.webp" },
  contato: { title: "Contato", description: "Fale com a equipe da Sol Distribuidora para encontrar a solução ideal para sua empresa ou revenda.", image: "/sol-drive-02.jpg" },
  "politica-de-privacidade": { title: "Política de Privacidade", description: "Entenda como a Sol Distribuidora trata os dados pessoais enviados pelos seus canais digitais.", image: "/og.png" },
};

function createMetadata(title: string, description: string, image: string, canonical: string): Metadata {
  const fullTitle = `${title} | Sol Distribuidora`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    openGraph: { title: fullTitle, description, type: "website", locale: "pt_BR", siteName: "Sol Distribuidora", images: [{ url: image }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resolved = PAGE_IDS[slug] || slug;
  const canonical = resolved === "home" || resolved === "home-nova" ? "/" : `/${resolved}`;
  const product = PRODUCTS.find((item) => item.slug === resolved);
  if (product) {
    const segment = { estacionaria: "baterias estacionárias", automotiva: "baterias automotivas", moto: "baterias para motos", energia: "estações de energia", solar: "painéis solares" }[product.segment];
    return createMetadata(`${product.brand} ${product.model}`, `Conheça a ${product.model}, da ${product.brand}, e encontre soluções em ${segment} com suporte especializado da Sol Distribuidora.`, PRODUCT_IMAGES[product.slug] ?? "/og.png", canonical);
  }
  const category = CATEGORY_META[resolved as keyof typeof CATEGORY_META];
  if (category) {
    const categoryImage = category[2] === "automotiva" || category[2] === "Heliar" || category[2] === "eCON" ? "/linha-automotiva.png" : category[2] === "Bluetti" ? "/linha-bluetti.webp" : "/linha-estacionarias copiar.webp";
    return createMetadata(category[0], category[1], categoryImage, canonical);
  }
  const page = PAGE_METADATA[resolved];
  if (page) return createMetadata(page.title, page.description, page.image, canonical);
  return createMetadata("Página não encontrada", "A página solicitada não está disponível na Sol Distribuidora.", "/og.png", canonical);
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SitePage slug={slug} />;
}
