import { useEffect, useState } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import { AviationNetwork, Hero } from "./components/Hero";
import { About, AnimalGallery, Services, TravelQuestions } from "./components/JourneySections";
import { AuthorityWall, FlightLine, Operations, WelfarePromise } from "./components/OptionBShowcase";
import { QuoteCalculator } from "./components/QuoteCalculator";
import { Contact } from "./components/Contact";
import { CustomerDialogs, type DialogState } from "./components/CustomerDialogs";
import { Footer } from "./components/Footer";
import { WhatsAppIcon } from "./components/Brand";
import { generalChat, goToSection, type AnimalId, type ServiceId } from "./data/logistics";
import "./styles/option-b.css";
import "./styles/motion.css";

export default function App() {
  const [animalId, setAnimalId] = useState<AnimalId>("dog");
  const [contactService, setContactService] = useState<ServiceId | "">("");
  const [dialog, setDialog] = useState<DialogState>(null);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    // Scroll reveal: each major section fades in and slides up once as it enters the viewport.
    const sections = document.querySelectorAll<HTMLElement>(".reveal-section");
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); reveal.unobserve(entry.target); }
      });
    }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });
    sections.forEach((section) => reveal.observe(section));
    const headerObserver = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.bottom < 0));
    const hero = document.getElementById("top");
    if (hero) headerObserver.observe(hero);
    const handleHash = () => {
      if (window.location.hash === "#tracking") setDialog({ type: "tracking" });
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => { reveal.disconnect(); headerObserver.disconnect(); window.removeEventListener("hashchange", handleHash); };
  }, []);

  function selectAnimal(id: AnimalId) {
    setAnimalId(id);
    goToSection("quote", "quote-heading");
  }
  function enquire(id: ServiceId) {
    setContactService(id);
    setDialog(null);
    requestAnimationFrame(() => goToSection("contact", "contact-name"));
  }
  const showService = (id: ServiceId) => setDialog({ type: "service", id });
  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <Hero onTrack={() => setDialog({ type: "tracking" })} onService={showService} />
    <main id="main-content" tabIndex={-1}>
      <AviationNetwork />
      <Services onService={showService} />
      <AnimalGallery onChoose={selectAnimal} />
      <WelfarePromise />
      <Operations onEnquire={enquire} />
      <About />
      <div className="b-pricing-slab"><QuoteCalculator animalId={animalId} setAnimalId={setAnimalId} /></div>
      <FlightLine />
      <AuthorityWall />
      <TravelQuestions />
      <Contact service={contactService} setService={setContactService} />
    </main>
    <Footer open={setDialog} />
    <a className={`floating-chat${pastHero ? " above-dock" : ""}`} href={generalChat} target="_blank" rel="noreferrer" aria-label="Chat with our team on WhatsApp"><WhatsAppIcon size={29} /><span>Chat with our team</span></a>
    {pastHero && <nav className="mobile-dock" aria-label="Quick contact"><a href="tel:+2348075737800"><Phone size={16} />Call our team</a><a href="#quote">Get a Quote<ArrowUpRight size={16} /></a></nav>}
    <CustomerDialogs active={dialog} close={() => setDialog(null)} onEnquire={enquire} />
  </>;
}