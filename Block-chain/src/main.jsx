import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LoginPage from "./pages/Login/LoginPage.jsx";
import { WelcomePage } from "./pages/Welcome/WelcomePage.jsx";
import { UpdatePage } from "./pages/Update/UpdatePage.jsx";
import { ListBlock } from './pages/ListBlock/ListBlock.jsx';
import { AuditPage } from './pages/Validation/AuditPage.jsx';
import { ConfigPage } from './pages/Config/ConfigPage.jsx';
import { HelpPage } from './pages/Help/HelpPage.jsx';

// Importación de estilos y scripts necesarios
import 'bootstrap/dist/css/bootstrap.min.css';

// Agregar Bootstrap JS dinámicamente
const bootstrapScript = document.createElement('script');
bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
bootstrapScript.defer = true;
document.head.appendChild(bootstrapScript);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginPage />
    <WelcomePage name="Christopher" />
    <UpdatePage />
    <ListBlock />
    <AuditPage />
    <ConfigPage />
    <HelpPage />
  </StrictMode>
);
