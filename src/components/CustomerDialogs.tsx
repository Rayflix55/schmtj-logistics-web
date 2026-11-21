import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Circle, Mail, PackageSearch, Plane, Search, ShieldCheck } from "lucide-react";
import { EMAIL, emailDraft, generalChat, services, whatsapp, type ServiceId } from "../data/logistics";
import { Kicker, Modal, WhatsAppIcon } from "./Brand";

export type DialogState = { type: "tracking" | "privacy" | "demo" | "updates" } | { type: "service"; id: ServiceId } | null;

const samples: Record<string, { city: string; code: string; animal: string; step: number }> = {
  "SCH-482913": { city: "London", code: "LHR", animal: "Dog relocation", step: 2 },
  "SCH-771204": { city: "Dubai", code: "DXB", animal: "Commercial air freight", step: 1 },
  "SCH-109955": { city: "Toronto", code: "YYZ", animal: "Cat relocation", step: 3 },
};
const milestones = ["Shipment accepted", "Documents checked", "Ready for departure", "Arrival and handover"];

function ShipmentTracking() {
  const [reference, setReference] = useState("");
  const [searched, setSearched] = useState<string | null>(null);
  const shipment = searched ? samples[searched] : undefined;
  return <><span className="dialog-symbol"><PackageSearch size={29} /></span><Kicker>Shipment support</Kicker><h2>Track your shipment.</h2><p className="dialog-lead">Explore a sample journey below. For a real shipment update, our Abuja team can help with your air waybill.</p>
    <form className="tracking-form" onSubmit={(event) => { event.preventDefault(); setSearched(reference.trim().toUpperCase()); }}>
      <label htmlFor="shipment-ref" className="field-label">Shipment reference</label><div className="tracking-input-row"><input id="shipment-ref" required maxLength={35} placeholder="e.g. SCH-482913" value={reference} onChange={(event) => { setReference(event.target.value); setSearched(null); }} /><button type="submit" className="button button-gold"><Search size={18} />Track</button></div>
    </form>
    <button className="text-link sample-link" onClick={() => { setReference("SCH-482913"); setSearched("SCH-482913"); }}>Try a sample shipment <ArrowRight size={15} /></button>
    <div aria-live="polite">{shipment ? <div className="tracking-result"><span className="small-label">Illustrative shipment</span><div className="tracking-route"><strong>Abuja</strong><Plane size={21} /><strong>{shipment.city}</strong></div><p>{shipment.animal} &middot; ABV to {shipment.code}</p><ol className="tracking-timeline">{milestones.map((label, index) => <li key={label} className={index <= shipment.step ? "completed" : ""}>{index <= shipment.step ? <Check size={16} /> : <Circle size={10} />}<span>{label}</span>{index === shipment.step && <small>Current step</small>}</li>)}</ol><small>Sample data only. This is not a live carrier update.</small></div> : searched !== null ? <div className="tracking-notice"><strong>No sample shipment matches that reference.</strong><p>This demo only recognises sample references. Contact our team for the status of a real shipment.</p></div> : null}</div>
    <a className="button button-outline dialog-wide" href={whatsapp(`Hello SCHMTJ, please help me with a shipment update.${reference.trim() ? ` My reference is ${reference.trim()}.` : ""}`)} target="_blank" rel="noreferrer"><span className="whatsapp-green"><WhatsAppIcon size={19} /></span>Ask the tracking team</a>
  </>;
}

function TravelUpdates() {
  const [draft, setDraft] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const address = new FormData(event.currentTarget).get("email");
    const url = emailDraft("Request for travel updates", `Hello SCHMTJ,\n\nPlease contact me about your occasional animal travel and air cargo updates at ${address}.\n\nThank you.`);
    setDraft(url); window.location.href = url;
  }
  return <><span className="dialog-symbol"><Mail size={28} /></span><Kicker>Stay in touch</Kicker><h2>Travel updates.</h2><p className="dialog-lead">Request occasional advice on animal travel, documentation, and air cargo from our team.</p><form className="updates-form" onSubmit={handleSubmit}><label className="field-label" htmlFor="updates-email">Email address<input type="email" id="updates-email" name="email" autoComplete="email" required placeholder="you@example.com" onChange={() => setDraft("")} /></label><button className="button button-gold" type="submit">Request updates by email <ArrowRight size={17} /></button></form><p className="form-disclosure">Your email app opens with a request for you to review and send. This does not automatically subscribe you.</p>{draft && <a className="text-link" href={draft}>Reopen email draft <ArrowRight size={15} /></a>}</>;
}

export function CustomerDialogs({ active, close, onEnquire }: { active: DialogState; close: () => void; onEnquire: (id: ServiceId) => void }) {
  if (!active) return null;
  if (active.type === "tracking") return <Modal title="Shipment tracking" onClose={close}><ShipmentTracking /></Modal>;
  if (active.type === "updates") return <Modal title="Request travel updates" onClose={close}><TravelUpdates /></Modal>;
  if (active.type === "service") {
    const service = services.find((item) => item.id === active.id)!;
    return <Modal key={service.id} title={service.title} onClose={close}><span className="dialog-symbol"><service.icon size={29} /></span><Kicker>Our services</Kicker><h2>{service.title}.</h2><p className="dialog-lead">{service.description}</p><ul className="check-list">{service.details.map((detail) => <li key={detail}><Check size={17} />{detail}</li>)}</ul><button className="button button-gold dialog-wide" onClick={() => onEnquire(service.id)}>Discuss this service <ArrowRight size={18} /></button></Modal>;
  }
  return <Modal title={active.type === "privacy" ? "Privacy information" : "About this demo"} onClose={close}><span className="dialog-symbol"><ShieldCheck size={28} /></span><Kicker>Good to know</Kicker><h2>{active.type === "privacy" ? "Your privacy." : "About this demo."}</h2>
    {active.type === "privacy" ? <div className="dialog-prose"><p>Your enquiry and quote choices stay in this browser session. This website does not save form submissions to a database or automatically subscribe you to a mailing list.</p><h3>You choose when to send</h3><p>Continuing to WhatsApp opens your details in an external message draft. Email requests open in your email app. Review the details before pressing Send.</p><h3>External services</h3><p>WhatsApp, your email provider, and Google Maps process information under their own policies. The airport map is only loaded when you request it.</p><p>For privacy questions, email <a href={`mailto:${EMAIL}`} className="inline-link">{EMAIL}</a>.</p></div>
    : <div className="dialog-prose"><p>This website demonstrates the customer experience of SCHMTJ Logistics Services. The calculator uses illustrative prices in US dollars and does not reserve a flight or take payment.</p><p>Shipment examples and statistics are for demonstration. Airline names indicate the wider aviation network, not a guarantee of a particular partnership or route.</p><p>All shipments, especially live animals, require individual airline, veterinary, and regulatory approval. Our team confirms current availability, documents, and exact pricing.</p><a className="text-link" href={generalChat} target="_blank" rel="noreferrer">Speak with our team <ArrowRight size={16} /></a></div>}
  </Modal>;
}