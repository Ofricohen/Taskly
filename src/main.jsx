import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Clarity from "@microsoft/clarity";

import "./index.css";
import App from "./App.jsx";
import "./styles/globals.css";

if (import.meta.env.PROD) {
  Clarity.init("xc20ieuf9x");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
