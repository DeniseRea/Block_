import React from "react";
import { NavItem } from "./NavItem";
import { useTheme } from "../../context/ThemeContext";
import { FaHome, FaUpload, FaList, FaClipboardCheck, FaCog, FaStar, FaUser } from "react-icons/fa";

export const NavBar = ({ onNavigate, currentPage }) => {
  const { colors } = useTheme();

  const navItems = [
    { key: "welcome", icon: FaHome, label: "Inicio" },
    { key: "upload", icon: FaUpload, label: "Subir" },
    { key: "list", icon: FaList, label: "Lista" },
    { key: "audit", icon: FaClipboardCheck, label: "Auditoría" },
    { key: "config", icon: FaCog, label: "Configuración" },
    { key: "points", icon: FaStar, label: "Puntos" },
    { key: "user", icon: FaUser, label: "Usuario" }
  ];

  return (
    <nav 
      className="d-flex flex-column justify-content-start align-items-center position-fixed"
      style={{
        left: 0,
        top: 0,
        width: "60px",
        height: "100vh",
        backgroundColor: colors.primary,
        zIndex: 1000,
        transition: "all 0.3s ease",
        paddingTop: "1rem",
        paddingBottom: "1rem"
      }}
    >
      <ul className="navbar-nav d-flex flex-column gap-3 h-100 justify-content-center">
        {navItems.map(({ key, icon: Icon, label }) => (
          <NavItem
            key={key}
            onClick={() => onNavigate(key)}
            icon={<Icon className="fs-4" />}
            label={label}
            isActive={currentPage === key}
          />
        ))}
      </ul>
    </nav>
  );
};
