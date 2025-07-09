import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { ThemeToggle } from "../../components/ThemeToggle";
import { useTheme } from "../../context/ThemeContext";
import { WelcomePage } from "../Welcome/WelcomePage";
import { UpdatePage } from "../Update/UpdatePage";
import { ListBlock } from "../ListBlock/ListBlock";
import { AuditPage } from "../Validation/AuditPage";
import { ConfigPage } from "../Config/ConfigPage";
import { ValidationPage } from "../Validation/ValidationPage";
import { HelpPage } from "../Help/HelpPage";

export const HomePage = () => {
  const location = useLocation();
  const usuario = location.state?.usuario || { name: "Usuario" };
  const [activeComponent, setActiveComponent] = useState("welcome");
  const { colors } = useTheme();

  const renderContent = () => {
    switch (activeComponent) {
      case "welcome":
        return <WelcomePage name={usuario.name} showNavBar={false} />;
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
        return <WelcomePage name={usuario.name} showNavBar={false} />;
    }
  };

  return (
    <div 
      className="position-relative"
      style={{ 
        backgroundColor: colors.background,
        minHeight: '100vh'
      }}
    >
      <NavBar onNavigate={setActiveComponent} currentPage={activeComponent} />
      <ThemeToggle />
      
      {/* Contenido principal */}
      <div 
        style={{ 
          marginLeft: '60px',
          minHeight: '100vh'
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};
