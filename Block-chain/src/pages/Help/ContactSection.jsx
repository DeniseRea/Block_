import React from "react";
import { useTheme } from "../../context/ThemeContext";

export const ContactSection = () => {
   const { colors } = useTheme();

   return (
      <div className="mt-5 text-center">
         <h4 className="mb-3" style={{ color: colors.primary }}>
            <i className="fas fa-envelope me-2"></i>
            Contacto / Reporte de errores
         </h4>
         <p className="mb-4" style={{ color: colors.textSecondary }}>
            Para más ayuda o para reportar errores, envíanos un correo a <strong>soporte@blockapp.com</strong> 
            o llena el formulario.
         </p>
         <a 
            href="mailto:soporte@blockapp.com" 
            className="btn btn-lg shadow-sm"
            style={{ 
               backgroundColor: colors.danger,
               color: colors.light,
               border: `1px solid ${colors.danger}`,
               textDecoration: 'none'
            }}
         >
            <i className="fas fa-paper-plane me-2"></i>
            Enviar feedback
         </a>
      </div>
   );
};
