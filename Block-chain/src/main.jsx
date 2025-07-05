import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginPage from "./pages/Login/LoginPage.jsx";
import { WelcomePage } from "./pages/Welcome/WelcomePage.jsx";
import { UpdatePage } from "./pages/Update/UpdatePage.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginPage />
    <WelcomePage name="Mimi" />
    <UpdatePage />
  </StrictMode>,
)
