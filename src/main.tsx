import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Prepare scroll reveals before the first paint so sections never flash visible and then hide.
const canAnimateReveals = "IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (canAnimateReveals) document.documentElement.classList.add("reveal-ready");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
