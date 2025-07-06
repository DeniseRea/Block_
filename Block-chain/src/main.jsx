import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import {WelcomePage} from "./pages/Welcome/WelcomePage";

// Importación de estilos y scripts necesarios
import "bootstrap/dist/css/bootstrap.min.css";

// Agregar Bootstrap JS dinámicamente
const bootstrapScript = document.createElement("script");
bootstrapScript.src =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
bootstrapScript.defer = true;
document.head.appendChild(bootstrapScript);

const fontAwesomeLink = document.createElement("link");
fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
fontAwesomeLink.rel = "stylesheet";
document.head.appendChild(fontAwesomeLink);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/welcome" element={<WelcomePage name="Usuario" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
