import React from "react";
import { useTheme } from "../../context/ThemeContext";

export const QuickGuideSection = () => {
   const { colors } = useTheme();

   return (
      <div className="mt-5 text-center">
         <h4 className="mb-4" style={{ color: colors.primary }}>
            <i className="fas fa-book me-2"></i>
            Guías Rápidas
         </h4>
         <div className="d-flex flex-wrap justify-content-center gap-3">
            <QuickGuideButton text="Iniciar sesión" link="/login" icon="fas fa-sign-in-alt" />
            <QuickGuideButton text="Cargar archivo" link="/upload" icon="fas fa-upload" />
            <QuickGuideButton text="Validar archivo" link="/validate" icon="fas fa-check-circle" />
            <QuickGuideButton text="Auditar cadena" link="/audit" icon="fas fa-shield-alt" />
         </div>
      </div>
   );
};

const QuickGuideButton = ({ text, link, icon }) => {
   const { colors } = useTheme();

   return (
      <a 
         href={link} 
         className="btn btn-lg"
         style={{ 
            backgroundColor: 'transparent',
            color: colors.primary,
            border: `2px solid ${colors.primary}`,
            textDecoration: 'none',
            transition: 'all 0.3s ease'
         }}
         onMouseEnter={(e) => {
            e.target.style.backgroundColor = colors.primary;
            e.target.style.color = colors.light;
         }}
         onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = colors.primary;
         }}
      >
         <i className={`${icon} me-2`}></i>
         {text}
      </a>
   );
};
