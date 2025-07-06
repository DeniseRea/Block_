export const FAQSection = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">Preguntas Frecuentes</h2>
      <div className="accordion" id="faqAccordion">
        <FAQItem
          question="¿Cómo inicio sesión?"
          answer="Para iniciar sesión, ingresa tu correo electrónico y contraseña en la página de inicio."
        />
        <FAQItem
          question="¿Qué tipo de archivo puedo subir?"
          answer="Los formatos soportados son .txt, .csv, .json."
        />
        <FAQItem
          question="¿Cómo valido un archivo?"
          answer="Después de subir un archivo, la validación se realiza automáticamente y se muestra el resultado."
        />
        {/* Agrega más FAQItem según sea necesario */}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const id = `faq-${question.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${id}`}
          aria-expanded="false"
          aria-controls={id}
        >
          {question}
        </button>
      </h2>
      <div
        id={id}
        className="accordion-collapse collapse"
        data-bs-parent="#faqAccordion"
      >
        <div className="accordion-body">{answer}</div>
      </div>
    </div>
  );
};
