import { useState } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import { WelcomePage } from "../Welcome/WelcomePage";
import { UpdatePage } from "../Update/UpdatePage";
import { ListBlock } from "../ListBlock/ListBlock";
import { AuditPage } from "../Validation/AuditPage";
import { ConfigPage } from "../Config/ConfigPage";
import { ValidationPage } from "../Validation/ValidationPage";
import { HelpPage } from "../Help/HelpPage";

export const HomePage = (usuario) => {
  const [activeComponent, setActiveComponent] = useState("welcome");

  const renderContent = () => {
    switch (activeComponent) {
      case "welcome":
        return <WelcomePage name={usuario.name} />;
      case "upload":
        return <UpdatePage />;
      case "list":
        return <ListBlock />;
      case "audit":
        return <AuditPage />;
      case "config":
        return <ConfigPage />;
      case "points":
        return <ValidationPage fileContent="Ejemplo de contenido simulado" />;
      case "user":
        return <HelpPage />;
      default:
        return <WelcomePage name={usuario.name} />;
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Columna izquierda: NavBar */}
      <div className="bg-primary text-white" style={{ width: "80px" }}>
        <NavBar onNavigate={setActiveComponent} />
      </div>

      {/* Columna derecha: Contenido principal */}
      <div className="flex-grow-1 bg-light p-4">
        {renderContent()}
      </div>
    </div>
  );
};
