export const QuickGuideSection = () => {
   return (
      <div className="mt-5 text-center">
         <h4 className="text-primary mb-4">Guías Rápidas</h4>
         <div className="d-flex flex-wrap justify-content-center gap-3">
            <QuickGuideButton text="Iniciar sesión" link="/login" />
            <QuickGuideButton text="Cargar archivo" link="/upload" />
            <QuickGuideButton text="Validar archivo" link="/validate" />
            <QuickGuideButton text="Auditar cadena" link="/audit" />
         </div>
      </div>
   );
};

const QuickGuideButton = ({ text, link }) => {
   return (
      <a href={link} className="btn btn-outline-primary btn-lg">{text}</a>
   );
};
