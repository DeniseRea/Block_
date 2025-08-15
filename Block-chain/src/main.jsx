import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importación de contextos
import { ThemeProvider } from "./context/ThemeContext";
import { AppProvider } from "./context/AppContext";

// Importación de páginas
import LoginPage from "./pages/Login/LoginPage";
import { WelcomePage } from "./pages/Welcome/WelcomePage";
import { HomePage } from "./pages/Home/HomePage";
import PointsPage from "./pages/Points/PointsPage";
import { AuditPage } from "./pages/Validation/AuditPage";

// Importación de estilos
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/theme.css";

// Agregar Bootstrap JS dinámicamente
const bootstrapScript = document.createElement("script");
bootstrapScript.src =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
bootstrapScript.defer = true;
document.head.appendChild(bootstrapScript);

// Agregar Font Awesome dinámicamente
const fontAwesomeLink = document.createElement("link");
fontAwesomeLink.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
fontAwesomeLink.rel = "stylesheet";
document.head.appendChild(fontAwesomeLink);

// Renderizar la aplicación
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/welcome" element={<WelcomePage name="Usuario" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/points" element={<PointsPage />} />
            <Route path="/audit" element={<AuditPage />} />
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  </StrictMode>
);
