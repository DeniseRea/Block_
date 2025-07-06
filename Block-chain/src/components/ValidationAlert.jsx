// src/components/ValidationAlert.jsx

import PropTypes from "prop-types";
import Swal from "sweetalert2";

export const ValidationAlert = ({ isValid, successMessage, errorMessage }) => {
  // Mostrar alerta dinámica al cargar el componente
  if (isValid) {
    Swal.fire({
      icon: "success",
      title: "¡Validación exitosa!",
      text: successMessage,
      confirmButtonText: "Aceptar",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Error de validación",
      text: errorMessage,
      confirmButtonText: "Aceptar",
    });
  }

  // Retornar un elemento vacío ya que la alerta es dinámica
  return null;
};

ValidationAlert.propTypes = {
  isValid: PropTypes.bool.isRequired,
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
};
