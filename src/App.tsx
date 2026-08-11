import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowUpRight, Asterisk, BarChart3, Building2, ChevronDown, ChevronRight,
  CircleDollarSign, Cloud, Code2, Globe2, Hexagon, Landmark, Layers3,
  Menu, Network, Radar, Send, ShieldCheck, Sparkles, WalletCards, X, Zap,
} from 'lucide-react';

type Icon = typeof ArrowUpRight;
type Card = { title: string; text: string; icon: Icon; tags?: string[] };

const solutions: Card[] = [
  { title: 'Payments Infrastructure', text: 'Modernize payment ecosystems for real-time, high-value, enterprise and cross-border transactions.', icon: WalletCards, tags: ['Payment Hubs', 'RTGS', 'RTP', 'ISO 20022'] },
  { title: 'Digital Currency & CBDC', text: 'Build the infrastructure required to issue, distribute, manage and operate regulated digital money.', icon: CircleDollarSign, tags: ['Retail CBDC', 'Digital Money', 'Tokenized Deposits', 'Operations'] },
  { title: 'Digital Assets & Tokenization', text: 'Transform traditional financial assets into programmable, interoperable digital instruments.', icon: Layers3, tags: ['Tokenization', 'Custody', 'Settlement', 'Securities'] },
  { title: 'Cross-Border & Interoperability', text: 'Connect domestic and international payment ecosystems through interoperable infrastructure.', icon: Globe2, tags: ['SWIFT', 'Multi-currency', 'FX & Liquidity', 'Routing'] },
  { title: 'AI & Financial Intelligence', text: 'Turn financial data into operational intelligence, automation and better decisions.', icon: BarChart3, tags: ['Fraud Intelligence', 'AI Copilots', 'Risk Analytics', 'Routing'] },
  { title: 'Risk, Regulatory & Compliance', text: 'Build innovation into a framework of security, governance, compliance and institutional control.', icon: ShieldCheck, tags: ['AML', 'KYC', 'Sanctions', 'Auditability'] },
];

const platforms: Card[] = [
  { title: 'Currency Hub™', text: 'The enterprise digital money operating system for issuing, managing, transferring and settling digital money across regulated ecosystems.', icon: CircleDollarSign, tags: ['CBDC connectivity', 'Stablecoins', 'Liquidity', 'Policy'] },
  { title: 'Interoperability Fabric™', text: 'One integration layer connecting payment rails, digital currencies, tokenized assets, banking systems and financial networks.', icon: Network, tags: ['API orchestration', 'ISO 20022', 'Intelligent routing', 'Legacy integration'] },
  { title: 'Cross-Border Bridge™', text: "A cross-border settlement platform connecting the world's digital money networks.", icon: Globe2, tags: ['Multi-rail settlement', 'FX', 'Multi-currency', 'Connectivity'] },
  { title: 'SWIFT Ledger Platform™', text: 'Enterprise connectivity for tokenized financial infrastructure, from ledger connectivity to operational monitoring.', icon: Landmark, tags: ['Token lifecycle', 'Core banking', 'Treasury', 'Monitoring'] },
  { title: 'Institutional DeFi Platform™', text: 'Secure, interoperable infrastructure for regulated institutions participating in digital asset ecosystems.', icon: Radar, tags: ['Lending', 'Collateral', 'Controls', 'Risk management'] },
];

const industries = ['Banks & Financial Institutions', 'Central Banks & Governments', 'Payment Networks & Processors', 'Fintechs & Digital Banks', 'Financial Market Infrastructure', 'Corporates & Treasury', 'Digital Asset Institutions'];
const insights = ['Why Payment Infrastructure Needs to Become Multi-Rail', "The Commercial Bank's Role in the CBDC Ecosystem", 'Tokenized Deposits: The Next Evolution of Commercial Bank Money', 'Building Interoperability Across Digital Money Networks', 'AI-Native Fraud Detection for Real-Time Payments', 'Beyond ISO 20022 Compliance: Turning Payment Data into Intelligence'];
type Route = { label: string; title: string; intro: string };
const DEFAULT_INTRO = 'Strategic expertise, enterprise platforms and advanced engineering for connected financial ecosystems.';
const ROUTES: Record<string, Route> = {
  '/solutions': { label: 'solutions', title: 'Infrastructure for every dimension of modern finance.', intro: DEFAULT_INTRO },
  '/platforms': { label: 'platforms', title: 'Enterprise platforms for the future of finance.', intro: DEFAULT_INTRO },
  '/industries': { label: 'industries', title: 'Built for institutions shaping the future of finance.', intro: DEFAULT_INTRO },
  '/technology': { label: 'technology', title: 'Engineered for financial infrastructure.', intro: DEFAULT_INTRO },
  '/insights': { label: 'insights', title: 'Perspectives on the future of financial infrastructure.', intro: DEFAULT_INTRO },
  '/company': { label: 'company', title: 'Engineering the future of finance.', intro: 'OrbisMoneta is the global customer-facing brand of MonetaNova Technologies Pvt. Ltd., focused on building the infrastructure required for the next generation of finance.' },
};

const navMenus = {
  Solutions: ['Payments Infrastructure', 'Digital Currency & CBDC', 'Digital Assets & Tokenization', 'Cross-Border & Interoperability', 'AI & Financial Intelligence', 'Risk, Fraud & Compliance'],
  Platforms: platforms.map((item) => item.title),
  Advisory: ['Payments Advisory', 'Digital Currency Advisory', 'Digital Assets & Tokenization', 'Cross-Border & SWIFT Advisory', 'AI in Banking', 'Risk & Regulatory Advisory'],
  Industries: industries,
};

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (href: string) => {
    window.history.pushState({}, '', href);
    setPath(href);
    setMenuOpen(false);
    setActiveMenu(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <div className="site-shell">
    <Header navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
    {path === '/' ? <Home navigate={navigate} /> : path === '/contact' ? <Contact /> : ROUTES[path] ? <InnerPage path={path} navigate={navigate} /> : <NotFound navigate={navigate} />}
    <Footer navigate={navigate} />
  </div>;
}

function Header({ navigate, menuOpen, setMenuOpen, activeMenu, setActiveMenu }: { navigate: (path: string) => void; menuOpen: boolean; setMenuOpen: (value: boolean) => void; activeMenu: string | null; setActiveMenu: (value: string | null) => void }) {
  return <header className="site-header">
    <div className="nav-wrap">
      <button className="brand-mark" onClick={() => navigate('/')} aria-label="OrbisMoneta home"><img src="/OrMo_Logo_V_SVG.svg" alt="OrbisMoneta" /></button>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {Object.keys(navMenus).map((label) => <div className="nav-menu" key={label} onMouseEnter={() => setActiveMenu(label)}>
          <button onClick={() => setActiveMenu(activeMenu === label ? null : label)}>{label}<ChevronDown size={14} /></button>
          {activeMenu === label && <div className="mega-menu" onMouseLeave={() => setActiveMenu(null)}><div><span className="menu-kicker">Explore OrbisMoneta</span><strong>{label === 'Solutions' ? 'Infrastructure for every dimension of modern finance.' : label === 'Platforms' ? 'Purpose-built platforms for connected ecosystems.' : `Built for ${label.toLowerCase()} shaping the future of finance.`}</strong><button className="text-link" onClick={() => navigate(label === 'Industries' ? '/industries' : `/${label.toLowerCase()}`)}>View all <ArrowUpRight size={15} /></button></div><div className="menu-links">{navMenus[label as keyof typeof navMenus].map((item) => <button key={item} onClick={() => navigate(label === 'Platforms' ? '/platforms' : label === 'Industries' ? '/industries' : '/solutions')}>{item}<ChevronRight size={14} /></button>)}</div></div>}
        </div>)}
        <button onClick={() => navigate('/company')}>Company</button><button onClick={() => navigate('/insights')}>Insights</button>
      </nav>
      <button className="nav-cta" onClick={() => navigate('/contact')}>Book a Strategy Session <ArrowUpRight size={16} /></button>
      <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
    </div>
    {menuOpen && <div className="mobile-menu"><div className="mobile-menu-inner">{['Solutions', 'Platforms', 'Advisory', 'Industries', 'Technology', 'Insights', 'Company'].map((item) => <button key={item} onClick={() => navigate(item === 'Company' ? '/company' : item === 'Insights' ? '/insights' : item === 'Technology' ? '/technology' : item === 'Platforms' ? '/platforms' : item === 'Industries' ? '/industries' : '/solutions')}>{item}<ArrowUpRight size={18} /></button>)}<button className="mobile-menu-cta" onClick={() => navigate('/contact')}>Book a Strategy Session <ArrowUpRight size={17} /></button></div></div>}
  </header>;
}

function Home({ navigate }: { navigate: (path: string) => void }) {
  return <main>
    <section className="hero dark-section"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> Future of financial infrastructure</div><h1>Building the infrastructure for the <em>next generation</em> of finance.</h1><p className="hero-lede">OrbisMoneta helps banks, central banks, fintechs, payment networks and financial institutions modernize the infrastructure that moves, manages and creates value.</p><div className="hero-actions"><button className="button button-light" onClick={() => navigate('/contact')}>Book a Strategy Session <ArrowUpRight size={17} /></button><button className="button button-ghost" onClick={() => navigate('/platforms')}>Explore Our Platforms <ArrowUpRight size={17} /></button></div><div className="hero-foot"><span><span className="signal" /> Connect</span><span>Orchestrate</span><span>Intelligence</span><span>Settle</span></div></div><NetworkVisual /></section>
    <section className="ticker"><div>PAYMENTS</div><Asterisk size={15} /><div>DIGITAL MONEY</div><Asterisk size={15} /><div>TOKENIZED FINANCE</div><Asterisk size={15} /><div>CROSS-BORDER</div><Asterisk size={15} /><div>AI & INTELLIGENCE</div></section>
    <section className="section light-section moment-section"><div className="section-intro"><div className="eyebrow blue-eyebrow">01 / The industry moment</div><h2>Multiple forms of money.<br /><span>One connected infrastructure.</span></h2><p>Finance is moving beyond traditional payment rails. The challenge is no longer adopting one new technology. It is connecting multiple systems, rails, assets and regulatory environments without compromising security, resilience or control.</p></div><EcosystemVisual /></section>
    <section className="section answer-section"><div className="section-intro centered"><div className="eyebrow blue-eyebrow">02 / The OrbisMoneta answer</div><h2>One infrastructure layer.<br /><span>Multiple financial ecosystems.</span></h2><p>We provide the technology, orchestration and strategic expertise required to help institutions operate across the evolving financial landscape.</p></div><div className="three-cards">{[['01', 'Advise', 'Define the future state.', 'Strategy, architecture, transformation roadmaps and regulatory readiness.'], ['02', 'Build', 'Engineer the infrastructure.', 'Enterprise platforms, payment systems, interoperability layers and AI-enabled solutions.'], ['03', 'Evolve', 'Continuously modernize.', 'Operational intelligence, optimization, integration and long-term technology evolution.']].map(([num, title, lead, text]) => <article className="principle-card" key={title}><span className="card-number">{num}</span><div><h3>{title}</h3><strong>{lead}</strong><p>{text}</p></div><ArrowUpRight size={19} /></article>)}</div></section>
    <Solutions navigate={navigate} />
    <Platforms navigate={navigate} />
    <WhySection />
    <Industries />
    <Technology />
    <Journey />
    <Insights navigate={navigate} />
    <CTA navigate={navigate} />
  </main>;
}

function NetworkVisual() {
  const nodes = ['Banks', 'CBDCs', 'AI', 'Payment rails', 'Digital assets', 'Central banks', 'Cross-border'];
  return <div className="network-visual"><div className="network-grid" /><div className="network-core"><Hexagon size={27} /><span>ORBIS<br /><b>MONETA</b></span></div>{nodes.map((node, index) => <div className={`network-node node-${index}`} key={node}><i /><span>{node}</span></div>)}<svg className="network-lines" viewBox="0 0 600 520" preserveAspectRatio="none"><path d="M300 260 C180 180 120 110 62 65 M300 260 C410 190 480 110 530 65 M300 260 C150 300 80 330 38 390 M300 260 C410 290 510 340 555 420 M300 260 C300 160 300 100 300 25 M300 260 C225 375 180 420 130 485 M300 260 C390 370 440 420 490 485" /></svg><div className="orbit orbit-one" /><div className="orbit orbit-two" /></div>;
}

function EcosystemVisual() {
  return <div className="ecosystem-visual"><div className="ecosystem-center"><span className="signal" /> Connected<br /><b>ecosystem</b></div>{['Real-time payments', 'CBDCs', 'Stablecoins', 'Tokenized deposits', 'Digital assets', 'Cross-border', 'Programmable money', 'AI-powered finance'].map((item, index) => <span className={`eco-node eco-${index}`} key={item}>{item}</span>)}<div className="ecosystem-ring" /></div>;
}

function Solutions({ navigate }: { navigate: (path: string) => void }) {
  return <section className="section solutions-section"><div className="section-heading-row"><div><div className="eyebrow blue-eyebrow">03 / Solutions</div><h2>Infrastructure for every<br /><span>dimension of modern finance.</span></h2></div><button className="text-link" onClick={() => navigate('/solutions')}>Explore all solutions <ArrowUpRight size={17} /></button></div><div className="card-grid six-grid">{solutions.map((card) => <FeatureCard {...card} key={card.title} />)}</div></section>;
}

function Platforms({ navigate }: { navigate: (path: string) => void }) {
  return <section className="section dark-section platforms-section"><div className="section-heading-row"><div><div className="eyebrow"><span className="eyebrow-dot" /> 04 / Platform ecosystem</div><h2>Enterprise platforms for<br /><em>the future of finance.</em></h2><p className="section-blurb">Purpose-built infrastructure for institutions operating across traditional and digital financial ecosystems.</p></div><button className="button button-ghost" onClick={() => navigate('/platforms')}>View platform ecosystem <ArrowUpRight size={16} /></button></div><div className="platform-layout"><div className="platform-list">{platforms.map((platform, index) => <article className={`platform-row ${index === 0 ? 'active' : ''}`} key={platform.title}><span className="platform-index">0{index + 1}</span><div><h3>{platform.title}</h3><p>{platform.text}</p></div><ArrowUpRight size={18} /></article>)}</div><ArchitectureDiagram /></div></section>;
}

function ArchitectureDiagram() {
  return <div className="architecture"><div className="architecture-core"><Hexagon size={23} /><span>ORBISMONETA<br /><b>INFRASTRUCTURE</b></span></div><div className="arch-label arch-top">APPLICATIONS</div><div className="arch-label arch-right">PAYMENT & FINANCIAL NETWORKS</div><div className="arch-label arch-bottom">BANKING / CORE SYSTEMS</div><div className="arch-label arch-left">SETTLEMENT / DIGITAL ASSETS</div><div className="arch-ring ring-a" /><div className="arch-ring ring-b" /><div className="arch-dots" /></div>;
}

function FeatureCard({ title, text, icon: Icon, tags = [] }: Card) {
  return <article className="feature-card"><div className="feature-icon"><Icon size={22} /></div><h3>{title}</h3><p>{text}</p><div className="tag-list">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="icon-link" aria-label={`Explore ${title}`}><ArrowUpRight size={18} /></button></article>;
}

function WhySection() { return <section className="section why-section"><div className="section-intro"><div className="eyebrow blue-eyebrow">05 / Why OrbisMoneta</div><h2>Three capabilities.<br /><span>One accountable partner.</span></h2><p>From strategy to production, we bring the perspective and delivery discipline needed to modernize critical financial infrastructure.</p></div><div className="why-grid"><article><Code2 size={23} /><h3>Strategic Advisory</h3><p>Understand the transformation, define future-state architecture and build executable roadmaps.</p></article><article><Cloud size={23} /><h3>Enterprise Technology</h3><p>Design and engineer secure, scalable, cloud-native financial platforms.</p></article><article><Sparkles size={23} /><h3>Product Innovation</h3><p>Build proprietary infrastructure that prepares institutions for the next generation.</p></article></div><div className="differentiators">{['Financial infrastructure expertise', 'Interoperability by design', 'Enterprise engineering', 'Regulatory alignment', 'Product + advisory', 'Future-ready architecture'].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div></section>; }
function Industries() { return <section className="section industries-section light-section"><div className="section-heading-row"><div><div className="eyebrow blue-eyebrow">06 / Industries</div><h2>Built for institutions shaping<br /><span>the future of finance.</span></h2></div><span className="section-aside">Across the financial ecosystem</span></div><div className="industry-grid">{industries.map((industry, index) => <article key={industry}><span>0{index + 1}</span><Building2 size={20} /><h3>{industry}</h3><p>{['Modernize payment infrastructure and connect digital money without disrupting mission-critical operations.', 'Design resilient national payment and digital currency infrastructure for a digital economy.', 'Build interoperable infrastructure supporting multiple rails, currencies and settlement models.', 'Accelerate product innovation with enterprise-grade payment, API and cloud infrastructure.', 'Modernize clearing, settlement and market infrastructure for tokenized ecosystems.', 'Improve cross-border liquidity, payment orchestration and programmable operations.', 'Connect digital asset infrastructure with regulated financial systems.'][index]}</p><ArrowUpRight size={17} /></article>)}</div></section>; }
function Technology() { return <section className="section technology-section dark-section"><div className="section-intro"><div className="eyebrow"><span className="eyebrow-dot" /> 07 / Technology</div><h2>Engineered for<br /><em>financial infrastructure.</em></h2><p className="section-blurb">Secure. Cloud-native. API-first. Interoperable. Intelligent.</p></div><div className="tech-visual"><div className="tech-core"><Hexagon size={19} /> ORBISMONETA</div>{['Cloud & Infrastructure', 'Platform Engineering', 'Data & AI', 'Integration', 'Security', 'Engineering & Delivery'].map((item, index) => <div className={`tech-node tech-${index}`} key={item}><i />{item}</div>)}<div className="tech-lines" /></div></section>; }
function Journey() { return <section className="section journey-section"><div className="section-heading-row"><div><div className="eyebrow blue-eyebrow">08 / Engagement model</div><h2>From strategy<br /><span>to production.</span></h2></div><p className="section-aside">A clear path from opportunity to operating infrastructure.</p></div><div className="journey"><div className="journey-line" />{[['01', 'Discover', 'Understand business objectives, infrastructure constraints and transformation priorities.'], ['02', 'Design', 'Define target architecture, operating model, technology roadmap and implementation strategy.'], ['03', 'Build', 'Engineer, integrate, test and deploy enterprise-grade infrastructure.'], ['04', 'Evolve', 'Optimize, modernize and continuously improve the financial ecosystem.']].map(([num, title, text]) => <article key={num}><span className="journey-num">{num}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>; }
function Insights({ navigate }: { navigate: (path: string) => void }) { return <section className="section insights-section light-section"><div className="section-heading-row"><div><div className="eyebrow blue-eyebrow">09 / Insights</div><h2>Perspectives on the future of<br /><span>financial infrastructure.</span></h2></div><button className="text-link" onClick={() => navigate('/insights')}>View all insights <ArrowUpRight size={17} /></button></div><div className="insight-grid">{insights.slice(0, 3).map((title, index) => <article key={title}><span className="insight-cat">{['Payments', 'Digital Currency', 'Tokenization'][index]}</span><h3>{title}</h3><span className="read-link">Read perspective <ArrowUpRight size={15} /></span></article>)}</div></section>; }
function CTA({ navigate }: { navigate: (path: string) => void }) { return <section className="cta-section dark-section"><div className="cta-orbit" /><div className="eyebrow"><span className="eyebrow-dot" /> Start a conversation</div><h2>Let's build the infrastructure<br /><em>for what comes next.</em></h2><p>Tell us what you are building, modernizing or trying to solve.</p><button className="button button-light" onClick={() => navigate('/contact')}>Start the Conversation <ArrowUpRight size={17} /></button></section>; }

function NotFound({ navigate }: { navigate: (path: string) => void }) {
  return <main><section className="inner-hero dark-section"><div className="eyebrow"><span className="eyebrow-dot" /> OrbisMoneta / page not found</div><h1>This page isn't <em>available.</em></h1><p>The address you followed doesn't match a page on the OrbisMoneta website. It may have moved, or the link may be incomplete.</p><div className="hero-actions"><button className="button button-light" onClick={() => navigate('/')}>Return to homepage <ArrowUpRight size={17} /></button><button className="button button-ghost" onClick={() => navigate('/contact')}>Talk to our team <ArrowUpRight size={17} /></button></div></section></main>;
}

function InnerPage({ path, navigate }: { path: string; navigate: (path: string) => void }) {
  const route = ROUTES[path];
  const title = route.title;
  const intro = route.intro;
  const content: Card[] = path === '/platforms' ? platforms : path === '/industries' ? industries.map((title) => ({ title, text: 'Purpose-built infrastructure and strategic capability for institutions operating in a changing financial landscape.', icon: Building2, tags: ['Infrastructure', 'Strategy', 'Engineering'] })) : solutions;
  return <main><section className="inner-hero dark-section"><div className="eyebrow"><span className="eyebrow-dot" /> OrbisMoneta / {route.label}</div><h1>{title}</h1><p>{intro}</p></section>{path === '/company' ? <section className="section about-content"><div><div className="eyebrow blue-eyebrow">Our direction</div><h2>A connected, intelligent and trusted financial future.</h2></div><div><p>We work with banks, central banks, fintechs, payment networks, financial market infrastructures, governments and enterprises to modernize payment ecosystems and connect emerging forms of digital money.</p><div className="about-pair"><article><span>Vision</span><p>To become one of the leading Future of Financial Infrastructure companies, enabling trusted and interoperable financial ecosystems.</p></article><article><span>Mission</span><p>To empower institutions with innovative platforms and strategic expertise that simplify next-generation financial infrastructure.</p></article></div></div></section> : <section className="section inner-grid-section"><div className="card-grid three-grid">{content.map((item, index) => <FeatureCard key={item.title} {...item} tags={item.tags || ['Architecture', 'Infrastructure', 'Strategy']} />)}</div></section>}<CTA navigate={navigate} /></main>;
}

function Contact() { const [sent, setSent] = useState(false); const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); }; return <main><section className="inner-hero dark-section contact-hero"><div className="eyebrow"><span className="eyebrow-dot" /> Strategy session</div><h1>Let's build what<br /><em>comes next.</em></h1><p>Tell us what you are building, modernizing or trying to solve.</p></section><section className="section contact-section"><div className="contact-copy"><div className="eyebrow blue-eyebrow">Start the conversation</div><h2>Bring us the complex brief.</h2><p>Whether you are evaluating a payment transformation, exploring digital currency infrastructure, designing a tokenization strategy or building an AI-enabled financial platform, our team can help define the path forward.</p><div className="contact-detail"><span><Send size={18} /> hello@orbismoneta.com</span><span><Globe2 size={18} /> Global financial infrastructure</span></div></div>{sent ? <div className="success-card"><div className="success-icon"><ShieldCheck size={30} /></div><h2>Thank you.</h2><p>Your message has been received. Our team will be in touch to continue the conversation.</p></div> : <form className="contact-form" onSubmit={submit}><div className="form-row"><label>First Name<input required placeholder="First name" /></label><label>Last Name<input required placeholder="Last name" /></label></div><label>Business Email<input type="email" required placeholder="you@company.com" /></label><label>Organization<input required placeholder="Organization name" /></label><label>Organization Type<select required defaultValue=""><option value="" disabled>Select organization type</option><option>Bank / Financial Institution</option><option>Central Bank / Government</option><option>Fintech</option><option>Payment Network</option><option>Corporate / Treasury</option><option>Technology Partner</option></select></label><label>Area of Interest<select required defaultValue=""><option value="" disabled>Select area of interest</option><option>Payments</option><option>CBDC / Digital Currency</option><option>Tokenization</option><option>Cross-Border</option><option>AI & Analytics</option><option>Advisory</option></select></label><label>Project / Challenge<textarea required placeholder="Tell us a little about what you are building or solving." /></label><button className="button button-dark" type="submit">Start the Conversation <ArrowUpRight size={17} /></button></form>}</section></main>; }

function Footer({ navigate }: { navigate: (path: string) => void }) { return <footer className="site-footer dark-section"><div className="footer-top"><div className="footer-brand"><img src="/OrMo_Logo_V_SVG.svg" alt="OrbisMoneta" /><div className="footer-position">Future of Financial Infrastructure</div><p>Building the platforms, orchestration and intelligence layer for next-generation finance.</p></div><div className="footer-links">{[['Solutions', '/solutions'], ['Platforms', '/platforms'], ['Industries', '/industries'], ['Company', '/company']].map(([title, path]) => <div key={title}><span>{title}</span><button onClick={() => navigate(path)}>{title === 'Solutions' ? 'Payments Infrastructure' : title === 'Platforms' ? 'Currency Hub™' : title === 'Industries' ? 'Banks & Financial Institutions' : 'About OrbisMoneta'} <ArrowUpRight size={13} /></button><button onClick={() => navigate(path)}>{title === 'Solutions' ? 'Digital Currency & CBDC' : title === 'Platforms' ? 'Interoperability Fabric™' : title === 'Industries' ? 'Central Banks & Governments' : 'Vision & Mission'} <ArrowUpRight size={13} /></button><button onClick={() => navigate(path)}>{title === 'Solutions' ? 'AI & Financial Intelligence' : title === 'Platforms' ? 'Cross-Border Bridge™' : title === 'Industries' ? 'Fintechs & Digital Banks' : 'Careers'} <ArrowUpRight size={13} /></button></div>)}</div></div><div className="footer-bottom"><span>© 2025 MonetaNova Technologies Pvt. Ltd.</span><span>OrbisMoneta™ is a registered brand of MonetaNova Technologies Pvt. Ltd.</span><span className="footer-legal"><button>Privacy</button><button>Terms</button><button>Disclaimer</button></span><span className="built-by">Built by <a href="https://www.imperialtechinnovations.com/" target="_blank" rel="noreferrer">Imperial</a></span></div></footer>; }

export default App;
