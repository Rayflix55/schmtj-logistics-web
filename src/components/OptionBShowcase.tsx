import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, HeartHandshake, Radar, Thermometer } from "lucide-react";
import { Kicker } from "./Brand";
import type { ServiceId } from "../data/logistics";

const stars = Array.from({ length: 105 }, (_, i) => ({ x: ((i * 463 + i * i * 13) % 1201), y: ((i * 157 + i * i * 19) % 503), radius: .5 + (i % 5) * .2 }));

export function WelfarePromise() {
  return <section className="page-section b-promise reveal-section" aria-labelledby="promise-heading">
    <svg viewBox="0 0 1200 500" preserveAspectRatio="none" className="b-starfield" aria-hidden="true">{stars.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.radius} fill="white" opacity={.18 + (i % 6) * .09} />)}</svg>
    <div className="b-promise-copy"><Kicker>The SCHMTJ promise</Kicker><h2 id="promise-heading">Safe. Certified.<br /><span>Airborne</span> tonight.</h2><p>We understand what it means to trust someone with your animal. From crate preparation and veterinary checks to the final handover, we help you plan every step.</p>
      <div className="b-promise-points"><span><HeartHandshake size={16} />Gentle handling</span><span><Thermometer size={16} />Comfort-first planning</span><span><Radar size={16} />Shipment support</span></div>
    </div>
  </section>;
}

type Scene = { name: string; image: string; alt: string; description: string; position?: string };
type Showcase = { label: string; title: string; intro: string; service: ServiceId; scenes: Scene[] };

const showcases: Showcase[] = [
  { label: "01 / Live animal export", title: "Humane cabins, not cargo holds.", intro: "Species-appropriate crates, veterinary checks, and personal attention. Our team helps prepare every paw, feather, and hoof for the journey ahead.", service: "animals", scenes: [
    { name: "Canine First", image: "/images/dog.webp", alt: "An attentive German shepherd", description: "A correctly sized crate, familiar bedding, and a clear departure plan.", position: "50% 32%" },
    { name: "Feline Calm", image: "/images/cat.webp", alt: "A calm cat sitting against a dark background", description: "A quiet preparation routine and a familiar scent for a more comfortable journey.", position: "50% 40%" },
    { name: "Avian CITES", image: "/images/parrot.webp", alt: "A detailed portrait of an African grey parrot", description: "Species-specific welfare, lawful eligibility, and permit checks before booking.", position: "50% 28%" },
  ] },
  { label: "02 / Import and export clearing", title: "Clearance before the wheels stop.", intro: "Prepare the paperwork before arrival. We coordinate customs documentation, quarantine requirements, and veterinary sign-off at NAIA.", service: "clearance", scenes: [
    { name: "Customs preparation", image: "/images/ramp.webp", alt: "Airport cargo loading equipment alongside an aircraft", description: "A document checklist tailored to the goods and destination." },
    { name: "Quarantine checks", image: "/images/clearing.webp", alt: "Ground staff coordinating airport cargo handling", description: "Inspection planning and checks on the required health documentation." },
    { name: "Release & collection", image: "/images/cargo-handling.webp", alt: "A ground handler overseeing an aircraft cargo operation", description: "Clear collection instructions once the authorities release your shipment." },
  ] },
  { label: "03 / Worldwide air cargo", title: "Abuja to the world.", intro: "From secure loading to the right onward connection, one Abuja team coordinates your freight from ramp to runway.", service: "freight", scenes: [
    { name: "Night Freighter", image: "/images/night-freighter.webp", alt: "A cargo aircraft illuminated by airport lights at night", description: "Route and carrier availability checked for your shipment." },
    { name: "Sunset Climb", image: "/images/freight-takeoff.webp", alt: "A cargo aircraft taking off in the evening light", description: "International air freight, with your onward connection planned." },
    { name: "Secure Ramp", image: "/images/cargo-handling.webp", alt: "Freight loading on the airport ramp", description: "Suitable packing, coordinated loading, and a documented handover." },
  ] },
];

function ShowcaseFrame({ item, index, onEnquire }: { item: Showcase; index: number; onEnquire: (id: ServiceId) => void }) {
  const [active, setActive] = useState(index === 1 ? 1 : 0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const scene = item.scenes[active];
  const prefix = `showcase-${index}`;
  return <article className="b-showcase-frame">
    <div className="b-showcase-intro"><Kicker>{item.label}</Kicker><h3>{item.title}</h3><p>{item.intro}</p></div>
    <div className="b-showcase-window"><div className="b-window-bar"><span aria-hidden="true"><i /><i /><i /></span><span>Service preview</span></div>
      <div className="b-scene" role="tabpanel" id={`${prefix}-panel`} aria-labelledby={`${prefix}-tab-${active}`} tabIndex={0}>
        <img key={scene.image} src={scene.image} alt={scene.alt} width="1060" height="510" loading="lazy" decoding="async" style={{ objectPosition: scene.position ?? "center" }} />
        <p key={scene.name}>{scene.description}</p>
      </div>
    </div>
    <div className="b-scene-tabs" role="tablist" aria-label={item.label}>{item.scenes.map((s, ti) => <button key={s.name} ref={(el) => { tabs.current[ti] = el; }} role="tab" id={`${prefix}-tab-${ti}`} aria-controls={`${prefix}-panel`} aria-selected={active === ti} tabIndex={active === ti ? 0 : -1} onClick={() => setActive(ti)} onKeyDown={(event) => {
      const next = event.key === "ArrowRight" ? (ti + 1) % 3 : event.key === "ArrowLeft" ? (ti + 2) % 3 : event.key === "Home" ? 0 : event.key === "End" ? 2 : null;
      if (next !== null) { event.preventDefault(); setActive(next); tabs.current[next]?.focus(); }
    }}>{s.name}<span aria-hidden="true" /></button>)}</div>
    <button className="text-link b-showcase-enquiry" onClick={() => onEnquire(item.service)}>Discuss this service <ArrowUpRight size={15} /></button>
  </article>;
}

export function Operations({ onEnquire }: { onEnquire: (id: ServiceId) => void }) {
  return <section id="process" className="page-section container reveal-section" aria-labelledby="process-heading">
    <div className="section-heading-row b-split"><div><Kicker>Our operations</Kicker><h2 id="process-heading">Watch freight move through our hands.</h2></div><p>Explore the people, preparation, and processes behind live animal travel, customs clearance, and global air cargo.</p></div>
    {showcases.map((item, index) => <ShowcaseFrame key={item.service} item={item} index={index} onEnquire={onEnquire} />)}
  </section>;
}

export function FlightLine() {
  return <section className="page-section b-flightline reveal-section" aria-label="SCHMTJ flight line">
    <div><Kicker>Flight line &middot; Abuja operations</Kicker><h2>Cleared before the seatbelt sign dings.</h2><p>From live animals to commercial imports, every shipment starts with a plan. Talk to our team about the requirements for your route.</p></div>
    <div className="b-flightline-total"><strong>2.4K</strong><span>Animals flown safe &middot; dogs to parrots</span><a className="button button-gold" href="#quote">Ship with us <ArrowRight size={17} /></a></div>
  </section>;
}

export function AuthorityWall() {
  return <section className="page-section container b-authority-wall reveal-section" aria-label="Air cargo and regulatory network"><Kicker>Airlines &amp; authorities</Kicker>
    {[
      { label: "Global lift", names: ["Ethiopian Cargo", "Turkish Cargo", "Qatar Cargo", "Emirates SkyCargo", "Lufthansa Cargo", "British Airways"] },
      { label: "Authorities", names: ["NAQS Nigeria", "CITES", "NCAA", "SONCAP", "Nigeria Customs", "FAAN / NAIA"] },
    ].map((row, index) => <div className="b-authority-row" key={row.label}><div><span className="b-eyebrow">&#123; {index + 1} &#125;_</span><h3>{row.label}</h3></div><ul>{row.names.map((name) => <li key={name}>{name}</li>)}</ul></div>)}
  </section>;
}