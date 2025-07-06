import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginPage from "./pages/Login/LoginPage.jsx";
import { WelcomePage } from "./pages/Welcome/WelcomePage.jsx";
import { UpdatePage } from "./pages/Update/UpdatePage.jsx";
import { ListBlock } from './pages/ListBlock/ListBlock.jsx';
import { AuditPage } from './pages/Validation/AuditPage.jsx';
import { ConfigPage } from './pages/Config/ConfigPage.jsx';

{/*importaciones de las librerias necesarias */}
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
import 'bootstrap/dist/css/bootstrap.min.css';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginPage />
    <WelcomePage name="Christopher" />
    <UpdatePage />
    <ListBlock/>
    <AuditPage />
    <ConfigPage/>
  </StrictMode>,
)
