import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "www.distribuidorasol.com.br";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Sol Distribuidora | Energia para quem não pode parar";
  const description = "Soluções B2B em baterias automotivas e estacionárias, estações de energia e backup, com suporte técnico e pós-venda.";
  return {
    metadataBase: new URL(origin),
    title,
    description,
    alternates: { canonical: "/" },
    icons: { icon: "/Sol-Icon-favicon.webp", shortcut: "/Sol-Icon-favicon.webp" },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "pt_BR",
      siteName: "Sol Distribuidora",
      images: [{ url: `${origin}/og.png`, width: 1733, height: 909, alt: "Sol Distribuidora — Energia para quem não pode parar." }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
