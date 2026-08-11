"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CATEGORY_META, PAGE_IDS, PRODUCTS, type Product } from "./data";

const WHATSAPP = "https://api.whatsapp.com/send?phone=5541998220358&text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Sol.";
const HOME_SCROLL_FRAME_COUNT = 97;

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
        section.classList.toggle("is-copy-visible", progress >= 0.5);
        targetFrame = Math.round(progress * (HOME_SCROLL_FRAME_COUNT - 1));
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
        <HeroVisual className="hero-visual-mobile" />
        <h1>Energia para o presente.<br /><em>Soluções para o futuro.</em></h1>
        <p>Baterias, estações de energia e suporte especializado para fortalecer o seu negócio.</p>
        <div className="hero-actions"><a className="button yellow" href={WHATSAPP} target="_blank" rel="noreferrer">Seja um parceiro Sol <Icon name="arrow" /></a><Link className="text-link light" href="/produtos">Conheça o portfólio <Icon name="arrow" /></Link></div>
        <div className="hero-proof-label"><i /> Soluções para revendas e empresas</div>
        <div className="hero-proof"><div><strong>+27</strong><span>anos de mercado</span></div><div><strong>2</strong><span>centros de distribuição</span></div><div><strong>Brasil</strong><span>atendimento nacional</span></div></div>
      </div>
      <HeroVisual className="hero-visual-desktop" />
    </section>

    <TrustStrip />
    <HomeScrollVideo />

    <section className="solutions section">
      <SectionTitle eyebrow="Soluções" title={<>Um portfólio que <em>move negócios.</em></>} text="Produtos de alta confiabilidade, selecionados para atender diferentes demandas do mercado profissional." />
      <div className="solution-grid">
        <SolutionCard href="/baterias-estacionarias" title="Baterias estacionárias" text="Energia segura e contínua para telecom, nobreaks, sistemas solares e aplicações críticas." image="/linha-estacionarias copiar.webp" featuredImage revealDelay={0} />
        <SolutionCard href="/baterias-automotivas" title="Baterias automotivas" text="Linhas completas para veículos leves e pesados, com marcas reconhecidas pelo mercado." image="/linha-automotiva copiar.webp" featuredImage revealDelay={0.2} />
        <SolutionCard href="/bluetti-estacoes-de-energia" title="Energia portátil e solar" text="Estações de energia e painéis solares para novas demandas, dentro e fora da rede." image="/linha-bluetti copiar.webp" featuredImage revealDelay={0.4} />
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

function ProductDetail({ product }: { product: Product }) {
  const realImage = PRODUCT_IMAGES[product.slug];
  return <Shell>
    <section className="product-hero">
      <div><span className="eyebrow light">{product.brand} · {segmentLabel(product.segment)}</span><h1>{product.model}</h1><p>Uma solução para compor um portfólio profissional, com o atendimento, suporte e pós-venda da Sol.</p><a className="button yellow" href={WHATSAPP} target="_blank" rel="noreferrer">Solicite uma cotação <Icon name="arrow" /></a></div>
      <div className={`product-stage ${product.segment}`}>{realImage ? <div className={product.brand === "Heliar" ? "heliar-product-stage" : undefined} style={heliarImageStyle(product)}><div className="stage-glow" /><img className="stage-real-product" src={realImage} alt={`${product.brand} ${product.model}`} /></div> : <><div className="stage-glow" /><div className="stage-product"><i /><i /><b>{product.model}</b><span>{product.brand}</span></div></>}</div>
    </section>
    <section className="detail section">
      <div><span className="eyebrow">Visão geral</span><h2>Escolha técnica com <em>apoio comercial.</em></h2><p>Nossa equipe ajuda sua empresa a confirmar aplicação, disponibilidade e especificações antes da compra. Assim, você indica a solução correta e negocia com mais segurança.</p></div>
      <div className="detail-cards"><div><Icon name="shield" /><b>Procedência</b><span>Produto comercializado por uma distribuidora com mais de 27 anos.</span></div><div><Icon name="people" /><b>Atendimento B2B</b><span>Orientação para revendas, integradores e empresas.</span></div><div><Icon name="energy" /><b>Ficha sob consulta</b><span>Confirme dados técnicos e disponibilidade com um especialista.</span></div></div>
    </section>
    <section className="related section"><SectionTitle eyebrow="Continue explorando" title={<>Outras soluções da <em>mesma linha.</em></>} /><div className="product-carousel-track" role="region" aria-label={`Outros produtos ${product.brand}`} tabIndex={0}>{PRODUCTS.filter(p => p.brand === product.brand && p.id !== product.id).slice(0, 4).map(p => <ProductCard product={p} key={p.id} />)}</div></section>
    <Cta />
  </Shell>;
}

function About() {
  return <Shell>
    <section className="page-hero about-hero"><span className="eyebrow light">A Sol Distribuidora</span><h1>Experiência que gera<br /><em>confiança e movimento.</em></h1><p>Desde 1999, construímos relações duradouras oferecendo soluções em armazenamento e geração de energia para todo o Brasil.</p></section>
    <section className="story section"><div><span className="eyebrow">Nossa história</span><h2>Estrutura, pessoas<br />e <em>experiência.</em></h2></div><div><p>A Sol nasceu em Curitiba para fornecer baterias com rapidez e eficiência. Cresceu ao lado de seus clientes e hoje combina capacidade logística, conhecimento técnico e atendimento próximo.</p><p>Mais do que uma fornecedora, somos uma parceira comercial preparada para apoiar decisões e construir resultados consistentes.</p></div></section>
    <section className="values section"><Value icon="truck" title="Logística nacional" text="Frota própria e parceria com transportadoras para atender todo o Brasil." /><Value icon="people" title="Equipe especializada" text="Atendimento próximo, consultivo e preparado para cada etapa da venda." /><Value icon="shield" title="Pós-venda presente" text="Suporte que continua depois da comercialização do produto." /></section>
    <section className="structure section"><SectionTitle eyebrow="Nossa estrutura" title={<>Capacidade para <em>ir mais longe.</em></>} /><div className="structure-grid"><div><img src="/cd-curitiba-1.png" alt="Centro de distribuição da Sol em Curitiba" /><b>Curitiba · CD 1</b><span>Escritório comercial, testes de garantia e capacidade para mais de 60 mil baterias.</span></div><div><img src="/cd-curitiba-2.png" alt="Segundo centro de distribuição da Sol em Curitiba" /><b>Curitiba · CD 2</b><span>Centro de distribuição com capacidade para mais de 50 mil baterias.</span></div></div></section>
    <Cta />
  </Shell>;
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
  return <Shell>
    <section className="page-hero compact"><span className="eyebrow light">Contato</span><h1>Como podemos ajudar?</h1><p>Converse com a nossa equipe comercial e encontre a solução ideal para a sua revenda ou empresa.</p></section>
    <section className="contact section"><div className="contact-info"><span className="eyebrow">Fale com a Sol</span><h2>Atendimento próximo,<br /><em>resposta objetiva.</em></h2><a href="tel:+554132775080"><Icon name="phone" /><span><small>Telefone</small>(41) 3277-5080</span></a><a href="mailto:atendimento@distribuidorasol.com.br"><Icon name="mail" /><span><small>E-mail</small>atendimento@distribuidorasol.com.br</span></a><div><Icon name="pin" /><span><small>Endereço</small>Rua das Carmelitas, 1581<br />Curitiba · PR · CEP 81650-060</span></div></div>
      <form className="contact-form" action={`mailto:atendimento@distribuidorasol.com.br`} method="post" encType="text/plain"><div><label>Nome completo<input name="nome" required /></label><label>Empresa<input name="empresa" /></label></div><div><label>Telefone<input name="telefone" type="tel" required /></label><label>E-mail<input name="email" type="email" required /></label></div><label>Como podemos ajudar?<textarea name="mensagem" rows={5} required /></label><label className="consent"><input type="checkbox" required /> Li e aceito a <Link href="/politica-de-privacidade">Política de Privacidade</Link>.</label><button className="button blue" type="submit">Enviar mensagem <Icon name="arrow" /></button></form>
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
  const meta = CATEGORY_META[resolved as keyof typeof CATEGORY_META];
  if (meta) return <Catalog title={meta[0]} intro={meta[1]} filter={meta[2]} />;
  const product = PRODUCTS.find((p) => p.slug === resolved);
  if (product) return <ProductDetail product={product} />;
  return <NotFoundPage />;
}
