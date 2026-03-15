import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Simple scroll to top on reload
if (typeof window !== "undefined") {
  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
}

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
