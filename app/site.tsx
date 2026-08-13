"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CATEGORY_META, PAGE_IDS, PRODUCTS, type Product } from "./data";

const WHATSAPP = "https://api.whatsapp.com/send?phone=5541998220358&text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Sol.";
const CONTACT_LEADS_ENDPOINT = "https://script.google.com/macros/s/AKfycbwN1U6lRr3ZYtpF8mlgUeQGr7FpC9YculkBb67sDmMdF9bMgMDCPtmNd9e_iDBwLXmr/exec";
const HOME_SCROLL_FRAME_COUNT = 97;
const HOME_SCROLL_VIDEO_END = 6 / 11;

const PRODUCT_IMAGES: Record<string, string> = {
  "elementor-601": "/freedom-df300.png",
  "freedom-df500": "/freedom-df500.png",
  "freedom-df700": "/freedom-df700.png",
  "freedom-df1000": "/freedom-df1000.png",
  "freedom-df1500": "/freedom-df1500.png",
  "freedom-df1000-copy": "/freedom-df2000.png",
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
  "secpower-sp12-5": "/econ-vrla-ep12-5.webp",
  "secpower-sp12-7s": "/econ-vrla-ep12-7w.webp",
  "secpower-sp12-9": "/econ-vrla-ep12-7.webp",
  "secpower-sp12-12": "/econ-vrla-ep12-9.webp",
  "secpower-sp12-18": "/econ-vrla-ep12-12.webp",
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
  const symbols = { arrow: "↗", check: "✓", phone: "☎", pin: "●", mail: "@", leaf: "◆", shield: "◈", truck: "▰", people: "●●", energy: "ϟ" };
  return <span className={`icon icon-${name}`} aria-hidden="true">{symbols[name]}</span>;
}

function Brand({ variant = "blue" }: { variant?: "blue" | "white" }) {
  return <Link href="/" className="brand" aria-label="Sol Distribuidora — página inicial"><img src={`/sol-logo-${variant}-crop.png`} alt="Sol Distribuidora" /></Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="header">
    <div className="nav-wrap">
      <Brand />
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Abrir menu"><span /><span /></button>
      <nav className={open ? "nav open" : "nav"} aria-label="Navegação principal">
        <Link href="/produtos" onClick={() => setOpen(false)}>Soluções</Link>
        <Link href="/sobre-nos" onClick={() => setOpen(false)}>A Sol</Link>
        <Link href="/sustentabilidade" onClick={() => setOpen(false)}>Sustentabilidade</Link>
        <Link href="/contato" onClick={() => setOpen(false)}>Contato</Link>
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
  return <div className={`hero-photo ${className}`.trim()}>
    <picture>
      <source media="(max-width: 780px)" srcSet="/sol-hero-mobile.webp" />
      <img src="/sol-hero.webp" alt="Fachada da Sol Distribuidora" />
    </picture>
  </div>;
}

function TrustStrip() {
  const stripRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 780px)");
    let interval: number | undefined;

    const stopRotation = () => {
      if (interval) window.clearInterval(interval);
      interval = undefined;
    };
    const startRotation = () => {
      if (interval || !mobileQuery.matches) return;
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
    return () => {
      stopRotation();
      observer.disconnect();
      mobileQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  const items = ["Portfólio especializado", "Atendimento consultivo", "Logística nacional", "Suporte e pós-venda"];
  return <section ref={stripRef} className="trust-strip">{items.map((item, index) => {
    const isActive = index === activeIndex;
    const isPrevious = index === (activeIndex + items.length - 1) % items.length;
    return <span className={isActive ? "is-active" : isPrevious ? "is-previous" : ""} aria-hidden={!isActive} key={item}>{item}</span>;
  })}</section>;
}

function HomeScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 781px)");
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
      let targetFrame = 0;
      let animationFrame = 0;

      const drawFrame = (index: number) => {
        const frame = frames[index];
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

      const updateFrame = () => {
        const start = section.offsetTop;
        const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
        const progress = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
        const videoProgress = Math.min(1, progress / HOME_SCROLL_VIDEO_END);
        section.classList.toggle("is-copy-visible", videoProgress >= 0.5);
        targetFrame = Math.round(videoProgress * (HOME_SCROLL_FRAME_COUNT - 1));
        window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(() => drawFrame(targetFrame));
      };

      frames.forEach((frame, index) => {
        frame.onload = () => {
          if (index === targetFrame) drawFrame(index);
        };
        frame.src = `/home-scroll-video/frame-${String(index).padStart(3, "0")}.webp`;
      });
      updateFrame();
      window.addEventListener("scroll", updateFrame, { passive: true });
      window.addEventListener("resize", updateFrame);
      return () => {
        window.cancelAnimationFrame(animationFrame);
        window.removeEventListener("scroll", updateFrame);
        window.removeEventListener("resize", updateFrame);
        section.classList.remove("is-copy-visible");
      };
    };

    const updateMode = () => {
      dispose();
      dispose = initialize() || (() => { });
    };
    updateMode();
    desktop.addEventListener("change", updateMode);
    return () => {
      dispose();
      desktop.removeEventListener("change", updateMode);
    };
  }, []);

  return <section ref={sectionRef} className="home-scroll-video"><div className="home-scroll-video-sticky"><canvas ref={canvasRef} /><div className="home-scroll-video-copy"><h2>A Distribuidora Sol</h2><p>Posicionada para atuar no ramo atacadista de todas as linhas de baterias, a Distribuidora Sol vem, a cada ano, incrementando resultados e crescendo juntamente de nossos clientes e parceiros.</p><p>Graças à filosofia de trabalho de procurar exceder às expectativas de nossos clientes, a Distribuidora Sol hoje é reconhecida no mercado em que atua pela seriedade e competência em oferecer produtos de alta tecnologia que atendam satisfatoriamente às necessidades dos seus clientes, desde pequenas revendas à grandes corporações.</p></div></div></section>;
}

function NumbersStrip() {
  const stripRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 780px)");
    let interval: number | undefined;

    const stopRotation = () => {
      if (interval) window.clearInterval(interval);
      interval = undefined;
    };
    const startRotation = () => {
      if (interval || !mobileQuery.matches) return;
      interval = window.setInterval(() => setActiveIndex((current) => (current + 1) % 3), 2800);
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
    return () => {
      stopRotation();
      observer.disconnect();
      mobileQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  const items = [["+27", "anos construindo confiança"], ["260 mil", "baterias em capacidade de armazenagem"], ["2 CDs", "Curitiba · PR"]];
  return <section ref={stripRef} className="numbers section">{items.map(([value, label], index) => {
    const isActive = index === activeIndex;
    const isPrevious = index === (activeIndex + items.length - 1) % items.length;
    return <div className={isActive ? "is-active" : isPrevious ? "is-previous" : ""} key={value}><strong>{value}</strong><span>{label}</span></div>;
  })}</section>;
}

function Home() {
  useEffect(() => {
    let previousPosition = window.scrollY;
    const updateHeader = () => {
      const currentPosition = window.scrollY;
      const isScrollingDown = currentPosition > previousPosition && currentPosition > 86;
      document.body.classList.toggle("home-header-hidden", isScrollingDown);
      previousPosition = currentPosition;
    };
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateHeader);
      document.body.classList.remove("home-header-hidden");
    };
  }, []);

  return <Shell>
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow light">Distribuição B2B · Desde 1999</span>
        <h1>Energia para o presente.<br /><em>Soluções para o futuro.</em></h1>
        <p>Baterias, estações de energia e suporte especializado para fortalecer o seu negócio.</p>
        <div className="hero-actions"><a className="button yellow" href={WHATSAPP} target="_blank" rel="noreferrer">Seja um parceiro Sol <Icon name="arrow" /></a><Link className="text-link light" href="/produtos">Conheça o portfólio <Icon name="arrow" /></Link></div>
        <div className="hero-proof-label"><i /> Soluções para revendas e empresas</div>
        <div className="hero-proof"><div><strong>+27</strong><span>anos de mercado</span></div><div><strong>2</strong><span>centros de distribuição</span></div><div><strong>Brasil</strong><span>atendimento nacional</span></div></div>
      </div>
      <HeroPhoto className="hero-photo-background" />
    </section>

    <TrustStrip />
    <HomeScrollVideo />

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
      <div className="partnership-art"><img src="/sol-drive-02.jpg" alt="Fachada da Sol Distribuidora e frota própria" /><div className="photo-caption"><img src="/sol-symbol-white-crop.png" alt="" /><span>Estrutura e logística próprias</span></div></div>
      <div className="partnership-copy"><SectionTitle eyebrow="Parceria de verdade" title={<>Mais do que distribuir.<br /><em>Impulsionamos resultados.</em></>} />
        <p>Da escolha do produto ao pós-venda, nossa equipe está ao lado da sua empresa com conhecimento técnico, agilidade e transparência.</p>
        <ul><li><Icon name="check" /> Consultoria comercial especializada</li><li><Icon name="check" /> Suporte antes, durante e depois da venda</li><li><Icon name="check" /> Estrutura logística para atender todo o Brasil</li></ul>
        <Link className="button blue" href="/sobre-nos">Conheça a Sol <Icon name="arrow" /></Link>
      </div>
    </section>

    <NumbersStrip />
    <PartnerTestimonials />
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

  return <Link ref={cardRef} href={href} className={`solution-card solution-card-reveal${featuredImage ? " solution-card-featured" : ""}`}><div className="card-head"><Icon name="arrow" /></div><div className="product-image"><img src={image} alt="" /></div><h3>{title}</h3><p>{text}</p><b>Explorar linha</b></Link>;
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

  return <div ref={cardRef} className="testimonial-card testimonial-card-reveal"><img src={image} alt={`Depoimento de parceiro Sol ${index + 1}`} /></div>;
}

const clean = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const BRAND_ORDER: Product["brand"][] = ["Freedom", "Heliar", "eCON", "eCON VRLA", "Bluetti"];

function productNiche(product: Product) {
  if (product.brand === "Heliar") {
    if (product.model.startsWith("HAGM")) return "AGM Tech";
    if (product.model.startsWith("HEFB")) return "EFB Tech";
    if (/^(HS?100|HS?150|HS?180|HT180)/.test(product.model)) return "Frota";
    return "SLI Tech";
  }
  if (product.brand === "eCON") {
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
  const visibleProducts = selectedNiche === "Todos" ? products : products.filter((product) => productNiche(product) === selectedNiche);
  const headingId = `brand-${brand.toLowerCase().replace(/\s+/g, "-")}`;
  if (!products.length) return null;

  return <section className="brand-carousel" aria-labelledby={headingId}>
    <div className="brand-carousel-heading">
      <h2 id={headingId}>{brand}</h2>
      {hasFilter && <label className="brand-filter"><span>Tipo de produto</span><select value={selectedNiche} onChange={(event) => setSelectedNiche(event.target.value)} aria-label={`Filtrar produtos ${brand} por tipo`}><option>Todos</option>{niches.map((niche) => <option key={niche}>{niche}</option>)}</select></label>}
    </div>
    <div className="product-carousel-track" role="region" aria-label={`Produtos ${brand}`} tabIndex={0}>
      {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  </section>;
}

function ProductCarousels({ products }: { products: Product[] }) {
  return <div className="product-carousels">{BRAND_ORDER.map((brand) => <BrandCarousel key={brand} brand={brand} products={products.filter((product) => product.brand === brand)} />)}</div>;
}

function Catalog({ title = "Nosso portfólio", intro = "Encontre a solução certa para o seu negócio.", filter }: { title?: string; intro?: string; filter?: string }) {
  const [search, setSearch] = useState("");
  const list = useMemo(() => PRODUCTS.filter((product) => {
    const matchesFilter = !filter || product.segment === filter || product.brand === filter;
    return matchesFilter && clean(`${product.brand} ${product.model}`).includes(clean(search));
  }), [search, filter]);
  return <Shell>
    <section className="page-hero compact"><span className="eyebrow light">Portfólio Sol</span><h1>{title}</h1><p>{intro}</p></section>
    <section className="catalog section">
      <div className="catalog-tools"><div><strong>{list.length}</strong><span> soluções encontradas</span></div><label><span>Buscar por marca ou modelo</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ex.: Heliar, DF1500, Bluetti…" /></label></div>
      <ProductCarousels products={list} />
      {!list.length && <div className="empty">Nenhum produto encontrado. Tente outro termo.</div>}
    </section>
    <Cta />
  </Shell>;
}

function StationaryCatalog() {
  return <Catalog title="Baterias estacionárias" intro="Linhas profissionais organizadas por marca para facilitar a escolha da solução ideal." filter="estacionaria" />;
}

function BluettiCatalog() {
  const [search, setSearch] = useState("");
  const stations = useMemo(() => PRODUCTS.filter((product) => product.brand === "Bluetti" && product.segment === "energia" && clean(`${product.brand} ${product.model}`).includes(clean(search))), [search]);
  const panels = useMemo(() => PRODUCTS.filter((product) => product.brand === "Bluetti" && product.segment === "solar" && clean(`${product.brand} ${product.model}`).includes(clean(search))), [search]);
  const total = stations.length + panels.length;
  return <Shell>
    <section className="page-hero compact"><span className="eyebrow light">Portfólio Bluetti</span><h1>Energia portátil e solar</h1><p>Estações de energia e painéis solares para autonomia, mobilidade e novas oportunidades de negócio.</p></section>
    <section className="stationary-catalog section">
      <div className="catalog-tools"><div><strong>{total}</strong><span> soluções encontradas</span></div><label><span>Buscar por modelo</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ex.: AC70P, Elite 300, Sora 130…" /></label></div>
      {!!stations.length && <div className="catalog-group"><div className="catalog-group-heading"><span className="eyebrow">Energia portátil</span><h2>Estações de energia</h2><p>Soluções Bluetti para backup, mobilidade e operações dentro e fora da rede.</p></div><div className="product-grid">{stations.map((product) => <ProductCard key={product.id} product={product} />)}</div></div>}
      {!!panels.length && <div className="catalog-group bluetti-solar-group"><div className="catalog-group-heading"><span className="eyebrow">Geração solar</span><h2>Painéis solares</h2><p>Painéis portáteis para captar energia solar e ampliar a autonomia das estações Bluetti.</p></div><div className="product-grid">{panels.map((product) => <ProductCard key={product.id} product={product} />)}</div></div>}
      {!total && <div className="empty">Nenhum produto encontrado. Tente outro termo.</div>}
    </section>
    <Cta />
  </Shell>;
}

function ProductCard({ product }: { product: Product }) {
  const image = PRODUCT_IMAGES[product.slug];
  return <Link href={`/${product.slug}`} className="product-card"><span className="product-brand">{product.brand}</span>{image ? <div className={`product-art real${product.brand === "Heliar" ? " heliar-product-art" : ""}`} style={heliarImageStyle(product)}><img src={image} alt={product.model} /></div> : <div className={`product-art ${product.segment}`}><i /><i /><b>{product.model.slice(0, 8)}</b></div>}<h3>{product.model}</h3><p>{segmentLabel(product.segment)}</p><span className="card-link">Ver solução <Icon name="arrow" /></span></Link>;
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
    ["Frota", "Soluções para veículos e operações de frota.", (product: Product) => productNiche(product) === "Frota"],
  ] as const;
  return <Shell>
    <section className="page-hero compact"><span className="eyebrow light">Portfólio Heliar</span><h1>Baterias automotivas</h1><p>Linha automotiva para uma oferta completa e confiável.</p></section>
    <section className="stationary-catalog section heliar-catalog">
      <div className="catalog-tools"><div><strong>{products.length}</strong><span> soluções encontradas</span></div><label><span>Buscar por modelo</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ex.: H40JD, HAGM60HD, H100LE…" /></label></div>
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
    ["SLI", "Baterias convencionais para aplicações automotivas.", (product: Product) => productNiche(product) === "SLI"],
    ["EFB", "Tecnologia EFB para veículos com maior demanda elétrica.", (product: Product) => productNiche(product) === "EFB"],
    ["AGM", "Linha AGM para desempenho e exigência elétrica elevados.", (product: Product) => productNiche(product) === "AGM"],
  ] as const;
  return <Shell>
    <section className="page-hero compact"><span className="eyebrow light">Portfólio eCON</span><h1>Baterias automotivas</h1><p>Soluções automotivas para ampliar o portfólio da sua revenda.</p></section>
    <section className="stationary-catalog section econ-catalog">
      <div className="catalog-tools"><div><strong>{products.length}</strong><span> soluções encontradas</span></div><label><span>Buscar por modelo</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ex.: EGM60HD-24, EFB50GD-24, E45BD-18…" /></label></div>
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
      <div className="catalog-tools"><div><strong>{products.length}</strong><span> soluções encontradas</span></div><label><span>Buscar por modelo</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Ex.: ${products[0]?.model ?? "produto"}…`} /></label></div>
      {!!products.length && <div className="catalog-group"><div className="catalog-group-heading"><span className="eyebrow">Linha {brand}</span><h2>Produtos</h2><p>{intro}</p></div><div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></div>}
      {!products.length && <div className="empty">Nenhum produto encontrado. Tente outro termo.</div>}
    </section>
    <Cta />
  </Shell>;
}

type BluettiContent = { datasheet: [string, string][]; intro: string; advantages: [string, string][]; summary: string };
const BLUETTI_CONTENT: Partial<Record<string, BluettiContent>> = {
  "bluetti-ac50": { datasheet: [["Saída contínua", "700 W, com modo de elevação de potência de até 1.000 W."], ["Capacidade", "448 Wh."], ["Entradas e recarga", "Entrada CA de até 580 W e solar de até 200 W. Recarga CA: cerca de 45 min até 80% e 70 min até 100%; solar: cerca de 2,7 h; veículo: 4,9 h em 12 V ou 2,7 h em 24 V."], ["Saídas / compatibilidade", "1 tomada CA de 700 W; 2 USB-C de até 65 W cada; 1 USB-A de 15 W; 1 porta veicular de 12 V/10 A (120 W)."], ["Tecnologia e segurança", "LiFePO4, mais de 3.000 ciclos até 80%, BMS, controlador MPPT, recarga pass-through e UPS com comutação de até 20 ms."], ["Dimensões e peso", "280 x 200 x 220 mm; 7,5 kg."], ["Garantia", "5 anos."]], intro: "A página oficial atual associada ao nome AC50 é a do AC50B, modelo de 448 Wh e 700 W. Ele atende acampamentos, viagens de carro, lazer ao ar livre e backup de itens essenciais com bom equilíbrio entre autonomia e peso.", advantages: [["Potência versátil", "opera eletrônicos e pequenos eletrodomésticos, com margem adicional para cargas resistivas."], ["Recarga em várias fontes", "aceita tomada, painel solar, veículo, gerador, bateria B80 e combinações de entrada."], ["Portas úteis no dia a dia", "USB-C, USB-A, CA e saída automotiva atendem equipamentos diversos."], ["Gestão inteligente", "o BMS e o MPPT otimizam proteção, carga e aproveitamento da energia."], ["Backup rápido", "a função UPS reduz interrupções em roteadores, iluminação e eletrônicos compatíveis."]], summary: "Mesmo descontinuado no catálogo europeu, o AC50B permanece uma referência portátil robusta, segura e simples de recarregar." },
  "bluetti-ac50p": { datasheet: [["Saída contínua", "700 W, com modo de elevação de potência de até 1.200 W."], ["Capacidade", "504 Wh."], ["Entradas e recarga", "Entrada CA Turbo de 600 W e solar de até 200 W. Recarga CA: 50 min até 80% e 80 min até 100%; solar: cerca de 2,7 h; veículo: 4,9 h em 12 V ou 2,7 h em 24 V."], ["Saídas / compatibilidade", "1 tomada CA de 700 W; 2 USB-C de 65 W; 1 USB-A de 15 W; 1 porta veicular de 12 V/10 A (120 W)."], ["Tecnologia e segurança", "LiFePO4, mais de 3.000 ciclos até 80%, BMS, MPPT, recarga pass-through e UPS com comutação de até 20 ms."], ["Dimensões e peso", "280 x 200 x 220 mm; 6,9 kg."], ["Garantia", "5 anos."]], intro: "A AC50P entrega 504 Wh e 700 W em um conjunto compacto, adequado para camping, viagens, pequenos escritórios móveis e reserva doméstica de curta duração.", advantages: [["Capacidade ampliada", "os 504 Wh oferecem mais tempo de uso para iluminação, refrigeração portátil e eletrônicos."], ["Modo de elevação", "até 1.200 W para determinadas cargas resistivas amplia os cenários de uso."], ["Carga rápida em tomada", "atinge 80% em aproximadamente 50 minutos."], ["Energia solar compatível", "a entrada de 200 W facilita autonomia fora da rede."], ["Vida útil prolongada", "química LFP e mais de 3.000 ciclos favorecem uso frequente com segurança."]], summary: "O conjunto privilegia mobilidade, flexibilidade de recarga e confiabilidade para rotinas externas ou emergenciais." },
  "bluetti-ac70p": { datasheet: [["Saída contínua", "1.000 W; modo de elevação de potência de até 2.000 W."], ["Capacidade", "864 Wh."], ["Entradas e recarga", "Entrada CA de até 950 W, solar de até 500 W (12-58 V, 10 A) e veículo 12/24 V. Recarga CA em cerca de 1,5-2 h; solar em 2,2-2,7 h; veículo em 9,1-9,6 h (12 V) ou 4,8-5,3 h (24 V)."], ["Saídas / compatibilidade", "2 tomadas CA, com 1.000 W totais; 2 USB-C de 100 W; 2 USB-A de 12 W; porta veicular de 12 V/10 A; e carregamento sem fio de 15 W."], ["Tecnologia e segurança", "LiFePO4, mais de 3.000 ciclos até 80%, onda senoidal pura, BMS, MPPT, recarga pass-through, UPS de 20 ms e certificações UL, CEC, DOE, FCC e CA Prop 65."], ["Dimensões e peso", "314 x 209,5 x 255,8 mm; 10,2 kg."], ["Garantia", "5 anos."]], intro: "Com 864 Wh e 1.000 W, a AC70P atende equipamentos de camping, ferramentas leves, eletrônicos e backup doméstico essencial, mantendo dimensões adequadas ao transporte.", advantages: [["Faixa de uso ampla", "1 kW cobre desde notebooks e TVs até pequenos eletrodomésticos."], ["Entrada solar de 500 W", "permite recuperar energia com rapidez em locais sem rede elétrica."], ["Diversidade de portas", "saídas CA, USB-C, USB-A, automotiva e sem fio reduzem a necessidade de adaptadores."], ["Controle pelo aplicativo", "monitoramento e ajustes remotos facilitam o gerenciamento energético."], ["UPS e bateria LFP", "proteção rápida e longa vida útil aumentam a confiabilidade em emergências."]], summary: "É uma opção intermediária consistente para quem busca autonomia, potência e recarga solar eficiente sem migrar para uma unidade muito pesada." },
  "bluetti-ac180p": { datasheet: [["Saída contínua", "1.800 W, com modo de elevação de potência de 2.700 W."], ["Capacidade", "1.440 Wh."], ["Entradas e recarga", "Entrada CA de até 1.440 W no modo Turbo, solar de até 500 W (12-60 V, 10 A) e veículo 12/24 V. Recarga CA em 1,3-1,8 h; solar em 2,8-3,3 h; veículo em 12-12,5 h (12 V) ou 6,3-6,8 h (24 V)."], ["Saídas / compatibilidade", "2 tomadas CA 230 V/7,8 A (1.800 W totais), USB-C de 100 W, dois grupos USB-A de 15 W, porta veicular 12 V/10 A e carregamento sem fio de 15 W."], ["Tecnologia e segurança", "LiFePO4, mais de 3.500 ciclos até 80%, onda senoidal pura, BMS, MPPT, recarga pass-through, controle pelo app e certificações UKCA, PSE, TELEC, RCM, CE, CA65 e UL."], ["Dimensões e peso", "340 x 247 x 317 mm; 16,4 kg."], ["Garantia", "5 anos."]], intro: "A AC180P reúne 1.440 Wh e 1.800 W para atender eletrodomésticos, equipamentos de viagem, home office e reserva residencial com maior autonomia.", advantages: [["Potência para cargas maiores", "opera uma variedade ampla de aparelhos domésticos e de lazer."], ["Recarga Turbo", "a entrada CA de 1.440 W reduz significativamente o tempo de preparação."], ["Quatro formas de recarga", "tomada, solar, veículo e gerador ampliam a disponibilidade de energia."], ["Nove saídas", "permite alimentar múltiplos dispositivos ao mesmo tempo."], ["Durabilidade", "células LFP e gerenciamento integrado favorecem muitos anos de uso seguro."]], summary: "O modelo equilibra potência elevada, autonomia e portabilidade para viagens longas, trabalho remoto e contingência residencial." },
  "bluetti-premium-100-v2": { datasheet: [["Saída CA", "1.800 W; saída CA+CC de até 2.000 W; modo de elevação de potência de 2.700 W."], ["Capacidade", "1.024 Wh."], ["Entradas e recarga", "Entrada CA para carga de até 1.200 W, entrada CC/solar de até 1.000 W (12-60 V, 20 A) e opções CA, solar, veículo, gerador ou CA+solar. A página informa 45 min até 80% e 70 min até 100% por CA; solar em cerca de 70 min."], ["Saídas / compatibilidade", "9 saídas: 2 tomadas CA; 1 porta veicular de 12 V/10 A; 2 DC5521 de 12 V/5 A; 2 USB-A de 15 W; 1 USB-C de 100 W; e 1 USB-C de 140 W."], ["Tecnologia e segurança", "LiFePO4, mais de 4.000 ciclos até 80%, BMS, MPPT, Wi-Fi e Bluetooth, UPS em até 10 ms e operação próxima de 30 dB sob cargas leves."], ["Dimensões e peso", "320 x 215 x 250 mm; 11,5 kg."], ["Garantia", "5 anos."]], intro: "A Premium 100 V2 oferece 1.024 Wh e até 2.000 W combinados em um corpo de 11,5 kg, voltado a camping, viagens, emergências e alimentação de aparelhos domésticos essenciais.", advantages: [["Alta relação potência-peso", "entrega energia suficiente para a maioria dos aparelhos comuns sem exigir um gabinete grande."], ["Solar de 1.000 W", "permite recarga completa em cerca de 70 minutos sob condições ideais."], ["USB-C de 140 W", "carrega notebooks de alto desempenho e eletrônicos modernos com rapidez."], ["UPS de 10 ms", "mantém roteadores, CPAPs e equipamentos sensíveis com mínima interrupção."], ["Bateria para longo prazo", "mais de 4.000 ciclos e química LFP reduzem a necessidade de substituição."]], summary: "É uma estação de 1 kWh especialmente atraente para quem valoriza recarga rápida, baixo peso e conectividade completa." },
  "bluetti-ac200pl": { datasheet: [["Saída contínua", "2.400 W; modo de elevação de potência de 3.600 W; potência de pico de 7.200 W."], ["Capacidade expansível", "2.304 Wh, expansível até aproximadamente 8,4 kWh."], ["Entradas e recarga", "Entrada CA Turbo de até 2.400 W, solar de até 1.200 W (12-145 V, 15 A) e veículo 12/24 V. A página informa cerca de 1,5 h por CA e 2,5 h com 1.200 W solares."], ["Saídas / compatibilidade", "4 tomadas CA 230 V/10,5 A (2.400 W totais), 2 USB-C de 100 W, 2 USB-A de 18 W, porta veicular 12 V/10 A, saída RV 48 V/8 A e 2 carregadores sem fio de 15 W."], ["Tecnologia e segurança", "LiFePO4, mais de 3.000 ciclos até 80%, onda senoidal pura, BMS, MPPT, recarga pass-through e certificações UN38.3, UL, FCC, IC, CE, RoHS, TELEC, PSE, RCM e LOA."], ["Dimensões e peso", "420 x 280 x 366,5 mm; 28,3 kg."], ["Garantia", "5 anos."]], intro: "A AC200PL combina 2.304 Wh e 2.400 W com expansão por baterias B210P, B230 e B300, sendo indicada para residências, motorhomes, oficinas e períodos prolongados fora da rede.", advantages: [["Capacidade expansível", "2.304 Wh, expansível até aproximadamente 8,4 kWh."], ["Saída de 48 V para RV", "facilita a integração com equipamentos de veículos recreativos."], ["Solar de 1.200 W", "permite recuperar grande quantidade de energia durante o dia."], ["Quatro tomadas CA", "distribui potência entre diferentes cargas com menos adaptadores."], ["Construção de longa duração", "LFP, BMS e conjunto amplo de certificações reforçam segurança e confiabilidade."]], summary: "O modelo atende quem precisa de uma plataforma modular, potente e preparada para autonomia prolongada em casa ou na estrada." },
  "bluetti-elite-200-v2": { datasheet: [["Saída contínua", "2.600 W; modo de elevação de potência de 3.900 W; potência de pico de 5.200 W."], ["Capacidade", "2.073,6 Wh."], ["Entradas e recarga", "Entrada CA de até 2.300 W, conforme o manual; solar de até 1.000 W (12-60 V, 20 A); veículo a 96 W em 12 V ou 192 W em 24 V; e entrada combinada CA+CC de até 2.400 W. A página informa 80% em cerca de 1,1 h."], ["Saídas / compatibilidade", "4 tomadas CA na versão US ou 2 tomadas CA na versão EU, com 2.600 W totais; 2 USB-C de 100 W; 2 USB-A de 15 W; e 1 porta veicular de 12 V/10 A. O total de dispositivos simultâneos varia conforme a versão regional, chegando a 9."], ["Tecnologia e segurança", "LiFePO4 de grau automotivo, mais de 6.000 ciclos até 80%, AI-BMS, onda senoidal pura, Wi-Fi e Bluetooth, recarga pass-through e sistema de refrigeração inteligente."], ["Dimensões e peso", "350 x 250 x 323,6 mm; 24,2 kg."], ["Garantia", "5 anos."]], intro: "A Elite 200 V2 oferece 2.073,6 Wh e 2.600 W para viagens de RV, camping, trabalho em campo e backup doméstico, com foco em alta durabilidade e carregamento rápido.", advantages: [["Mais de 6.000 ciclos", "a bateria suporta uso intensivo por muitos anos antes de chegar a 80% da capacidade original."], ["Saída de 2.600 W", "mantém vários equipamentos e eletrodomésticos de alta demanda."], ["TurboBoost", "atinge 80% em aproximadamente 1,1 hora."], ["AI-BMS", "monitora o desempenho da bateria em tempo real e reforça a proteção operacional."], ["Formato relativamente compacto", "entrega mais de 2 kWh em um corpo adequado a transporte em veículo."]], summary: "É uma escolha forte para usuários que precisam de alta potência portátil, longa vida útil e confiabilidade em uso frequente." },
  "bluetti-premium-200-v2": { datasheet: [["Saída contínua", "2.700 W; modo de elevação de potência de 4.050 W."], ["Capacidade", "2.073,6 Wh."], ["Entradas e recarga", "Entrada CA de até 2.300 W, conforme a versão regional, e solar de até 1.000 W. Seis formas de recarga: CA, solar, veículo, gerador, bateria chumbo-ácido e CA+solar. A página informa 0-80% em cerca de 1 h com entrada CA de 2.400 W."], ["Saídas / compatibilidade", "4 tomadas CA na versão US ou 2 tomadas CA na versão EU; 2 USB-C de 100 W; 2 USB-A; e saída veicular de 12 V/10 A."], ["Tecnologia e segurança", "Células LiFePO4 de grau automotivo, onda senoidal pura, AI-BMS, proteção contra sobrecorrente, sobretensão e combustão, Wi-Fi/Bluetooth, pass-through e UPS de aproximadamente 15 ms."], ["Dimensões e peso", "350 x 250 x 323,6 mm; 24,2 kg."], ["Garantia", "5 anos na página europeia."]], intro: "A Premium 200 V2 une 2.073,6 Wh a 2.700 W, oferecendo energia para eletrodomésticos, camping de longa duração, uso fora da rede e contingência residencial.", advantages: [["Saída de 2.700 W", "suporta cargas exigentes e múltiplos aparelhos ao mesmo tempo."], ["Recarga rápida", "atinge 80% em aproximadamente uma hora nas condições anunciadas."], ["Entrada solar de 1.000 W", "favorece autonomia prolongada longe da rede."], ["Seis rotas de recarga", "oferece alternativas úteis em casa, no carro ou em campo."], ["Proteção inteligente", "AI-BMS e células LFP automotivas reforçam segurança e estabilidade."]], summary: "O modelo prioriza potência, recarga flexível e construção robusta para usuários que exigem desempenho elevado sem expansão de bateria." },
  "bluetti-elite-300": { datasheet: [["Saída contínua", "2.400 W; modo de elevação de potência e potência de pico de 4.800 W."], ["Capacidade", "3.014,4 Wh."], ["Entradas e recarga", "Entrada CA de até 2.300 W na versão EU ou 1.800 W na versão US; CC/solar de até 1.200 W (12-60 V, 22 A); e entrada combinada CA+CC de até 2.400 W. A página informa cerca de 4,1 h para 100% via solar de 1.200 W."], ["Saídas / compatibilidade", "5 tomadas CA na versão US de 120 V ou 2 tomadas CA na versão brasileira de 220 V; 1 saída de 12 V/30 A; 1 USB-C de 100 W; 1 USB-C de 140 W; 2 USB-A de 15 W; e porta veicular de até 120 W."], ["Tecnologia e segurança", "LiFePO4, mais de 6.000 ciclos até 80%, BMS, Wi-Fi e Bluetooth, UPS em até 10 ms e recarga pass-through."], ["Dimensões e peso", "366 x 305 x 297,5 mm; 26,3 kg."], ["Garantia", "5 anos."]], intro: "A Elite 300 entrega mais de 3 kWh com 2.400 W, voltada a backup residencial, motorhomes, atividades externas e equipamentos de maior consumo que precisam de muitas horas de autonomia.", advantages: [["Grande reserva de energia", "3.014,4 Wh ampliam o tempo de funcionamento de refrigeração, comunicação e iluminação."], ["Porta 12 V/30 A", "alimenta geladeiras automotivas e sistemas de RV com menor perda por conversão."], ["Mais de 6.000 ciclos", "oferece longa vida útil para uso recorrente."], ["UPS de 10 ms", "mantém cargas críticas durante quedas de energia."], ["Controle remoto", "o aplicativo permite monitoramento, agendamentos e ativação por Wi-Fi/Bluetooth."]], summary: "A combinação de alta capacidade, portas específicas para RV e bateria durável torna a Elite 300 uma reserva confiável para casa e estrada." },
  "bluetti-apex-300": { datasheet: [["Saída por unidade", "3.840 W, com modo de elevação de potência de 7.680 W."], ["Capacidade modular", "2.764,8 Wh por unidade; sistema escalável até cerca de 100,4 kWh."], ["Entradas e recarga", "Compatível com rede CA, gerador, veículo e solar. A página europeia destaca até 11,52 kW de carga por gerador e até 19,2 kW solar no sistema expandido com SolarX 4K; o tempo de recarga da unidade isolada não é informado em texto na página consultada."], ["Saídas / compatibilidade", "Arquitetura 230 V para cargas domésticas, RV e off-grid, com expansão por hubs e baterias B300K/B500K; a configuração ampliada atende múltiplos circuitos e cargas pesadas."], ["Tecnologia e segurança", "LiFePO4 de segunda geração e grau automotivo, mais de 6.000 ciclos até 80%, vida projetada de 17 anos, alertas climáticos pelo app, UPS de até 20 ms na página europeia e baixo autoconsumo."], ["Dimensões e peso", "525 x 327 x 320 mm; 38 kg (página oficial internacional)."], ["Garantia", "5 anos."]], intro: "A Apex 300 é uma plataforma modular de 2.764,8 Wh e 3.840 W por unidade, criada para backup residencial, motorhomes e instalações off-grid que podem crescer até 100,4 kWh e 11,52 kW.", advantages: [["Expansão em blocos", "permite começar com uma unidade e aumentar capacidade e potência conforme a necessidade."], ["Integração residencial", "pode formar um sistema de backup para circuitos essenciais ou uma solução ampla de casa."], ["Carga solar em grande escala", "a arquitetura aceita expansão solar com SolarX 4K."], ["Bateria de longa vida", "células LFP automotivas e mais de 6.000 ciclos favorecem operação por muitos anos."], ["Automação e alertas", "o aplicativo antecipa eventos climáticos e ajuda a preparar o sistema para interrupções."]], summary: "Mais do que uma estação portátil, a Apex 300 funciona como núcleo de um sistema energético escalável, adequado a projetos de autonomia e backup de maior porte." },
  "bluetti-sora-60": { datasheet: [["Potência máxima", "60 W."], ["Eficiência", "até 24,7%."], ["Potência / capacidade", "60 W; Vmp 23,1 V; Imp 2,58 A; Voc 27,5 V; Isc 2,76 A."], ["Entradas e recarga", "Converte luz solar em energia CC; não possui entrada de recarga própria."], ["Saídas / compatibilidade", "Conector DC5521 e três saídas CC anunciadas; indicado para eletrônicos portáteis e estações compatíveis com os parâmetros elétricos."], ["Tecnologia e segurança", "Células de silício monocristalino, laminação ETFE, eficiência de até 24,7%, resistência a respingos IP65 e operação de -25°C a 65°C."], ["Dimensões e peso", "Aberto: 900 x 424 mm. Fechado: 226 x 210 x 70 mm. Peso: 1,4 kg."], ["Garantia", "1 ano."]], intro: "O SORA 60 fornece 60 W em um painel dobrável de apenas 1,4 kg, pensado para trilhas, camping, viagens e recarga de pequenos dispositivos longe da rede.", advantages: [["Ultraleve", "o peso de 1,4 kg facilita transporte em mochila e uso em movimento."], ["Alta eficiência", "até 24,7% melhora o aproveitamento da área disponível."], ["Formato de oito dobras", "reduz o volume armazenado e agiliza o transporte."], ["ETFE e IP65", "oferece resistência adequada a uso externo e respingos."], ["Múltiplas saídas CC", "permite carregar até três dispositivos compatíveis simultaneamente."]], summary: "É o painel mais móvel da seleção, indicado para quem prioriza baixo peso, montagem simples e energia limpa para eletrônicos essenciais." },
  "bluetti-pv100": { datasheet: [["Potência máxima", "100 W."], ["Eficiência", "até 23,4%."], ["Potência / capacidade", "100 W; Vmp 20,5 V; Imp 4,9 A; Voc 24,6 V; Isc 5,8 A."], ["Entradas e recarga", "Converte luz solar em energia CC; não possui entrada de recarga própria."], ["Saídas / compatibilidade", "Conector MC4 padrão e cabo de 1,5 m; compatível com a maioria dos geradores solares que aceitam a faixa elétrica do painel."], ["Tecnologia e segurança", "Silício monocristalino, revestimento ETFE, eficiência de até 23,4% e certificações CE, RoHS, PSE, FCC e UKCA."], ["Dimensões e peso", "Aberto: 1.135 x 608 x 4 mm. Fechado: 608 x 567,5 x 35 mm. Peso: 4,9 kg."], ["Garantia", "2 anos."]], intro: "O PV100D entrega 100 W em um painel dobrável com conector MC4, adequado para camping, viagens, uso diário e recarga solar de estações compatíveis.", advantages: [["Conector MC4", "facilita a integração com diferentes estações e sistemas solares portáteis."], ["ETFE durável", "resiste melhor a UV e ao desgaste do uso externo."], ["Células monocristalinas", "oferecem boa eficiência em uma área compacta."], ["Suportes ajustáveis", "ajudam a posicionar o painel no ângulo mais favorável ao sol."], ["Cabo de 1,5 metros", "aumenta a flexibilidade para manter a estação à sombra e o painel ao sol."]], summary: "O PV100D é uma opção equilibrada para quem deseja 100 W, conexão padronizada e construção portátil para geração renovável." },
  "bluetti-sora-130": { datasheet: [["Potência máxima", "130 W."], ["Eficiência", "até 25%."], ["Potência / capacidade", "130 W; Vmp 21,6 V; Imp 6,0 A; Voc 25,9 V; Isc 6,9 A."], ["Entradas e recarga", "Converte luz solar em energia CC; não possui entrada de recarga própria."], ["Saídas / compatibilidade", "Conector MC4, compatível com estações portáteis e sistemas que aceitam a tensão e a corrente informadas."], ["Tecnologia e segurança", "Células monocristalinas N-Type, laminação ETFE, eficiência de até 25%, proteção IP67 e operação de -25°C a 65°C."], ["Dimensões e peso", "Aberto: 1.378 x 660 x 3 mm. Fechado: 326 x 352 x 50 mm. Peso: 3,6 kg."], ["Garantia", "12 meses."]], intro: "O SORA 130 combina 130 W, eficiência de até 25% e apenas 3,6 kg. É adequado para camping, veículos, pesca, viagens e apoio solar em emergências domésticas.", advantages: [["Células N-Type", "oferecem alta conversão, menor degradação e desempenho mais estável ao longo do tempo."], ["Baixo peso", "3,6 kg simplificam transporte e montagem."], ["Proteção IP67", "aumenta a confiança em ambientes externos com poeira e respingos."], ["Conexão MC4", "amplia a compatibilidade com estações de energia e sistemas solares."], ["Formato compacto", "fecha em dimensões próximas às de uma caixa de pizza, facilitando armazenamento."]], summary: "O SORA 130 entrega um equilíbrio muito eficiente entre potência, peso, resistência e compatibilidade para geração solar móvel." },
  "bluetti-sora-220": { datasheet: [["Potência máxima", "220 W."], ["Eficiência", "até 25%."], ["Potência / capacidade", "220 W; Vmp 21,6 V; Imp 10,2 A; Voc 25,9 V; Isc 11 A."], ["Entradas e recarga", "Converte luz solar em energia CC; não possui entrada de recarga própria."], ["Saídas / compatibilidade", "Conector MC4 com cabo de extensão de 1,5 m; compatível com estações e sistemas que aceitam seus parâmetros elétricos."], ["Tecnologia e segurança", "Painel monocristalino N-Type/TOPCon com acabamento ETFE, eficiência de até 25%, IP67 e operação de -25°C a 65°C."], ["Dimensões e peso", "Aberto: 1.723 x 838 x 3 mm. Fechado: 415 x 302 x 87 mm. Peso: 5,9 kg."], ["Garantia", "12 meses."]], intro: "O SORA 220 fornece 220 W com até 25% de eficiência em um conjunto dobrável de 5,9 kg, indicado para camping, barcos, quintais, RVs e recarga mais rápida de estações portáteis.", advantages: [["Alta potência por peso", "entrega 220 W mantendo transporte e armazenamento simples."], ["Tecnologia N-Type/TOPCon", "favorece maior conversão e menor degradação do painel."], ["Proteção IP67", "suporta poeira e respingos em uso externo, com conectores mantidos fora d'água."], ["Suporte ajustável", "ângulos entre 30° e 45° ajudam a melhorar a captação solar."], ["MC4 universal", "facilita a conexão com diferentes estações e sistemas de armazenamento."]], summary: "É uma solução de maior potência para quem busca recarga solar eficiente, portátil e resistente sem carregar um painel tradicional pesado." },
};

function ProductDetail({ product }: { product: Product }) {
  const realImage = PRODUCT_IMAGES[product.slug];
  const isPremium30 = product.slug === "bluetti-premium-30-v2";
  const bluettiContent = BLUETTI_CONTENT[product.slug];
  const [relatedSearch, setRelatedSearch] = useState("");
  const brandProducts = PRODUCTS.filter((item) => item.brand === product.brand);
  const productIndex = brandProducts.findIndex((item) => item.id === product.id);
  const suggestedProducts = [
    ...brandProducts.slice(Math.max(0, productIndex - 2), productIndex),
    ...brandProducts.slice(productIndex + 1, productIndex + 3),
  ];
  const searchSuggestions = relatedSearch.trim()
    ? PRODUCTS.filter((item) => clean(`${item.brand} ${item.model}`).includes(clean(relatedSearch))).slice(0, 6)
    : [];
  const brandCatalogHref: Record<Product["brand"], string> = { Freedom: "/freedom-baterias-estacionarias", Heliar: "/heliar-baterias-automotivas", eCON: "/econ-baterias-automotivas", "eCON VRLA": "/secpower-baterias-estacionarias", Bluetti: "/bluetti-estacoes-de-energia" };
  return <Shell>
    <section className="product-hero">
      <div><span className="eyebrow light product-hero-label">{product.brand} · {segmentLabel(product.segment)}</span><h1>{product.model}</h1><p>Uma solução para compor um portfólio profissional, com o atendimento, suporte e pós-venda da Sol.</p><a className="button yellow" href={WHATSAPP} target="_blank" rel="noreferrer">Solicite uma cotação <Icon name="arrow" /></a></div>
      <div className={`product-stage ${product.segment}`}><span className="eyebrow light product-stage-label">{product.brand} · {segmentLabel(product.segment)}</span>{realImage ? <div className={product.brand === "Heliar" ? "heliar-product-stage" : undefined} style={heliarImageStyle(product)}><div className="stage-glow" /><img className="stage-real-product" src={realImage} alt={`${product.brand} ${product.model}`} /></div> : <><div className="stage-glow" /><div className="stage-product"><i /><i /><b>{product.model}</b><span>{product.brand}</span></div></>}</div>
    </section>
    {isPremium30 ? <section className="detail section premium-30-overview">
      <div className="premium-30-datasheet"><span className="eyebrow">Visão geral</span><h2>Premium 30 V2 <em>em detalhes.</em></h2><span className="detail-label">Datasheet</span><p><strong>Saída contínua:</strong> 600 W, com modo de elevação de potência de até 1.500 W.</p><p><strong>Capacidade:</strong> 320 Wh.</p><p><strong>Entradas e recarga:</strong> entrada CA de até 380 W; bypass CA de até 980 W; solar ou Charger 1 de até 200 W. A página informa 80% em cerca de 50 minutos no TurboBoost e aproximadamente 2,2 h por solar/Charger 1.</p><p><strong>Saídas e compatibilidade:</strong> 8 saídas: 1 veicular de 12 V/10 A; 2 DC5521 de 12 V/5 A cada, 8 A no total; 2 USB-A de 5 V/3 A e até 15 W cada; 1 USB-C de até 100 W; 1 USB-C de até 140 W; e 1 saída CA de 600 W.</p><p><strong>Tecnologia e segurança:</strong> bateria LiFePO4, mais de 3.000 ciclos até 80%, vida projetada de 10 anos, UPS em até 10 ms, UltraCell, gerenciamento térmico e operação abaixo de 30 dB em baixa carga.</p><p><strong>Dimensões e peso:</strong> 250 x 178 x 167,5 mm; 4,3 kg.</p><p className="premium-30-warranty"><strong>Garantia:</strong> 5 anos.</p></div>
      <div className="premium-30-advantages"><span className="eyebrow">Principais vantagens</span><h2>Energia compacta para <em>mobilidade.</em></h2><p>A Premium 30 V2 combina 320 Wh de capacidade com 600 W de saída em um corpo de 4,3 kg. É indicada para camping, piqueniques, viagens curtas, trabalho móvel e alimentação emergencial de eletrônicos e pequenos aparelhos.</p><ul><li><strong>Leve e fácil de transportar:</strong> o formato compacto reduz o esforço em deslocamentos e no uso fora de casa.</li><li><strong>Potência acima do tamanho:</strong> o modo de elevação de potência amplia a compatibilidade com cargas resistivas de maior pico.</li><li><strong>Recarga rápida:</strong> chega a 80% em cerca de 50 minutos, reduzindo o tempo fora de operação.</li><li><strong>Conectividade completa:</strong> oito saídas e USB-C de alta potência permitem atender vários dispositivos.</li><li><strong>Backup silencioso:</strong> UPS rápida, bateria LFP e baixo ruído favorecem quartos, escritórios e uso noturno.</li></ul><p className="premium-30-summary">É uma solução equilibrada para quem prioriza mobilidade sem abrir mão de recarga rápida, segurança e potência suficiente para as necessidades essenciais.</p></div>
    </section> : bluettiContent ? <section className="detail section premium-30-overview">
      <div className="premium-30-datasheet"><span className="eyebrow">Visão geral</span><h2>{product.model} <em>em detalhes.</em></h2><span className="detail-label">Datasheet</span>{bluettiContent.datasheet.map(([label, text]) => <p key={label} className={label === "Garantia" ? "premium-30-warranty" : undefined}><strong>{label}:</strong> {text}</p>)}</div>
      <div className="premium-30-advantages"><span className="eyebrow">Principais vantagens</span><h2>Principais <em>vantagens.</em></h2><p>{bluettiContent.intro}</p><ul>{bluettiContent.advantages.map(([title, text]) => <li key={title}><strong>{title}:</strong> {text}</li>)}</ul><p className="premium-30-summary">{bluettiContent.summary}</p></div>
    </section> : <section className="detail section">
      <div><span className="eyebrow">Visão geral</span><h2>Escolha técnica com <em>apoio comercial.</em></h2><p>Nossa equipe ajuda sua empresa a confirmar aplicação, disponibilidade e especificações antes da compra. Assim, você indica a solução correta e negocia com mais segurança.</p></div>
      <div className="detail-cards"><div><Icon name="shield" /><b>Procedência</b><span>Produto comercializado por uma distribuidora com mais de 27 anos.</span></div><div><Icon name="people" /><b>Atendimento B2B</b><span>Orientação para revendas, integradores e empresas.</span></div><div><Icon name="energy" /><b>Ficha sob consulta</b><span>Confirme dados técnicos e disponibilidade com um especialista.</span></div></div>
    </section>}
    <section className="related section premium-100-related"><div className="related-heading"><SectionTitle eyebrow="Continue explorando" title={<>Outras soluções da <em>mesma linha.</em></>} /><div className="related-search-wrap"><label className="related-search"><span>Buscar em todo o catálogo</span><input value={relatedSearch} onChange={(event) => setRelatedSearch(event.target.value)} placeholder="Buscar marca ou modelo" /></label>{!!relatedSearch.trim() && <div className="related-suggestions" role="list">{searchSuggestions.length ? searchSuggestions.map((item) => <Link href={`/${item.slug}`} key={item.id} role="listitem"><b>{item.model}</b><span>{item.brand}</span></Link>) : <span className="related-no-results">Nenhum produto encontrado.</span>}</div>}</div></div><div className="product-carousel-track" role="region" aria-label={`Produtos ${product.brand} recomendados`} tabIndex={0}>{suggestedProducts.map((item) => <ProductCard product={item} key={item.id} />)}<Link href={brandCatalogHref[product.brand]} className="related-more-card"><span><Icon name="arrow" />Ver mais</span><small>Todos os produtos {product.brand}</small></Link></div></section>
    <Cta />
  </Shell>;
}

function About() {
  useEffect(() => {
    let previousPosition = window.scrollY;
    const updateHeader = () => {
      const currentPosition = window.scrollY;
      const isScrollingDown = currentPosition > previousPosition && currentPosition > 86;
      document.body.classList.toggle("about-header-hidden", isScrollingDown);
      previousPosition = currentPosition;
    };
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateHeader);
      document.body.classList.remove("about-header-hidden");
    };
  }, []);

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

function Value({ icon, title, text }: { icon: "truck" | "people" | "shield"; title: string; text: string }) { return <div><Icon name={icon} /><b>{title}</b><p>{text}</p></div>; }

function Sustainability() {
  return <Shell>
    <section className="page-hero sustainability-hero"><span className="eyebrow light">Responsabilidade ambiental</span><h1>Energia com propósito.<br /><em>Futuro com responsabilidade.</em></h1><p>Eficiência, descarte correto e escolhas responsáveis fazem parte da forma como a Sol conduz seus negócios.</p></section>
    <section className="story sustainability-story section"><div><span className="eyebrow">Compromisso</span><h2>Desenvolvimento que<br /><em>respeita o amanhã.</em></h2><img src="/sustentabilidade-oficial.png" alt="Ciclo de reciclagem e logística reversa de baterias" /></div><div><p>Trabalhamos para ampliar o acesso a soluções energéticas mais eficientes e apoiar práticas responsáveis em toda a cadeia.</p><p>A sustentabilidade é um compromisso contínuo: da logística ao pós-venda, da orientação ao cliente à destinação adequada de baterias.</p></div></section>
    <section className="values green section"><Value icon="leaf" title="Logística reversa" text="Orientação e responsabilidade na destinação de baterias ao fim da vida útil." /><Value icon="energy" title="Eficiência energética" text="Soluções que ajudam empresas a usar e armazenar energia de forma mais inteligente." /><Value icon="shield" title="Cadeia responsável" text="Parcerias e processos guiados por segurança, integridade e conformidade." /></section>
    <Cta />
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
  if (resolved === "home" || resolved === "home-nova") return <Home />;
  if (resolved === "produtos") return <Catalog />;
  if (resolved === "sobre-nos") return <About />;
  if (resolved === "sustentabilidade") return <Sustainability />;
  if (resolved === "contato") return <Contact />;
  if (resolved === "politica-de-privacidade") return <Privacy />;
  if (resolved === "baterias-estacionarias") return <StationaryCatalog />;
  if (resolved === "bluetti-estacoes-de-energia") return <BluettiCatalog />;
  if (resolved === "heliar-baterias-automotivas") return <HeliarCatalog />;
  if (resolved === "econ-baterias-automotivas") return <EconCatalog />;
  if (resolved === "freedom-baterias-estacionarias") return <BrandGridCatalog brand="Freedom" eyebrow="Portfólio Freedom" title="Baterias estacionárias" intro="Portfólio de baterias estacionárias para aplicações profissionais." />;
  if (resolved === "secpower-baterias-estacionarias") return <BrandGridCatalog brand="eCON VRLA" eyebrow="Portfólio eCON VRLA" title="Baterias estacionárias" intro="Baterias seladas para energia de emergência, telecom e outras aplicações." />;
  const meta = CATEGORY_META[resolved as keyof typeof CATEGORY_META];
  if (meta) return <Catalog title={meta[0]} intro={meta[1]} filter={meta[2]} />;
  const product = PRODUCTS.find((p) => p.slug === resolved);
  if (product) return <ProductDetail product={product} />;
  return <NotFoundPage />;
}
