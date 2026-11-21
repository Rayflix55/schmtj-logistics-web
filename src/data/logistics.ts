import { FileCheck2, Globe2, PackageCheck, PawPrint } from "lucide-react";

export const EMAIL = "schmtj893@gmail.com";
export const AIRPORT = "Nnamdi Azikiwe International Airport, Abuja";
export const MAP_URL = "https://www.google.com/maps/search/?api=1&query=Nnamdi+Azikiwe+International+Airport+Abuja";
export const whatsapp = (message: string) => `https://wa.me/2348075737800?text=${encodeURIComponent(message)}`;
export const emailDraft = (subject: string, body: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
export const generalChat = whatsapp("Hello SCHMTJ Logistics! I would like some help planning a shipment from Abuja.");

export const animals = [
  { id: "dog", name: "Dog", plural: "Dogs", image: "/images/dog.webp", factor: 1.15, alt: "An attentive German shepherd ready for a walk" },
  { id: "cat", name: "Cat", plural: "Cats", image: "/images/cat.webp", factor: 1, alt: "A calm, light-coloured cat sitting upright" },
  { id: "goat", name: "Goat", plural: "Goats", image: "/images/goat.webp", factor: 1.5, alt: "A brown goat resting in a farm enclosure" },
  { id: "poultry", name: "Poultry", plural: "Poultry", image: "/images/poultry.webp", factor: 1.25, alt: "A white hen in soft daylight" },
  { id: "parrot", name: "African parrot", plural: "African parrots", image: "/images/parrot.webp", factor: 1.35, alt: "A close-up portrait of an African grey parrot" },
] as const;
export type AnimalId = (typeof animals)[number]["id"];

export const destinations = [
  { country: "United Kingdom", city: "London", code: "LHR", base: 1450, rate: 38 },
  { country: "United States", city: "New York", code: "JFK", base: 1850, rate: 46 },
  { country: "Canada", city: "Toronto", code: "YYZ", base: 1920, rate: 48 },
  { country: "United Arab Emirates", city: "Dubai", code: "DXB", base: 980, rate: 28 },
  { country: "South Africa", city: "Johannesburg", code: "JNB", base: 720, rate: 22 },
  { country: "Turkey", city: "Istanbul", code: "IST", base: 1100, rate: 32 },
] as const;

export const services = [
  { id: "animals", title: "Live animal export", icon: PawPrint,
    summary: "Thoughtful travel for pets, birds, and livestock, with their comfort at the centre.",
    description: "From that first crate introduction to the destination handover, we help you plan a journey suited to your animal, its health, and its needs.",
    details: ["Species-appropriate travel crate advice", "Pre-flight veterinary and document checks", "Airline acceptance and handover coordination"] },
  { id: "clearance", title: "Import & export clearing", icon: PackageCheck,
    summary: "A straightforward path through customs, from arrival to the final handover.",
    description: "Give our Abuja team the shipment details and we will walk you through the clearance requirements, expected charges, and next steps.",
    details: ["Import and export paperwork review", "Customs and airport inspection coordination", "Collection planning and shipment updates"] },
  { id: "documents", title: "Documentation & compliance", icon: FileCheck2,
    summary: "Clear guidance on veterinary documents, quarantine checks, and permits.",
    description: "Every route has its own requirements. We review your proposed shipment and explain which documents need to be prepared before travel.",
    details: ["Veterinary health certificate guidance", "NAQS quarantine requirements", "CITES eligibility and permit review where applicable"] },
  { id: "freight", title: "Global air cargo", icon: Globe2,
    summary: "Coordinated air freight for the goods that matter to your business.",
    description: "Plan your air freight with a team at Nnamdi Azikiwe International Airport. We help with routing, suitable packaging, and secure handling.",
    details: ["Route and airline availability checks", "Packing, weighing, and loading coordination", "Clear communication from booking to collection"] },
] as const;
export type ServiceId = (typeof services)[number]["id"];

export function goToSection(id: string, focusId?: string) {
  const target = document.getElementById(id);
  if (!target) return;
  window.history.replaceState(null, "", `#${id}`);
  target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  if (focusId) document.getElementById(focusId)?.focus({ preventScroll: true });
}

export function estimatePrice(animal: AnimalId, destination: number, weight: number, crate: boolean, documents: boolean) {
  const route = destinations[destination];
  const factor = animals.find((item) => item.id === animal)?.factor ?? 1;
  const low = Math.round(route.base + route.rate * weight * factor + (crate ? 180 : 0) + (documents ? 150 : 0));
  return { low, high: Math.round(low * 1.18) };
}

export const money = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);