import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, ChevronDown, FileCheck2, Menu, Phone, Plane, ShieldCheck, Stethoscope, X } from "lucide-react";
import { generalChat, services, type ServiceId } from "../data/logistics";
import { Brand, Kicker, WhatsAppIcon } from "./Brand";

function FlightPaths() {
  const routes = [
    { path: "M150 600 C340 460 520 250 720 110", x: 720, y: 110, label: "LHR / LONDON", dx: 14, dy: -8 },
    { path: "M150 600 C430 520 800 330 1085 118", x: 1085, y: 118, label: "JFK / NEW YORK", dx: -99, dy: -12 },
    { path: "M150 600 C320 545 630 450 980 328", x: 980, y: 328, label: "DXB / DUBAI", dx: 14, dy: 6 },
  ];
  return <svg className="tarmac-routes" viewBox="0 0 1200 700" preserveAspectRatio="none" fill="none" aria-hidden="true">
    <defs><filter id="route-light" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.7" result="glow" /><feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
    {routes.map((route) => <g key={route.label}>
      <path className="tarmac-route-line" d={route.path} stroke="#FFC107" strokeWidth="1.6" strokeDasharray="1 9" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <circle cx={route.x} cy={route.y} r="3.4" fill="#FFC107" filter="url(#route-light)" />
      <text x={route.x + route.dx} y={route.y + route.dy}>{route.label}</text>
    </g>)}
    <circle cx="150" cy="600" r="4.2" fill="#FFC107" />
    <circle className="tarmac-hub-ring" cx="150" cy="600" r="10" stroke="#FFC107" />
    <text x="167" y="605">ABV / ABUJA</text>
  </svg>;
}

type HeroProps = { onTrack: () => void; onService: (id: ServiceId) => void };

function Navigation({ onTrack, onService }: HeroProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState<"services" | "tools" | null>(null);
  const nav = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const close = () => { setMobileOpen(false); setMenu(null); };

  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!nav.current?.contains(event.target as Node)) close(); };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && (menu || mobileOpen)) { close(); trigger.current?.focus(); }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [menu, mobileOpen]);

  const showTracking = () => { close(); onTrack(); };
  return <nav ref={nav} className="tarmac-nav" aria-label="Main navigation">
    <Brand />
    <div className="tarmac-nav-links">
      <div className="tarmac-menu-wrap">
        <button type="button" aria-label="Our services" aria-expanded={menu === "services"} aria-controls="service-menu" onClick={(event) => { trigger.current = event.currentTarget; setMenu(menu === "services" ? null : "services"); }}>Services</button>
        {menu === "services" && <div className="tarmac-dropdown" id="service-menu">
          {services.map((item) => <button key={item.id} onClick={() => { close(); onService(item.id); }}><item.icon size={17} />{item.title}<ArrowUpRight size={14} /></button>)}
          <a href="#services" onClick={close}>Explore all services <ArrowRight size={15} /></a>
        </div>}
      </div>
      <a href="#animals" onClick={close}>Live Animals</a>
      <button className="tarmac-track" aria-label="Track shipment" onClick={showTracking}>Tracking</button>
      <a href="#quote" onClick={close}>Pricing</a>
      <a href="#contact" onClick={close}>Contact</a>
      <div className="tarmac-menu-wrap">
        <button className="tarmac-tools" aria-expanded={menu === "tools"} aria-controls="tools-menu" onClick={(event) => { trigger.current = event.currentTarget; setMenu(menu === "tools" ? null : "tools"); }}>Tools <ChevronDown size={14} /></button>
        {menu === "tools" && <div className="tarmac-dropdown" id="tools-menu"><a href="#quote" onClick={close}>Quote calculator <ArrowUpRight size={15} /></a><button onClick={showTracking}>Shipment tracking <ArrowUpRight size={15} /></button><a href="#questions" onClick={close}>Travel documents <ArrowUpRight size={15} /></a></div>}
      </div>
    </div>
    <div className="tarmac-nav-actions"><a className="tarmac-phone" href="tel:+2348075737800"><Phone size={14} />0807 573 7800</a><a className="button button-gold tarmac-nav-quote" href="#quote" onClick={close}>Get a Quote</a>
      <button className="icon-button tarmac-mobile-toggle" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={(event) => { trigger.current = event.currentTarget; setMobileOpen(!mobileOpen); }}>{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
    </div>
    {mobileOpen && <div id="mobile-navigation" className="tarmac-mobile-menu">
      <a href="#services" onClick={close}>Services <ArrowRight size={16} /></a><a href="#animals" onClick={close}>Live Animals <ArrowRight size={16} /></a><button onClick={showTracking}>Tracking <ArrowRight size={16} /></button><a href="#quote" onClick={close}>Pricing <ArrowRight size={16} /></a><a href="#contact" onClick={close}>Contact <ArrowRight size={16} /></a><a href="tel:+2348075737800"><Phone size={15} />0807 573 7800</a>
    </div>}
  </nav>;
}

const stats = [
  ["2,400+", "animals flown safe"], ["40+", "countries served"],
  ["98.2%", "on-time clearance"], ["24/7", "ramp + vet support"],
];
const standards = [
  { icon: ShieldCheck, name: "IATA Compliant" },
  { icon: Stethoscope, name: "NAQS Quarantine Certified" },
  { icon: FileCheck2, name: "CITES Permitted" },
  { icon: BadgeCheck, name: "Veterinary Health Certified" },
];

export function Hero(props: HeroProps) {
  return <header id="top" className="tarmac-frame" data-design="option-b-a380">
    <picture className="tarmac-photograph">
      <source media="(max-width: 700px)" srcSet="/images/a380-tarmac-mobile.webp" />
      <img src="/images/a380-tarmac.webp" alt="Emirates Airbus A380 parked on the airport tarmac" width="2200" height="1400" fetchPriority="high" decoding="async" />
    </picture>
    <div className="tarmac-wash" aria-hidden="true" />
    <FlightPaths />
    <Navigation {...props} />
    <div className="tarmac-content">
      <Kicker>SCHMTJ Logistics &middot; NAIA Abuja &middot; Cargo &amp; live export</Kicker>
      <h1 className="tarmac-headline"><span>Your Trusted Partner</span>{" "}<span>in Global Logistics</span>{" "}<span className="tarmac-gold-line">&amp; Live Animal Export.</span></h1>
      <p className="tarmac-subline">Fast, reliable, and IATA-compliant import/export clearing from Nnamdi Azikiwe International Airport, Abuja. Pets, livestock &amp; parrots flown safe worldwide.</p>
      <div className="tarmac-cta"><a className="button button-gold" href="#quote">Get a Quote <ArrowRight size={19} /></a><a className="button button-outline" href={generalChat} target="_blank" rel="noreferrer"><span className="tarmac-wa-mark"><WhatsAppIcon size={19} /></span>Contact Us on WhatsApp</a></div>
      <dl className="tarmac-stats" aria-label="SCHMTJ at a glance">{stats.map(([number, caption]) => <div key={caption}><dt>{caption}</dt><dd>{number}</dd></div>)}</dl>
      <div className="tarmac-standards" aria-label="Travel standards">{standards.map(({ icon: Icon, name }) => <span key={name}><Icon size={16} strokeWidth={1.6} />{name}</span>)}</div>
      <a className="tarmac-scroll" href="#services">Explore our services <ArrowDown size={14} /></a>
    </div>
  </header>;
}

const network = ["Ethiopian Cargo", "Turkish Cargo", "Qatar Cargo", "Lufthansa Cargo", "British Airways", "Emirates SkyCargo", "NAQS Nigeria", "CITES"];

export function AviationNetwork() {
  return <section className="aviation-network b-network reveal-section" aria-label="Global cargo network">
    <Kicker>World cargo network &middot; NAIA Abuja</Kicker>
    <div className="marquee-window"><div className="network-marquee">{[0,1].map((n) => <div className="marquee-group" key={n} aria-hidden={n === 1 || undefined}>{network.map((name) => <span className="b-network-name" key={name}><Plane size={16} />{name}</span>)}</div>)}</div></div>
  </section>;
}