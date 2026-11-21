import { ArrowUp, ArrowUpRight, Mail, Phone } from "lucide-react";
import { EMAIL, generalChat } from "../data/logistics";
import { Brand, WhatsAppIcon } from "./Brand";
import type { DialogState } from "./CustomerDialogs";

export function Footer({ open }: { open: (dialog: DialogState) => void }) {
  return <footer className="site-footer b-footer"><div className="container"><p className="b-footer-signature">fly schmtj-cargo</p><div className="footer-main"><div className="footer-brand"><Brand /><p>Global air cargo and live animal export from Nnamdi Azikiwe International Airport, Abuja.</p><div className="footer-social"><a href={generalChat} target="_blank" rel="noreferrer" aria-label="Chat with SCHMTJ on WhatsApp"><WhatsAppIcon size={18} /></a><a href="tel:+2348075737800" aria-label="Call SCHMTJ Logistics"><Phone size={17} /></a><a href={`mailto:${EMAIL}`} aria-label="Email SCHMTJ Logistics"><Mail size={18} /></a></div></div>
    <div className="footer-links"><h3>Discover</h3><a href="#services">Our services</a><a href="#animals">Animal travel</a><a href="#process">Our process</a><a href="#about">About SCHMTJ</a></div>
    <div className="footer-links"><h3>Plan a shipment</h3><a href="#quote">Get a quote</a><button onClick={() => open({ type: "tracking" })}>Track a shipment</button><a href="#questions">Travel questions</a><a href="#contact">Contact our team</a></div>
    <div className="footer-links"><h3>Stay connected</h3><a href="tel:+2348075737800">0807 573 7800</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><button className="footer-updates" onClick={() => open({ type: "updates" })}>Request travel updates <ArrowUpRight size={15} /></button></div>
  </div><div className="footer-bottom"><p>&copy; {new Date().getFullYear()} SCHMTJ Logistics Services</p><div><button onClick={() => open({ type: "privacy" })}>Privacy</button><button onClick={() => open({ type: "demo" })}>About this demo</button><a href="#top">Back to top <ArrowUp size={14} /></a></div></div></div></footer>;
}