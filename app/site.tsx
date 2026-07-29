"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORY_META, PAGE_IDS, PRODUCTS, type Product } from "./data";

const WHATSAPP = "https://api.whatsapp.com/send?phone=5541998220358&text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20Sol.";

function Icon({ name }: { name: "arrow"|"check"|"phone"|"pin"|"mail"|"leaf"|"shield"|"truck"|"people"|"energy" }) {
  const symbols = {arrow:"↗",check:"✓",phone:"☎",pin:"●",mail:"@",leaf:"◆",shield:"◈",truck:"▰",people:"●●",energy:"ϟ"};
  return <span className={`icon icon-${name}`} aria-hidden="true">{symbols[name]}</span>;
}

function Brand({ variant = "blue" }: { variant?: "blue" | "white" }) {
  return <Link href="/" className="brand" aria-label="Sol Distribuidora — página inicial"><img src={`/sol-logo-${variant}-crop.png`} alt="Sol Distribuidora"/></Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="header">
    <div className="nav-wrap">
      <Brand />
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Abrir menu"><span/><span/></button>
      <nav className={open ? "nav open" : "nav"} aria-label="Navegação principal">
        <Link href="/produtos" onClick={() => setOpen(false)}>Soluções</Link>
        <Link href="/sobre-nos" onClick={() => setOpen(false)}>A Sol</Link>
        <Link href="/sustentabilidade" onClick={() => setOpen(false)}>Sustentabilidade</Link>
        <Link href="/contato" onClick={() => setOpen(false)}>Contato</Link>
        <a className="nav-cta" href={WHATSAPP} target="_blank" rel="noreferrer">Fale com um especialista <Icon name="arrow"/></a>
      </nav>
    </div>
  </header>;
}

function Footer() {
  return <footer>
    <div className="footer-top">
      <div><Brand variant="white"/><p>Energia para quem não pode parar.</p></div>
      <div><b>Navegue</b><Link href="/produtos">Soluções</Link><Link href="/sobre-nos">A Sol</Link><Link href="/sustentabilidade">Sustentabilidade</Link></div>
      <div><b>Fale com a Sol</b><a href="tel:+554132775080">(41) 3277-5080</a><a href="mailto:atendimento@distribuidorasol.com.br">atendimento@distribuidorasol.com.br</a><span>Curitiba · PR</span></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Sol Distribuidora · CNPJ 00.338.610/0002-80</span><Link href="/politica-de-privacidade">Política de Privacidade</Link></div>
  </footer>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <><Header/><main>{children}</main><Footer/><a className="whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Fale com a Sol pelo WhatsApp">WhatsApp <Icon name="arrow"/></a></>;
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: React.ReactNode; text?: string }) {
  return <div className="section-title"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function Home() {
  return <Shell>
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow light">Distribuição B2B · Desde 1999</span>
        <h1>Energia para o presente.<br/><em>Soluções para o futuro.</em></h1>
        <p>Baterias, estações de energia e suporte especializado para fortalecer o seu negócio.</p>
        <div className="hero-actions"><a className="button yellow" href={WHATSAPP} target="_blank" rel="noreferrer">Seja um parceiro Sol <Icon name="arrow"/></a><Link className="text-link light" href="/produtos">Conheça o portfólio <Icon name="arrow"/></Link></div>
        <div className="hero-proof"><div><strong>+25</strong><span>anos de mercado</span></div><div><strong>3</strong><span>centros de distribuição</span></div><div><strong>Brasil</strong><span>atendimento nacional</span></div></div>
      </div>
      <div className="hero-visual" aria-label="Representação de soluções de energia">
        <div className="energy-orbit orbit-one"/><div className="energy-orbit orbit-two"/>
        <div className="hero-product hero-product-a"><img src="/linha-estacionaria.png" alt="Baterias estacionárias Freedom"/></div>
        <div className="hero-product hero-product-b"><img src="/linha-automotiva.png" alt="Baterias automotivas Heliar"/></div>
        <div className="hero-product hero-product-c"><img src="/bluetti-elite100-01.webp" alt="Estação de energia Bluetti Elite 100 v2"/></div>
        <img className="hero-symbol" src="/sol-symbol-white-crop.png" alt=""/>
        <div className="visual-label"><i/> Soluções para revendas e empresas</div>
      </div>
    </section>

    <section className="trust-strip"><span>Portfólio especializado</span><span>Atendimento consultivo</span><span>Logística nacional</span><span>Suporte e pós-venda</span></section>

    <section className="solutions section">
      <SectionTitle eyebrow="Soluções" title={<>Um portfólio que <em>move negócios.</em></>} text="Produtos de alta confiabilidade, selecionados para atender diferentes demandas do mercado profissional."/>
      <div className="solution-grid">
        <SolutionCard number="01" href="/baterias-estacionarias" title="Baterias estacionárias" text="Energia segura e contínua para telecom, nobreaks, sistemas solares e aplicações críticas." image="/linha-estacionaria.png"/>
        <SolutionCard number="02" href="/baterias-automotivas" title="Baterias automotivas" text="Linhas completas para veículos leves e pesados, com marcas reconhecidas pelo mercado." image="/linha-automotiva.png"/>
        <SolutionCard number="03" href="/bluetti-estacoes-de-energia" title="Estações de energia" text="Armazenamento portátil e versátil para novas demandas de energia, dentro e fora da rede." image="/linha-bluetti.webp"/>
      </div>
    </section>

    <section className="partnership section">
      <div className="partnership-art"><img src="/sol-drive-02.jpg" alt="Fachada da Sol Distribuidora e frota própria"/><div className="photo-caption"><img src="/sol-symbol-white-crop.png" alt=""/><span>Estrutura e logística próprias</span></div></div>
      <div className="partnership-copy"><SectionTitle eyebrow="Parceria de verdade" title={<>Mais do que distribuir.<br/><em>Impulsionamos resultados.</em></>}/>
        <p>Da escolha do produto ao pós-venda, nossa equipe está ao lado da sua empresa com conhecimento técnico, agilidade e transparência.</p>
        <ul><li><Icon name="check"/> Consultoria comercial especializada</li><li><Icon name="check"/> Suporte antes, durante e depois da venda</li><li><Icon name="check"/> Estrutura logística para atender todo o Brasil</li></ul>
        <Link className="button blue" href="/sobre-nos">Conheça a Sol <Icon name="arrow"/></Link>
      </div>
    </section>

    <section className="numbers section"><div><strong>+25</strong><span>anos construindo confiança</span></div><div><strong>260 mil</strong><span>baterias em capacidade de armazenagem</span></div><div><strong>3 CDs</strong><span>Curitiba e São Paulo</span></div></section>
    <Cta/>
  </Shell>;
}

function SolutionCard({number,href,title,text,image}:{number:string;href:string;title:string;text:string;image:string}) {
  return <Link href={href} className="solution-card"><div className="card-head"><span>{number}</span><Icon name="arrow"/></div><div className="product-image"><img src={image} alt=""/></div><h3>{title}</h3><p>{text}</p><b>Explorar linha</b></Link>;
}

function Cta() {
  return <section className="cta section"><span className="eyebrow light">Vamos conversar?</span><h2>Energia certa.<br/><em>Parceria que cresce.</em></h2><p>Fale com nosso time e encontre a melhor solução para o seu negócio.</p><a className="button yellow" href={WHATSAPP} target="_blank" rel="noreferrer">Fale com um especialista <Icon name="arrow"/></a></section>;
}

const clean = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");

function Catalog({ title="Nosso portfólio", intro="Encontre a solução certa para o seu negócio.", filter }: { title?: string; intro?: string; filter?: string }) {
  const [search,setSearch] = useState("");
  const list = useMemo(() => PRODUCTS.filter((p) => {
    const matchesFilter = !filter || p.segment === filter || p.brand === filter;
    return matchesFilter && clean(`${p.brand} ${p.model}`).includes(clean(search));
  }), [search,filter]);
  return <Shell>
    <section className="page-hero compact"><span className="eyebrow light">Portfólio Sol</span><h1>{title}</h1><p>{intro}</p></section>
    <section className="catalog section">
      <div className="catalog-tools"><div><strong>{list.length}</strong><span> soluções encontradas</span></div><label><span>Buscar por marca ou modelo</span><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Ex.: Heliar, DF1500, Bluetti…"/></label></div>
      <div className="product-grid">{list.map((p) => <ProductCard key={p.id} product={p}/>)}</div>
      {!list.length && <div className="empty">Nenhum produto encontrado. Tente outro termo.</div>}
    </section>
    <Cta/>
  </Shell>;
}

function ProductCard({product}:{product:Product}) {
  const image = product.slug === "bluetti-elite-100-v2" ? "/bluetti-elite100-01.webp" : null;
  return <Link href={`/${product.slug}`} className="product-card"><span className="product-brand">{product.brand}</span>{image ? <div className="product-art real"><img src={image} alt={product.model}/></div> : <div className={`product-art ${product.segment}`}><i/><i/><b>{product.model.slice(0,8)}</b></div>}<h3>{product.model}</h3><p>{segmentLabel(product.segment)}</p><span className="card-link">Ver solução <Icon name="arrow"/></span></Link>;
}

function segmentLabel(segment: Product["segment"]) {
  return {estacionaria:"Bateria estacionária",automotiva:"Bateria automotiva",moto:"Bateria para motocicleta",energia:"Estação de energia"}[segment];
}

function ProductDetail({ product }: { product: Product }) {
  const realImage = product.slug === "bluetti-elite-100-v2" ? "/bluetti-elite100-01.webp" : null;
  return <Shell>
    <section className="product-hero">
      <div><span className="eyebrow light">{product.brand} · {segmentLabel(product.segment)}</span><h1>{product.model}</h1><p>Uma solução para compor um portfólio profissional, com o atendimento, suporte e pós-venda da Sol.</p><a className="button yellow" href={WHATSAPP} target="_blank" rel="noreferrer">Solicite uma cotação <Icon name="arrow"/></a></div>
      <div className={`product-stage ${product.segment}`}><div className="stage-glow"/>{realImage ? <img className="stage-real-product" src={realImage} alt={`${product.brand} ${product.model}`}/> : <div className="stage-product"><i/><i/><b>{product.model}</b><span>{product.brand}</span></div>}</div>
    </section>
    <section className="detail section">
      <div><span className="eyebrow">Visão geral</span><h2>Escolha técnica com <em>apoio comercial.</em></h2><p>Nossa equipe ajuda sua empresa a confirmar aplicação, disponibilidade e especificações antes da compra. Assim, você indica a solução correta e negocia com mais segurança.</p></div>
      <div className="detail-cards"><div><Icon name="shield"/><b>Procedência</b><span>Produto comercializado por uma distribuidora com mais de 25 anos.</span></div><div><Icon name="people"/><b>Atendimento B2B</b><span>Orientação para revendas, integradores e empresas.</span></div><div><Icon name="energy"/><b>Ficha sob consulta</b><span>Confirme dados técnicos e disponibilidade com um especialista.</span></div></div>
    </section>
    <section className="related section"><SectionTitle eyebrow="Continue explorando" title={<>Outras soluções da <em>mesma linha.</em></>}/><div className="product-grid">{PRODUCTS.filter(p=>p.brand===product.brand&&p.id!==product.id).slice(0,4).map(p=><ProductCard product={p} key={p.id}/>)}</div></section>
    <Cta/>
  </Shell>;
}

function About() {
  return <Shell>
    <section className="page-hero about-hero"><span className="eyebrow light">A Sol Distribuidora</span><h1>Experiência que gera<br/><em>confiança e movimento.</em></h1><p>Desde 1999, construímos relações duradouras oferecendo soluções em armazenamento e geração de energia para todo o Brasil.</p></section>
    <section className="story section"><div><span className="eyebrow">Nossa história</span><h2>Estrutura, pessoas<br/>e <em>experiência.</em></h2></div><div><p>A Sol nasceu em Curitiba para fornecer baterias com rapidez e eficiência. Cresceu ao lado de seus clientes e hoje combina capacidade logística, conhecimento técnico e atendimento próximo.</p><p>Mais do que uma fornecedora, somos uma parceira comercial preparada para apoiar decisões e construir resultados consistentes.</p></div></section>
    <section className="values section"><Value icon="truck" title="Logística nacional" text="Frota própria e parceria com transportadoras para atender todo o Brasil."/><Value icon="people" title="Equipe especializada" text="Atendimento próximo, consultivo e preparado para cada etapa da venda."/><Value icon="shield" title="Pós-venda presente" text="Suporte que continua depois da comercialização do produto."/></section>
    <section className="structure section"><SectionTitle eyebrow="Nossa estrutura" title={<>Capacidade para <em>ir mais longe.</em></>}/><div className="structure-grid"><div><img src="/cd-curitiba-1.png" alt="Centro de distribuição da Sol em Curitiba"/><b>Curitiba · CD 1</b><span>Escritório comercial, testes de garantia e capacidade para mais de 60 mil baterias.</span></div><div><img src="/cd-curitiba-2.png" alt="Segundo centro de distribuição da Sol em Curitiba"/><b>Curitiba · CD 2</b><span>Centro de distribuição com capacidade para mais de 50 mil baterias.</span></div><div><img src="/cd-sao-paulo.png" alt="Centro de distribuição da Sol em São Paulo"/><b>São Paulo</b><span>Centro estratégico com capacidade para mais de 150 mil baterias e envios rápidos.</span></div></div></section>
    <Cta/>
  </Shell>;
}

function Value({icon,title,text}:{icon:"truck"|"people"|"shield";title:string;text:string}) { return <div><Icon name={icon}/><b>{title}</b><p>{text}</p></div>; }

function Sustainability() {
  return <Shell>
    <section className="page-hero sustainability-hero"><span className="eyebrow light">Responsabilidade ambiental</span><h1>Energia com propósito.<br/><em>Futuro com responsabilidade.</em></h1><p>Eficiência, descarte correto e escolhas responsáveis fazem parte da forma como a Sol conduz seus negócios.</p></section>
    <section className="story sustainability-story section"><div><span className="eyebrow">Compromisso</span><h2>Desenvolvimento que<br/><em>respeita o amanhã.</em></h2><img src="/sustentabilidade-oficial.png" alt="Ciclo de reciclagem e logística reversa de baterias"/></div><div><p>Trabalhamos para ampliar o acesso a soluções energéticas mais eficientes e apoiar práticas responsáveis em toda a cadeia.</p><p>A sustentabilidade é um compromisso contínuo: da logística ao pós-venda, da orientação ao cliente à destinação adequada de baterias.</p></div></section>
    <section className="values green section"><Value icon="leaf" title="Logística reversa" text="Orientação e responsabilidade na destinação de baterias ao fim da vida útil."/><Value icon="energy" title="Eficiência energética" text="Soluções que ajudam empresas a usar e armazenar energia de forma mais inteligente."/><Value icon="shield" title="Cadeia responsável" text="Parcerias e processos guiados por segurança, integridade e conformidade."/></section>
    <Cta/>
  </Shell>;
}

function Contact() {
  return <Shell>
    <section className="page-hero compact"><span className="eyebrow light">Contato</span><h1>Como podemos ajudar?</h1><p>Converse com a nossa equipe comercial e encontre a solução ideal para a sua revenda ou empresa.</p></section>
    <section className="contact section"><div className="contact-info"><span className="eyebrow">Fale com a Sol</span><h2>Atendimento próximo,<br/><em>resposta objetiva.</em></h2><a href="tel:+554132775080"><Icon name="phone"/><span><small>Telefone</small>(41) 3277-5080</span></a><a href="mailto:atendimento@distribuidorasol.com.br"><Icon name="mail"/><span><small>E-mail</small>atendimento@distribuidorasol.com.br</span></a><div><Icon name="pin"/><span><small>Endereço</small>Rua das Carmelitas, 1581<br/>Curitiba · PR · CEP 81650-060</span></div></div>
      <form className="contact-form" action={`mailto:atendimento@distribuidorasol.com.br`} method="post" encType="text/plain"><div><label>Nome completo<input name="nome" required/></label><label>Empresa<input name="empresa"/></label></div><div><label>Telefone<input name="telefone" type="tel" required/></label><label>E-mail<input name="email" type="email" required/></label></div><label>Como podemos ajudar?<textarea name="mensagem" rows={5} required/></label><label className="consent"><input type="checkbox" required/> Li e aceito a <Link href="/politica-de-privacidade">Política de Privacidade</Link>.</label><button className="button blue" type="submit">Enviar mensagem <Icon name="arrow"/></button></form>
    </section>
  </Shell>;
}

function Privacy() {
  return <Shell><section className="page-hero compact"><span className="eyebrow light">Privacidade</span><h1>Política de Privacidade</h1><p>Transparência também faz parte das nossas relações digitais.</p></section><article className="legal section"><h2>Como tratamos seus dados</h2><p>A Sol Distribuidora utiliza os dados informados em seus canais de contato exclusivamente para responder solicitações, preparar atendimentos comerciais e manter o relacionamento com clientes e parceiros.</p><h3>Dados coletados</h3><p>Podemos receber nome, empresa, telefone, e-mail e informações enviadas voluntariamente em formulários ou conversas.</p><h3>Finalidade e segurança</h3><p>Os dados são usados para atendimento, cotações e comunicações relacionadas aos serviços solicitados. Aplicamos medidas razoáveis de segurança e não comercializamos informações pessoais.</p><h3>Seus direitos</h3><p>Você pode solicitar acesso, correção ou exclusão de seus dados pelo e-mail <a href="mailto:atendimento@distribuidorasol.com.br">atendimento@distribuidorasol.com.br</a>.</p></article></Shell>;
}

function NotFoundPage() {
  return <Shell><section className="not-found section"><span className="eyebrow">Página não encontrada</span><h1>A energia continua por aqui.</h1><p>O endereço acessado mudou ou não está disponível.</p><Link className="button blue" href="/">Voltar ao início <Icon name="arrow"/></Link></section></Shell>;
}

export function SitePage({ slug }: { slug: string }) {
  const resolved = PAGE_IDS[slug] || slug;
  if (resolved === "home" || resolved === "home-nova") return <Home/>;
  if (resolved === "produtos") return <Catalog/>;
  if (resolved === "sobre-nos") return <About/>;
  if (resolved === "sustentabilidade") return <Sustainability/>;
  if (resolved === "contato") return <Contact/>;
  if (resolved === "politica-de-privacidade") return <Privacy/>;
  const meta = CATEGORY_META[resolved as keyof typeof CATEGORY_META];
  if (meta) return <Catalog title={meta[0]} intro={meta[1]} filter={meta[2]}/>;
  const product = PRODUCTS.find((p) => p.slug === resolved);
  if (product) return <ProductDetail product={product}/>;
  return <NotFoundPage/>;
}
