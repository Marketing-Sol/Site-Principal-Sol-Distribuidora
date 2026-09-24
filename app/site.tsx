"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ComponentProps } from "react";
import Link from "next/link";
import NextImage, { getImageProps } from "next/image";
import { CATEGORY_META, PAGE_IDS, PRODUCTS, type Product } from "./data";
import { PRODUCT_SPECS, productSpecKey, type ProductSpec } from "./product-specs";

const WHATSAPP = "https://api.whatsapp.com/send?phone=5541998220358&text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Sol.";
const CONTACT_LEADS_ENDPOINT = "https://script.google.com/macros/s/AKfycbwN1U6lRr3ZYtpF8mlgUeQGr7FpC9YculkBb67sDmMdF9bMgMDCPtmNd9e_iDBwLXmr/exec";
const HOME_SCROLL_FRAME_COUNT = 61;
const HOME_SCROLL_VIDEO_END = 6 / 11;
const HOME_SCROLL_FRAME_VERSION = "kling-3-0-pro-4k-20260831-15fps-1440-q82";
const HOME_SCROLL_MAX_CONCURRENT_LOADS = 4;

export const PRODUCT_IMAGES: Record<string, string> = {
  "freedom-df300": "/freedom-df300.png",
  "freedom-df500": "/freedom-df500.png",
  "freedom-df700": "/freedom-df700.png",
  "freedom-df1000": "/freedom-df1000.png",
  "freedom-df1500": "/freedom-df1500.png",
  "freedom-df2000": "/freedom-df2000.png",
  "freedom-df2500": "/freedom-df2500.png",
  "freedom-df3000": "/freedom-df3000.png",
  "freedom-df4100": "/freedom-df4100.png",
  "heliar-h40jd": "/Imagens%20baterias/Heliar/Webp/H40JD%20-%20superior.webp",
  "heliar-h40jd-jis": "/Imagens%20baterias/Heliar/Faltantes/Antigas/webp/H40JD%20JIS%20-%20antiga%20H40FD.webp",
  "heliar-hefb225td": "/Imagens%20baterias/Heliar/Faltantes/Antigas/EFB/webp/HEFB225TD%20-%20antiga%20HEFB225TD.webp",
  "heliar-hefb225te": "/Imagens%20baterias/Heliar/Faltantes/Antigas/EFB/webp/HEFB225TE%20-%20antiga%20HEFB225TE.webp",
  "heliar-hagm70pd": "/Imagens%20baterias/Heliar/Faltantes/Genericas/webp/HAGM%20-%20perspectiva%20.webp",
  "heliar-hagm80kd": "/Imagens%20baterias/Heliar/Faltantes/Genericas/webp/HAGM%20-%20perspectiva%20.webp",
  "heliar-hagm95md": "/Imagens%20baterias/Heliar/Faltantes/Genericas/webp/HAGM%20-%20perspectiva%20.webp",
  "heliar-hagm105sd": "/Imagens%20baterias/Heliar/Faltantes/Genericas/webp/HAGM%20-%20perspectiva%20.webp",
  "heliar-he48bd": "/Imagens%20baterias/Heliar/Faltantes/Genericas/webp/HE%20-%2060%20-%20perspectiva.webp",
  "heliar-he45be": "/Imagens%20baterias/Heliar/Faltantes/SLI/Superior/PNG/HE45BE%20-%20superior.png",
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
  "bluetti-elite-300": "/Elite%20300.webp",
  "bluetti-apex-300": "/bluetti-apex-300.webp",
  "bluetti-sora-60": "/bluetti-sora-60.webp",
  "bluetti-pv100": "/bluetti-pv100.webp",
  "bluetti-sora-130": "/bluetti-sora-130.webp",
  "bluetti-sora-220": "/bluetti-sora-220.webp",
};

const BLUETTI_GALLERY_COUNTS: Record<string, number> = {
  "bluetti-premium-30-v2": 6, "bluetti-ac50": 4, "bluetti-ac50p": 10, "bluetti-ac70p": 10,
  "bluetti-ac180p": 7, "bluetti-premium-100-v2": 6, "bluetti-ac200pl": 10, "bluetti-elite-200-v2": 9,
  "bluetti-premium-200-v2": 13, "bluetti-elite-300": 2, "bluetti-apex-300": 6, "bluetti-sora-60": 7,
  "bluetti-pv100": 5, "bluetti-sora-130": 7, "bluetti-sora-220": 9,
};

const BLUETTI_GALLERIES = Object.fromEntries(
  Object.entries(BLUETTI_GALLERY_COUNTS).map(([slug, count]) => [
    slug,
    Array.from({ length: count }, (_, index) => `/bluetti-gallery/${slug}-${String(index + 1).padStart(2, "0")}.webp`),
  ]),
) as Record<string, string[]>;

const HELIAR_IMAGE_SCALES: Record<string, number> = {
  "heliar-h40jd": 1.03,
  "heliar-h40jd-jis": 1.75,
  "heliar-he45be": 0.7,
  "heliar-h45je": 1.42,
  "heliar-he48bd": 1.3,
  "heliar-he50gd": 0.93,
  "heliar-h50jd": 1.42,
  "heliar-he60dd": 1.3,
  "heliar-he60de": 1.3,
  "heliar-he60hd": 1.3,
  "heliar-h65hd": 1.4,
  "heliar-h70nd": 1.01,
  "heliar-h70ne": 0.92,
  "heliar-h75pd": 1.2,
  "heliar-h75ld": 1.2,
  "heliar-h75le": 1.2,
  "heliar-h90ld": 1.1,
  "heliar-h90le": 0.91,
  "heliar-h95md": 1.35,
  "heliar-hagm60hd": 1.3,
  "heliar-hagm70pd": 1.3,
  "heliar-hagm80kd": 1.3,
  "heliar-hagm95md": 1.3,
  "heliar-hagm105sd": 1.3,
  "heliar-hefb50gd": 1.52,
  "heliar-hefb60hd": 1.3,
  "heliar-hefb72pd": 1.2,
  "heliar-hefb225td": 0.89,
  "heliar-hefb225te": 0.89,
  "heliar-h100le": 1.04,
  "heliar-hs100le": 1.04,
  "heliar-h150td": 0.93,
  "heliar-hs150td": 0.76,
  "heliar-h180td": 0.93,
  "heliar-hs180td": 0.76,
  "heliar-hs180te": 0.91,
  "heliar-ht180te": 0.91,
};

function heliarImageStyle(product: Product) {
  if (product.brand !== "Heliar") return undefined;
  return { "--heliar-image-scale": HELIAR_IMAGE_SCALES[product.slug] ?? 1 } as React.CSSProperties;
}

function Icon({ name }: { name: "arrow" | "check" | "phone" | "pin" | "mail" | "leaf" | "shield" | "truck" | "people" | "energy" }) {
  const glyphs = {
    arrow: <><path d="M5 19 19 5" /><path d="M9 5h10v10" /></>,
    check: <path d="m5 12 4.2 4.2L19 6.5" />,
    phone: <path d="M7.1 3.9 4.8 6.2c-1 1 1.8 7.1 5.8 11.1s10.1 6.8 11.1 5.8l2.3-2.3-4.2-4.2-2.7 2.1c-1.3-.7-2.7-1.7-4-3s-2.3-2.7-3-4l2.1-2.7-4.2-4.1Z" />,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    leaf: <><path d="M20 4C10 4 4 9.6 4 17c0 1.7.5 2.5.5 2.5S13 20.2 17 15c2.3-3 3-7.1 3-11Z" /><path d="M4.5 19.5c3.2-4.1 6.3-6.7 11.5-9.4" /></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.3 8.8-8 10-4.7-1.2-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.3 2.3 4.7-4.7" /></>,
    truck: <><path d="M3 6h11v10H3z" /><path d="M14 10h3l3 3v3h-6z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
    people: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3.5 20c.5-4 2.5-6 5.5-6s5 2 5.5 6" /><path d="M14.5 14.5c3.3-.2 5.4 1.6 6 5.5" /></>,
    energy: <path d="m13.5 2-8 11h5l-1 9 8-12h-5l1-8Z" />,
  };
  return <span className={`icon icon-${name}`} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{glyphs[name]}</svg></span>;
}

function Brand({ variant = "blue" }: { variant?: "blue" | "white" }) {
  return <Link href="/" className="brand" aria-label="Sol Distribuidora — página inicial"><img src={`/sol-logo-${variant}-crop.png`} alt="Sol Distribuidora" /></Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);
  useEffect(() => {
    const closeSolutionsMenu = (event: PointerEvent) => {
      if (!solutionsMenuRef.current?.contains(event.target as Node)) setSolutionsOpen(false);
    };
    const closeSolutionsMenuWithKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSolutionsOpen(false);
    };
    document.addEventListener("pointerdown", closeSolutionsMenu);
    document.addEventListener("keydown", closeSolutionsMenuWithKeyboard);
    return () => {
      document.removeEventListener("pointerdown", closeSolutionsMenu);
      document.removeEventListener("keydown", closeSolutionsMenuWithKeyboard);
    };
  }, []);
  const closeNavigation = () => {
    setOpen(false);
    setSolutionsOpen(false);
  };
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let previousPosition = window.scrollY;
    const updateHeader = () => {
      if (reducedMotionQuery.matches) {
        document.body.classList.remove("site-header-hidden");
        previousPosition = window.scrollY;
        return;
      }
      const currentPosition = window.scrollY;
      const isScrollingDown = currentPosition > previousPosition && currentPosition > 86;
      document.body.classList.toggle("site-header-hidden", isScrollingDown);
      previousPosition = currentPosition;
    };
    window.addEventListener("scroll", updateHeader, { passive: true });
    reducedMotionQuery.addEventListener("change", updateHeader);
    return () => {
      window.removeEventListener("scroll", updateHeader);
      reducedMotionQuery.removeEventListener("change", updateHeader);
      document.body.classList.remove("site-header-hidden");
    };
  }, []);
  return <header className="header">
    <div className="nav-wrap">
      <Brand />
      <button className="menu-button" onClick={() => { setOpen(!open); setSolutionsOpen(false); }} aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? "Fechar menu" : "Abrir menu"}><span /><span /></button>
      <nav id="primary-navigation" className={open ? "nav open" : "nav"} aria-label="Navegação principal">
        <div className={solutionsOpen ? "nav-solutions is-open" : "nav-solutions"} ref={solutionsMenuRef}>
          <button type="button" className="nav-solutions-trigger" onClick={() => setSolutionsOpen((current) => !current)} aria-expanded={solutionsOpen} aria-controls="solutions-submenu">Soluções <span aria-hidden="true">⌄</span></button>
          <div id="solutions-submenu" className="solutions-submenu" aria-hidden={!solutionsOpen}>
            <Link href="/baterias-automotivas" onClick={closeNavigation}><strong>Baterias automotivas</strong><small>Veículos leves e pesados</small></Link>
            <Link href="/baterias-estacionarias" onClick={closeNavigation}><strong>Baterias estacionárias</strong><small>Backup e aplicações críticas</small></Link>
            <Link href="/bluetti-estacoes-de-energia" onClick={closeNavigation}><strong>Estações de energia</strong><small>Energia portátil e solar</small></Link>
            <Link href="/produtos" className="solutions-submenu-all" onClick={closeNavigation}>Ver todo o catálogo <Icon name="arrow" /></Link>
          </div>
        </div>
        <Link href="/sobre-nos" onClick={closeNavigation}>A Sol</Link>
        <Link href="/sustentabilidade" onClick={closeNavigation}>Sustentabilidade</Link>
        <Link href="/contato" onClick={closeNavigation}>Contato</Link>
        <a className="nav-cta" href={WHATSAPP} target="_blank" rel="noreferrer">Fale com um especialista <Icon name="arrow" /></a>
      </nav>
    </div>
  </header>;
}

function Footer() {
  return <footer>
    <div className="footer-top">
      <div><Brand variant="white" /><p>Energia para quem não pode parar.</p></div>
      <div><b>Navegue</b><Link href="/produtos">Soluções</Link><Link href="/sobre-nos">A Sol</Link><Link href="/sustentabilidade">Sustentabilidade</Link></div>
      <div><b>Fale com a Sol</b><a href="tel:+554132775080">(41) 3277-5080</a><a href="mailto:atendimento@distribuidorasol.com.br">atendimento@distribuidorasol.com.br</a><span>Curitiba · PR</span></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Sol Distribuidora · CNPJ 00.338.610/0002-80</span><Link href="/politica-de-privacidade">Política de Privacidade</Link></div>
  </footer>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <><Header /><main>{children}</main><Footer /><a className="whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Fale com a Sol pelo WhatsApp">WhatsApp <Icon name="arrow" /></a></>;
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: React.ReactNode; text?: string }) {
  return <div className="section-title"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function HeroVisual({ className = "" }: { className?: string }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rotations = [-5, 5, 0];
    const horizontalDistance = [14, -12, 9];
    const verticalDistance = [8, 10, -7];
    let frame = 0;

    const updateMotion = () => {
      frame = 0;
      const visual = visualRef.current;
      if (!visual) return;
      const bounds = visual.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;

      const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) / (window.innerHeight / 2 + bounds.height / 2)));
      productRefs.current.forEach((product, index) => {
        if (!product) return;
        const x = Math.sin(progress * Math.PI) * horizontalDistance[index];
        const y = Math.cos(progress * Math.PI + index) * verticalDistance[index];
        product.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotations[index]}deg)`;
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateMotion);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={visualRef} className={`hero-visual ${className}`.trim()} aria-label="Representação de soluções de energia">
    <div className="energy-orbit orbit-one" /><div className="energy-orbit orbit-two" />
    <div ref={(element) => { productRefs.current[0] = element; }} className="hero-product hero-product-a"><img src="/DF_4100 Diagonal.webp" alt="Bateria estacionária Freedom DF 4100" /></div>
    <div ref={(element) => { productRefs.current[1] = element; }} className="hero-product hero-product-b"><img src="/Heliar embalagem nova.webp" alt="Bateria automotiva Heliar" /></div>
    <div ref={(element) => { productRefs.current[2] = element; }} className="hero-product hero-product-c"><img src="/bluetti-premium-100-v2.webp" alt="Estação de energia Bluetti Premium 100 v2" /></div>
    <div className="visual-label"><i /> Soluções para revendas e empresas</div>
  </div>;
}

function HeroPhoto({ className = "" }: { className?: string }) {
  const alt = "Fachada da Sol Distribuidora";
  const { props: desktopImageProps } = getImageProps({
    src: "/sol-hero.webp",
    alt,
    width: 2680,
    height: 1200,
    sizes: "100vw",
    priority: true,
    unoptimized: true,
  });
  const { props: mobileImageProps } = getImageProps({
    src: "/sol-hero-mobile-home.webp",
    alt,
    width: 1100,
    height: 2380,
    sizes: "100vw",
    priority: true,
    unoptimized: true,
  });

  return <div className={`hero-photo ${className}`.trim()}>
    <picture>
      <source media="(max-width: 780px)" srcSet={mobileImageProps.src} sizes={mobileImageProps.sizes} />
      {/* getImageProps preserves art direction and supplies stable image metadata. */}
      <img {...desktopImageProps} alt={alt} />
    </picture>
  </div>;
}

function TrustStrip() {
  const stripRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 780px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval: number | undefined;

    const stopRotation = () => {
      if (interval) window.clearInterval(interval);
      interval = undefined;
    };
    const startRotation = () => {
      if (interval || !mobileQuery.matches || reducedMotionQuery.matches) return;
      interval = window.setInterval(() => setActiveIndex((current) => (current + 1) % 4), 2800);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) startRotation();
      else stopRotation();
    }, { threshold: 0.35 });
    const handleViewportChange = () => {
      stopRotation();
      if (mobileQuery.matches && stripRef.current) observer.observe(stripRef.current);
      else observer.disconnect();
    };

    if (stripRef.current) observer.observe(stripRef.current);
    mobileQuery.addEventListener("change", handleViewportChange);
    reducedMotionQuery.addEventListener("change", handleViewportChange);
    return () => {
      stopRotation();
      observer.disconnect();
      mobileQuery.removeEventListener("change", handleViewportChange);
      reducedMotionQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  const items = ["Portfólio especializado", "Atendimento consultivo", "Logística nacional", "Suporte e pós-venda"];
  return <section ref={stripRef} className="trust-strip">{items.map((item, index) => {
    const isActive = index === activeIndex;
    const isPrevious = index === (activeIndex + items.length - 1) % items.length;
    return <span className={isActive ? "is-active" : isPrevious ? "is-previous" : ""} key={item}>{item}</span>;
  })}</section>;
}

function HomeScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 781px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => { };

    const initialize = () => {
      if (!desktop.matches) return;
      const section = sectionRef.current;
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!section || !canvas || !context) return;

      const frames = Array.from({ length: HOME_SCROLL_FRAME_COUNT }, () => {
        const frame = new Image();
        frame.decoding = "async";
        return frame;
      });
      const loadedFrames = new Set<number>();
      const loadingFrames = new Set<number>();
      const pendingFrames = Array.from({ length: HOME_SCROLL_FRAME_COUNT - 1 }, (_, index) => index + 1);
      let targetFrame = 0;
      let animationFrame = 0;
      let activeLoads = 0;
      let queueStarted = false;
      let disposed = false;
      const loadObserverRef: { current?: IntersectionObserver } = {};

      const closestLoadedFrame = (index: number) => {
        if (loadedFrames.has(index)) return index;
        for (let distance = 1; distance < HOME_SCROLL_FRAME_COUNT; distance += 1) {
          const before = index - distance;
          const after = index + distance;
          if (before >= 0 && loadedFrames.has(before)) return before;
          if (after < HOME_SCROLL_FRAME_COUNT && loadedFrames.has(after)) return after;
        }
        return null;
      };

      const drawFrame = (index: number) => {
        const drawableIndex = closestLoadedFrame(index);
        if (drawableIndex === null) return;
        const frame = frames[drawableIndex];
        if (!frame?.complete || !frame.naturalWidth) return;
        const { width, height } = canvas.getBoundingClientRect();
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const canvasWidth = Math.round(width * pixelRatio);
        const canvasHeight = Math.round(height * pixelRatio);
        if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
          canvas.width = canvasWidth;
          canvas.height = canvasHeight;
        }
        const scale = Math.max(canvasWidth / frame.naturalWidth, canvasHeight / frame.naturalHeight);
        const drawWidth = frame.naturalWidth * scale;
        const drawHeight = frame.naturalHeight * scale;
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.imageSmoothingQuality = "high";
        context.drawImage(frame, (canvasWidth - drawWidth) / 2, (canvasHeight - drawHeight) / 2 - 9, drawWidth, drawHeight);
      };

      const loadFrame = (index: number, onSettled?: () => void) => {
        if (disposed || index < 0 || index >= HOME_SCROLL_FRAME_COUNT || loadedFrames.has(index) || loadingFrames.has(index)) {
          onSettled?.();
          return;
        }
        const frame = frames[index];
        loadingFrames.add(index);
        const settle = () => {
          loadingFrames.delete(index);
          onSettled?.();
        };
        frame.onload = () => {
          if (disposed) return;
          loadedFrames.add(index);
          drawFrame(targetFrame);
          settle();
        };
        frame.onerror = settle;
        frame.src = `/home-scroll-video/frame-${String(index).padStart(3, "0")}.webp?v=${HOME_SCROLL_FRAME_VERSION}`;
      };

      const pumpQueue = () => {
        while (queueStarted && activeLoads < HOME_SCROLL_MAX_CONCURRENT_LOADS && pendingFrames.length) {
          const index = pendingFrames.shift();
          if (index === undefined || loadedFrames.has(index) || loadingFrames.has(index)) continue;
          activeLoads += 1;
          loadFrame(index, () => {
            activeLoads -= 1;
            pumpQueue();
          });
        }
      };

      const startQueue = () => {
        if (queueStarted || reducedMotion.matches) return;
        queueStarted = true;
        pumpQueue();
      };

      const updateFrame = () => {
        const start = section.offsetTop;
        const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
        const progress = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
        const videoProgress = Math.min(1, progress / HOME_SCROLL_VIDEO_END);
        section.classList.toggle("is-copy-visible", videoProgress >= 0.5);
        targetFrame = Math.round(videoProgress * (HOME_SCROLL_FRAME_COUNT - 1));
        loadFrame(targetFrame);
        window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(() => drawFrame(targetFrame));
      };

      loadFrame(0);

      const cleanup = () => {
        disposed = true;
        window.cancelAnimationFrame(animationFrame);
        window.removeEventListener("scroll", updateFrame);
        window.removeEventListener("resize", updateFrame);
        loadObserverRef.current?.disconnect();
        frames.forEach((frame) => {
          frame.onload = null;
          frame.onerror = null;
          frame.removeAttribute("src");
        });
        section.classList.remove("is-copy-visible");
      };

      if (reducedMotion.matches) {
        section.classList.add("is-copy-visible");
        return cleanup;
      }

      loadObserverRef.current = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        startQueue();
        loadObserverRef.current?.disconnect();
      }, { threshold: 0.01 });
      loadObserverRef.current.observe(section);
      updateFrame();
      window.addEventListener("scroll", updateFrame, { passive: true });
      window.addEventListener("resize", updateFrame);
      return cleanup;
    };

    const updateMode = () => {
      dispose();
      dispose = initialize() || (() => { });
    };
    updateMode();
    desktop.addEventListener("change", updateMode);
    reducedMotion.addEventListener("change", updateMode);
    return () => {
      dispose();
      desktop.removeEventListener("change", updateMode);
      reducedMotion.removeEventListener("change", updateMode);
    };
  }, []);

  return <section ref={sectionRef} className="home-scroll-video"><div className="home-scroll-video-sticky"><canvas ref={canvasRef} /><div className="home-scroll-video-copy"><h2>A Distribuidora Sol</h2><p>Posicionada para atuar no ramo atacadista de todas as linhas de baterias, a Distribuidora Sol vem, a cada ano, incrementando resultados e crescendo juntamente de nossos clientes e parceiros.</p><p>Graças à filosofia de trabalho de procurar exceder às expectativas de nossos clientes, a Distribuidora Sol hoje é reconhecida no mercado em que atua pela seriedade e competência em oferecer produtos de alta tecnologia que atendam satisfatoriamente às necessidades dos seus clientes, desde pequenas revendas à grandes corporações.</p></div></div></section>;
}

function Home() {
  return <Shell>
    <div className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow light">Distribuição B2B · Desde 1999</span>
          <h1><span>Energia para o presente.</span><em>Soluções para <br className="home-mobile-break" />o futuro.</em></h1>
          <p>Baterias Automotivas<br className="home-mobile-break" /> e Estacionárias, estações de<br className="home-mobile-break" /> energia e suporte especializado<br className="home-mobile-break" /> para fortalecer o seu negócio.</p>
          <div className="hero-actions"><a className="button yellow" href={WHATSAPP} target="_blank" rel="noreferrer">Seja um parceiro Sol <Icon name="arrow" /></a><Link className="text-link light" href="/produtos">Conheça o portfólio <Icon name="arrow" /></Link></div>
          <div className="hero-proof-label"><i /> Soluções para revendas e empresas</div>
          <div className="hero-proof"><div><strong>+27</strong><span>anos de mercado</span></div><div><strong>Envios</strong><span>para todo o Brasil</span></div><div><strong>+3 milhões</strong><span>de baterias vendidas</span></div></div>
        </div>
        <HeroPhoto className="hero-photo-background" />
      </section>

      <TrustStrip />
      <HomeScrollVideo />

      <div className="home-content-after-animation">
        <section className="home-about-mobile section">
          <div className="home-about-mobile-card">
            <span className="eyebrow light">A Distribuidora Sol</span>
            <h2>Energia, parceria e crescimento.</h2>
            <p>Posicionada para atuar no ramo atacadista de todas as linhas de baterias, a Distribuidora Sol vem, a cada ano, incrementando resultados e crescendo juntamente de nossos clientes e parceiros.</p>
            <p>Graças à filosofia de trabalho de procurar exceder às expectativas de nossos clientes, a Distribuidora Sol hoje é reconhecida no mercado em que atua pela seriedade e competência em oferecer produtos de alta tecnologia que atendam satisfatoriamente às necessidades dos seus clientes, desde pequenas revendas a grandes corporações.</p>
          </div>
        </section>

        <section className="solutions section">
          <SectionTitle eyebrow="Soluções" title={<>Um portfólio que <em>move negócios.</em></>} text="Produtos de alta confiabilidade, selecionados para atender diferentes demandas do mercado profissional." />
          <div className="solution-grid">
            <SolutionCard href="/baterias-automotivas" title="Baterias automotivas" text="Linhas completas para veículos leves e pesados, com marcas reconhecidas pelo mercado." image="/linha-automotiva copiar.webp" featuredImage revealDelay={0} />
            <SolutionCard href="/bluetti-estacoes-de-energia" title="Energia portátil e solar" text="Estações de energia e painéis solares para novas demandas, dentro e fora da rede." image="/linha-bluetti copiar.webp" featuredImage revealDelay={0.2} />
            <SolutionCard href="/baterias-estacionarias" title="Baterias estacionárias" text="Energia segura e contínua para telecom, nobreaks, sistemas solares e aplicações críticas." image="/linha-estacionarias copiar.webp" featuredImage revealDelay={0.4} />
          </div>
        </section>

        <section className="partnership section">
          <span className="partnership-mobile-eyebrow eyebrow">Parceria de verdade</span>
          <div className="partnership-art"><NextImage src="/sol-drive-02.jpg" alt="Fachada da Sol Distribuidora e frota própria" fill sizes="(max-width: 780px) 100vw, 50vw" unoptimized /><div className="photo-caption"><NextImage src="/sol-symbol-white-crop.png" alt="" width={695} height={166} sizes="92px" unoptimized /><span>Estrutura e Logística Própria</span></div></div>
          <div className="partnership-copy"><SectionTitle eyebrow="Parceria de verdade" title={<>Mais do que distribuir.<br /><em>Impulsionamos os seus resultados.</em></>} />
            <p>Da escolha do produto ao pós-venda, nossa equipe está ao lado da sua empresa com conhecimento técnico, agilidade e transparência.</p>
            <ul><li><Icon name="check" /> Consultoria comercial especializada</li><li><Icon name="check" /> Suporte depois da compra</li><li><Icon name="check" /> Estrutura e Logística Própria</li></ul>
            <Link className="button blue" href="/sobre-nos">Conheça a Sol <Icon name="arrow" /></Link>
          </div>
        </section>

        <PartnerTestimonials />
      </div>
    </div>
  </Shell>;
}

function SolutionCard({ href, title, text, image, featuredImage = false, revealDelay = 0 }: { href: string; title: string; text: string; image: string; featuredImage?: boolean; revealDelay?: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      card.classList.add("is-visible");
      return;
    }
    let timeout = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      timeout = window.setTimeout(() => card.classList.add("is-visible"), revealDelay * 1000);
      observer.disconnect();
    }, { threshold: 0.18 });
    observer.observe(card);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [revealDelay]);

  return <Link ref={cardRef} href={href} className={`solution-card solution-card-reveal${featuredImage ? " solution-card-featured" : ""}`}><div className="card-head"><Icon name="arrow" /></div><div className="product-image"><NextImage src={image} alt="" width={1035} height={553} sizes="(max-width: 780px) 112px, 33vw" unoptimized /></div><h3>{title}</h3><p>{text}</p><b>Explorar linha</b></Link>;
}

function Cta() {
  return <section className="cta section"><span className="eyebrow light">Vamos conversar?</span><h2>Energia certa.<br /><em>Parceria que cresce.</em></h2><p>Fale com nosso time e encontre a melhor solução para o seu negócio.</p><a className="button yellow" href={WHATSAPP} target="_blank" rel="noreferrer">Fale com um especialista <Icon name="arrow" /></a></section>;
}

function PartnerTestimonials() {
  const testimonials = [
    "/Avaliações/Avaliação Auto Bats.webp",
    "/Avaliações/Avaliação Euro.webp",
    "/Avaliações/Avaliação Toninho.webp",
  ];
  return <section className="testimonials section">
    <span className="eyebrow testimonial-heading">O que nossos parceiros falam sobre nós</span>
    <div className="testimonial-grid">{testimonials.map((image, index) => <TestimonialCard image={image} index={index} key={image} />)}</div>
    <a className="button yellow" href={WHATSAPP} target="_blank" rel="noreferrer">Se torne um parceiro <Icon name="arrow" /></a>
  </section>;
}

function TestimonialCard({ image, index }: { image: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      card.classList.add("is-visible");
      return;
    }
    let timeout = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      timeout = window.setTimeout(() => card.classList.add("is-visible"), index * 200);
      observer.disconnect();
    }, { threshold: 0.18 });
    observer.observe(card);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [index]);

  return <div ref={cardRef} className="testimonial-card testimonial-card-reveal"><NextImage src={image} alt={`Depoimento de parceiro Sol ${index + 1}`} width={498} height={322} sizes="(max-width: 780px) 75vw, 25vw" unoptimized /></div>;
}

const clean = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const BRAND_ORDER: Product["brand"][] = ["Freedom", "Heliar", "eCON", "eCON VRLA", "Bluetti"];

function productNiche(product: Product) {
  if (product.brand === "Heliar") {
    if (product.model === "HEFB225TD" || product.model === "HEFB225TE") return "Frota";
    if (product.model.startsWith("HAGM")) return "AGM Tech";
    if (product.model.startsWith("HEFB")) return "EFB Tech";
    if (/^(HS?100|HS?150|HS?180|HT180)/.test(product.model)) return "Frota";
    return "SLI Tech";
  }
  if (product.brand === "eCON") {
    if (PRODUCT_SPECS[productSpecKey(product.brand, product.model)]?.technology === "Frota") return "Frota";
    if (product.model.startsWith("EGM")) return "AGM";
    if (product.model.startsWith("EFB")) return "EFB";
    return "SLI";
  }
  if (product.brand === "Bluetti") return product.segment === "solar" ? "Painéis solares" : "Estações de energia";
  return segmentLabel(product.segment);
}

function BrandCarousel({ brand, products }: { brand: Product["brand"]; products: Product[] }) {
  const hasFilter = brand === "Heliar" || brand === "eCON" || brand === "Bluetti";
  const [selectedNiche, setSelectedNiche] = useState("Todos");
  const niches = [...new Set(products.map(productNiche))];
  const activeNiche = niches.includes(selectedNiche) ? selectedNiche : "Todos";
  const visibleProducts = activeNiche === "Todos" ? products : products.filter((product) => productNiche(product) === activeNiche);
  const headingId = `brand-${brand.toLowerCase().replace(/\s+/g, "-")}`;
  if (!products.length) return null;

  return <section className="brand-carousel" aria-labelledby={headingId}>
    <div className="brand-carousel-heading">
      <h2 id={headingId}>{brand}</h2>
      {hasFilter && <label className="brand-filter"><span>Tipo de produto</span><select value={activeNiche} onChange={(event) => setSelectedNiche(event.target.value)} aria-label={`Filtrar produtos ${brand} por tipo`}><option>Todos</option>{niches.map((niche) => <option key={niche}>{niche}</option>)}</select></label>}
    </div>
    <div className="product-carousel-track" role="region" aria-label={`Produtos ${brand}`} tabIndex={0}>
      {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
    <p className="carousel-hint">Deslize para ver mais produtos.</p>
  </section>;
}

function ProductCarousels({ products }: { products: Product[] }) {
  return <div className="product-carousels">{BRAND_ORDER.map((brand) => <BrandCarousel key={brand} brand={brand} products={products.filter((product) => product.brand === brand)} />)}</div>;
}

function CatalogCategorySection({ id, eyebrow, title, text, products }: { id: string; eyebrow: string; title: string; text: string; products: Product[] }) {
  if (!products.length) return null;
  return <section id={id} className="catalog-category-section" aria-labelledby={`${id}-title`}>
    <div className="catalog-category-heading"><span className="eyebrow">{eyebrow}</span><h2 id={`${id}-title`}>{title}</h2><p>{text}</p></div>
    <ProductCarousels products={products} />
  </section>;
}

function Catalog({ title = "Nosso portfólio", intro = "Encontre a solução certa para o seu negócio.", filter, heroVideo = false }: { title?: string; intro?: string; filter?: string; heroVideo?: boolean }) {
  const [search, setSearch] = useState("");
  const list = useMemo(() => PRODUCTS.filter((product) => {
    const matchesFilter = !filter || product.segment === filter || product.brand === filter;
    return matchesFilter && clean(`${product.brand} ${product.model} ${segmentLabel(product.segment)}`).includes(clean(search));
  }), [search, filter]);
  const automotiveProducts = list.filter((product) => product.segment === "automotiva" || product.segment === "moto");
  const stationaryProducts = list.filter((product) => product.segment === "estacionaria");
  const energyProducts = list.filter((product) => product.segment === "energia" || product.segment === "solar");
  return <Shell>
    <section className={`page-hero compact${heroVideo ? " solutions-hero" : ""}`}>{heroVideo && <video className="solutions-hero-video" autoPlay muted playsInline preload="auto" aria-hidden="true"><source src="/hero-solucoes.mp4" type="video/mp4" /></video>}<span className="eyebrow light">Portfólio Sol</span><h1>{title}</h1><p>{intro}</p></section>
    <section className="catalog section">
      {heroVideo && <nav className="catalog-category-links" aria-label="Acesso rápido às categorias"><a href="#catalogo-automotivo"><span>01</span><strong>Baterias automotivas</strong><small>Veículos leves e pesados</small><Icon name="arrow" /></a><a href="#catalogo-estacionario"><span>02</span><strong>Baterias estacionárias</strong><small>Backup, telecom e aplicações críticas</small><Icon name="arrow" /></a><a href="#catalogo-energia"><span>03</span><strong>Estações de energia</strong><small>Energia portátil e solar</small><Icon name="arrow" /></a></nav>}
      <div className="catalog-tools"><div><strong>{list.length}</strong><span> soluções encontradas</span></div><label><span>{filter ? "Buscar nesta categoria por marca ou modelo" : "Buscar em todo o catálogo por marca ou modelo"}</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={filter ? "Ex.: Heliar, DF1500…" : "Ex.: Heliar, DF1500, Bluetti…"} /></label></div>
      {heroVideo ? <div className="catalog-category-sections">
        <CatalogCategorySection id="catalogo-automotivo" eyebrow="Mobilidade" title="Baterias automotivas" text="Soluções para veículos leves e pesados." products={automotiveProducts} />
        <CatalogCategorySection id="catalogo-estacionario" eyebrow="Energia contínua" title="Baterias estacionárias" text="Soluções para backup, telecom, nobreaks e aplicações críticas." products={stationaryProducts} />
        <CatalogCategorySection id="catalogo-energia" eyebrow="Autonomia" title="Estações de energia" text="Estações portáteis e painéis solares para uso dentro e fora da rede." products={energyProducts} />
      </div> : <ProductCarousels products={list} />}
      {!list.length && <div className="empty">Nenhum produto encontrado. Tente outro termo.</div>}
    </section>
    <Cta />
  </Shell>;
}

function StationaryCatalog() {
  return <Catalog title="Baterias estacionárias" intro="Linhas profissionais organizadas por marca para facilitar a escolha da solução ideal." filter="estacionaria" />;
}

type BluettiComparisonModel = { slug: string; model: string; watts: number; wattHours: number; powerLiftingWatts: number; surgeWatts?: number; modeNote?: string };
const BLUETTI_COMPARISON: BluettiComparisonModel[] = [
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

const formatEnergy = (value: number) => new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(value);

function ComparisonMetric({ label, metric, unit, first, second }: { label: string; metric: "watts" | "powerLiftingWatts" | "wattHours"; unit: "W" | "Wh"; first: BluettiComparisonModel; second?: BluettiComparisonModel }) {
  const firstValue = first[metric];
  const secondValue = second?.[metric];
  const hasComparison = secondValue !== undefined;
  const maximum = hasComparison ? Math.max(firstValue, secondValue) : firstValue;
  const absolute = hasComparison ? secondValue - firstValue : 0;
  const percentage = firstValue ? (absolute / firstValue) * 100 : 0;
  const direction = absolute === 0 ? "igual" : absolute > 0 ? "mais" : "menos";

  return <article className={`comparison-metric ${hasComparison ? "is-complete" : "is-single"}`}>
    <div className="comparison-metric-heading"><span>{label}</span>{hasComparison && <strong>{absolute === 0 ? "Mesma medida" : `${formatEnergy(Math.abs(percentage))}% ${direction}`}</strong>}</div>
    <div className="comparison-row">
      <div><b>{first.model}</b><span>{formatEnergy(firstValue)} {unit}</span></div>
      <div className="comparison-bar" aria-hidden="true"><i style={{ width: `${(firstValue / maximum) * 100}%` }} /></div>
    </div>
    <div className={`comparison-expansion${hasComparison ? " is-open" : ""}`} aria-hidden={!hasComparison}>
      <div className="comparison-expansion-inner">
        {second && secondValue !== undefined && <>
          <div className="comparison-row comparison-row-reveal">
            <div><b>{second.model}</b><span>{formatEnergy(secondValue)} {unit}</span></div>
            <div className="comparison-bar" aria-hidden="true"><i style={{ width: `${(secondValue / maximum) * 100}%` }} /></div>
          </div>
          <p className="comparison-detail-reveal">{absolute === 0 ? `As duas estações entregam ${formatEnergy(firstValue)} ${unit}.` : <><b>{second.model}</b> tem {formatEnergy(Math.abs(absolute))} {unit} {direction} que <b>{first.model}</b>.</>}</p>
        </>}
      </div>
    </div>
  </article>;
}

function BluettiComparison({ initialSlug }: { initialSlug: string }) {
  const [firstSlug, setFirstSlug] = useState(initialSlug);
  const [secondSlug, setSecondSlug] = useState("");
  const first = BLUETTI_COMPARISON.find((station) => station.slug === firstSlug) ?? BLUETTI_COMPARISON[0];
  const second = BLUETTI_COMPARISON.find((station) => station.slug === secondSlug);

  return <section className="bluetti-comparison" aria-labelledby="bluetti-comparison-title">
    <div className="bluetti-comparison-intro">
      <span className="eyebrow light">Compare as estações</span>
      <h2 id="bluetti-comparison-title">Potência e capacidade,<br /><em>lado a lado.</em></h2>
      <p>Compare potência contínua, Power Lifting para cargas compatíveis e capacidade de energia. A autonomia não é calculada nesta comparação.</p>
    </div>
    <div className="comparison-controls">
      <label><span>Primeira estação</span><select value={firstSlug} onChange={(event) => setFirstSlug(event.target.value)}>{BLUETTI_COMPARISON.map((station) => <option value={station.slug} key={station.slug} disabled={station.slug === secondSlug}>{station.model}</option>)}</select></label>
      <span className="comparison-versus">VS</span>
      <label><span>Segunda estação</span><select value={secondSlug} onChange={(event) => setSecondSlug(event.target.value)}><option value="" disabled>Escolha uma estação</option>{BLUETTI_COMPARISON.map((station) => <option value={station.slug} key={station.slug} disabled={station.slug === firstSlug}>{station.model}</option>)}</select></label>
    </div>
    <div className="comparison-results" aria-live="polite">
      <ComparisonMetric label="Potência contínua" metric="watts" unit="W" first={first} second={second} />
      <ComparisonMetric label="Power Lifting" metric="powerLiftingWatts" unit="W" first={first} second={second} />
      <ComparisonMetric label="Capacidade de energia" metric="wattHours" unit="Wh" first={first} second={second} />
    </div>
    {second ? <p className="comparison-note">A porcentagem usa a primeira estação como base. O Power Lifting é um modo para cargas resistivas compatíveis; não equivale à potência contínua nem ao surto instantâneo. A capacidade em Wh representa energia armazenada, não autonomia. {first.modeNote} {second.modeNote}</p> : <p className="comparison-note comparison-prompt">Escolha a segunda estação para completar a comparação. O Power Lifting não altera a saída contínua e depende da carga compatível.{first.modeNote ? ` ${first.modeNote}` : ""}</p>}
  </section>;
}

function BluettiCatalog() {
  const [search, setSearch] = useState("");
  const stations = useMemo(() => PRODUCTS.filter((product) => product.brand === "Bluetti" && product.segment === "energia" && clean(`${product.brand} ${product.model}`).includes(clean(search))), [search]);
  const panels = useMemo(() => PRODUCTS.filter((product) => product.brand === "Bluetti" && product.segment === "solar" && clean(`${product.brand} ${product.model}`).includes(clean(search))), [search]);
  const total = stations.length + panels.length;
  return <Shell>
    <section className="page-hero compact"><span className="eyebrow light">Portfólio Bluetti</span><h1>Energia portátil e solar</h1><p>Estações de energia e painéis solares para autonomia, mobilidade e novas oportunidades de negócio.</p></section>
    <section className="stationary-catalog section">
      <div className="catalog-tools"><div><strong>{total}</strong><span> soluções encontradas</span></div><label><span>Buscar nesta categoria por modelo</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ex.: AC70P, Elite 300, Sora 130…" /></label></div>
      {!!stations.length && <div className="catalog-group"><div className="catalog-group-heading"><span className="eyebrow">Energia portátil</span><h2>Estações de energia</h2><p>Soluções Bluetti para backup, mobilidade e operações dentro e fora da rede.</p></div><div className="product-grid">{stations.map((product) => <ProductCard key={product.id} product={product} />)}</div></div>}
      {!!panels.length && <div className="catalog-group bluetti-solar-group"><div className="catalog-group-heading"><span className="eyebrow">Geração solar</span><h2>Painéis solares</h2><p>Painéis portáteis para captar energia solar e ampliar a autonomia das estações Bluetti.</p></div><div className="product-grid">{panels.map((product) => <ProductCard key={product.id} product={product} />)}</div></div>}
      {!total && <div className="empty">Nenhum produto encontrado. Tente outro termo.</div>}
    </section>
    <Cta />
  </Shell>;
}

// Only the latest product click may position the destination before it is painted.
// Do not leave scrolling to the router's asynchronous navigation completion.
let pendingProductScroll: string | null = null;

function ProductLink({ productSlug, ...props }: Omit<ComponentProps<typeof Link>, "href" | "scroll" | "onNavigate"> & { productSlug: string }) {
  return <Link {...props} href={`/${productSlug}`} scroll={false} onNavigate={() => { pendingProductScroll = productSlug; }} />;
}

const LEGACY_CARD_ASSETS: Record<string, string> = {
  "econ-vrla-ep12-5": "secpower-sp12-5",
  "econ-vrla-ep12-7w": "secpower-sp12-7s",
  "econ-vrla-ep12-7": "secpower-sp12-9",
  "econ-vrla-ep12-9": "secpower-sp12-12",
  "econ-vrla-ep12-12": "secpower-sp12-18",
};

function productCardImage(product: Product) {
  const assetSlug = product.slug === "freedom-df300" ? "elementor-601" : product.slug === "freedom-df2000" ? "freedom-df1000-copy" : LEGACY_CARD_ASSETS[product.slug] ?? product.slug;
  return `/product-card-images/${assetSlug}.${product.slug === "heliar-he45be" ? "png" : "webp"}`;
}

function ProductCard({ product }: { product: Product }) {
  const image = PRODUCT_IMAGES[product.slug];
  const isBattery = product.segment !== "energia" && product.segment !== "solar";
  const cardImage = isBattery ? productCardImage(product) : image;
  return <ProductLink productSlug={product.slug} className="product-card" data-product-slug={product.slug} data-product-name-style={isBattery ? "code" : undefined}><span className="product-brand">{product.brand}</span>{image ? <div className={`product-art real${isBattery ? " battery-product-art" : ""}${product.brand === "Heliar" ? " heliar-product-art" : ""}`} style={heliarImageStyle(product)}><img src={cardImage} alt={product.model} /></div> : <div className={`product-art ${product.segment}`}><i /><i /><b>{product.model.slice(0, 8)}</b></div>}<h3>{product.model}</h3><p>{segmentLabel(product.segment)}</p><span className="card-link">Ver solução <Icon name="arrow" /></span></ProductLink>;
}

function segmentLabel(segment: Product["segment"]) {
  return { estacionaria: "Bateria estacionária", automotiva: "Bateria automotiva", moto: "Bateria para motocicleta", energia: "Estação de energia", solar: "Painel solar" }[segment];
}

function HeliarCatalog() {
  const [search, setSearch] = useState("");
  const products = useMemo(() => PRODUCTS.filter((product) => product.brand === "Heliar" && clean(`${product.brand} ${product.model}`).includes(clean(search))), [search]);
  const categories = [
    ["SLI", "Baterias convencionais para diferentes aplicações automotivas.", (product: Product) => productNiche(product) === "SLI Tech"],
    ["EFB", "Tecnologia EFB para demandas específicas de veículos.", (product: Product) => productNiche(product) === "EFB Tech"],
    ["AGM", "Linha AGM para maior desempenho e exigência elétrica.", (product: Product) => productNiche(product) === "AGM Tech"],
    ["Frota", "Baterias para veículos pesados e operações comerciais, conforme a aplicação de cada código.", (product: Product) => productNiche(product) === "Frota"],
  ] as const;
  return <Shell>
    <section className="page-hero compact"><span className="eyebrow light">Portfólio Heliar</span><h1>Baterias automotivas</h1><p>A linha Heliar reúne baterias SLI convencionais, EFB, AGM e opções para veículos pesados. A tecnologia adequada depende da especificação do veículo: SLI para aplicações convencionais; EFB e AGM para veículos equipados e compatíveis com essas construções; Frota para aplicações comerciais correspondentes.</p></section>
    <section className="stationary-catalog section heliar-catalog">
      <div className="catalog-tools"><div><strong>{products.length}</strong><span> soluções encontradas</span></div><label><span>Buscar nesta categoria por modelo</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ex.: H40JD, HAGM60HD, H100LE…" /></label></div>
      {categories.map(([name, description, matches]) => { const list = products.filter(matches); return !!list.length && <div className="catalog-group" key={name}><div className="catalog-group-heading"><span className="eyebrow">Linha Heliar</span><h2>{name}</h2><p>{description}</p></div><div className="product-grid">{list.map((product) => <ProductCard key={product.id} product={product} />)}</div></div>; })}
      {!products.length && <div className="empty">Nenhum produto encontrado. Tente outro termo.</div>}
    </section>
    <Cta />
  </Shell>;
}

function EconCatalog() {
  const [search, setSearch] = useState("");
  const products = useMemo(() => PRODUCTS.filter((product) => product.brand === "eCON" && clean(`${product.brand} ${product.model}`).includes(clean(search))), [search]);
  const categories = [
    ["Convencional (SLI)", "Para veículos de uso diário que utilizam bateria convencional. Compare capacidade, corrente de partida e dimensões antes da substituição.", (product: Product) => productNiche(product) === "SLI"],
    ["EFB", "Construção aprimorada para veículos com start-stop leve, conforme a especificação de cada aplicação.", (product: Product) => productNiche(product) === "EFB"],
    ["AGM", "Tecnologia para veículos com alto consumo elétrico e sistemas start-stop compatíveis.", (product: Product) => productNiche(product) === "AGM"],
    ["Frota", "Modelos destinados a aplicações comerciais. A escolha depende do veículo, da montagem e do código correto.", (product: Product) => productNiche(product) === "Frota"],
  ] as const;
  return <Shell>
    <section className="page-hero compact"><span className="eyebrow light">eCON Automotive na Sol</span><h1>Baterias automotivas eCON</h1><p>Uma marca criada para conectar experiência no mercado automotivo, distribuição e escolha técnica. Na Sol, você encontra linhas convencionais, EFB, AGM e Frota para compor seu portfólio conforme a aplicação de cada veículo.</p></section>
    <section className="econ-brand-intro section"><div><span className="eyebrow">Energia nos conecta</span><h2>Uma marca para as <em>novas demandas.</em></h2></div><div><p>A eCON Automotive nasceu do grupo Conecta, formado por empresas com longa atuação no segmento de manutenção automotiva e uma rede própria de distribuição. A Sol integra essa rede no Paraná e apoia revendas na seleção da tecnologia e do código adequados a cada veículo.</p><p>O portfólio automotivo combina a linha convencional com opções EFB e AGM. A família Frota atende aplicações comerciais com modelos próprios. Cada linha tem uma função; a indicação final depende da especificação do veículo.</p><small>Fontes: <a href="https://econautomotive.com.br/" target="_blank" rel="noreferrer">eCON Automotive</a>, <a href="https://econautomotive.com.br/produtos/" target="_blank" rel="noreferrer">linhas de produtos</a> e <a href="https://econautomotive.com.br/distribuidores/" target="_blank" rel="noreferrer">rede de distribuidores</a>.</small></div></section>
    <section className="stationary-catalog section econ-catalog">
      <div className="catalog-tools"><div><strong>{products.length}</strong><span> soluções encontradas</span></div><label><span>Buscar nesta categoria por modelo</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ex.: EGM60HD-24, EFB50GD-24, E45BD-18…" /></label></div>
      {categories.map(([name, description, matches]) => { const list = products.filter(matches); return !!list.length && <div className="catalog-group" key={name}><div className="catalog-group-heading"><span className="eyebrow">Linha eCON</span><h2>{name}</h2><p>{description}</p></div><div className="product-grid">{list.map((product) => <ProductCard key={product.id} product={product} />)}</div></div>; })}
      {!products.length && <div className="empty">Nenhum produto encontrado. Tente outro termo.</div>}
    </section>
    <Cta />
  </Shell>;
}

function BrandGridCatalog({ brand, eyebrow, title, intro }: { brand: Product["brand"]; eyebrow: string; title: string; intro: string }) {
  const [search, setSearch] = useState("");
  const products = useMemo(() => PRODUCTS.filter((product) => product.brand === brand && clean(`${product.brand} ${product.model}`).includes(clean(search))), [brand, search]);
  return <Shell>
    <section className="page-hero compact"><span className="eyebrow light">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></section>
    <section className="stationary-catalog section brand-grid-catalog">
      <div className="catalog-tools"><div><strong>{products.length}</strong><span> soluções encontradas</span></div><label><span>Buscar nesta categoria por modelo</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Ex.: ${products[0]?.model ?? "produto"}…`} /></label></div>
      {!!products.length && <div className="catalog-group"><div className="catalog-group-heading"><span className="eyebrow">Linha {brand}</span><h2>Produtos</h2><p>{intro}</p></div><div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></div>}
      {!products.length && <div className="empty">Nenhum produto encontrado. Tente outro termo.</div>}
    </section>
    <Cta />
  </Shell>;
}

type BluettiContent = { datasheet: [string, string][]; intro: string; advantages: [string, string][]; summary: string };
const ELITE_200_V2_REFERENCE: [string, string][] = [
  ["Saída nominal", "2.600 W contínuos; potência de pico de 3.900 W. Power Lifting até 3.900 W para cargas puramente resistivas; a saída real permanece limitada a 2.600 W."],
  ["Capacidade", "2.073,6 Wh."],
  ["Entradas e recarga", "Manual de referência EU: entrada CA até 2.300 W, solar até 1.000 W (12–60 V, 20 A), entrada combinada CA+CC até 2.400 W; recarga a 80% em cerca de 1,1 h, conforme as condições do manual."],
  ["Saídas", "Versão EU de referência: 2 tomadas CA; a configuração regional vendida pela Sol foi confirmada como equivalente."],
  ["UPS", "Comutação de até 15 ms."],
  ["Tecnologia", "Bateria LiFePO₄; gestão AI-BMS."],
  ["Dimensões e peso", "350 × 250 × 323,6 mm; 24,2 kg."],
  ["Garantia", "5 anos."],
];
const AC200PL_REFERENCE: [string, string][] = [
  ["Saída nominal", "2.400 W contínuos."],
  ["Power Lifting", "Até 3.600 W para cargas compatíveis; não é a potência nominal contínua."],
  ["Potência de pico", "2.500 W."],
  ["Capacidade", "2.304 Wh; compatível com baterias de expansão B210P, B230 e B300."],
  ["Entradas e saídas", "Entrada CA de até 2.400 W e solar de até 1.200 W; 4 tomadas CA de 120 V, 2 portas USB-C de até 100 W, 2 portas USB-A de até 18 W, saídas CC de 12 V e 48 V e 2 bases de carregamento sem fio de até 15 W."],
  ["Dimensões e peso", "420 × 280 × 366,5 mm; aproximadamente 28,8 kg."],
  ["Garantia", "5 anos."],
];
const BLUETTI_CONTENT: Partial<Record<string, BluettiContent>> = {
  "bluetti-ac50": { datasheet: [["Saída contínua", "700 W, com modo Power Lifting de até 1.000 W."], ["Capacidade", "448 Wh."], ["Entradas e recarga", "Entrada CA de até 580 W e solar de até 200 W. Recarga CA: cerca de 45 min até 80% e 70 min até 100%; solar: cerca de 2,7 h; veículo: 4,9 h em 12 V ou 2,7 h em 24 V."], ["Saídas / compatibilidade", "1 tomada CA de 700 W; 2 USB-C de até 65 W cada; 1 USB-A de 15 W; 1 porta veicular de 12 V/10 A (120 W)."], ["Tecnologia e segurança", "LiFePO4, mais de 3.000 ciclos até 80%, BMS, controlador MPPT, recarga pass-through e UPS com comutação de até 20 ms."], ["Dimensões e peso", "280 x 200 x 220 mm; 7,5 kg."], ["Garantia", "5 anos."]], intro: "A AC50 entrega 448 Wh e 700 W para acampamentos, viagens de carro, lazer ao ar livre e backup de itens essenciais com bom equilíbrio entre autonomia e peso.", advantages: [["Potência versátil", "opera eletrônicos e pequenos eletrodomésticos, com margem adicional para cargas resistivas."], ["Recarga em várias fontes", "aceita tomada, painel solar, veículo, gerador, bateria B80 e combinações de entrada."], ["Portas úteis no dia a dia", "USB-C, USB-A, CA e saída automotiva atendem equipamentos diversos."], ["Gestão inteligente", "o BMS e o MPPT otimizam proteção, carga e aproveitamento da energia."], ["Backup rápido", "a função UPS reduz interrupções em roteadores, iluminação e eletrônicos compatíveis."]], summary: "A AC50 permanece uma solução portátil robusta, segura e simples de recarregar." },
  "bluetti-ac50p": { datasheet: [["Saída contínua", "700 W, com modo Power Lifting de até 1.200 W."], ["Capacidade", "504 Wh."], ["Entradas e recarga", "Entrada CA Turbo de 600 W e solar de até 200 W. Recarga CA: 50 min até 80% e 80 min até 100%; solar: cerca de 2,7 h; veículo: 4,9 h em 12 V ou 2,7 h em 24 V."], ["Saídas / compatibilidade", "1 tomada CA de 700 W; 2 USB-C de 65 W; 1 USB-A de 15 W; 1 porta veicular de 12 V/10 A (120 W) e 1 base de carregamento sem fio de 15 W."], ["Tecnologia e segurança", "LiFePO4, mais de 3.000 ciclos até 80%, BMS, MPPT, recarga pass-through e UPS com comutação de até 20 ms."], ["Dimensões e peso", "280 x 200 x 220 mm; 6,9 kg."], ["Garantia", "5 anos."]], intro: "A AC50P entrega 504 Wh e 700 W em um conjunto compacto, adequado para camping, viagens, pequenos escritórios móveis e reserva doméstica de curta duração.", advantages: [["Capacidade ampliada", "os 504 Wh oferecem mais tempo de uso para iluminação, refrigeração portátil e eletrônicos."], ["Power Lifting", "até 1.200 W para determinadas cargas resistivas amplia os cenários de uso."], ["Carga rápida em tomada", "atinge 80% em aproximadamente 50 minutos."], ["Energia solar compatível", "a entrada de 200 W facilita autonomia fora da rede."], ["Vida útil prolongada", "química LFP e mais de 3.000 ciclos favorecem uso frequente com segurança."]], summary: "O conjunto privilegia mobilidade, flexibilidade de recarga e confiabilidade para rotinas externas ou emergenciais." },
  "bluetti-ac70p": { datasheet: [["Saída contínua", "1.000 W; modo Power Lifting de até 2.000 W."], ["Capacidade", "864 Wh."], ["Entradas e recarga", "Entrada CA de até 950 W, solar de até 500 W (12-58 V, 10 A) e veículo 12/24 V. Recarga CA em cerca de 1,5-2 h; solar em 2,2-2,7 h; veículo em 9,1-9,6 h (12 V) ou 4,8-5,3 h (24 V)."], ["Saídas / compatibilidade", "2 tomadas CA, com 1.000 W totais; 2 USB-C de 100 W; 2 USB-A de 12 W; porta veicular de 12 V/10 A; e carregamento sem fio de 15 W."], ["Tecnologia e segurança", "LiFePO4, mais de 3.000 ciclos até 80%, onda senoidal pura, BMS, MPPT, recarga pass-through, UPS de 20 ms e certificações UL, CEC, DOE, FCC e CA Prop 65."], ["Dimensões e peso", "314 x 209,5 x 255,8 mm; 10,2 kg."], ["Garantia", "5 anos."]], intro: "Com 864 Wh e 1.000 W, a AC70P atende equipamentos de camping, ferramentas leves, eletrônicos e backup doméstico essencial, mantendo dimensões adequadas ao transporte.", advantages: [["Faixa de uso ampla", "1 kW cobre desde notebooks e TVs até pequenos eletrodomésticos."], ["Entrada solar de 500 W", "permite recuperar energia com rapidez em locais sem rede elétrica."], ["Diversidade de portas", "saídas CA, USB-C, USB-A, automotiva e sem fio reduzem a necessidade de adaptadores."], ["Controle pelo aplicativo", "monitoramento e ajustes remotos facilitam o gerenciamento energético."], ["UPS e bateria LFP", "proteção rápida e longa vida útil aumentam a confiabilidade em emergências."]], summary: "É uma opção intermediária consistente para quem busca autonomia, potência e recarga solar eficiente sem migrar para uma unidade muito pesada." },
  "bluetti-ac180p": { datasheet: [["Saída contínua", "1.800 W, com modo Power Lifting de 2.700 W."], ["Capacidade", "1.440 Wh."], ["Entradas e recarga", "Entrada CA de até 1.440 W no modo Turbo, solar de até 500 W (12-60 V, 10 A) e veículo 12/24 V. Recarga CA em 1,3-1,8 h; solar em 2,8-3,3 h; veículo em 12-12,5 h (12 V) ou 6,3-6,8 h (24 V)."], ["Saídas / compatibilidade", "2 tomadas CA (1.800 W totais; tensão conforme a versão), USB-C de 100 W, dois grupos USB-A de 15 W, porta veicular 12 V/10 A e carregamento sem fio de 15 W."], ["Tecnologia e segurança", "LiFePO4, mais de 3.500 ciclos até 80%, onda senoidal pura, BMS, MPPT, recarga pass-through, controle pelo app e certificações UKCA, PSE, TELEC, RCM, CE, CA65 e UL."], ["Dimensões e peso", "340 x 247 x 317 mm; aproximadamente 16 kg."], ["Garantia", "5 anos."]], intro: "A AC180P reúne 1.440 Wh e 1.800 W para atender eletrodomésticos, equipamentos de viagem, home office e reserva residencial com maior autonomia.", advantages: [["Potência para cargas maiores", "opera uma variedade ampla de aparelhos domésticos e de lazer."], ["Recarga Turbo", "a entrada CA de 1.440 W reduz significativamente o tempo de preparação."], ["Quatro formas de recarga", "tomada, solar, veículo e gerador ampliam a disponibilidade de energia."], ["Nove saídas", "permite alimentar múltiplos dispositivos ao mesmo tempo."], ["Durabilidade", "células LFP e gerenciamento integrado favorecem muitos anos de uso seguro."]], summary: "O modelo equilibra potência elevada, autonomia e portabilidade para viagens longas, trabalho remoto e contingência residencial." },
  "bluetti-premium-100-v2": { datasheet: [["Saída CA", "1.800 W; saída CA+CC de até 2.000 W; modo Power Lifting de 2.700 W."], ["Capacidade", "1.024 Wh."], ["Entradas e recarga", "Entrada CA para carga de até 1.200 W, entrada CC/solar de até 1.000 W (12-60 V, 20 A) e opções CA, solar, veículo, gerador ou CA+solar. A página informa 45 min até 80% e 70 min até 100% por CA; solar em cerca de 70 min."], ["Saídas / compatibilidade", "9 saídas: 2 tomadas CA; 1 porta veicular de 12 V/10 A; 2 DC5521 de 12 V/5 A; 2 USB-A de 15 W; 1 USB-C de 100 W; e 1 USB-C de 140 W."], ["Tecnologia e segurança", "LiFePO4, mais de 4.000 ciclos até 80%, BMS, MPPT, Wi-Fi e Bluetooth, UPS em até 10 ms e operação próxima de 30 dB sob cargas leves."], ["Dimensões e peso", "320 x 215 x 250 mm; 11,5 kg."], ["Garantia", "5 anos."]], intro: "A Premium 100 V2 oferece 1.024 Wh e até 2.000 W combinados em um corpo de 11,5 kg, voltado a camping, viagens, emergências e alimentação de aparelhos domésticos essenciais.", advantages: [["Alta relação potência-peso", "entrega energia suficiente para a maioria dos aparelhos comuns sem exigir um gabinete grande."], ["Solar de 1.000 W", "permite recarga completa em cerca de 70 minutos sob condições ideais."], ["USB-C de 140 W", "carrega notebooks de alto desempenho e eletrônicos modernos com rapidez."], ["UPS de 10 ms", "mantém roteadores, CPAPs e equipamentos sensíveis com mínima interrupção."], ["Bateria para longo prazo", "mais de 4.000 ciclos e química LFP reduzem a necessidade de substituição."]], summary: "É uma estação de 1 kWh especialmente atraente para quem valoriza recarga rápida, baixo peso e conectividade completa." },
  "bluetti-ac200pl": { datasheet: [["Saída contínua", "2.400 W; modo Power Lifting de 3.600 W; potência de pico de 2.500 W."], ["Capacidade expansível", "2.304 Wh; compatível com baterias de expansão B210P, B230 e B300."], ["Entradas e recarga", "Entrada CA Turbo de até 2.400 W, solar de até 1.200 W (12-145 V, 15 A) e veículo 12/24 V. Recarga em cerca de 1,5 h por CA ou 2,5 h com 1.200 W solares, nas condições especificadas."], ["Saídas / compatibilidade", "4 tomadas CA (2.400 W totais; tensão conforme a versão), 2 USB-C de 100 W, 2 USB-A de 18 W, porta veicular 12 V/10 A, saída RV 48 V/8 A e 2 carregadores sem fio de 15 W."], ["Tecnologia e segurança", "LiFePO4, mais de 3.000 ciclos até 80%, onda senoidal pura, BMS, MPPT, recarga pass-through e certificações UN38.3, UL, FCC, IC, CE, RoHS, TELEC, PSE, RCM e LOA."], ["Dimensões e peso", "420 x 280 x 366,5 mm; aproximadamente 28,8 kg."], ["Garantia", "5 anos."]], intro: "A AC200PL combina 2.304 Wh e 2.400 W com expansão por baterias B210P, B230 e B300, sendo indicada para residências, motorhomes, oficinas e períodos prolongados fora da rede.", advantages: [["Capacidade expansível", "2.304 Wh, com expansão por baterias B210P, B230 e B300."], ["Saída de 48 V para RV", "facilita a integração com equipamentos de veículos recreativos."], ["Solar de 1.200 W", "permite recuperar grande quantidade de energia durante o dia."], ["Quatro tomadas CA", "distribui potência entre diferentes cargas com menos adaptadores."], ["Construção de longa duração", "LFP, BMS e conjunto amplo de certificações reforçam segurança e confiabilidade."]], summary: "O modelo atende quem precisa de uma plataforma modular, potente e preparada para autonomia prolongada em casa ou na estrada." },
  "bluetti-elite-200-v2": { datasheet: [["Saída contínua", "2.600 W; modo Power Lifting de 3.900 W; potência de pico de 3.900 W."], ["Capacidade", "2.073,6 Wh."], ["Entradas e recarga", "Entrada CA de até 2.300 W, conforme o manual; solar de até 1.000 W (12-60 V, 20 A); veículo a 96 W em 12 V ou 192 W em 24 V; e entrada combinada CA+CC de até 2.400 W. A página informa 80% em cerca de 1,1 h."], ["Saídas / compatibilidade", "4 tomadas CA na versão US ou 2 tomadas CA na versão EU, com 2.600 W totais; 2 USB-C de 100 W; 2 USB-A de 15 W; e 1 porta veicular de 12 V/10 A. O total de dispositivos simultâneos varia conforme a versão regional, chegando a 9."], ["Tecnologia e segurança", "LiFePO4 de grau automotivo, mais de 6.000 ciclos até 80%, AI-BMS, onda senoidal pura, Wi-Fi e Bluetooth, recarga pass-through e sistema de refrigeração inteligente."], ["Dimensões e peso", "350 x 250 x 323,6 mm; 24,2 kg."], ["Garantia", "5 anos."]], intro: "A Elite 200 V2 oferece 2.073,6 Wh e 2.600 W para viagens de RV, camping, trabalho em campo e backup doméstico, com foco em alta durabilidade e carregamento rápido.", advantages: [["Mais de 6.000 ciclos", "a bateria suporta uso intensivo por muitos anos antes de chegar a 80% da capacidade original."], ["Saída de 2.600 W", "mantém vários equipamentos e eletrodomésticos de alta demanda."], ["TurboBoost", "atinge 80% em aproximadamente 1,1 hora."], ["AI-BMS", "monitora o desempenho da bateria em tempo real e reforça a proteção operacional."], ["Formato relativamente compacto", "entrega mais de 2 kWh em um corpo adequado a transporte em veículo."]], summary: "É uma escolha forte para usuários que precisam de alta potência portátil, longa vida útil e confiabilidade em uso frequente." },
  "bluetti-premium-200-v2": { datasheet: [["Saída contínua", "2.700 W; modo Power Lifting de 3.900 W."], ["Capacidade", "2.073,6 Wh."], ["Entradas e recarga", "Entrada CA de até 2.300 W, conforme a versão regional, e solar de até 1.000 W. Seis formas de recarga: CA, solar, veículo, gerador, bateria chumbo-ácido e CA+solar. A página informa 0-80% em cerca de 1 h com entrada CA de 2.400 W."], ["Saídas / compatibilidade", "4 tomadas CA na versão US ou 2 tomadas CA na versão EU; 2 USB-C de 100 W; 2 USB-A; e saída veicular de 12 V/10 A."], ["Tecnologia e segurança", "Células LiFePO4 de grau automotivo, onda senoidal pura, AI-BMS, proteção contra sobrecorrente, sobretensão e combustão, Wi-Fi/Bluetooth, pass-through e UPS de aproximadamente 15 ms."], ["Dimensões e peso", "350 x 250 x 323,6 mm; 24,2 kg."], ["Garantia", "5 anos."]], intro: "A Premium 200 V2 une 2.073,6 Wh a 2.700 W, oferecendo energia para eletrodomésticos, camping de longa duração, uso fora da rede e contingência residencial.", advantages: [["Saída de 2.700 W", "suporta cargas exigentes e múltiplos aparelhos ao mesmo tempo."], ["Recarga rápida", "atinge 80% em aproximadamente uma hora nas condições anunciadas."], ["Entrada solar de 1.000 W", "favorece autonomia prolongada longe da rede."], ["Seis rotas de recarga", "oferece alternativas úteis em casa, no carro ou em campo."], ["Proteção inteligente", "AI-BMS e células LFP automotivas reforçam segurança e estabilidade."]], summary: "O modelo prioriza potência, recarga flexível e construção robusta para usuários que exigem desempenho elevado sem expansão de bateria." },
  "bluetti-elite-300": { datasheet: [["Saída contínua", "2.400 W; modo Power Lifting e potência de pico de 4.800 W."], ["Capacidade", "3.014,4 Wh."], ["Entradas e recarga", "Entrada CA de até 2.300 W na versão EU ou 1.800 W na versão US; CC/solar de até 1.200 W (12-60 V, 22 A); e entrada combinada CA+CC de até 2.400 W. A página informa cerca de 4,1 h para 100% via solar de 1.200 W."], ["Saídas / compatibilidade", "5 tomadas CA na versão US de 120 V ou 2 tomadas CA na versão brasileira de 220 V; 1 saída de 12 V/30 A; 1 USB-C de 100 W; 1 USB-C de 140 W; 2 USB-A de 15 W; e porta veicular de até 120 W."], ["Tecnologia e segurança", "LiFePO4, mais de 6.000 ciclos até 80%, BMS, Wi-Fi e Bluetooth, UPS em até 10 ms e recarga pass-through."], ["Dimensões e peso", "366 x 305 x 297,5 mm; 26,3 kg."], ["Garantia", "5 anos."]], intro: "A Elite 300 entrega mais de 3 kWh com 2.400 W, voltada a backup residencial, motorhomes, atividades externas e equipamentos de maior consumo que precisam de muitas horas de autonomia.", advantages: [["Grande reserva de energia", "3.014,4 Wh ampliam o tempo de funcionamento de refrigeração, comunicação e iluminação."], ["Porta 12 V/30 A", "alimenta geladeiras automotivas e sistemas de RV com menor perda por conversão."], ["Mais de 6.000 ciclos", "oferece longa vida útil para uso recorrente."], ["UPS de 10 ms", "mantém cargas críticas durante quedas de energia."], ["Controle remoto", "o aplicativo permite monitoramento, agendamentos e ativação por Wi-Fi/Bluetooth."]], summary: "A combinação de alta capacidade, portas específicas para RV e bateria durável torna a Elite 300 uma reserva confiável para casa e estrada." },
  "bluetti-apex-300": { datasheet: [["Saída por unidade", "3.840 W, com modo Power Lifting de 7.680 W."], ["Capacidade modular", "2.764,8 Wh por unidade; sistema escalável até cerca de 100,4 kWh."], ["Entradas e recarga", "Compatível com rede CA, gerador, veículo e solar. A página europeia destaca até 11,52 kW de carga por gerador e até 19,2 kW solar no sistema expandido com SolarX 4K; o tempo de recarga da unidade isolada não é informado em texto na página consultada."], ["Saídas / compatibilidade", "Arquitetura 230 V para cargas domésticas, RV e off-grid, com expansão por hubs e baterias B300K/B500K; a configuração ampliada atende múltiplos circuitos e cargas pesadas."], ["Tecnologia e segurança", "LiFePO4 de segunda geração e grau automotivo, mais de 6.000 ciclos até 80%, vida projetada de 17 anos, alertas climáticos pelo app, UPS de até 20 ms na página europeia e baixo autoconsumo."], ["Dimensões e peso", "525 x 327 x 320 mm; 38 kg (página oficial internacional)."], ["Garantia", "5 anos."]], intro: "A Apex 300 é uma plataforma modular de 2.764,8 Wh e 3.840 W por unidade, criada para backup residencial, motorhomes e instalações off-grid que podem crescer até 100,4 kWh e 11,52 kW.", advantages: [["Expansão em blocos", "permite começar com uma unidade e aumentar capacidade e potência conforme a necessidade."], ["Integração residencial", "pode formar um sistema de backup para circuitos essenciais ou uma solução ampla de casa."], ["Carga solar em grande escala", "a arquitetura aceita expansão solar com SolarX 4K."], ["Bateria de longa vida", "células LFP automotivas e mais de 6.000 ciclos favorecem operação por muitos anos."], ["Automação e alertas", "o aplicativo antecipa eventos climáticos e ajuda a preparar o sistema para interrupções."]], summary: "Mais do que uma estação portátil, a Apex 300 funciona como núcleo de um sistema energético escalável, adequado a projetos de autonomia e backup de maior porte." },
  "bluetti-sora-60": { datasheet: [["Potência máxima", "60 W."], ["Eficiência", "até 24,7%."], ["Potência / capacidade", "60 W; Vmp 23,1 V; Imp 2,58 A; Voc 27,5 V; Isc 2,76 A."], ["Entradas e recarga", "Converte luz solar em energia CC; não possui entrada de recarga própria."], ["Saídas / compatibilidade", "Conector DC5521 e três saídas CC anunciadas; indicado para eletrônicos portáteis e estações compatíveis com os parâmetros elétricos."], ["Tecnologia e segurança", "Células de silício monocristalino, laminação ETFE, eficiência de até 24,7%, resistência a respingos IP65 e operação de -25°C a 65°C."], ["Dimensões e peso", "Aberto: 900 x 424 mm. Fechado: 226 x 210 x 70 mm. Peso: 1,4 kg."], ["Garantia", "1 ano."]], intro: "O SORA 60 fornece 60 W em um painel dobrável de apenas 1,4 kg, pensado para trilhas, camping, viagens e recarga de pequenos dispositivos longe da rede.", advantages: [["Ultraleve", "o peso de 1,4 kg facilita transporte em mochila e uso em movimento."], ["Alta eficiência", "até 24,7% melhora o aproveitamento da área disponível."], ["Formato de oito dobras", "reduz o volume armazenado e agiliza o transporte."], ["ETFE e IP65", "oferece resistência adequada a uso externo e respingos."], ["Múltiplas saídas CC", "permite carregar até três dispositivos compatíveis simultaneamente."]], summary: "É o painel mais móvel da seleção, indicado para quem prioriza baixo peso, montagem simples e energia limpa para eletrônicos essenciais." },
  "bluetti-pv100": { datasheet: [["Potência máxima", "100 W."], ["Eficiência", "até 23,4%."], ["Potência / capacidade", "100 W; Vmp 20,5 V; Imp 4,9 A; Voc 24,6 V; Isc 5,8 A."], ["Entradas e recarga", "Converte luz solar em energia CC; não possui entrada de recarga própria."], ["Saídas / compatibilidade", "Conector MC4 padrão e cabo de 3 m; compatível com a maioria dos geradores solares que aceitam a faixa elétrica do painel."], ["Tecnologia e segurança", "Silício monocristalino, revestimento ETFE, eficiência de até 23,4% e certificações CE, RoHS, PSE, FCC e UKCA."], ["Dimensões e peso", "Aberto: 1.135 x 600 x 4 mm. Fechado: 595 x 565 x 35 mm. Peso: 4,9 kg."], ["Garantia", "2 anos."]], intro: "O PV100D entrega 100 W em um painel dobrável com conector MC4, adequado para camping, viagens, uso diário e recarga solar de estações compatíveis.", advantages: [["Conector MC4", "facilita a integração com diferentes estações e sistemas solares portáteis."], ["ETFE durável", "resiste melhor a UV e ao desgaste do uso externo."], ["Células monocristalinas", "oferecem boa eficiência em uma área compacta."], ["Suportes ajustáveis", "ajudam a posicionar o painel no ângulo mais favorável ao sol."], ["Cabo de 3 metros", "aumenta a flexibilidade para manter a estação à sombra e o painel ao sol."]], summary: "O PV100D é uma opção equilibrada para quem deseja 100 W, conexão padronizada e construção portátil para geração renovável." },
  "bluetti-sora-130": { datasheet: [["Potência máxima", "130 W."], ["Eficiência", "até 25%."], ["Potência / capacidade", "130 W; Vmp 21,6 V; Imp 6,0 A; Voc 25,9 V; Isc 6,9 A."], ["Entradas e recarga", "Converte luz solar em energia CC; não possui entrada de recarga própria."], ["Saídas / compatibilidade", "Conector MC4, compatível com estações portáteis e sistemas que aceitam a tensão e a corrente informadas."], ["Tecnologia e segurança", "Células monocristalinas N-Type, laminação ETFE, eficiência de até 25%, proteção IP67 e operação de -25°C a 65°C."], ["Dimensões e peso", "Aberto: 1.378 x 660 x 3 mm. Fechado: 326 x 352 x 50 mm. Peso: 3,6 kg."], ["Garantia", "12 meses."]], intro: "O SORA 130 combina 130 W, eficiência de até 25% e apenas 3,6 kg. É adequado para camping, veículos, pesca, viagens e apoio solar em emergências domésticas.", advantages: [["Células N-Type", "oferecem alta conversão, menor degradação e desempenho mais estável ao longo do tempo."], ["Baixo peso", "3,6 kg simplificam transporte e montagem."], ["Proteção IP67", "aumenta a confiança em ambientes externos com poeira e respingos."], ["Conexão MC4", "amplia a compatibilidade com estações de energia e sistemas solares."], ["Formato compacto", "fecha em dimensões próximas às de uma caixa de pizza, facilitando armazenamento."]], summary: "O SORA 130 entrega um equilíbrio muito eficiente entre potência, peso, resistência e compatibilidade para geração solar móvel." },
  "bluetti-sora-220": { datasheet: [["Potência máxima", "220 W."], ["Eficiência", "até 25%."], ["Potência / capacidade", "220 W; Vmp 21,6 V; Imp 10,2 A; Voc 25,9 V; Isc 11 A."], ["Entradas e recarga", "Converte luz solar em energia CC; não possui entrada de recarga própria."], ["Saídas / compatibilidade", "Conector MC4 com cabo de extensão de 1,5 m; compatível com estações e sistemas que aceitam seus parâmetros elétricos."], ["Tecnologia e segurança", "Painel monocristalino N-Type/TOPCon com acabamento ETFE, eficiência de até 25%, IP67 e operação de -25°C a 65°C."], ["Dimensões e peso", "Aberto: 1.723 x 838 x 3 mm. Fechado: 415 x 302 x 87 mm. Peso: 5,9 kg."], ["Garantia", "12 meses."]], intro: "O SORA 220 fornece 220 W com até 25% de eficiência em um conjunto dobrável de 5,9 kg, indicado para camping, barcos, quintais, RVs e recarga mais rápida de estações portáteis.", advantages: [["Alta potência por peso", "entrega 220 W mantendo transporte e armazenamento simples."], ["Tecnologia N-Type/TOPCon", "favorece maior conversão e menor degradação do painel."], ["Proteção IP67", "suporta poeira e respingos em uso externo, com conectores mantidos fora d'água."], ["Suporte ajustável", "ângulos entre 30° e 45° ajudam a melhorar a captação solar."], ["MC4 universal", "facilita a conexão com diferentes estações e sistemas de armazenamento."]], summary: "É uma solução de maior potência para quem busca recarga solar eficiente, portátil e resistente sem carregar um painel tradicional pesado." },
};

function ProductGallery({ product, images }: { product: Product; images: string[] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActiveImage((current) => (current + 1) % images.length), 5000);
    return () => window.clearTimeout(timer);
  }, [activeImage, images.length, paused]);

  const showImage = (direction: 1 | -1) => {
    setActiveImage((current) => (current + direction + images.length) % images.length);
  };

  return <div className={`product-gallery product-gallery-${product.segment}`} data-product-slug={product.slug} aria-roledescription="carrossel" aria-label={`Galeria da ${product.brand} ${product.model}`}>
    <img className="product-gallery-image" style={product.slug === "bluetti-premium-100-v2" ? ({ "--premium-100-scale": [1.4, 1.6, 1.7, 1.6, 1.7, 1.6][activeImage] ?? 1.4 } as React.CSSProperties) : undefined} src={images[activeImage]} alt={`${product.brand} ${product.model} — imagem ${activeImage + 1} de ${images.length}`} />
    {images.length > 1 && <><button className="gallery-arrow gallery-arrow-prev" type="button" onClick={() => showImage(-1)} aria-label="Imagem anterior"><span aria-hidden="true">{"\u2190"}</span></button><button className="gallery-arrow gallery-arrow-next" type="button" onClick={() => showImage(1)} aria-label="Próxima imagem"><span aria-hidden="true">{"\u2192"}</span></button><span className="gallery-count">{activeImage + 1} / {images.length}</span><button className="gallery-pause" type="button" onClick={() => setPaused((current) => !current)}>{paused ? "Retomar" : "Pausar"}</button></>}
  </div>;
}

function PowerFrameDiagram() {
  return <figure className="powerframe-diagram">
    <img src="/Imagens%20baterias/Heliar/Webp/powerframe-tecnologia.webp" alt="Grade interna oficial da tecnologia PowerFrame Heliar" />
  </figure>;
}

type HeliarLine = "SLI" | "EFB" | "AGM" | "FROTA" | "FROTA_EFB";

type HeliarLineContent = {
  label: string;
  hero: (capacity: string) => string;
  benefitsTitle: string;
  benefits: Array<["shield" | "energy" | "check" | "truck", string, string]>;
  technologyEyebrow: string;
  technologyTitle: string;
  technologyCopy: string[];
  faqs: Array<[string, string]>;
};

const HELIAR_LINE_CONTENT: Record<HeliarLine, HeliarLineContent> = {
  SLI: {
    label: "Convencional SLI",
    hero: (capacity) => `Bateria convencional de ${capacity} para veículos sem start-stop, com tecnologia PowerFrame nas grades. Consulte a aplicação para o seu veículo.`,
    benefitsTitle: "Diferenciais da linha SLI",
    benefits: [
      ["shield", "Grades resistentes à corrosão", "A tecnologia PowerFrame ajuda a reduzir o desgaste das grades internas."],
      ["energy", "Condução elétrica eficiente", "O desenho das grades favorece a passagem da corrente elétrica."],
      ["check", "Aplicação convencional", "Indicada para veículos sem start-stop, conforme a aplicação do modelo."],
    ],
    technologyEyebrow: "Tecnologia SLI",
    technologyTitle: "Energia para a partida e para o dia a dia",
    technologyCopy: [
      "A Heliar convencional é indicada para veículos sem sistema start-stop, conforme a aplicação recomendada para cada modelo. Combina a tecnologia de grades PowerFrame com uma bateria voltada às necessidades de partida, iluminação e ignição do veículo.",
      "SLI vem de Starting, Lighting and Ignition: partida, iluminação e ignição. Nesta linha, identifica a bateria convencional, voltada a veículos que não exigem as tecnologias EFB ou AGM.",
    ],
    faqs: [
      ["O que significa SLI?", "Na linha Heliar convencional, SLI identifica as funções de Starting, Lighting and Ignition: partida, iluminação e ignição. Ela atende veículos que não exigem tecnologia EFB ou AGM."],
      ["PowerFrame é a mesma coisa que AGM?", "Não. PowerFrame é uma tecnologia aplicada às grades internas. AGM e EFB identificam construções diferentes de bateria."],
      ["Esta bateria é indicada para veículos com start-stop?", "Não. Os veículos com start-stop devem manter a tecnologia EFB ou AGM especificada pela montadora."],
    ],
  },
  EFB: {
    label: "EFB",
    hero: (capacity) => `Bateria EFB de ${capacity} para veículos com start-stop simples ou alternadores inteligentes, com construção preparada para partidas frequentes. Consulte a aplicação para o seu veículo.`,
    benefitsTitle: "Diferenciais da linha EFB",
    benefits: [
      ["check", "Start-stop simples", "Indicada para sistemas start-stop simples e alternadores inteligentes."],
      ["shield", "Construção reforçada", "Placas positivas tratadas, material ativo reforçado e película sintética apoiam partidas frequentes."],
      ["energy", "Maior aceitação de carga", "Preparada para rotinas com partidas e recargas frequentes."],
    ],
    technologyEyebrow: "Tecnologia EFB",
    technologyTitle: "Preparada para partidas frequentes",
    technologyCopy: [
      "A Heliar EFB atende veículos com start-stop simples ou alternadores inteligentes. Também é uma opção para aplicações de uso intenso, como táxis e carros de aplicativo, quando indicada para o veículo. Sua maior aceitação de carga ajuda a atender rotinas com partidas e recargas frequentes.",
      "EFB significa Enhanced Flooded Battery, ou bateria inundada aprimorada. Na Heliar, essa construção reúne tratamento nas placas positivas, reforço do material ativo e uma película sintética para suportar o trabalho repetido de carga e descarga.",
    ],
    faqs: [
      ["O que significa EFB?", "EFB significa Enhanced Flooded Battery, ou bateria inundada aprimorada. Sua construção reforçada é preparada para partidas e recargas frequentes."],
      ["PowerFrame é a mesma coisa que EFB?", "Não. EFB identifica a construção da bateria. PowerFrame é a tecnologia aplicada às grades internas e também está presente nesta linha."],
      ["Posso substituir uma EFB por uma bateria convencional?", "A Heliar orienta manter a tecnologia especificada para o veículo. A troca por uma convencional pode comprometer o start-stop e reduzir a vida útil da bateria."],
    ],
  },
  AGM: {
    label: "AGM",
    hero: (capacity) => `Bateria AGM de ${capacity} para veículos com start-stop avançado ou alta demanda elétrica, preparada para ciclos frequentes e recarga rápida. Consulte a aplicação para o seu veículo.`,
    benefitsTitle: "Diferenciais da linha AGM",
    benefits: [
      ["check", "Start-stop avançado", "Indicada para sistemas avançados e veículos com muitos equipamentos elétricos."],
      ["shield", "Manta de fibra de vidro", "O eletrólito absorvido favorece a resistência aos ciclos repetidos de carga e descarga."],
      ["energy", "Ciclos e recarga rápida", "Preparada para aplicações de alta demanda elétrica e recuperação de energia."],
    ],
    technologyEyebrow: "Tecnologia AGM",
    technologyTitle: "Energia para sistemas mais exigentes",
    technologyCopy: [
      "A Heliar AGM foi desenvolvida para veículos com start-stop avançado ou com muitos equipamentos elétricos. Sua tecnologia atende aplicações que exigem ciclos frequentes de carga e descarga e recarga rápida, conforme a especificação da montadora.",
      "AGM significa Absorbent Glass Mat, ou manta de fibra de vidro absorvente. Nessa construção, o eletrólito fica absorvido em mantas de fibra de vidro, favorecendo a resistência aos ciclos repetidos exigidos pelo start-stop avançado.",
    ],
    faqs: [
      ["O que significa AGM?", "AGM significa Absorbent Glass Mat. Nessa construção, o eletrólito fica absorvido em mantas de fibra de vidro para suportar ciclos frequentes de carga e descarga."],
      ["Qual é a diferença entre AGM e EFB?", "A EFB aprimora a bateria inundada e atende start-stop simples. A AGM utiliza manta de fibra de vidro e atende start-stop avançado e maior demanda elétrica."],
      ["Posso substituir uma AGM por uma bateria convencional?", "Não é recomendado. A tecnologia especificada pela montadora deve ser mantida para preservar o funcionamento do start-stop e a vida útil da bateria."],
    ],
  },
  FROTA: {
    label: "Frota",
    hero: () => "Bateria Heliar da linha comercial, com grades PowerFrame e construção voltada às exigências do trabalho pesado. Indicada para caminhões, ônibus e máquinas agrícolas, conforme a especificação do veículo.",
    benefitsTitle: "Diferenciais da linha Frota",
    benefits: [
      ["truck", "Resistência para aplicações severas", "Construção com alta absorção de impactos para atender às exigências dos veículos de trabalho."],
      ["shield", "Ancoragem dos blocos de placas", "O sistema de ancoragem contribui para a resistência mecânica da bateria."],
      ["energy", "Grades com tecnologia PowerFrame", "Grades desenvolvidas para resistir à corrosão e favorecer a condução da corrente elétrica."],
    ],
    technologyEyebrow: "Construção Heliar Frota",
    technologyTitle: "Resistência que vem da construção interna",
    technologyCopy: [
      "Na linha Heliar Frota, a ancoragem dos blocos de placas faz parte da construção destinada a aplicações severas. Esse sistema contribui para a resistência mecânica do conjunto, enquanto a alta absorção de impactos é um dos diferenciais apresentados pela fabricante para a linha comercial.",
      "A escolha deve considerar a aplicação, a construção e as especificações do código exato. Recursos como selagem e indicador de carga variam conforme a versão.",
    ],
    faqs: [
      ["Toda bateria Heliar Frota é EFB?", "Não. Frota identifica a aplicação comercial da linha. A tecnologia deve ser consultada na ficha de cada modelo; o portfólio inclui opções convencionais e EFB."],
      ["Todas as baterias da linha são seladas e têm indicador de carga?", "Esses recursos variam conforme a versão. Consulte a ficha do modelo para confirmar a construção e a presença do indicador de carga."],
      ["Como consultar a bateria indicada para minha frota?", "Informe à equipe da Sol o veículo, o modelo e o ano, além do código da bateria instalada, quando disponível. Assim, podemos orientar a consulta de aplicação e disponibilidade."],
    ],
  },
  FROTA_EFB: {
    label: "Frota pesada · EFB",
    hero: () => "",
    benefitsTitle: "Diferenciais da linha Frota EFB",
    benefits: [
      ["truck", "Aplicação comercial pesada", "Tecnologia EFB para veículos comerciais compatíveis com as especificações do modelo."],
      ["energy", "Ciclos de carga e descarga", "A construção EFB foi desenvolvida para rotinas de carga e descarga mais exigentes."],
      ["check", "Escolha pelo código exato", "Confira aplicação, montagem, polaridade e requisitos do fabricante do veículo antes da substituição."],
    ],
    technologyEyebrow: "Tecnologia e aplicação",
    technologyTitle: "EFB para veículos comerciais compatíveis",
    technologyCopy: [
      "A tecnologia EFB foi desenvolvida para suportar rotinas de carga e descarga mais exigentes. Na linha pesada, ela atende veículos comerciais que exigem uma bateria compatível com sua especificação elétrica e com o perfil de uso da frota.",
      "A escolha deve considerar o código da bateria instalada, o espaço de montagem e os requisitos do fabricante do veículo.",
    ],
    faqs: [
      ["EFB é a aplicação correta para qualquer caminhão ou ônibus?", "Não. Confirme a tecnologia e o código especificados para o veículo, além do espaço de montagem, polaridade e requisitos elétricos."],
      ["HEFB225TD e HEFB225TE são o mesmo código?", "Não. TD e TE identificam variantes distintas. Confira o código completo da bateria instalada antes de substituir."],
      ["O que significa EFB?", "EFB significa Enhanced Flooded Battery, ou bateria inundada aprimorada, desenvolvida para suportar rotinas de carga e descarga mais exigentes."],
    ],
  },
};

function heliarLineFor(productSpec: ProductSpec, model?: string): HeliarLine {
  if (model === "HEFB225TD" || model === "HEFB225TE") return "FROTA_EFB";
  const technology = clean(productSpec.technology);
  if (technology.includes("agm")) return "AGM";
  if (technology.includes("efb")) return "EFB";
  if (technology.includes("frota")) return "FROTA";
  return "SLI";
}

function HeliarProductContent({ product, productSpec, line }: { product: Product; productSpec: ProductSpec; line: HeliarLine }) {
  const content = HELIAR_LINE_CONTENT[line];
  const isHs180Td = product.model === "HS180TD";
  const faqs = isHs180Td
    ? content.faqs.map(([question, answer]) => question.startsWith("Todas as baterias")
      ? ["A HS180TD é selada e tem indicador de carga?", "Sim. A documentação da família HS identifica a versão de 180 Ah como selada e equipada com indicador de carga."] as [string, string]
      : [question, answer] as [string, string])
    : content.faqs;
  const technologyCopy = product.model === "HEFB60HD"
    ? [
      "A Heliar HEFB60HD utiliza tecnologia EFB e pode ser aplicada em veículos com start-stop simples ou alternador inteligente, desde que esse código corresponda à especificação do veículo.",
      "Confirme a aplicação pelo código exato antes da substituição. EFB significa Enhanced Flooded Battery, ou bateria inundada aprimorada, com construção voltada a rotinas de carga e descarga mais exigentes.",
    ]
    : content.technologyCopy;
  return <>
    <section id="ficha-tecnica" className="detail section premium-30-overview heliar-line-overview">
      <div className="premium-30-datasheet" data-product-name-style="code"><span className="eyebrow">Especificações</span><h2>{product.model} <em>em detalhes.</em></h2><span className="detail-label">Ficha técnica</span><dl><div><dt>{line === "FROTA" ? "Linha" : "Tecnologia"}</dt><dd>{line === "FROTA" ? "Frota / Comercial" : productSpec.technology}</dd></div>{isHs180Td && <div><dt>Construção</dt><dd>Linha HS selada, com indicador de carga</dd></div>}<div><dt>Tensão</dt><dd>{productSpec.voltage}</dd></div><div><dt>Capacidade</dt><dd>{productSpec.capacity}</dd></div>{productSpec.cca !== "-" && <div><dt>CCA</dt><dd>{productSpec.cca}</dd></div>}{productSpec.reserveCapacity && <div><dt>Reserva de capacidade</dt><dd>{productSpec.reserveCapacity}</dd></div>}{productSpec.dimensions && <div><dt>Dimensões</dt><dd>{productSpec.dimensions}</dd></div>}<div><dt>Peso</dt><dd>{productSpec.weight}</dd></div><div><dt>Garantia</dt><dd>{productSpec.warranty}</dd></div></dl>{(productSpec.sourceNote || productSpec.sourceLinks) && <small className="product-source-note">{productSpec.sourceLinks ? <>{productSpec.sourceNote} {productSpec.sourceLinks.map((source, index) => <span key={source.href}>{index > 0 && " · "}<a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></span>)}</> : productSpec.sourceHref ? <a href={productSpec.sourceHref} target="_blank" rel="noreferrer">{productSpec.sourceNote}</a> : productSpec.sourceNote}</small>}</div>
      <div className="premium-30-advantages heliar-line-benefits"><span className="eyebrow">Benefícios</span><h2>{content.benefitsTitle.split(" da ")[0]} <em>{content.benefitsTitle.includes(" da ") ? `da ${content.benefitsTitle.split(" da ")[1]}.` : "Heliar."}</em></h2><ul>{content.benefits.map(([icon, title, text]) => <li key={title}><Icon name={icon} /><span><strong>{title}</strong>{text}</span></li>)}</ul></div>
    </section>
    <section className={`heliar-line-technology heliar-line-technology-${line.toLowerCase()} section`}><div><span className="eyebrow">{content.technologyEyebrow}</span><h2>{content.technologyTitle}</h2></div><div>{technologyCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{line === "FROTA_EFB" && <p className="product-source-note">Contexto de aplicação: <a href="https://www.heliar.com/blog/heliar-blog/entenda-por-que-onibus-precisam-da-tecnologia-de-bateria-efb-da-heliar" target="_blank" rel="noreferrer">Heliar — EFB em ônibus e veículos pesados</a>.</p>}</div></section>
    <section id="tecnologia-heliar" className="heliar-technology section"><div className="heliar-technology-lead"><PowerFrameDiagram /><div className="heliar-technology-copy"><span className="eyebrow">Tecnologia Heliar</span><h2>PowerFrame: resistência que <em>começa nas grades.</em></h2><p>As baterias Heliar utilizam grades PowerFrame, tecnologia patenteada pela Clarios. O desenho das grades ajuda a resistir à corrosão e favorece o fluxo de energia, reduzindo uma das causas de falha prematura da bateria.</p></div></div><div className="powerframe-performance"><div className="powerframe-performance-list"><article><b>01</b><h4>Durabilidade</h4><p>As grades PowerFrame são projetadas para oferecer resistência à corrosão e desempenho consistente ao longo do uso.</p></article><article><b>02</b><h4>Confiança</h4><p>A menor exposição à corrosão ajuda a preservar a integridade das grades e a reduzir falhas prematuras da bateria.</p></article><article><b>03</b><h4>Performance</h4><p>O desenho da grade aproveita melhor sua área e favorece a condução da corrente elétrica.</p></article><article><b>04</b><h4>Fabricação eficiente</h4><p>O processo de fabricação PowerFrame foi desenvolvido para usar energia e materiais de forma mais eficiente.</p></article></div><p className="powerframe-note">Fonte: <a href="https://www.heliar.com/a-heliar/tecnologia" target="_blank" rel="noreferrer">Tecnologias Heliar</a>. Consulte a documentação técnica do modelo para critérios e condições de ensaio.</p></div></section>
    <section id="duvidas-heliar" className="heliar-faq section"><div><span className="eyebrow">Dúvidas frequentes</span><h2>Antes de escolher sua <em>Heliar.</em></h2><p>A aplicação correta depende do veículo. Nossa equipe ajuda a confirmar a compatibilidade deste modelo.</p></div><div className="heliar-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
  </>;
}

type EconLine = "SLI" | "EFB" | "AGM" | "Frota";
type EconLineContent = {
  label: string;
  hero: (model: string) => string;
  title: string;
  benefits: Array<["shield" | "energy" | "check" | "truck", string, string]>;
  technologyTitle: string;
  technologyCopy: string[];
  faqs: Array<[string, string]>;
};

const ECON_LINE_CONTENT: Record<EconLine, EconLineContent> = {
  SLI: {
    label: "Convencional (SLI)",
    hero: (model) => `A eCON ${model} integra a linha convencional para veículos de uso diário. A escolha deve respeitar a capacidade, a corrente de partida, as dimensões e a aplicação especificadas para o veículo.`,
    title: "Partida e energia para a rotina",
    benefits: [
      ["energy", "Uso diário", "A linha convencional atende veículos que utilizam bateria de partida tradicional."],
      ["shield", "Desempenho consistente", "A construção da família é voltada a partidas e alimentação elétrica no uso cotidiano."],
      ["check", "Escolha pelo código", "Capacidade, corrente de partida e encaixe devem corresponder à aplicação do veículo."],
    ],
    technologyTitle: "A linha convencional da eCON",
    technologyCopy: [
      "A eCON apresenta sua linha convencional como uma solução para partidas e uso diário. Na seleção para reposição, o código exato importa tanto quanto a capacidade: corrente de partida, dimensões e posição dos terminais precisam ser compatíveis com o veículo.",
      "SLI identifica a função de partida, iluminação e ignição. Para veículos que exigem EFB ou AGM, mantenha a tecnologia prevista na especificação de aplicação.",
    ],
    faqs: [
      ["O que significa SLI?", "É a sigla para partida, iluminação e ignição, usada para identificar a bateria automotiva convencional."],
      ["Posso instalar uma convencional no lugar de uma EFB ou AGM?", "Não faça a troca apenas pela capacidade em Ah. Confirme a tecnologia exigida para o veículo e o código de aplicação antes da substituição."],
    ],
  },
  EFB: {
    label: "EFB",
    hero: (model) => `A eCON ${model} pertence à linha EFB, desenvolvida para veículos com start-stop leve compatíveis com esse código. Confirme a aplicação e os requisitos elétricos antes da substituição.`,
    title: "Preparada para partidas frequentes",
    benefits: [
      ["energy", "Start-stop leve", "A família EFB atende veículos com esse sistema quando a tecnologia é a indicada para a aplicação."],
      ["shield", "Construção aprimorada", "A EFB é uma evolução da bateria convencional para uma rotina de carga e descarga mais exigente."],
      ["check", "Compatibilidade primeiro", "O código e as características elétricas devem seguir a especificação do veículo."],
    ],
    technologyTitle: "EFB para a demanda certa",
    technologyCopy: [
      "A eCON posiciona a linha EFB como evolução das baterias convencionais para veículos com start-stop leve. Essa construção responde a uma rotina com partidas e recargas mais frequentes.",
      "EFB significa Enhanced Flooded Battery, ou bateria inundada aprimorada. A escolha entre EFB e AGM não depende apenas da capacidade: deve acompanhar a tecnologia indicada para o veículo.",
    ],
    faqs: [
      ["Para que serve a linha EFB?", "A eCON a apresenta para veículos com start-stop leve. A aplicação precisa corresponder ao código e à especificação do veículo."],
      ["EFB e AGM são equivalentes?", "Não. São construções diferentes. Confirme qual tecnologia o veículo exige antes de escolher a bateria de reposição."],
    ],
  },
  AGM: {
    label: "AGM",
    hero: (model) => `A eCON ${model} integra a linha AGM para veículos compatíveis com sistemas start-stop e maior consumo elétrico. Confira o código e a especificação do veículo antes da instalação.`,
    title: "Energia para sistemas mais exigentes",
    benefits: [
      ["energy", "Maior demanda elétrica", "A família AGM atende veículos modernos com diversos consumidores elétricos."],
      ["shield", "Resistência a ciclos", "A eCON destaca a construção AGM para rotinas de carga e descarga mais intensas."],
      ["check", "Aplicação correta", "A substituição deve preservar a tecnologia e os requisitos elétricos previstos para o veículo."],
    ],
    technologyTitle: "AGM para veículos equipados",
    technologyCopy: [
      "A linha AGM da eCON é voltada a veículos modernos com alto consumo elétrico e sistemas start-stop compatíveis. Sua construção atende uma rotina de ciclos de carga e descarga mais exigente do que a de uma bateria convencional.",
      "AGM significa Absorbent Glass Mat: o eletrólito fica absorvido em mantas de fibra de vidro. Verifique a tecnologia exigida, a corrente de partida e o encaixe do código antes da substituição.",
    ],
    faqs: [
      ["Quando considerar uma bateria AGM?", "Quando a especificação do veículo pedir AGM, especialmente em aplicações com start-stop e maior demanda elétrica."],
      ["Posso substituir uma AGM por uma convencional?", "Não escolha a reposição apenas por Ah ou dimensões. Mantenha a tecnologia especificada para o veículo."],
    ],
  },
  Frota: {
    label: "Frota",
    hero: (model) => `A eCON ${model} integra a linha Frota, destinada a aplicações comerciais. Confirme o código, a montagem e os requisitos elétricos do veículo antes da substituição.`,
    title: "Energia para a operação comercial",
    benefits: [
      ["truck", "Aplicação de frota", "A família reúne códigos para veículos de trabalho e suas diferentes exigências elétricas."],
      ["shield", "Construção para uso exigente", "A eCON posiciona a linha para aplicações comerciais que pedem resistência e confiabilidade."],
      ["check", "Código exato", "Montagem, dimensões e requisitos do veículo precisam ser conferidos antes da indicação."],
    ],
    technologyTitle: "Frota é aplicação, não uma tecnologia única",
    technologyCopy: [
      "A eCON mantém uma família própria para aplicações de frota. Ela reúne baterias para veículos comerciais, cuja escolha deve considerar o perfil de uso e a especificação elétrica do modelo atendido.",
      "A indicação técnica não se resume ao valor de Ah. Compare corrente de partida, dimensões, terminais e código completo para definir uma reposição compatível.",
    ],
    faqs: [
      ["Frota é o mesmo que EFB ou AGM?", "Não. Frota identifica uma família de aplicação comercial. A tecnologia e os dados técnicos devem ser conferidos na ficha do código específico."],
      ["Como escolher o código para minha frota?", "Informe veículo, ano e código da bateria instalada. Nossa equipe pode ajudar a conferir a montagem e os requisitos elétricos antes da cotação."],
    ],
  },
};

function econLineFor(productSpec: ProductSpec): EconLine {
  const technology = clean(productSpec.technology);
  if (technology.includes("frota")) return "Frota";
  if (technology.includes("agm")) return "AGM";
  if (technology.includes("efb")) return "EFB";
  return "SLI";
}

function EconProductContent({ product, productSpec, line }: { product: Product; productSpec: ProductSpec; line: EconLine }) {
  const content = ECON_LINE_CONTENT[line];
  return <>
    <section id="ficha-tecnica" className="detail section premium-30-overview heliar-line-overview econ-line-overview">
      <div className="premium-30-datasheet" data-product-name-style="code"><span className="eyebrow">Especificações</span><h2>{product.model} <em>em detalhes.</em></h2><span className="detail-label">Ficha técnica</span><dl><div><dt>Linha</dt><dd>{content.label}</dd></div><div><dt>Tecnologia</dt><dd>{productSpec.technology}</dd></div><div><dt>Tensão</dt><dd>{productSpec.voltage}</dd></div><div><dt>Capacidade</dt><dd>{productSpec.capacity}</dd></div>{productSpec.cca !== "-" && <div><dt>CCA</dt><dd>{productSpec.cca}</dd></div>}{productSpec.reserveCapacity && <div><dt>Reserva de capacidade</dt><dd>{productSpec.reserveCapacity}</dd></div>}{productSpec.dimensions && <div><dt>Dimensões</dt><dd>{productSpec.dimensions}</dd></div>}<div><dt>Peso</dt><dd>{productSpec.weight}</dd></div><div><dt>Garantia</dt><dd>{productSpec.warranty}</dd></div></dl>{productSpec.sourceNote && <small className="product-source-note">{productSpec.sourceHref ? <a href={productSpec.sourceHref} target="_blank" rel="noreferrer">{productSpec.sourceNote}</a> : productSpec.sourceNote}</small>}</div>
      <div className="premium-30-advantages heliar-line-benefits"><span className="eyebrow">Diferenciais da linha</span><h2>{content.title}</h2><ul>{content.benefits.map(([icon, title, text]) => <li key={title}><Icon name={icon} /><span><strong>{title}</strong>{text}</span></li>)}</ul></div>
    </section>
    <section id="tecnologia-econ" className="heliar-line-technology econ-line-technology section"><div><span className="eyebrow">Tecnologia e aplicação</span><h2>{content.technologyTitle}</h2></div><div>{content.technologyCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className="econ-source-note">Fonte das características da linha: <a href="https://econautomotive.com.br/produtos/" target="_blank" rel="noreferrer">eCON Automotive, linhas de produtos</a>.</p></div></section>
    <section className="econ-brand-story section"><div><span className="eyebrow light">A marca por trás da bateria</span><h2>Energia que <em>conecta.</em></h2></div><div><p>A eCON Automotive nasceu do grupo Conecta, formado por empresas com longa atuação no mercado de manutenção automotiva. Sua proposta reúne novas opções de bateria e uma rede própria de distribuição.</p><p>Como integrante dessa rede no Paraná, a Sol aproxima a linha eCON das revendas com apoio para conferir aplicação, código e especificações antes da venda.</p><small>Fontes: <a href="https://econautomotive.com.br/" target="_blank" rel="noreferrer">eCON Automotive</a> e <a href="https://econautomotive.com.br/distribuidores/" target="_blank" rel="noreferrer">distribuidores oficiais</a>.</small></div></section>
    <section className="heliar-faq section"><div><span className="eyebrow">Dúvidas frequentes</span><h2>Escolha sua <em>eCON.</em></h2><p>O modelo correto é o que atende à tecnologia, às medidas e às condições elétricas exigidas pelo veículo.</p></div><div className="heliar-faq-list">{content.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
  </>;
}

type FreedomManualData = {
  c3: string;
  datasheet: string;
  discharge: Array<[string, string]>;
  dimensions?: string;
  hole?: string;
  terminal: string;
  weight?: string;
};

const FREEDOM_MANUAL_DATA: Partial<Record<string, FreedomManualData>> = {
  DF300: { c3: "20,8 Ah", dimensions: "175 × 175 × 175 mm (C × L × altura total)", weight: "8,8 kg (tolerância ±4%)", terminal: "Tipo L", hole: "7 mm", datasheet: "/documentos/freedom-df300-ficha-tecnica.pdf", discharge: [["1 hora", "18,00 A"], ["3 horas", "6,92 A"], ["10 horas", "2,40 A"], ["20 horas", "1,30 A"], ["100 horas", "0,30 A"]] },
  DF500: { c3: "25,8 Ah", dimensions: "175 × 175 × 175 mm (C × L × altura total)", weight: "9,4 kg (tolerância ±4%)", terminal: "Tipo L", hole: "7 mm", datasheet: "/documentos/freedom-df500-ficha-tecnica.pdf", discharge: [["1 hora", "20,00 A"], ["3 horas", "8,60 A"], ["10 horas", "3,00 A"], ["20 horas", "1,80 A"], ["100 horas", "0,40 A"]] },
  DF700: { c3: "34,5 Ah", dimensions: "210 × 175 × 175 mm (C × L × altura total)", weight: "12,3 kg (tolerância ±4%)", terminal: "Tipo L", hole: "7 mm", datasheet: "/documentos/freedom-df700-ficha-tecnica.pdf", discharge: [["1 hora", "27,00 A"], ["3 horas", "11,50 A"], ["10 horas", "4,10 A"], ["20 horas", "2,25 A"], ["100 horas", "0,50 A"]] },
  DF1000: { c3: "43,5 Ah", dimensions: "242 × 175 × 175 mm (C × L × altura total)", weight: "15 kg (tolerância ±4%)", terminal: "Tipo L", hole: "7 mm", datasheet: "/documentos/freedom-df1000-ficha-tecnica.pdf", discharge: [["1 hora", "35,00 A"], ["3 horas", "14,50 A"], ["10 horas", "5,40 A"], ["20 horas", "3,00 A"], ["100 horas", "0,70 A"]] },
  DF1500: { c3: "63,0 Ah", dimensions: "330 × 172 × 240 mm (C × L × altura total)", weight: "23,9 kg (tolerância ±4%)", terminal: "Rosqueado 3/8″-16 UNC", datasheet: "/documentos/freedom-df1500-ficha-tecnica.pdf", discharge: [["1 hora", "54,00 A"], ["3 horas", "21,00 A"], ["10 horas", "7,60 A"], ["20 horas", "4,00 A"], ["100 horas", "0,93 A"]] },
  DF2000: { c3: "75,0 Ah", dimensions: "330 × 172 × 240 mm (C × L × altura total)", weight: "27,3 kg (tolerância ±4%)", terminal: "Rosqueado 3/8″-16 UNC", datasheet: "/documentos/freedom-df2000-ficha-tecnica.pdf", discharge: [["1 hora", "60,00 A"], ["3 horas", "25,00 A"], ["10 horas", "9,40 A"], ["20 horas", "5,25 A"], ["100 horas", "1,15 A"]] },
  DF2500: { c3: "102,0 Ah", terminal: "Tipo L", hole: "7 mm", datasheet: "/documentos/freedom-df2500-ficha-tecnica.pdf", discharge: [["1 hora", "81,00 A"], ["3 horas", "34,00 A"], ["10 horas", "13,00 A"], ["20 horas", "7,50 A"], ["100 horas", "1,65 A"]] },
  DF3000: { c3: "123,0 Ah", terminal: "Tipo L", hole: "7 mm", datasheet: "/documentos/freedom-df3000-ficha-tecnica.pdf", discharge: [["1 hora", "95,00 A"], ["3 horas", "41,00 A"], ["10 horas", "15,60 A"], ["20 horas", "8,50 A"], ["100 horas", "1,85 A"]] },
};

const FREEDOM_DF4100_DATA = {
  c3: "156 Ah",
  datasheet: "/documentos/freedom-df4100-ficha-tecnica.pdf",
  discharge: [["1 hora", "120 A"], ["3 horas", "52 A"], ["10 horas", "20 A"], ["20 horas", "11 A"], ["100 horas", "2,4 A"]] as Array<[string, string]>,
  dimensions: "530 × 280 × 246 mm (C × L × A)",
  hole: "7 mm",
  terminal: "Tipo L",
};

const ECON_VRLA_DATA: Record<string, {
  totalHeight: string;
  terminal: string;
  shortCircuit: string;
  internalResistance: string;
  currentDischarge: Array<[string, string]>;
  powerDischarge: Array<[string, string]>;
  sourcePage: string;
}> = {
  "EP12-5": { totalHeight: "107 mm", terminal: "T1/T2 — as publicações disponíveis divergem; confirme a variante no pedido", shortCircuit: "140 A", internalResistance: "48 mΩ", currentDischarge: [["1 hora", "2,81 A"], ["3 horas", "1,25 A"], ["10 horas", "0,465 A"], ["20 horas", "0,250 A"]], powerDischarge: [["1 hora", "5,43 W/célula"], ["3 horas", "2,45 W/célula"], ["10 horas", "0,923 W/célula"], ["20 horas", "0,499 W/célula"]], sourcePage: "7" },
  "EP12-7": { totalHeight: "99,5 mm", terminal: "T1/T2", shortCircuit: "196 A", internalResistance: "33 mΩ", currentDischarge: [["1 hora", "4,06 A"], ["3 horas", "1,77 A"], ["10 horas", "0,653 A"], ["20 horas", "0,350 A"]], powerDischarge: [["1 hora", "7,84 W/célula"], ["3 horas", "3,46 W/célula"], ["10 horas", "1,29 W/célula"], ["20 horas", "0,700 W/célula"]], sourcePage: "8" },
  "EP12-7W": { totalHeight: "99,5 mm", terminal: "T1/T2", shortCircuit: "196 A", internalResistance: "34 mΩ", currentDischarge: [["1 hora", "4,06 A"], ["3 horas", "1,77 A"], ["10 horas", "0,653 A"], ["20 horas", "0,350 A"]], powerDischarge: [["1 hora", "7,84 W/célula"], ["3 horas", "3,46 W/célula"], ["10 horas", "1,29 W/célula"], ["20 horas", "0,700 W/célula"]], sourcePage: "9" },
  "EP12-9": { totalHeight: "99,5 mm", terminal: "T1/T2", shortCircuit: "252 A", internalResistance: "17 mΩ", currentDischarge: [["1 hora", "5,66 A"], ["3 horas", "2,30 A"], ["10 horas", "0,851 A"], ["20 horas", "0,450 A"]], powerDischarge: [["1 hora", "10,9 W/célula"], ["3 horas", "4,49 W/célula"], ["10 horas", "1,69 W/célula"], ["20 horas", "0,900 W/célula"]], sourcePage: "10" },
  "EP12-12": { totalHeight: "101 mm", terminal: "T1/T2", shortCircuit: "336 A", internalResistance: "19 mΩ", currentDischarge: [["1 hora", "6,84 A"], ["3 horas", "3,00 A"], ["10 horas", "1,12 A"], ["20 horas", "0,600 A"]], powerDischarge: [["1 hora", "13,2 W/célula"], ["3 horas", "5,87 W/célula"], ["10 horas", "2,22 W/célula"], ["20 horas", "1,20 W/célula"]], sourcePage: "11" },
  "EP12-18": { totalHeight: "167,5 mm", terminal: "T12 (M5) ou T3", shortCircuit: "504 A", internalResistance: "18 mΩ", currentDischarge: [["1 hora", "9,54 A"], ["3 horas", "4,32 A"], ["10 horas", "1,70 A"], ["20 horas", "0,900 A"]], powerDischarge: [["1 hora", "18,4 W/célula"], ["3 horas", "8,45 W/célula"], ["10 horas", "3,37 W/célula"], ["20 horas", "1,80 W/célula"]], sourcePage: "12" },
};

function EconVrlaTechnology() {
  return <section className="heliar-line-technology section econ-vrla-technology"><div><span className="eyebrow">Tecnologia eCON VRLA</span><h2>Energia de reserva em <em>formato selado.</em></h2></div><div><p>As baterias eCON VRLA utilizam tecnologia AGM (manta de fibra de vidro absorvente) e válvula reguladora. A recombinação interna de gases supera 99%, e a construção dispensa reposição de água.</p><p>Indicadas para nobreaks, telecomunicações, sistemas fotovoltaicos, data centers, segurança e automação predial. A escolha do modelo considera capacidade de descarga, espaço, terminais e requisitos do equipamento.</p><small>Fonte: Catálogo eCON VRLA, páginas 2 e 4.</small></div></section>;
}

function FreedomTechnology() {
  return <section className="freedom-technology section">
    <figure className="freedom-technology-visual">
      <NextImage src="/Imagens%20baterias/Heliar/Webp/powerframe-tecnologia.webp" alt="Grade com tecnologia PowerFrame usada na linha Freedom" width={696} height={608} sizes="(max-width: 900px) 80vw, 36vw" unoptimized />
      <figcaption>Grade com tecnologia PowerFrame®</figcaption>
    </figure>
    <div className="freedom-technology-copy">
      <span className="eyebrow">Tecnologia Freedom</span>
      <h2>Tecnologia <em>PowerFrame®.</em></h2>
      <p>As grades participam da condução de corrente no interior da bateria. A tecnologia PowerFrame® utiliza um desenho otimizado para favorecer a condutividade elétrica e a resistência à corrosão, contribuindo para a durabilidade da linha Freedom. A linha atende aplicações de nobreaks e segurança, telecomunicações e energias renováveis.</p>
      <div className="freedom-technology-points">
        <article><h3>Construção estacionária</h3><p>A Freedom utiliza eletrólito fluido e construção ventilada. A tampa com sistema de labirinto favorece o retorno de gotículas de eletrólito às células, ajudando a reduzir sua perda durante a operação.</p></article>
        <article><h3>Sem reposição de água</h3><p>A bateria não requer reposição de água ou eletrólito. As inspeções das conexões, da temperatura e das condições de carga continuam importantes para a operação do sistema.</p></article>
      </div>
      <small>Fontes técnicas: folder Freedom, página 4; Manual Técnico Freedom, março/2022, páginas 4 e 6.</small>
    </div>
  </section>;
}

function FreedomDf4100Technology() {
  return <section className="freedom-technology section">
    <figure className="freedom-technology-visual">
      <NextImage src="/Imagens%20baterias/Heliar/Webp/powerframe-tecnologia.webp" alt="Grade com tecnologia PowerFrame usada na linha Freedom" width={696} height={608} sizes="(max-width: 900px) 80vw, 36vw" unoptimized />
      <figcaption>Grade com tecnologia PowerFrame®</figcaption>
    </figure>
    <div className="freedom-technology-copy">
      <span className="eyebrow">Tecnologia Freedom</span>
      <h2>Tecnologia <em>PowerFrame®.</em></h2>
      <p>As grades participam da condução de corrente no interior da bateria. A tecnologia PowerFrame® utiliza um desenho otimizado para favorecer a condutividade elétrica e a resistência à corrosão. A linha atende aplicações de nobreaks e segurança, telecomunicações e energias renováveis.</p>
      <div className="freedom-technology-points">
        <article><h3>Bateria aberta ventilada</h3><p>A DF4100 tem construção aberta ventilada para aplicações estacionárias compatíveis com o projeto.</p></article>
        <article><h3>Sem reposição de água</h3><p>A DF4100 dispensa reposição de água. A instalação, a configuração de carga e as verificações do sistema devem seguir as orientações técnicas aplicáveis.</p></article>
      </div>
      <small>Fontes técnicas: ficha técnica DF4100; Folder técnico Freedom, páginas 4 e 5.</small>
    </div>
  </section>;
}

function FreedomDf4100Depth() {
  return <section className="stationary-depth section"><div className="stationary-section-heading"><span className="eyebrow">Dimensionamento</span><h2>Profundidade de descarga e <em>operação.</em></h2><p>A vida útil varia com temperatura, profundidade de descarga, carga e condições de operação. Dimensione a DF4100 conforme os requisitos do sistema; não há uma curva individual de ciclos validada nesta página.</p></div><aside><span>Referência de linha</span><strong>20%</strong><p>O folder Freedom apresenta 20% de profundidade de descarga como referência. Esse percentual não é uma promessa de autonomia ou vida útil específica para a DF4100.</p><small>Fonte: Folder técnico Freedom, página 5.</small></aside></section>;
}

function StationaryProductContent({ product, productSpec }: { product: Product; productSpec: ProductSpec }) {
  const isFreedom = product.brand === "Freedom";
  const isDf4100 = product.model === "DF4100";
  const isEconVrla = product.brand === "eCON VRLA";
  const econVrlaData = isEconVrla ? ECON_VRLA_DATA[product.model] : undefined;
  const freedomCapacity = productSpec.capacityByRate;
  const freedomManual = FREEDOM_MANUAL_DATA[product.model];
  const usesFreedomManual = !!freedomManual;
  const freedomDischarge = freedomManual?.discharge ?? (isDf4100 ? FREEDOM_DF4100_DATA.discharge : undefined);
  const selectionCards = isFreedom ? [
    ["Entenda a capacidade", "C10, C20 e C100 indicam regimes de descarga diferentes. Compare baterias sempre no mesmo regime."],
    ["Avalie a autonomia", "O tempo de funcionamento depende da carga alimentada, das condições de operação e dos limites definidos para o sistema."],
    ["Confira a instalação", "Verifique dimensões, peso, terminais e orientações do fabricante antes de definir o banco de baterias."],
  ] : [
    ["Capacidade em C20", "A capacidade nominal é medida a 25 °C, até 1,75 V por célula. Compare modelos sempre sob o mesmo regime de descarga."],
    ["Aplicações de reserva", "A linha atende nobreaks, telecomunicações, energia solar, segurança e outras cargas compatíveis com baterias VRLA."],
    ["Condições de carga", "Os parâmetros de carga orientam a escolha do carregador e o ajuste do sistema às necessidades do projeto."],
  ];
  const faqs = usesFreedomManual ? [
    ["Qual é a diferença entre C10, C20 e C100?", "São capacidades medidas em regimes de descarga diferentes. Compare os modelos usando o mesmo regime; nenhum desses valores, isoladamente, define a autonomia do equipamento."],
    ["Capacidade de descarga é autonomia garantida?", "Não. As tabelas mostram o desempenho da bateria nas condições de ensaio indicadas. A autonomia do equipamento depende também do consumo, da configuração do banco, das perdas e das condições de operação."],
    ["Livre de manutenção significa dispensar inspeções?", "Não. A bateria dispensa reposição de água, mas o sistema requer verificações de conexões, temperatura e carga conforme as orientações do fabricante."],
    ["Como a profundidade de descarga afeta a vida útil?", "A profundidade de descarga indica a parcela da carga retirada da bateria. Descargas mais profundas reduzem sua vida útil; o manual recomenda considerar 20% no projeto para favorecer a durabilidade."],
  ] : isDf4100 ? [
    ["Qual capacidade C20 considerar para a DF4100?", "Para esta página, a Sol adotou 220 Ah em C20 conforme a ficha técnica individual da DF4100."],
    ["A DF4100 possui certificação Anatel?", "Não. O folder técnico Freedom identifica expressamente que a DF4100 não possui certificação Anatel."],
    ["A tabela de descarga garante autonomia?", "Não. Os valores da ficha representam condições de ensaio a 25 °C. A autonomia depende também da carga, da configuração do banco, das perdas e das condições de operação."],
  ] : isEconVrla ? [
    ["O que significa a capacidade em C20?", `A capacidade de ${productSpec.capacity.split(" ")[0]} Ah foi medida em regime de 20 horas, a 25 °C, até 1,75 V por célula. A autonomia real também depende da carga e das condições do sistema.`],
    ["A tabela de descarga prevê a autonomia do equipamento?", "Não. Ela mostra o desempenho da bateria em condições de ensaio. O cálculo do sistema deve considerar consumo, tensão de corte, configuração do banco e perdas."],
    ...(product.model === "EP12-5" ? [["Qual terminal vem na EP12-5?", "As publicações técnicas disponíveis divergem quanto ao terminal da EP12-5. Confirme a variante do produto antes de especificar a conexão."]] : []),
  ] : [
    ["Ah indica quantas horas a bateria dura?", "Não diretamente. Ah expressa capacidade elétrica em determinadas condições de ensaio. A autonomia também depende do consumo do equipamento e das condições do sistema."],
    ["Posso escolher outra bateria com a mesma tensão e capacidade?", "Confira também tecnologia, regime de descarga, dimensões, terminais e compatibilidade com o carregador. A equipe Sol pode ajudar nessa avaliação."],
  ];
  return <div className="stationary-product-detail">
    <section id="dados-tecnicos" className="stationary-specs section">
      <div className="stationary-section-heading"><span className="eyebrow">Dados para escolher e instalar</span><h2>{product.model} <em>em detalhes.</em></h2><p>{isFreedom ? "Leia a capacidade junto do regime de descarga e considere as condições do sistema antes de estimar a autonomia." : isEconVrla ? "Dados nominais a 25 °C, com descarga até 1,75 V por célula. Verifique dimensões, terminais e condições de operação." : "Confira a capacidade e as dimensões informadas para avaliar espaço e compatibilidade com o equipamento."}</p></div>
      <div className="stationary-spec-table" role="table" aria-label={`Dados técnicos ${product.model}`}>
        {isFreedom ? <>
          <div role="row"><span role="rowheader">Tecnologia</span><strong role="cell">{usesFreedomManual ? "Chumbo-ácido estacionária ventilada, com eletrólito fluido" : isDf4100 ? "Chumbo-ácido estacionária aberta ventilada" : productSpec.technology}</strong></div>
          <div role="row"><span role="rowheader">Tensão nominal</span><strong role="cell">{productSpec.voltage}</strong></div>
          {freedomManual && <div role="row"><span role="rowheader">Capacidade C3</span><strong role="cell">{freedomManual.c3}</strong></div>}
          {isDf4100 && <div role="row"><span role="rowheader">Capacidade C3</span><strong role="cell">{FREEDOM_DF4100_DATA.c3} — tabela de ampere-hora da ficha</strong></div>}
          <div role="row"><span role="rowheader">Capacidade C10</span><strong role="cell">{freedomCapacity?.c10}</strong></div>
          <div role="row"><span role="rowheader">Capacidade C20</span><strong role="cell">{isDf4100 ? "220 Ah" : freedomCapacity?.c20}</strong></div>
          <div role="row"><span role="rowheader">Capacidade C100</span><strong role="cell">{freedomCapacity?.c100}</strong></div>
          {freedomManual && <div role="row"><span role="rowheader">Condição da capacidade</span><strong role="cell">25 °C, até 1,75 V por elemento (10,5 V)</strong></div>}
          {isDf4100 && <div role="row"><span role="rowheader">Condição da capacidade</span><strong role="cell">25 °C — condição indicada na ficha</strong></div>}
          <div role="row"><span role="rowheader">Dimensões (C × L × A)</span><strong role="cell">{isDf4100 ? FREEDOM_DF4100_DATA.dimensions : productSpec.dimensions}</strong></div>
          <div role="row"><span role="rowheader">Peso</span><strong role="cell">{isDf4100 ? "60,3 kg" : productSpec.weight}</strong></div>
          {freedomManual && <><div role="row"><span role="rowheader">Terminal</span><strong role="cell">{freedomManual.terminal}</strong></div>{freedomManual.hole && <div role="row"><span role="rowheader">Diâmetro do furo</span><strong role="cell">{freedomManual.hole}</strong></div>}</>}
          {isDf4100 && <><div role="row"><span role="rowheader">Terminal</span><strong role="cell">{FREEDOM_DF4100_DATA.terminal}</strong></div><div role="row"><span role="rowheader">Diâmetro do furo</span><strong role="cell">{FREEDOM_DF4100_DATA.hole}</strong></div><div role="row"><span role="rowheader">Certificação Anatel</span><strong role="cell">Não possui — conforme folder Freedom</strong></div></>}
          <div role="row"><span role="rowheader">Garantia</span><strong role="cell">{usesFreedomManual || isDf4100 ? "Confirmar política comercial vigente" : productSpec.warranty}</strong></div>
        </> : <>
          <div role="row"><span role="rowheader">Tecnologia</span><strong role="cell">{productSpec.technology}</strong></div>
          <div role="row"><span role="rowheader">Tensão nominal</span><strong role="cell">{productSpec.voltage}</strong></div>
          <div role="row"><span role="rowheader">Capacidade nominal</span><strong role="cell">{productSpec.capacity}</strong></div>
          <div role="row"><span role="rowheader">Dimensões (C × L × A)</span><strong role="cell">{productSpec.dimensions} (±2 mm)</strong></div>
          <div role="row"><span role="rowheader">Altura total</span><strong role="cell">{econVrlaData?.totalHeight}</strong></div>
          <div role="row"><span role="rowheader">Peso aproximado</span><strong role="cell">{productSpec.weight} (±5%)</strong></div>
          <div role="row"><span role="rowheader">Terminais</span><strong role="cell">{econVrlaData?.terminal}</strong></div>
          <div role="row"><span role="rowheader">Material do recipiente</span><strong role="cell">ABS</strong></div>
          <div role="row"><span role="rowheader">Corrente de curto-circuito</span><strong role="cell">{econVrlaData?.shortCircuit}</strong></div>
          <div role="row"><span role="rowheader">Resistência interna a 25 °C</span><strong role="cell">Aprox. {econVrlaData?.internalResistance}</strong></div>
        </>}
      </div>
      {isFreedom && <small className="stationary-source-note">Fonte: Ficha técnica Freedom {product.model} ({product.model.toLowerCase()}-ficha-tecnica.pdf), página 1. Dimensões e peso conforme ficha individual.</small>}
      {isEconVrla && <small className="stationary-source-note">Fonte: Catálogo ECON VRLA, página {econVrlaData?.sourcePage}; capacidade a 25 °C até 1,75 V/célula; dimensões ±2 mm e peso ±5%.</small>}
    </section>
    {usesFreedomManual ? <FreedomTechnology /> : isDf4100 ? <FreedomDf4100Technology /> : isEconVrla && <EconVrlaTechnology />}
    <section className="stationary-criteria section"><div className="stationary-section-heading"><span className="eyebrow">{usesFreedomManual || isDf4100 ? "Orientação de escolha" : "Tecnologia e aplicação"}</span><h2>{usesFreedomManual || isDf4100 ? "Como escolher para o seu sistema." : isFreedom ? "Dimensione com os dados certos." : "Tecnologia AGM para energia de reserva."}</h2></div><div className="stationary-criteria-grid">{selectionCards.map(([title, text], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    {freedomDischarge && <section className="stationary-discharge section"><div className="stationary-section-heading"><span className="eyebrow light">Desempenho em descarga</span><h2>Desempenho em descarga da <em>{product.model}.</em></h2><p>{isDf4100 ? "Valores de corrente da ficha técnica DF4100, a 25 °C. A autonomia do sistema depende da carga, da configuração do banco e das condições de operação." : "Corrente constante a 25 °C, com tensão final de 1,75 V por elemento (10,5 V por monobloco). A autonomia do sistema depende da carga, da configuração do banco e das condições de operação."}</p></div><div><div className="stationary-discharge-table" role="table" aria-label={`Corrente de descarga ${product.model}`}><div role="row"><span role="columnheader">Tempo de descarga</span><strong role="columnheader">Corrente</strong></div>{freedomDischarge.map(([time, current]) => <div role="row" key={time}><span role="cell">{time}</span><strong role="cell">{current}</strong></div>)}</div><small className="stationary-source-note">{isDf4100 ? "Fonte: ficha técnica DF4100, tabela de descarga a 25 °C." : "Dados de ensaio do Manual Técnico Freedom, março/2022, página 12."}</small></div></section>}
    {usesFreedomManual && <section className="stationary-depth section"><div className="stationary-section-heading"><span className="eyebrow">Dimensionamento e durabilidade</span><h2>Profundidade de descarga e <em>vida útil.</em></h2><p>A profundidade de descarga indica a parcela da carga retirada da bateria. Descargas mais profundas reduzem sua vida útil. O dimensionamento deve considerar a aplicação e as condições de operação.</p></div><aside><span>Referência para o projeto</span><strong>20%</strong><p>O Manual Técnico Freedom — março/2022 recomenda considerar 20% de profundidade de descarga no projeto para favorecer a durabilidade. É referência de dimensionamento, não garantia de vida útil.</p><small>Fonte: Manual Técnico Freedom, março/2022, página 37.</small></aside></section>}
    {usesFreedomManual && <section className="stationary-operation section"><div className="stationary-section-heading"><span className="eyebrow">Carga e operação</span><h2>Parâmetros de <em>referência.</em></h2><p>Parâmetros do Manual Técnico Freedom — março/2022. Confirme o perfil de carga com o fabricante do sistema; estes valores não são um ajuste universal do carregador.</p></div><div className="stationary-operation-grid"><article><span>Corrente de carga de referência</span><strong>Até 0,20 × C10</strong><p>{productSpec.capacityByRate?.c10} → até {(Number.parseFloat(productSpec.capacityByRate?.c10 ?? "0") * 0.2).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} A</p></article><article><span>Flutuação a 25 °C</span><strong>13,2–13,8 V</strong></article><article><span>Carga/equalização a 25 °C</span><strong>14,4–15,5 V</strong></article><article><span>Dimensionamento</span><strong>Conforme sistema e aplicação</strong></article></div><small>Fonte: Manual Técnico Freedom, março/2022, capítulo de carga e operação.</small></section>}
    {isDf4100 && <FreedomDf4100Depth />}
    {isEconVrla && econVrlaData && <section className="stationary-discharge econ-vrla-discharge section">
      <div className="stationary-section-heading"><span className="eyebrow light">Desempenho em descarga</span><h2>Dados de descarga da <em>{product.model}.</em></h2><p>Valores a 25 °C e tensão final de 1,75 V por célula. Use-os para dimensionar a bateria para a carga; eles não garantem a autonomia do equipamento.</p></div>
      <div>
        <div className="econ-vrla-discharge-tables">
          <div className="stationary-discharge-table"><div><span>Tempo</span><strong>Corrente constante</strong></div>{econVrlaData.currentDischarge.map(([time, value]) => <div role="row" key={`current-${time}`}><span>{time}</span><strong>{value}</strong></div>)}</div>
          <div className="stationary-discharge-table"><div><span>Tempo</span><strong>Potência constante</strong></div>{econVrlaData.powerDischarge.map(([time, value]) => <div role="row" key={`power-${time}`}><span>{time}</span><strong>{value}</strong></div>)}</div>
        </div>
        <small className="stationary-source-note">Fonte: Catálogo ECON VRLA, página {econVrlaData.sourcePage}; condições de ensaio a 25 °C e 1,75 V/célula. Correntes em A; potência por célula em W/célula.</small>
      </div>
    </section>}
    {isEconVrla && <section className="stationary-operation section"><div className="stationary-section-heading"><span className="eyebrow">Carga e operação</span><h2>Parâmetros da <em>série EP.</em></h2><p>Parâmetros gerais de referência a 25 °C. A seleção do carregador e os ajustes finais dependem do projeto.</p></div><div className="stationary-operation-grid"><article><span>Flutuação a 25 °C</span><strong>2,25–2,30 V/célula</strong></article><article><span>Uso cíclico a 25 °C</span><strong>2,35–2,45 V/célula</strong></article><article><span>Corrente máxima de carga a 25 °C</span><strong>0,3C</strong></article><article><span>Compensação térmica</span><strong>−3 mV/°C em flutuação<br />−5 mV/°C em ciclo</strong></article><article><span>Temperatura</span><strong>Descarga: −15 a 50 °C<br />Carga: −20 a 40 °C</strong></article><article><span>Autodescarga</span><strong>Até 3% ao mês a 25 °C</strong><p>Após armazenamento prolongado, programe uma recarga de compensação.</p></article></div><small>Fonte: Catálogo ECON VRLA, páginas 2–4.</small></section>}
    <section id="documentos-tecnicos" className="stationary-documents section"><div className="stationary-section-heading"><span className="eyebrow">Documentação</span><h2>{usesFreedomManual || isDf4100 || isEconVrla ? <>Documentos <em>técnicos.</em></> : <>Consulte a <em>fonte técnica.</em></>}</h2><p>{usesFreedomManual ? "Consulte o Manual Técnico Freedom — março/2022 para os dados de desempenho, carga e operação; a ficha individual complementa as dimensões e o peso." : isDf4100 ? "A ficha individual reúne os dados publicados da DF4100; o folder técnico apresenta informações gerais da linha." : isFreedom ? "Consulte a página oficial da Freedom para verificar os dados disponíveis do modelo." : isEconVrla ? "O catálogo técnico reúne as especificações da linha, os ensaios de descarga e as orientações de carga e operação para apoiar o dimensionamento." : "Consulte a documentação técnica do produto para confirmar as informações completas."}</p></div>{usesFreedomManual && freedomManual ? <div className="stationary-document-actions"><a className="button yellow" href="/documentos/freedom-manual-tecnico-2022.pdf" download>Manual técnico Freedom — março/2022 (PDF) <Icon name="arrow" /></a><a className="button blue" href={freedomManual.datasheet} download>Ficha técnica {product.model} (PDF) <Icon name="arrow" /></a><a className="button blue" href="/documentos/freedom-folder-tecnico.pdf" download>Folder técnico Freedom (PDF) <Icon name="arrow" /></a><a className="text-link" href="https://www.freedomestacionaria.com.br/produtos" target="_blank" rel="noreferrer">Consultar dados Freedom <Icon name="arrow" /></a></div> : isDf4100 ? <div className="stationary-document-actions"><a className="button yellow" href={FREEDOM_DF4100_DATA.datasheet} download>Ficha técnica DF4100 (PDF) <Icon name="arrow" /></a><a className="button blue" href="/documentos/freedom-folder-tecnico.pdf" download>Folder técnico Freedom (PDF) <Icon name="arrow" /></a><a className="text-link" href="https://www.freedomestacionaria.com.br/produtos" target="_blank" rel="noreferrer">Consultar dados Freedom <Icon name="arrow" /></a></div> : isFreedom ? <a className="button blue" href="https://www.freedomestacionaria.com.br/produtos" target="_blank" rel="noreferrer">Consultar dados Freedom <Icon name="arrow" /></a> : isEconVrla ? <div className="stationary-document-actions"><a className="button yellow" href="/documentos/econ-vrla-catalogo.pdf" download>Catálogo técnico eCON VRLA (PDF) <Icon name="arrow" /></a><a className="text-link" href={WHATSAPP} target="_blank" rel="noreferrer">Falar com a equipe Sol <Icon name="arrow" /></a></div> : <a className="button yellow" href="/econ-ep12-7-ficha-tecnica-v20250731.pdf" download>Baixar ficha técnica EP12-7 <Icon name="arrow" /></a>}</section>
    <section className="stationary-faq section"><div className="stationary-section-heading"><span className="eyebrow">Dúvidas frequentes</span><h2>Antes de definir a <em>aplicação.</em></h2></div><div className="stationary-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
  </div>;
}

function ProductDetail({ product }: { product: Product }) {
  const realImage = PRODUCT_IMAGES[product.slug];
  const isBattery = product.segment !== "energia" && product.segment !== "solar";
  const detailImage = isBattery ? productCardImage(product) : realImage;
  const isPremium30 = product.slug === "bluetti-premium-30-v2";
  const bluettiContent = BLUETTI_CONTENT[product.slug];
  const bluettiDatasheet = product.slug === "bluetti-elite-200-v2" ? ELITE_200_V2_REFERENCE : product.slug === "bluetti-ac200pl" ? AC200PL_REFERENCE : bluettiContent?.datasheet;
  const bluettiGallery = BLUETTI_GALLERIES[product.slug];
  const productSpec = PRODUCT_SPECS[productSpecKey(product.brand, product.model)];
  const confirmedEconAuto = product.brand === "eCON" && productSpec && ["E45BD-18", "E95MD-15", "EGM60HD-24", "EFB60HD-24"].includes(product.model);
  const stationaryDetail = (product.brand === "Freedom" || product.brand === "eCON VRLA") && !!productSpec;
  const stationaryHero = product.brand === "Freedom" && productSpec?.capacityByRate
    ? product.model === "DF300"
      ? "Bateria estacionária de 12 V, com 24 Ah em C10, 26 Ah em C20 e 30 Ah em C100. Consulte as medidas e os dados de descarga para avaliar sua aplicação no sistema."
      : product.model === "DF4100"
        ? "Bateria estacionária de 12 V com 200 Ah em C10, 220 Ah em C20 e 240 Ah em C100. Confira dimensões, terminais e condições do sistema antes de especificar o banco."
        : `Bateria estacionária de ${productSpec.voltage} com ${productSpec.capacityByRate.c10} em C10, ${productSpec.capacityByRate.c20} em C20 e ${productSpec.capacityByRate.c100} em C100. Consulte as medidas e os parâmetros técnicos para avaliar sua aplicação no projeto.`
    : product.brand === "eCON VRLA" && productSpec ? `Bateria eCON VRLA ${product.model} de ${productSpec.voltage} e ${productSpec.capacity}, desenvolvida para sistemas de energia de reserva. Suas dimensões e dados de descarga apoiam a seleção conforme os requisitos do equipamento.` : "Bateria de 12 V e 7 Ah em C20 para nobreaks, sistemas de alarme e energia de emergência. Consulte as medidas, o tipo de terminal e as tabelas de descarga para confirmar a compatibilidade com o equipamento.";
  const heliarLine = product.brand === "Heliar" && productSpec ? heliarLineFor(productSpec, product.model) : undefined;
  const econLine = product.brand === "eCON" && productSpec ? econLineFor(productSpec) : undefined;
  const heliarContent = heliarLine ? HELIAR_LINE_CONTENT[heliarLine] : undefined;
  const econContent = econLine ? ECON_LINE_CONTENT[econLine] : undefined;
  const [relatedSearch, setRelatedSearch] = useState("");
  const [relatedOpen, setRelatedOpen] = useState(false);
  const brandProducts = PRODUCTS.filter((item) => item.brand === product.brand);
  const heliarApplication = productSpec && (heliarLine === "FROTA" || Number.parseInt(productSpec.capacity, 10) >= 100) ? "comercial" : "leve";
  const relatedProducts = heliarLine ? brandProducts.filter((item) => {
    const spec = PRODUCT_SPECS[productSpecKey(item.brand, item.model)];
    if (!spec || heliarLineFor(spec, item.model) !== heliarLine) return false;
    const itemLine = heliarLineFor(spec, item.model);
    const itemApplication = itemLine === "FROTA" || itemLine === "FROTA_EFB" || Number.parseInt(spec.capacity, 10) >= 100 ? "comercial" : "leve";
    return itemApplication === heliarApplication;
  }) : brandProducts;
  const productIndex = relatedProducts.findIndex((item) => item.id === product.id);
  const suggestedProducts = [
    ...relatedProducts.slice(Math.max(0, productIndex - 2), productIndex),
    ...relatedProducts.slice(productIndex + 1, productIndex + 3),
  ];
  const searchSuggestions = relatedSearch.trim()
    ? PRODUCTS.filter((item) => clean(`${item.brand} ${item.model} ${segmentLabel(item.segment)}`).includes(clean(relatedSearch))).slice(0, 6)
    : [];
  const brandCatalogHref: Record<Product["brand"], string> = { Freedom: "/freedom-baterias-estacionarias", Heliar: "/heliar-baterias-automotivas", eCON: "/econ-baterias-automotivas", "eCON VRLA": "/econ-vrla-baterias-estacionarias", Bluetti: "/bluetti-estacoes-de-energia" };
  return <Shell>
    <section className="product-hero" data-product-name-style={isBattery ? "code" : undefined}>
      <div><span className="eyebrow light product-hero-label">{heliarContent ? `Heliar · ${heliarContent.label}` : econContent ? `eCON · ${econContent.label}` : `${product.brand} · ${segmentLabel(product.segment)}`}</span><h1>{product.model}</h1><p>{stationaryDetail ? stationaryHero : heliarContent && productSpec ? (["HEFB225TD", "HEFB225TE", "HE60HD", "HEFB60HD"].includes(product.model) ? productSpec.description : heliarContent.hero(productSpec.capacity)) : econContent && productSpec ? (confirmedEconAuto ? productSpec.description : econContent.hero(product.model)) : isPremium30 ? "Estação BLUETTI de 320 Wh com saída nominal de 600 W e Power Lifting para cargas puramente resistivas." : bluettiContent ? bluettiContent.intro : "Nossa equipe ajuda a confirmar aplicação e especificações do modelo antes da compra."}</p><a className="button yellow" href={WHATSAPP} target="_blank" rel="noreferrer">Solicite uma cotação <Icon name="arrow" /></a>{econContent && <nav className="product-hero-links" aria-label="Atalhos da página"><a href="#ficha-tecnica">Ficha técnica</a><a href="#tecnologia-econ">Conheça a linha</a></nav>}{heliarContent && <nav className="product-hero-links" aria-label="Atalhos da página"><a href="#ficha-tecnica">Ficha técnica</a><a href="#tecnologia-heliar">Conheça a tecnologia</a></nav>}{stationaryDetail && <nav className="product-hero-links" aria-label="Atalhos da página"><a href="#dados-tecnicos">Dados técnicos</a><a href="#documentos-tecnicos">Documentação</a></nav>}</div>
      <div className={`product-media-card${product.segment === "solar" ? " product-media-card-solar" : ""}`}>{bluettiGallery ? <><span className="eyebrow light product-stage-label">{product.brand} · {segmentLabel(product.segment)}</span><ProductGallery key={product.slug} product={product} images={bluettiGallery} /></> : <div className={`product-stage ${product.segment}`}><span className="eyebrow light product-stage-label">{heliarContent ? `Heliar · ${heliarContent.label}` : econContent ? `eCON · ${econContent.label}` : `${product.brand} · ${segmentLabel(product.segment)}`}</span>{realImage ? <div className={product.brand === "Heliar" ? "heliar-product-stage" : "product-stage-image"} style={heliarImageStyle(product)}><div className="stage-glow" /><img className="stage-real-product" src={detailImage} alt={`${product.brand} ${product.model}`} /></div> : <><div className="stage-glow" /><div className="stage-product"><i /><i /><b>{product.model}</b><span>{product.brand}</span></div></>}</div>}</div>
    </section>
    {stationaryDetail && productSpec ? <StationaryProductContent product={product} productSpec={productSpec} /> : heliarLine && productSpec ? <HeliarProductContent product={product} productSpec={productSpec} line={heliarLine} /> : econLine && productSpec ? <EconProductContent product={product} productSpec={productSpec} line={econLine} /> : isPremium30 ? <section className="detail section premium-30-overview">
      <div className="premium-30-datasheet" data-product-name-style={isBattery ? "code" : undefined}><span className="eyebrow">Visão geral</span><h2>Premium 30 V2 <em>em detalhes.</em></h2><span className="detail-label">Ficha técnica</span><p><strong>Saída:</strong> 600 W nominais; Power Lifting até 1.500 W para cargas puramente resistivas. Saída combinada CA + CC: até 600 W.</p><p><strong>Capacidade e bateria:</strong> 320 Wh (20 Ah), LiFePO₄.</p><p><strong>Entrada CA:</strong> até 380 W; 80% de carga em cerca de 50 min a 25 °C.</p><p><strong>Entrada CC:</strong> até 200 W, 12–28 V e 10 A máx.</p><p><strong>UPS:</strong> comutação ≤10 ms.</p><p><strong>Dimensões e peso:</strong> 250 × 178 × 167,5 mm; aproximadamente 4,3 kg.</p><p className="premium-30-warranty"><strong>Garantia:</strong> 5 anos.</p><small className="product-source-note">Fonte: Manual do usuário BLUETTI Premium 30 V2, versão 2.0 (2025), seção 9, página 20. <a href="https://www.offgridtec.com/media/product_attachements/Bluetti_Powerstation_Premium-30-V2_UserManual.pdf" target="_blank" rel="noreferrer">Abrir manual (PDF)</a></small></div>
      <div className="premium-30-advantages"><span className="eyebrow">Principais características</span><h2>Energia compacta para <em>mobilidade.</em></h2><p>A Premium 30 V2 reúne 320 Wh de capacidade e saída nominal de 600 W em um equipamento de aproximadamente 4,3 kg.</p><ul><li><strong>Capacidade:</strong> 320 Wh para compor uma solução portátil de energia.</li><li><strong>Entrada CA:</strong> até 380 W, com condição de 80% em 50 minutos a 25 °C.</li><li><strong>Entrada CC:</strong> até 200 W dentro dos limites elétricos especificados.</li><li><strong>Power Lifting:</strong> modo para cargas puramente resistivas; não altera a potência nominal CA+CC de 600 W.</li><li><strong>UPS:</strong> comutação de até 10 ms conforme o manual da versão 2.0.</li></ul><p className="premium-30-summary">A autonomia depende da potência e do perfil da carga, das perdas e das condições de operação.</p></div>
    </section> : bluettiContent ? <section className="detail section premium-30-overview">
      <div className="premium-30-datasheet" data-product-name-style={isBattery ? "code" : undefined}><span className="eyebrow">Visão geral</span><h2>{product.model} <em>em detalhes.</em></h2><span className="detail-label">Ficha técnica</span>{bluettiDatasheet?.map(([label, text]) => <p key={label} className={label === "Garantia" ? "premium-30-warranty" : undefined}><strong>{label}:</strong> {text}</p>)}{product.slug === "bluetti-elite-200-v2" && <small className="product-source-note">Fontes: <a href="https://www.bluettipower.eu/en-be/products/elite-200-v2-portable-power-station" target="_blank" rel="noreferrer">ficha oficial BLUETTI Elite 200 V2</a> (pico de 3.900 W) e <a href="https://s4.bluettipower.com/bluetti/purchasePageBiz/2026/05/Elite_200_V2_User_Manual_EU_EN-DE-NEW-1780129368905-8e7c.pdf" target="_blank" rel="noreferrer">manual EU, edição 2026 (PDF)</a>. A Sol confirmou equivalência da unidade regional comercializada.</small>}{product.slug === "bluetti-ac200pl" && <small className="product-source-note">Fonte: página brasileira oficial da BLUETTI AC200PL. <a href="https://br.bluettipower.com/products/ac200pl-central-eletrica-expansivel" target="_blank" rel="noreferrer">Abrir ficha do fabricante</a>.</small>}{product.slug === "bluetti-premium-200-v2" && <small className="product-source-note">Fonte: <a href="https://www.bluettipower.com/products/bluetti-premium-200-v2-portable-power-station" target="_blank" rel="noreferrer">ficha oficial BLUETTI Premium 200 V2</a> (Power Lifting de 3.900 W).</small>}</div>
      <div className="premium-30-advantages"><span className="eyebrow">Principais vantagens</span><h2>Principais <em>vantagens.</em></h2><p>{bluettiContent.intro}</p><ul>{bluettiContent.advantages.map(([title, text]) => <li key={title}><strong>{title}:</strong> {text}</li>)}</ul><p className="premium-30-summary">{bluettiContent.summary}</p></div>
    </section> : productSpec ? <section className="detail section premium-30-overview">
      <div className="premium-30-datasheet" data-product-name-style={isBattery ? "code" : undefined}><span className="eyebrow">Especificações</span><h2>{product.model} <em>em detalhes.</em></h2><span className="detail-label">Ficha técnica</span><p><strong>Tecnologia:</strong> {productSpec.technology}</p><p><strong>Tensão:</strong> {productSpec.voltage}</p><p><strong>Capacidade:</strong> {productSpec.capacity}</p>{productSpec.cca !== "-" && <p><strong>CCA:</strong> {productSpec.cca}</p>}{productSpec.reserveCapacity && <p><strong>Reserva de capacidade:</strong> {productSpec.reserveCapacity}</p>}<p><strong>Dimensões:</strong> {productSpec.dimensions}</p><p><strong>Peso:</strong> {productSpec.weight}</p><p className="premium-30-warranty"><strong>Garantia:</strong> {productSpec.warranty}</p>{productSpec.sourceNote && <small className="product-source-note">{productSpec.sourceHref ? <a href={productSpec.sourceHref} target="_blank" rel="noreferrer">{productSpec.sourceNote}</a> : productSpec.sourceNote}</small>}</div>
      <div className="premium-30-advantages"><span className="eyebrow">Sobre o produto</span><h2>Escolha com <em>confiança.</em></h2><p>{productSpec.description}</p><p className="premium-30-summary">Nossa equipe ajuda a confirmar aplicação, disponibilidade e especificações para a solução ideal.</p></div>
    </section> : <section className="detail section">
      <div><span className="eyebrow">Visão geral</span><h2>Escolha técnica com <em>apoio comercial.</em></h2><p>Nossa equipe ajuda sua empresa a confirmar aplicação, disponibilidade e especificações antes da compra. Assim, você indica a solução correta e negocia com mais segurança.</p></div>
      <div className="detail-cards"><div><Icon name="shield" /><b>Procedência</b><span>Produto comercializado por uma distribuidora com mais de 27 anos.</span></div><div><Icon name="people" /><b>Atendimento B2B</b><span>Orientação para revendas, integradores e empresas.</span></div><div><Icon name="energy" /><b>Ficha sob consulta</b><span>Confirme dados técnicos e disponibilidade com um especialista.</span></div></div>
    </section>}
    {product.brand === "Bluetti" && product.segment === "energia" && <div className="bluetti-comparison-wrap section"><BluettiComparison key={product.slug} initialSlug={product.slug} /></div>}
    <section className="related section premium-100-related"><div className="related-heading"><SectionTitle eyebrow="Continue explorando" title={<>Outras soluções da <em>mesma linha.</em></>} /><div className="related-search-wrap"><label className="related-search"><span>Buscar em todo o catálogo</span><input type="search" value={relatedSearch} onChange={(event) => { setRelatedSearch(event.target.value); setRelatedOpen(true); }} onFocus={() => setRelatedOpen(true)} onBlur={() => window.setTimeout(() => setRelatedOpen(false), 120)} onKeyDown={(event) => { if (event.key === "Escape") setRelatedOpen(false); }} placeholder="Buscar marca ou modelo" aria-autocomplete="list" aria-controls="related-suggestions" aria-expanded={relatedOpen && !!relatedSearch.trim()} /></label>{relatedOpen && !!relatedSearch.trim() && <div id="related-suggestions" className="related-suggestions" role="list">{searchSuggestions.length ? searchSuggestions.map((item) => <ProductLink productSlug={item.slug} key={item.id} role="listitem" onClick={() => setRelatedOpen(false)}><b data-product-name-style={item.segment !== "energia" && item.segment !== "solar" ? "code" : undefined}>{item.model}</b><span>{item.brand}</span><small>{segmentLabel(item.segment)}</small></ProductLink>) : <span className="related-no-results">Nenhum produto encontrado.</span>}</div>}</div></div><div className="product-carousel-track" role="region" aria-label={`Produtos ${product.brand} recomendados`} tabIndex={0}>{suggestedProducts.map((item) => <ProductCard product={item} key={item.id} />)}<Link href={brandCatalogHref[product.brand]} className="related-more-card"><span><Icon name="arrow" />Ver mais</span><small>Todos os produtos {product.brand}</small></Link></div></section>
    <Cta />
  </Shell>;
}

function About() {
  return <Shell>
    <section className="page-hero about-hero"><span className="eyebrow light">A Sol Distribuidora</span><h1>Experiência que gera<br /><em>confiança e movimento.</em></h1><p>Desde 1999, construímos relações duradouras oferecendo soluções em armazenamento e geração de energia para todo o Brasil.</p></section>
    <section className="story section"><div><span className="eyebrow">Nossa história</span><h2 className="story-title">Há mais de 27 anos oferecendo<br />soluções em armazenamento<br />e <em>geração de energia.</em></h2></div><div className="story-copy"><p>A Distribuidora Sol surgiu em 1999, com sede em Curitiba (PR), para fornecer baterias de qualidade com rapidez e eficiência.</p><p>Com uma equipe capacitada e experiente em processos logísticos, hoje atendemos todo o Brasil em parceria com as principais transportadoras do país, além de trabalhar com frota própria.</p><p>A Sol tem estrutura, pessoas e experiência.</p></div></section>
    <section className="why-sol section"><div className="why-sol-heading"><span className="eyebrow">Veja porque escolher a</span><h2>Distribuidora <em>Sol</em></h2><div className="why-sol-value-cards"><Value icon="truck" title="Logística nacional" text="Frota própria e parceria com transportadoras para atender todo o Brasil." /><Value icon="people" title="Equipe especializada" text="Atendimento próximo, consultivo e preparado para cada etapa da venda." /><Value icon="shield" title="Pós-venda presente" text="Suporte que continua depois da comercialização do produto." /></div></div><ol className="why-sol-list"><li><strong>01</strong><p>Distribuidora autorizada das principais marcas de baterias.</p></li><li><strong>02</strong><p>Envio ágil em até 1 dia útil*, a partir da data de pagamento confirmada.<small>* Para pedidos faturados até 11 am.</small></p></li><li><strong>03</strong><p>Descontos exclusivos para compras corporativas ou por atacado.</p></li><li><strong>04</strong><p>Comprometimento com a sustentabilidade, a partir do programa Ecosteps.</p></li></ol></section>
    <StructureExperience />
    <Cta />
  </Shell>;
}

function StructureExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section || window.innerWidth <= 780) return setProgress(1);
      const distance = section.offsetHeight - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance)));
    };
    const requestUpdate = () => { if (!frame) frame = window.requestAnimationFrame(updateProgress); };
    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("scroll", requestUpdate); window.removeEventListener("resize", requestUpdate); };
  }, []);

  const cardStyle = (index: number) => {
    const transition = Math.min(1, Math.max(0, (progress - 0.14) / 0.72));
    const eased = transition * transition * transition * (transition * (transition * 6 - 15) + 10);
    if (!index) {
      return { opacity: 1, transform: "none" };
    }
    return { opacity: 1, transform: `translateY(calc(${(1 - eased) * 125}% + ${eased * 10}px))` };
  };

  return <section ref={sectionRef} className="structure-scroll">
    <div className="structure-scroll-sticky">
      <div className="structure-scroll-heading"><span className="eyebrow">Nossa estrutura</span><h2>Capacidade para<br /><em>ir mais longe.</em></h2></div>
      <div className="structure-cards">
        <article className="structure-card" style={cardStyle(0)}><img src="/cd-curitiba-2.png" alt="Centro de distribuição 1 da Sol em Curitiba" /><div><b>Curitiba · CD 1</b><span>Escritório comercial, testes de garantia e capacidade para mais de 60 mil baterias.</span></div></article>
        <article className="structure-card" style={cardStyle(1)}><img src="/cd-sao-paulo.png" alt="Centro de distribuição 2 da Sol em Curitiba" /><div><b>Curitiba · CD 2</b><span>Centro de distribuição que amplia nossa capacidade logística e atendimento.</span></div></article>
      </div>
    </div>
  </section>;
}

function Value({ icon, title, text }: { icon: "truck" | "people" | "shield" | "leaf" | "energy"; title: string; text: string }) { return <div><Icon name={icon} /><b>{title}</b><p>{text}</p></div>; }

function Sustainability() {
  return <Shell>
    <section className="page-hero sustainability-hero"><span className="eyebrow light">Responsabilidade ambiental</span><h1>Energia com propósito.<br /><em>Futuro com responsabilidade.</em></h1><p>Eficiência, descarte correto e escolhas responsáveis fazem parte da forma como a Sol conduz seus negócios.</p></section>
    <section className="circular-economy section">
      <div className="circular-economy-heading"><span className="eyebrow">Economia circular em ação</span><h2>Baterias que voltam a<br /><em>gerar valor.</em></h2></div>
      <div className="circular-economy-copy"><p>Na Sol Distribuidora, sustentabilidade também faz parte do caminho da energia. Por meio do Programa Mundial Ecosteps®, contribuímos para o descarte correto de baterias automotivas e para a reciclagem de até 99% de seus componentes.</p><p>A logística reversa permite que materiais como chumbo, plástico e ácido sejam encaminhados para reaproveitamento, reduzindo o descarte inadequado e ajudando a preservar os recursos naturais.</p><aside><strong>Até 99%</strong><span>dos componentes podem ser reciclados</span><p>O descarte correto ajuda a transformar baterias esgotadas em matéria-prima para novas soluções.</p></aside></div>
      <div className="circular-economy-image"><img src="/economia-circular-baterias-v1.webp" alt="Economia circular e reaproveitamento de baterias" /></div>
    </section>
    <section className="battery-cycle">
      <div className="battery-cycle-heading"><span className="eyebrow">O ciclo sustentável da bateria</span><h2>Um ciclo que gera<br /><em>impacto positivo.</em></h2><p>O ciclo sustentável começa com o consumidor, que devolve a bateria usada ao adquirir uma nova. A Sol Distribuidora e seus parceiros encaminham esse material aos pontos de coleta e reciclagem, onde seus componentes são reaproveitados na fabricação de novas baterias.</p><p>Esse processo conecta consumidores, distribuidores, revendas e fabricantes em uma cadeia mais responsável, que reduz resíduos e mantém materiais importantes em circulação.</p></div>
      <figure className="battery-cycle-visual"><img src="/sustentabilidade-oficial.png" alt="Ciclo de logística reversa de baterias" /></figure>
      <ol className="battery-cycle-steps"><li><b>01</b><strong>Consumidor</strong><span>Compra uma bateria nova e devolve a usada.</span></li><li><b>02</b><strong>Distribuidor ou revenda</strong><span>Recebe e direciona a bateria esgotada.</span></li><li><b>03</b><strong>Coleta</strong><span>As baterias são recolhidas para reciclagem.</span></li><li><b>04</b><strong>Reciclagem</strong><span>Os materiais são separados e reaproveitados.</span></li><li><b>05</b><strong>Fabricação</strong><span>A matéria-prima retorna à produção de novas baterias.</span></li><li><b>06</b><strong>Distribuição</strong><span>Novas baterias chegam novamente ao mercado.</span></li></ol>
    </section>
    <section className="clean-energy"><div><span className="eyebrow">Energia para um futuro mais limpo</span><h2>Escolhas que geram<br /><em>impacto positivo.</em></h2><p>Além da logística reversa, a Sol Distribuidora investe em práticas que apoiam uma matriz energética mais limpa. Utilizamos energia solar e contamos com estação de carregamento para carros elétricos, reforçando nosso compromisso com escolhas que geram impacto positivo hoje e no futuro.</p></div><div className="clean-energy-cards"><article><Icon name="energy" /><h3>Energia solar</h3><p>Aproveitamos a energia do sol para tornar nossa operação mais eficiente.</p></article><article><Icon name="energy" /><h3>Mobilidade elétrica</h3><p>Contamos com estação de carregamento para veículos elétricos em nossa estrutura.</p></article></div></section>
    <section className="sustainability-closing section"><p>Descarte sua bateria corretamente. Juntos, transformamos responsabilidade em energia para o futuro.</p><a className="button blue" href={WHATSAPP} target="_blank" rel="noreferrer">Fale com a Sol <Icon name="arrow" /></a></section>
  </Shell>;
}

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const payload = {
      nome: String(fields.get("nome") ?? "").trim(),
      empresa: String(fields.get("empresa") ?? "").trim(),
      telefone: String(fields.get("telefone") ?? "").trim(),
      email: String(fields.get("email") ?? "").trim(),
      mensagem: String(fields.get("mensagem") ?? "").trim(),
      website: String(fields.get("website") ?? "").trim(),
      consentimento: fields.get("consentimento") === "on",
    };

    setIsSubmitting(true);
    setSubmissionError("");

    try {
      await fetch(CONTACT_LEADS_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      const whatsappMessage = [
        "Olá, gostaria de falar com a Sol.",
        "",
        `Nome: ${payload.nome}`,
        `Empresa: ${payload.empresa || "Não informada"}`,
        `Telefone: ${payload.telefone}`,
        `E-mail: ${payload.email}`,
        "",
        "Mensagem:",
        payload.mensagem,
      ].join("\n");

      window.location.assign(`https://wa.me/5541998220358?text=${encodeURIComponent(whatsappMessage)}`);
    } catch {
      setSubmissionError("Não foi possível enviar seus dados agora. Tente novamente em instantes.");
      setIsSubmitting(false);
    }
  }

  return <Shell>
    <section className="page-hero compact"><span className="eyebrow light">Contato</span><h1>Como podemos ajudar?</h1><p>Converse com a nossa equipe comercial e encontre a solução ideal para a sua revenda ou empresa.</p></section>
    <section className="contact section"><div className="contact-info"><span className="eyebrow">Fale com a Sol</span><h2>Atendimento próximo,<br /><em>resposta objetiva.</em></h2><a href="tel:+554132775080"><Icon name="phone" /><span><small>Telefone</small>(41) 3277-5080</span></a><a href="mailto:atendimento@distribuidorasol.com.br"><Icon name="mail" /><span><small>E-mail</small>atendimento@distribuidorasol.com.br</span></a><div><Icon name="pin" /><span><small>Endereço</small>Rua das Carmelitas, 1581<br />Curitiba · PR · CEP 81650-060</span></div></div>
      <form className="contact-form" onSubmit={handleSubmit}><div><label>Nome completo<input name="nome" required /></label><label>Empresa<input name="empresa" /></label></div><div><label>Telefone<input name="telefone" type="tel" required /></label><label>E-mail<input name="email" type="email" required /></label></div><label>Como podemos ajudar?<textarea name="mensagem" rows={5} required /></label><label className="contact-trap" aria-hidden="true">Site<input name="website" tabIndex={-1} autoComplete="off" /></label><label className="consent"><input name="consentimento" type="checkbox" required /> Li e aceito a <Link href="/politica-de-privacidade">Política de Privacidade</Link>.</label>{submissionError && <p className="contact-form-error" role="alert">{submissionError}</p>}<button className="button blue" type="submit" disabled={isSubmitting}>{isSubmitting ? "Enviando..." : "Enviar mensagem"} <Icon name="arrow" /></button></form>
    </section>
  </Shell>;
}

function Privacy() {
  return <Shell><section className="page-hero compact"><span className="eyebrow light">Privacidade</span><h1>Política de Privacidade</h1><p>Transparência também faz parte das nossas relações digitais.</p></section><article className="legal section"><h2>Como tratamos seus dados</h2><p>A Sol Distribuidora utiliza os dados informados em seus canais de contato exclusivamente para responder solicitações, preparar atendimentos comerciais e manter o relacionamento com clientes e parceiros.</p><h3>Dados coletados</h3><p>Podemos receber nome, empresa, telefone, e-mail e informações enviadas voluntariamente em formulários ou conversas.</p><h3>Finalidade e segurança</h3><p>Os dados são usados para atendimento, cotações e comunicações relacionadas aos serviços solicitados. Aplicamos medidas razoáveis de segurança e não comercializamos informações pessoais.</p><h3>Seus direitos</h3><p>Você pode solicitar acesso, correção ou exclusão de seus dados pelo e-mail <a href="mailto:atendimento@distribuidorasol.com.br">atendimento@distribuidorasol.com.br</a>.</p></article></Shell>;
}

function NotFoundPage() {
  return <Shell><section className="not-found section"><span className="eyebrow">Página não encontrada</span><h1>A energia continua por aqui.</h1><p>O endereço acessado mudou ou não está disponível.</p><Link className="button blue" href="/">Voltar ao início <Icon name="arrow" /></Link></section></Shell>;
}

export function SitePage({ slug }: { slug: string }) {
  const resolved = PAGE_IDS[slug] || slug;
  useLayoutEffect(() => {
    const target = pendingProductScroll;
    pendingProductScroll = null;
    if (target === resolved) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [resolved]);
  useEffect(() => {
    const cancelProductScroll = () => { pendingProductScroll = null; };
    window.addEventListener("popstate", cancelProductScroll);
    return () => window.removeEventListener("popstate", cancelProductScroll);
  }, []);
  if (resolved === "home" || resolved === "home-nova") return <Home />;
  if (resolved === "produtos") return <Catalog heroVideo />;
  if (resolved === "sobre-nos") return <About />;
  if (resolved === "sustentabilidade") return <Sustainability />;
  if (resolved === "contato") return <Contact />;
  if (resolved === "politica-de-privacidade") return <Privacy />;
  if (resolved === "baterias-estacionarias") return <StationaryCatalog />;
  if (resolved === "bluetti-estacoes-de-energia") return <BluettiCatalog />;
  if (resolved === "heliar-baterias-automotivas") return <HeliarCatalog />;
  if (resolved === "econ-baterias-automotivas") return <EconCatalog />;
  if (resolved === "freedom-baterias-estacionarias") return <BrandGridCatalog brand="Freedom" eyebrow="Portfólio Freedom" title="Baterias estacionárias" intro="Portfólio de baterias estacionárias para aplicações profissionais." />;
  if (resolved === "econ-vrla-baterias-estacionarias") return <BrandGridCatalog brand="eCON VRLA" eyebrow="Portfólio eCON VRLA" title="Baterias estacionárias" intro="Baterias seladas para energia de emergência, telecom e outras aplicações." />;
  const meta = CATEGORY_META[resolved as keyof typeof CATEGORY_META];
  if (meta) return <Catalog title={meta[0]} intro={meta[1]} filter={meta[2]} />;
  const product = PRODUCTS.find((p) => p.slug === resolved);
  if (product) return <ProductDetail key={product.slug} product={product} />;
  return <NotFoundPage />;
}
