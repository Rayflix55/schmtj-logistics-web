import { useEffect, useRef, type ReactNode } from "react";
import { Plane, X } from "lucide-react";

export function Brand() {
  return <a className="tarmac-brand" href="#top" aria-label="SCHMTJ Logistics Services home">
    <span className="tarmac-brand-mark"><Plane size={24} strokeWidth={2.2} aria-hidden="true" /></span>
    <span className="tarmac-brand-type"><strong>SCHMTJ</strong><span>Logistics &middot; ABV</span></span>
  </a>;
}

export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 3.49A11.8 11.8 0 0 0 1.84 17.73L.17 23.82l6.24-1.64a11.8 11.8 0 0 0 14.04-18.69Zm-8.37 18.05a9.7 9.7 0 0 1-4.96-1.36l-.36-.22-3.7.97.99-3.6-.24-.38a9.78 9.78 0 1 1 8.27 4.59Zm5.36-7.32c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.65.15-.2.29-.76.95-.93 1.14-.17.2-.34.22-.64.08-.29-.15-1.24-.46-2.37-1.47a8.85 8.85 0 0 1-1.64-2.04c-.17-.3 0-.46.13-.6.13-.13.29-.34.44-.51.14-.17.19-.3.29-.49.1-.2.05-.37-.02-.51-.08-.15-.66-1.59-.9-2.17-.24-.57-.48-.49-.66-.5l-.56-.01c-.2 0-.51.07-.78.36-.27.3-1.02 1-1.02 2.44s1.05 2.82 1.19 3.02c.15.19 2.06 3.14 5 4.4.7.3 1.24.48 1.67.61.7.23 1.34.2 1.85.13.56-.08 1.73-.71 1.98-1.4.24-.67.24-1.26.17-1.38-.08-.12-.27-.19-.56-.34Z" />
  </svg>;
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="b-eyebrow"><span aria-hidden="true">&#123; </span>{children}<span aria-hidden="true"> &#125;<i>_</i></span></p>;
}

export function Modal({ children, title, onClose, className = "" }: { children: ReactNode; title: string; onClose: () => void; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={ref} className={`modal ${className}`} aria-label={title}
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const box = event.currentTarget.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose();
    }}>
    <button type="button" className="icon-button modal-close" aria-label="Close dialog" onClick={onClose}><X size={20} /></button>
    {children}
  </dialog>;
}