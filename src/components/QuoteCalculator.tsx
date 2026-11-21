import { useState } from "react";
import { ArrowRight, ChevronDown, MapPin, Plane, ShieldCheck } from "lucide-react";
import { animals, destinations, estimatePrice, money, whatsapp, type AnimalId } from "../data/logistics";
import { Kicker, WhatsAppIcon } from "./Brand";

export function QuoteCalculator({ animalId, setAnimalId }: { animalId: AnimalId; setAnimalId: (id: AnimalId) => void }) {
  const [destination, setDestination] = useState(0);
  const [weight, setWeight] = useState("12");
  const [crate, setCrate] = useState(true);
  const [documents, setDocuments] = useState(true);
  const numericWeight = Number(weight);
  const valid = weight.trim() !== "" && Number.isFinite(numericWeight) && numericWeight >= 1 && numericWeight <= 80;
  const route = destinations[destination];
  const animal = animals.find((item) => item.id === animalId)!;
  const result = estimatePrice(animalId, destination, numericWeight, crate, documents);
  const message = `Hello SCHMTJ Logistics! I would like to confirm an exact price for animal travel.\n\nAnimal: ${animal.name}\nFrom: Abuja, Nigeria (ABV)\nDestination: ${route.city}, ${route.country} (${route.code})\nApproximate weight: ${numericWeight} kg\nTravel crate: ${crate ? "Include a crate" : "I have a crate"}\nDocument support: ${documents ? "Requested" : "Not included in estimate"}\nIllustrative estimate: ${money(result.low)} to ${money(result.high)} USD.\n\nPlease confirm eligibility, available flights, requirements, and the final price.`;
  return <section id="quote" className="page-section container quote-layout reveal-section" aria-labelledby="quote-heading">
    <div className="quote-introduction"><Kicker>Interactive pricing</Kicker><h2 id="quote-heading" tabIndex={-1}>Estimate freight in 20 seconds. Confirm on WhatsApp.</h2><p>Pick your species, destination, and weight. See an indicative range, then send your details to our Abuja team for exact pricing and flight options.</p>
      <div className="route-preview" aria-label={`From Abuja to ${route.city}`}><div><small>Departing from</small><strong>Abuja</strong><span>Nigeria</span></div><div className="route-connector"><i /><Plane size={23} /><i /></div><div><small>Arriving in</small><strong>{route.city}</strong><span>{route.country}</span></div></div>
      <p className="quote-help"><ShieldCheck size={21} />We review your animal's travel eligibility and airline requirements before confirming a booking.</p>
    </div>
    <div className="calculator-card">
      <div className="calculator-title"><span className="small-icon"><Plane size={21} /></span><h3>Animal travel estimate</h3></div>
      <div className="form-pair">
        <div className="field-label"><label htmlFor="quote-animal">Select Animal</label><span className="select-wrap"><select id="quote-animal" value={animalId} onChange={(e) => setAnimalId(e.target.value as AnimalId)}>{animals.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><ChevronDown size={16} /></span></div>
        <div className="field-label"><label htmlFor="quote-country">Destination Country</label><span className="select-wrap"><select id="quote-country" value={destination} onChange={(e) => setDestination(Number(e.target.value))}>{destinations.map((item, index) => <option key={item.code} value={index}>{item.country}</option>)}</select><ChevronDown size={16} /></span></div>
      </div>
      <div className="weight-field"><div><label className="field-label" htmlFor="quote-weight">Approximate Weight</label><span className="weight-input"><input id="quote-weight" type="number" min="1" max="80" step="0.1" inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} aria-invalid={!valid} aria-describedby="weight-hint" /><span>kg</span></span></div>
        <input className="weight-range" type="range" min="1" max="80" step="0.1" aria-label="Adjust weight in kilograms" value={valid ? numericWeight : 1} onChange={(e) => setWeight(e.target.value)} style={{ background: `linear-gradient(to right, var(--gold) ${((valid ? numericWeight : 1) - 1) / 79 * 100}%, rgba(255,255,255,.15) 0%)` }} />
        <div id="weight-hint" className="range-hints">{valid ? <><span>1 kg</span><span>80 kg</span></> : <span>Enter a weight between 1 and 80 kg. For larger shipments, contact our team.</span>}</div>
      </div>
      <fieldset className="quote-extras"><legend>Include in my estimate</legend><label><input type="checkbox" checked={crate} onChange={(e) => setCrate(e.target.checked)} />Travel crate</label><label><input type="checkbox" checked={documents} onChange={(e) => setDocuments(e.target.checked)} />Vet &amp; document support</label></fieldset>
      <div className="estimate-result" aria-live="polite" aria-atomic="true"><span>Estimated travel cost <small>USD</small></span><strong>{valid ? `${money(result.low)} - ${money(result.high)}` : "Enter a valid weight"}</strong></div>
      {valid ? <a id="confirm-quote" className="button button-gold quote-submit" href={whatsapp(message)} target="_blank" rel="noreferrer"><WhatsAppIcon size={20} />Confirm Exact Price on WhatsApp<ArrowRight size={18} /></a> : <button className="button button-gold quote-submit" disabled>Confirm Exact Price on WhatsApp</button>}
      <p className="form-disclosure"><MapPin size={14} />Illustrative pricing. No payment or booking is taken online.</p>
    </div>
  </section>;
}