export const ContactSection = () => {
   return (
      <div className="mt-5 text-center">
         <h4 className="text-primary mb-3">Contacto / Reporte de errores</h4>
         <p className="mb-4">
            Para más ayuda o para reportar errores, envíanos un correo a <strong>soporte@blockapp.com</strong> 
            o llena el formulario.
         </p>
         <a href="mailto:soporte@blockapp.com" className="btn btn-danger btn-lg shadow-sm">
            Enviar feedback
         </a>
      </div>
   );
};
