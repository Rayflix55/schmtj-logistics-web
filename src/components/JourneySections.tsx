import { ArrowUpRight, ChevronDown, Headphones, Heart, Lock, PawPrint, ShieldCheck, Stethoscope } from "lucide-react";
import { animals, services, type AnimalId, type ServiceId } from "../data/logistics";
import { Kicker } from "./Brand";

export function Services({ onService }: { onService: (id: ServiceId) => void }) {
  return <section id="services" className="page-section container reveal-section" aria-labelledby="services-heading">
    <div className="section-heading-row b-split"><div><Kicker>What is SCHMTJ</Kicker><h2 id="services-heading">Abuja's live-cargo specialists. Clearing in hours, flying worldwide.</h2></div><p>Based airside at Nnamdi Azikiwe International Airport. We clear imports, document livestock, and prepare pets for travel. One team, from ramp to runway.</p></div>
    <h3 className="b-crafts-title">Four crafts. One ramp team.</h3>
    <div className="b-service-fan">
      {services.map((service) => <button key={service.id} className="b-service-tile" onClick={() => onService(service.id)}>
        <span className="b-service-emblem"><service.icon size={38} strokeWidth={1.3} /></span>
        <h3>{service.title}</h3><p>{service.summary}</p><span className="text-link">Explore service <ArrowUpRight size={16} /></span>
      </button>)}
    </div>
  </section>;
}

export function AnimalGallery({ onChoose }: { onChoose: (id: AnimalId) => void }) {
  return <section id="animals" className="page-section container reveal-section" aria-labelledby="animals-heading">
    <div className="section-heading-row b-split"><div><Kicker>Certified to fly &middot; Animal gallery</Kicker><h2 id="animals-heading">Dogs. Cats. Goats. Poultry. African Parrots.</h2></div><p>Every species has its own travel needs, crate requirements, and permit checks. Choose an animal to plan its journey.</p></div>
    <div className="animal-gallery">
      {animals.map((animal) => <a key={animal.id} href="#quote" className={`animal-tile animal-${animal.id}`} aria-label={`Get a quote for ${animal.plural.toLowerCase()}`} onClick={(event) => { event.preventDefault(); onChoose(animal.id); }}>
        <img src={animal.image} alt={animal.alt} width="540" height="690" loading="lazy" decoding="async" />
        <span className="animal-caption"><span>{animal.plural}</span><span className="animal-arrow"><ArrowUpRight size={18} /></span></span>
      </a>)}
    </div>
    <p className="gallery-note"><ShieldCheck size={17} />Every journey is subject to a welfare, permit, and airline eligibility check.</p>
  </section>;
}

export function About() {
  return <section id="about" className="page-section container reveal-section" aria-labelledby="about-heading">
    <div className="section-heading-row b-split"><div><Kicker>Why choose us</Kicker><h2 id="about-heading">Licensed. Gentle. Awake when your cargo is.</h2></div><p>Six ways our Abuja team looks after your animals, your paperwork, and your peace of mind.</p></div>
    <div className="b-values-grid">{[
      { icon: Heart, name: "Safe & comfortable travel", text: "Appropriate crates, comfortable bedding, and preparation for every passenger." },
      { icon: PawPrint, name: "Stress-free transport", text: "Practical crate familiarisation advice and a clear handover plan for pet families." },
      { icon: Headphones, name: "24/7 human support", text: "A person to answer your questions, from preparation in Abuja to collection at the destination." },
      { icon: ShieldCheck, name: "Licensed & reliable", text: "Route-specific checks for veterinary documents, quarantine, and applicable permits." },
      { icon: Stethoscope, name: "Veterinary guidance", text: "Pre-flight health checks and fitness-to-travel guidance for your animal." },
      { icon: Lock, name: "Secure freight handling", text: "Coordinated loading, suitable packaging, and carefully planned collection." },
    ].map((item) => <div key={item.name}><item.icon size={30} strokeWidth={1.3} /><h3>{item.name}</h3><p>{item.text}</p></div>)}</div>
  </section>;
}

const questions = [
  ["What do I need for an exact quote?", "For animal travel, share the species, breed, weight, crate dimensions, destination, and preferred travel date. For freight, share the goods description, dimensions, weight, and route. Our team checks availability before confirming a price."],
  ["How will you help my animal travel comfortably?", "We help you choose a suitable, ventilated crate and plan time for your animal to become familiar with it. A veterinary professional should confirm fitness to travel, and our team coordinates the airline's handling requirements."],
  ["Which documents will my shipment need?", "Requirements depend on the species, goods, and destination. Animal travel may require veterinary health certificates, vaccination records, NAQS clearance, and import or export permits. Protected species need a separate eligibility review; a permit is never guaranteed."],
  ["Can I track my shipment online?", "Use Track shipment to explore a clearly labelled sample journey. For a real shipment, contact our Abuja team with your air waybill or booking reference so they can confirm the latest update."],
];

export function TravelQuestions() {
  return <section className="page-section container faq-layout reveal-section" id="questions" aria-labelledby="questions-heading"><div><Kicker>Before you travel</Kicker><h2 id="questions-heading">A few helpful<br />answers.</h2><p>Still have a question? <a href="#contact" className="inline-link">Talk to our team.</a></p></div>
    <div className="faq-list">{questions.map(([question, answer]) => <details key={question} name="travel-faq"><summary>{question}<ChevronDown size={19} /></summary><p>{answer}</p></details>)}</div>
  </section>;
}