/*
Design reminder — Luxury Emergency Noir:
Esta página deve reforçar uma estética premium B2B em vinho escuro, vermelho Vitarc, alto contraste, produto como protagonista, painéis de vidro, linha ECG e alternância entre capítulos escuros cinematográficos e blocos claros institucionais. Pergunta-guia: esta escolha reforça ou dilui a sensação de prontidão sofisticada?
*/

import { useState } from "react";
import {
  Activity,
  ArrowRight,
  BellRing,
  Building2,
  CheckCircle2,
  Dumbbell,
  Factory,
  GraduationCap,
  HeartPulse,
  Hospital,
  Landmark,
  MapPin,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Target,
  Video,
  Zap,
} from "lucide-react";

const CTA_URL = "https://forms.kommo.com/rcmwrzv";
const CHECKOUT_URL = "https://www.constamed.com.br/checkout/cart?session_id=thcn61fd25duf9u1pdppmbvs3f&store_id=1077001#carrinho";

const assets = {
  logo: "/manus-storage/logo-vitarc-branca_beaee753.png",
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663245939856/S7wq5pb8nzy9Y72vbrysG7/vitarc-hero-noir-2hVefKPS7Zpu5bXktfdZUU.webp",
  original: "/manus-storage/vitarc-produto-original_d901ebdd.png",
  hospital: "https://d2xsxph8kpxj0f.cloudfront.net/310519663245939856/S7wq5pb8nzy9Y72vbrysG7/vitarc-hospital-jKxZBMmFhBAR94SFMKiJ2w.webp",
  clinic: "https://d2xsxph8kpxj0f.cloudfront.net/310519663245939856/S7wq5pb8nzy9Y72vbrysG7/vitarc-clinic-Lgi6p9pWZiKnooQqScJzxE.webp",
  gym: "https://d2xsxph8kpxj0f.cloudfront.net/310519663245939856/S7wq5pb8nzy9Y72vbrysG7/vitarc-gym-2qHFEUB9Qm7pLRJL5mwFja.webp",
  publicSpace: "https://d2xsxph8kpxj0f.cloudfront.net/310519663245939856/S7wq5pb8nzy9Y72vbrysG7/vitarc-public-space-dAxTUe4NuwBnBqMpcZjghN.webp",
  produtoVermelho: "/manus-storage/cabinevermelha_8a7e5725.png",
  produtoAmarelo: "/manus-storage/cabineamarela_337c91d6.png",
  produtoLaranja: "/manus-storage/cabinelaranja_3af128c6.png",
  produtoVerde: "/manus-storage/cabineverde_031e228a.png",
  localClinicas: "/manus-storage/clinicas-nova_e05bb3b4.png",
  localHospitais: "/manus-storage/local-hospitais_c00313fa.png",
  localEmpresas: "/manus-storage/empresas-nova_d7cd63b4.png",
  localEscolas: "/manus-storage/local-escolas_fef84269.png",
  localIndustrias: "/manus-storage/local-industrias_85970c28.png",
  localPrefeituras: "/manus-storage/prefeituras-nova_660b9bb2.png",
  offerMindrayC1: "/manus-storage/pasted_file_sJhOKp_image_bc3eeb70.png",
  offerMindrayC2: "/manus-storage/pasted_file_8nIUcH_image_2a9dc533.png",
  offerLife400: "/manus-storage/pasted_file_MIrwH8_image_af316a1d.png",
  offerAlive: "/manus-storage/pasted_file_HI7Yo1_image_dc5c5aee.png",
  constamFooter: "/manus-storage/pasted_file_i5HxzG_image_102357c3.png",
};

const navItems = [
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Aplicações", href: "#aplicacoes" },
  { label: "Guia RCP", href: "#guia" },
  { label: "Especificações", href: "#especificacoes" },
  { label: "Ofertas", href: "#ofertas" },
];

const pillars = [
  {
    icon: Target,
    title: "Visibilidade",
    text: "A cabine torna o ponto de emergência mais fácil de identificar, reduzindo dúvidas no momento crítico.",
  },
  {
    icon: ShieldCheck,
    title: "DEA confiável",
    text: "Um equipamento de qualidade que não te deixa na mão no momento mais importante.",
  },
  {
    icon: GraduationCap,
    title: "Treinamento",
    text: "Capacitação essencial para sua equipe saber exatamente como agir em uma emergência cardíaca.",
  },
];

const differentials = [
  {
    icon: ShieldCheck,
    title: "Estrutura metálica resistente",
    text: "Mais proteção física para o DEA e maior durabilidade para instalação em espaços corporativos, públicos e assistenciais.",
  },
  {
    icon: Sparkles,
    title: "Acrílico transparente",
    text: "Permite visualizar rapidamente o equipamento e entender que o ponto de emergência está preparado para uso.",
  },
  {
    icon: BellRing,
    title: "Alerta sonoro na abertura",
    text: "Ao abrir a porta, o sensor de som chama atenção para o acionamento da cabine e ajuda a inibir manuseios indevidos.",
  },
  {
    icon: Zap,
    title: "Travas magnéticas",
    text: "Facilitam o acesso quando necessário, mantendo a cabine organizada e com sensação de segurança operacional.",
  },
  {
    icon: HeartPulse,
    title: "Guia Interativo de RCP",
    text: "O QR Code leva o usuário a um conteúdo prático para reforçar instruções de preparação e apoio ao atendimento.",
  },
  {
    icon: CheckCircle2,
    title: "Compatibilidade universal",
    text: "Projetada para acomodar diferentes modelos de DEA, facilitando a integração com kits de emergência já existentes.",
  },
];

const environments = [
  {
    key: "clinicas",
    label: "Clínicas",
    icon: Stethoscope,
    image: assets.localClinicas,
    eyebrow: "Cuidado visível desde a recepção",
    title: "Clínicas que demonstram preparo antes da emergência",
    text: "Em clínicas de estética, odontologia, medicina diagnóstica e especialidades, a cabine posiciona o DEA em local visível e reforça a percepção de cuidado, organização e responsabilidade com pacientes e equipes.",
    highlights: ["Recepções premium", "Áreas de circulação", "Padronização visual"],
  },
  {
    key: "hospitais",
    label: "Hospitais",
    icon: Hospital,
    image: assets.localHospitais,
    eyebrow: "Prontidão em corredores e alas",
    title: "Hospitais com pontos de emergência mais claros e acessíveis",
    text: "A Vitarc ajuda a sinalizar e proteger o DEA em corredores, recepções, unidades ambulatoriais e áreas de passagem, mantendo o equipamento visível sem comprometer a estética institucional do ambiente.",
    highlights: ["Corredores assistenciais", "Recepções", "Acesso organizado"],
  },
  {
    key: "academias",
    label: "Academias",
    icon: Dumbbell,
    image: assets.gym,
    eyebrow: "Prevenção em ambientes de esforço físico",
    title: "Academias preparadas para alta circulação e atividade intensa",
    text: "Em espaços fitness, boxes, clubes e centros esportivos, a cabine facilita a localização do DEA em áreas com grande movimento, reforçando a cultura de prevenção e segurança dos alunos.",
    highlights: ["Áreas cardio", "Recepção", "Espaços esportivos"],
  },
  {
    key: "empresas",
    label: "Empresas",
    icon: Building2,
    image: assets.localEmpresas,
    eyebrow: "Segurança corporativa com presença visual",
    title: "Empresas que integram o DEA ao plano de cuidado ocupacional",
    text: "Em escritórios, sedes administrativas e condomínios corporativos, a Vitarc transforma a cabine em um ponto de prontidão reconhecível, organizado e alinhado à comunicação visual do ambiente.",
    highlights: ["Halls corporativos", "Recepções", "Áreas comuns"],
  },
  {
    key: "escolas",
    label: "Escolas",
    icon: GraduationCap,
    image: assets.localEscolas,
    eyebrow: "Proteção em ambientes educacionais",
    title: "Escolas e universidades com pontos de emergência identificáveis",
    text: "Em instituições de ensino, a cabine contribui para que equipes, estudantes e visitantes identifiquem com mais facilidade o local do DEA em áreas de grande fluxo.",
    highlights: ["Pátios", "Ginásios", "Portarias"],
  },
  {
    key: "shoppings",
    label: "Shoppings",
    icon: ShoppingBag,
    image: "/manus-storage/shoppings-nova_9ac0c055.png",
    eyebrow: "Visibilidade em grandes fluxos",
    title: "Shoppings e espaços públicos com acesso rápido e sinalização clara",
    text: "Em centros comerciais, aeroportos e espaços multiuso, a cabine dá presença ao equipamento e ajuda a orientar rapidamente pessoas e equipes em ambientes amplos.",
    highlights: ["Praças de alimentação", "Corredores", "Entradas principais"],
  },
  {
    key: "industrias",
    label: "Indústrias",
    icon: Factory,
    image: assets.localIndustrias,
    eyebrow: "Robustez para rotinas operacionais",
    title: "Indústrias com proteção física e acesso padronizado ao DEA",
    text: "Em plantas industriais, centros logísticos e áreas administrativas, a estrutura metálica e a alta visibilidade apoiam a organização dos recursos de emergência.",
    highlights: ["Portarias", "Ambulatórios", "Áreas comuns"],
  },
  {
    key: "prefeituras",
    label: "Prefeituras",
    icon: Landmark,
    image: assets.localPrefeituras,
    eyebrow: "Preparação para equipamentos públicos",
    title: "Órgãos públicos com pontos de cuidado mais visíveis",
    text: "Em prédios administrativos, unidades de atendimento e espaços municipais, a cabine facilita a identificação do DEA por servidores, visitantes e equipes de apoio.",
    highlights: ["Prédios públicos", "Centros esportivos", "Unidades de atendimento"],
  },
];

const specs = [
  ["Dimensões", "40 cm (A) × 33 cm (L) × 20 cm (P)"],
  ["Estrutura", "Metálica de alta resistência"],
  ["Visor", "Tampa em acrílico transparente"],
  ["Acesso", "Travas magnéticas"],
  ["Alerta", "Sensor de som ao abrir a porta"],
  ["Orientação", "QR Code com conteúdo prático de RCP"],
  ["Compatibilidade", "Design universal para diferentes modelos de DEA"],
  ["Cores", "Vermelho, amarelo, laranja e verde"],
];

const productColors = [
  { name: "Vermelho", image: assets.produtoVermelho },
  { name: "Amarelo", image: assets.produtoAmarelo },
  { name: "Laranja", image: assets.produtoLaranja },
  { name: "Verde", image: assets.produtoVerde },
];

const offers = [
  {
    name: "Vitarc + Mindray C1",
    image: assets.offerMindrayC1,
    badge: "Inclui treinamento online de 1 pessoa",
    url: "https://www.constamed.com.br/dea-desfibrilador-externo-automatico/kit-cabine-para-dea-dea-desfibrilador-mindray-beneheart-c1a-treinamento-rcp-video-chamada",
  },
  {
    name: "Vitarc + Mindray C2",
    image: assets.offerMindrayC2,
    badge: "Inclui treinamento online de 1 pessoa",
    url: "https://www.constamed.com.br/dea-desfibrilador-externo-automatico/kit-cabine-para-dea-dea-desfibrilador-mindray-beneheart-c2a-treinamento-rcp-video-chamada",
  },
  {
    name: "Vitarc + Life 400",
    image: assets.offerLife400,
    badge: "Inclui treinamento online de 1 pessoa",
    url: "https://www.constamed.com.br/dea-desfibrilador-externo-automatico/kit-cabine-para-dea-dea-desfibrilador-life-400-futura-treinamento-rcp-video-chamada",
  },
  {
    name: "Vitarc + Alive",
    image: assets.offerAlive,
    badge: "Inclui treinamento online de 1 pessoa",
    url: "https://www.constamed.com.br/dea-desfibrilador-externo-automatico/kit-cabine-para-dea-dea-desfibrilador-alive-treinamento-rcp-video-chamada",
  },
];

function CtaButton({ children, variant = "primary", href }: { children: string; variant?: "primary" | "ghost"; href?: string }) {
  const targetUrl = href || (variant === "primary" ? CTA_URL : "#diferenciais");
  return (
    <a
      href={targetUrl}
      target={variant === "primary" ? "_blank" : undefined}
      rel={variant === "primary" ? "noreferrer" : undefined}
      className={`cta-button ${variant === "ghost" ? "cta-button--ghost" : ""}`}
    >
      <span>{children}</span>
      <ArrowRight size={18} />
    </a>
  );
}

export default function Home() {
  const [activeEnvironment, setActiveEnvironment] = useState(environments[0]);

  return (
    <div className="site-shell">
      <header className="site-header" aria-label="Navegação principal">
        <a className="brand-mark brand-mark--logo" href="#top" aria-label="Vitarc, início da página">
          <img src={assets.logo} alt="Vitarc" />
        </a>
        <nav className="desktop-nav" aria-label="Seções da landing page">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <a className="header-cta" href="#ofertas">
          Conferir Oferta
        </a>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-bg" aria-hidden="true">
            <img src={assets.hero} alt="" />
            <div className="hero-vignette" />
            <div className="ecg-line ecg-line--hero" />
          </div>

          <div className="container hero-grid">
            <div className="hero-copy animate-rise">
              <span className="eyebrow"><Activity size={16} /> O arco que reinicia a vida</span>
              <h1 id="hero-title">Proteção total para emergências cardíacas</h1>
              <p>
                Quando cada segundo importa, o combo completo (cabine Vitarc + desfibrilador + treinamento) precisa estar <strong>visível, protegido e pronto para acesso</strong>. A Vitarc transforma a cabine de emergência em um ponto de cuidado completo.
              </p>
              <div className="hero-actions">
                <a href="#ofertas" className="cta-button"><span>Conferir oferta</span></a>
                <CtaButton variant="ghost">Ver diferenciais</CtaButton>
              </div>
              <div className="hero-status" aria-label="Destaques da solução">
                <span><ShieldCheck size={16} /> Proteção</span>
                <span><MapPin size={16} /> Visibilidade</span>
                <span><QrCode size={16} /> Guia RCP</span>
              </div>
            </div>

            <aside className="hero-card animate-float" aria-label="Resumo técnico da cabine">
              <span className="hero-card__label">Sistema Vitarc</span>
              <strong>DEA visível. Cabine protegida. Acesso orientado.</strong>
              <div className="hero-card__meter"><span /></div>
              <p>Desenvolvida para locais de grande circulação que precisam comunicar prontidão com clareza, segurança e presença institucional.</p>
            </aside>
          </div>
        </section>

        <section className="problem-section section-pad">
          <div className="container problem-grid">
            <div>
              <span className="section-kicker">O desafio</span>
              <h2>Ter um DEA não basta se ele não for encontrado rapidamente.</h2>
            </div>
            <div className="problem-copy">
              <h3>Em uma emergência, a baixa visibilidade do equipamento pode gerar dúvida, atraso e desorganização.</h3>
              <h3>É preciso ter um <strong>equipamento confiável que não te deixa na mão</strong>.</h3>
              <h3>Não adianta ter o <strong>equipamento certo sem um time capacitado</strong>.</h3>
              <div className="pillar-row">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <article className="pillar-card" key={pillar.title}>
                      <Icon size={24} />
                      <h3>{pillar.title}</h3>
                      <p>{pillar.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="diferenciais" className="dark-panel section-pad" aria-labelledby="diferenciais-title">
          <div className="container">
            <div className="section-heading section-heading--dark">
              <span className="section-kicker">Diferenciais</span>
              <h2 id="diferenciais-title">Tecnologia, segurança e informação em uma cabine de emergência.</h2>
              <p>
                A Vitarc combina estrutura robusta, visualização imediata do DEA, alerta sonoro e QR Code de orientação para criar um ponto de cuidado mais claro e confiável.
              </p>
            </div>
            <div className="differentials-grid">
              {differentials.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article className="differential-card" key={item.title} style={{ animationDelay: `${index * 70}ms` }}>
                    <div className="icon-ring"><Icon size={24} /></div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="aplicacoes" className="tabs-section section-pad" aria-labelledby="aplicacoes-title">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">Locais de uso</span>
              <h2 id="aplicacoes-title">Uma cabine para ambientes onde a preparação precisa ser visível.</h2>
              <p>
                Clínicas, hospitais e academias ganham destaque na apresentação, mas a Vitarc também atende empresas, escolas, shoppings, indústrias, prefeituras e outros espaços de grande circulação.
              </p>
            </div>

            <div className="environment-tabs" role="tablist" aria-label="Locais de aplicação da Vitarc">
              {environments.map((item) => {
                const Icon = item.icon;
                const active = activeEnvironment.key === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={active ? "tab-button tab-button--active" : "tab-button"}
                    onClick={() => setActiveEnvironment(item)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="environment-panel" role="tabpanel">
              <div className="environment-image">
                <img src={activeEnvironment.image} alt={`Cabine Vitarc aplicada em ${activeEnvironment.label.toLowerCase()}`} />
              </div>
              <div className="environment-copy">
                <span className="eyebrow eyebrow--dark"><MapPin size={16} /> {activeEnvironment.eyebrow}</span>
                <h3>{activeEnvironment.title}</h3>
                <p>{activeEnvironment.text}</p>
                <div className="environment-tags">
                  {activeEnvironment.highlights.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <a href="#ofertas" className="cta-button"><span>Conferir oferta</span></a>
              </div>
            </div>
          </div>
        </section>

        <section id="guia" className="guide-section section-pad" aria-labelledby="guia-title">
          <div className="container guide-grid">
            <div className="guide-product-card">
              <img src={assets.original} alt="Cabine Vitarc para DEA em fundo vermelho" />
              <div className="scan-card">
                <QrCode size={30} />
                <span>Guia Interativo de RCP</span>
              </div>
            </div>
            <div className="guide-copy">
              <span className="section-kicker">QR Code e preparação</span>
              <h2 id="guia-title">Orientação prática para apoiar quem precisa agir.</h2>
              <p>
                A cabine incorpora um QR Code que direciona para conteúdo prático de RCP. Esse recurso ajuda a transformar o ponto de emergência em um ponto de informação, reforçando a preparação de equipes, visitantes e responsáveis pelo ambiente.
              </p>
              <div className="step-list">
                <div><span>01</span><p>Identifique o ponto de emergência com clareza.</p></div>
                <div><span>02</span><p>Acesse o DEA de forma rápida e organizada.</p></div>
                <div><span>03</span><p>Use o QR Code para consultar o vídeo/guia prático de RCP.</p></div>
              </div>
              <a className="video-link" href={CTA_URL} target="_blank" rel="noreferrer">
                <Video size={18} /> Solicitar apresentação da solução
              </a>
            </div>
          </div>
        </section>

        <section id="especificacoes" className="spec-section section-pad" aria-labelledby="spec-title">
          <div className="container spec-grid">
            <div className="spec-copy">
              <span className="section-kicker">Especificações</span>
              <h2 id="spec-title">Robusta, visível e compatível com diferentes rotinas de emergência.</h2>
              <p>
                As características técnicas foram organizadas para apoiar decisores, gestores de segurança, compradores corporativos e equipes assistenciais na avaliação institucional da cabine.
              </p>
              <a href="#ofertas" className="cta-button"><span>Conferir oferta</span></a>
            </div>
            <div className="spec-table" aria-label="Características técnicas da cabine Vitarc">
              {specs.map(([label, value]) => (
                <div className="spec-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
              <p className="spec-note">Observação: o desfibrilador mostrado nas imagens é ilustrativo e não acompanha a cabine.</p>
            </div>
            <div className="color-showcase" aria-label="Cores disponíveis da cabine Vitarc">
              {productColors.map((color) => (
                <article className="color-card" key={color.name}>
                  <div className="color-card__image">
                    <img src={color.image} alt={`Cabine Vitarc na cor ${color.name.toLowerCase()}`} />
                  </div>
                  <strong>{color.name}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ofertas" className="offers-section" aria-labelledby="offers-title">
          <div className="offers-section__inner">
            <div className="section-heading section-heading--dark">
              <span className="section-kicker">Ofertas especiais</span>
              <h2 id="offers-title">Kits de emergência prontos para implementação.</h2>
              <p>
                Cada oferta inclui a cabine Vitarc, o desfibrilador selecionado e treinamento online de 1 pessoa do grupo. Escolha a combinação que melhor se adequa ao seu ambiente.
              </p>
            </div>

            <div className="offers-grid">
              {offers.map((offer) => (
                <article className="offer-card" key={offer.name}>
                  <div className="offer-card__image">
                    <img src={offer.image} alt={offer.name} />
                  </div>
                  <h3 className="offer-card__name">{offer.name}</h3>
                  <span className="offer-card__badge">{offer.badge}</span>
                  <div className="offer-card__cta">
                    <a href={offer.url} target="_blank" rel="noreferrer" className="offer-card__button">
                      Conferir Oferta
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <div className="ecg-line ecg-line--final" aria-hidden="true" />
          <div className="container final-cta__inner">
            <span className="brand-mark brand-mark--large brand-mark--final-logo"><img src={assets.logo} alt="Vitarc" /></span>
            <h2 id="final-title">Leve mais visibilidade, proteção e orientação ao ponto de emergência do seu ambiente.</h2>
            <p>
              Apresente sua necessidade, quantidade estimada e tipo de local. A equipe Vitarc direcionará o orçamento conforme o projeto.
            </p>
            <a href="#ofertas" className="cta-button"><span>Conferir oferta</span></a>
          </div>
        </section>

        <footer className="footer-section" aria-label="Rodapé">
          <div className="footer-section__inner">
            <div className="footer-column">

              <p>Soluções em saúde e segurança para ambientes corporativos, assistenciais e públicos.</p>
            </div>

            <div className="footer-column">
              <h3>Produtos</h3>
              <a href="#ofertas">Cabine Vitarc</a>
              <a href="#ofertas">Kits de Emergência</a>
              <a href="#ofertas">Desfibriladores</a>
            </div>

            <div className="footer-column">
              <h3>Suporte</h3>
              <a href="https://wa.me/5511911440179" target="_blank" rel="noreferrer">Solicitar Orçamento</a>
              <a href="https://wa.me/5511911440179" target="_blank" rel="noreferrer">Fale Conosco</a>
            </div>

            <div className="footer-column">
              <h3>Institucional</h3>
              <p>Constamed Comércio e Serviços Ltda.<br />CNPJ: 40.279.862/0001-10</p>
              <p>São Bernardo do Campo, SP</p>
            </div>

            <div className="footer-bottom">
              <p>ConstaMed Produtos para Saúde e Equipamentos Hospitalares Ltda. Me. | CNPJ: 40.279.862/0001-10<br />Rua Continental 981, Vila Margarida, São Bernardo do Campo - São Paulo - SP - CEP: 09750-060<br />Alvará Sanitário Municipal CEVS n° 354870801-464-000503-1-8 | Autorização de Funcionamento AFE ANVISA nº 2X42YY26HH9W<br />&copy; 2024 - Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5511911440179"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-button"
        aria-label="Abrir WhatsApp"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a8.06 8.06 0 00-8.062 8.062c0 1.585.378 3.143 1.097 4.524L2.457 22.5l4.588-1.205a8.025 8.025 0 003.804.969h.005c4.442 0 8.064-3.626 8.064-8.064 0-2.123-.824-4.12-2.321-5.617-1.497-1.497-3.505-2.321-5.636-2.321m6.604 15.039l-.531-.848c-.281-.451-.875-1.229-2.191-2.097-1.317-.868-2.601-.868-2.882-.868-.281 0-1.077 0-1.734.532-.657.532-2.51 2.45-2.51 5.973 0 3.522 2.572 6.921 2.928 7.426.356.505 4.959 7.588 12.064 10.745 7.106 3.158 7.106 1.05 8.39.875 1.285-.175 4.126-1.688 4.712-3.32.586-1.632.586-3.027.41-3.32-.175-.293-.586-.468-1.219-.817z"/>
        </svg>
      </a>
    </div>
  );
}
