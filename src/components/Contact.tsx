import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Mail, MapPin, Phone, X } from "lucide-react";
import { AIRPORT, EMAIL, MAP_URL, emailDraft, services, whatsapp, type ServiceId } from "../data/logistics";
import { Kicker, WhatsAppIcon } from "./Brand";

type Handoff = { url: string; channel: "email" | "whatsapp" };

export function Contact({ service, setService }: { service: ServiceId | ""; setService: (id: ServiceId | "") => void }) {
  const [mapOpen, setMapOpen] = useState(false);
  const [handoff, setHandoff] = useState<Handoff | null>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const name = value("name");
    const needed = services.find((item) => item.id === value("service"))?.title ?? "General enquiry";
    const body = `Hello SCHMTJ Logistics,\n\nI would like to enquire about ${needed.toLowerCase()}.\n\nName: ${name}\nEmail: ${value("email")}\nPhone: ${value("phone")}\nService: ${needed}\n\n${value("message")}`;
    const channel = ((event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value === "email" ? "email" : "whatsapp";
    const url = channel === "email" ? emailDraft(`${needed} enquiry from ${name}`, body) : whatsapp(body);
    setHandoff({ channel, url });
    if (channel === "email") window.location.href = url;
    else window.open(url, "_blank", "noopener,noreferrer");
  }
  return <section id="contact" className="page-section container contact-layout reveal-section" aria-labelledby="contact-heading">
    <div className="contact-information"><Kicker>Contact &amp; location &middot; Find us airside</Kicker><h2 id="contact-heading">We're at the airport. Literally.</h2><p>Whether it is a much-loved pet or an important shipment, our team at Abuja Airport is here to help.</p>
      <div className="contact-lines"><div><MapPin /><span><strong>Visit our Abuja team</strong>{AIRPORT}, Nigeria<button className="text-link" type="button" aria-expanded={mapOpen} aria-controls="airport-map" onClick={() => setMapOpen(!mapOpen)}>{mapOpen ? "Hide airport map" : "View airport map"}{mapOpen ? <X size={14} /> : <ArrowUpRight size={15} />}</button></span></div>
        <div><Phone /><span><strong>Call us</strong><a href="tel:+2348075737800">0807 573 7800</a><a href="tel:+2349030200452">0903 020 0452</a></span></div>
        <div><Mail /><span><strong>Email us</strong><a href={`mailto:${EMAIL}`}>{EMAIL}</a></span></div>
      </div>
      {mapOpen && <div className="airport-map" id="airport-map"><iframe title="Map of Nnamdi Azikiwe International Airport, Abuja" src="https://www.google.com/maps?q=Nnamdi+Azikiwe+International+Airport+Abuja&output=embed" referrerPolicy="no-referrer-when-downgrade" loading="lazy" /><a href={MAP_URL} target="_blank" rel="noreferrer" className="text-link">Get directions in Google Maps <ArrowUpRight size={15} /></a></div>}
    </div>
    <form className="enquiry-card" onSubmit={submit} onInput={() => setHandoff(null)}>
      <h3>Tell us about your shipment</h3><p>We will help you find the right next step.</p>
      <div className="form-pair"><label className="field-label" htmlFor="contact-name">Full name<input id="contact-name" name="name" autoComplete="name" required maxLength={100} pattern=".*\S.*" placeholder="Your name" /></label><label className="field-label" htmlFor="contact-phone">Phone number<input id="contact-phone" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={30} pattern="(?=.*[0-9])[+0-9\s\.\(\)\-]{7,30}" title="Enter a phone number with 7 to 30 characters" placeholder="e.g. +234 807 000 0000" /></label></div>
      <label className="field-label" htmlFor="contact-email">Email address<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@example.com" /></label>
      <label className="field-label" htmlFor="contact-service">Service needed<span className="select-wrap"><select id="contact-service" name="service" required value={service} onChange={(e) => { setService(e.target.value as ServiceId); setHandoff(null); }}><option value="" disabled>Select a service</option>{services.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select><ChevronDown size={16} /></span></label>
      <label className="field-label" htmlFor="contact-message">Your message<textarea id="contact-message" name="message" required rows={4} maxLength={1800} placeholder="What is travelling, where to, and when?" /></label>
      <button className="button button-gold contact-submit" type="submit" name="channel" value="whatsapp"><WhatsAppIcon size={20} />Continue on WhatsApp<ArrowRight size={18} /></button>
      <button className="email-alternative" type="submit" name="channel" value="email"><Mail size={15} />Send by email instead</button>
      {handoff ? <div className="handoff-message" role="status"><strong>Your draft is ready.</strong><p>Review your details and press Send in {handoff.channel === "email" ? "your email app" : "WhatsApp"}. Nothing has been sent automatically.</p><a className="inline-link" href={handoff.url} target={handoff.channel === "whatsapp" ? "_blank" : undefined} rel="noreferrer">Open your draft again</a></div> : <p className="form-disclosure">You review and send the message in your chosen app.</p>}
    </form>
  </section>;
}