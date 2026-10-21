import type { Metadata } from "next";
import { HOME_DESCRIPTION as description, HOME_TITLE as title, IS_PREVIEW, SITE_NAME, SITE_URL } from "./catalog-meta";
import "./globals.css";

// Fixed canonical origin: every address and share image points to the official
// domain, whatever host served the request. Title, description and canonical
// come from each page (home: app/page.tsx), so the 404 page does not inherit
// the home page ones.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...(IS_PREVIEW ? { robots: { index: false, follow: false } } : {}),
  icons: { icon: "/Sol-Icon-favicon.webp", shortcut: "/Sol-Icon-favicon.webp" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    locale: "pt_BR",
    siteName: SITE_NAME,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Sol Distribuidora — Energia para quem não pode parar." }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/sol-logo-blue-crop.png`,
  image: `${SITE_URL}/og.jpg`,
  description,
  telephone: "+55 41 3277-5080",
  email: "atendimento@distribuidorasol.com.br",
  foundingDate: "1999",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua das Carmelitas, 1581",
    addressLocality: "Curitiba",
    addressRegion: "PR",
    postalCode: "81650-060",
    addressCountry: "BR",
  },
  areaServed: "BR",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" href="/fonts/Panton-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Panton-ExtraBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }} />
        {children}
      </body>
    </html>
  );
}
