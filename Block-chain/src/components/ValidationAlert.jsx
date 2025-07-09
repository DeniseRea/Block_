// src/components/ValidationAlert.jsx

import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "../context/ThemeContext";

export const ValidationAlert = ({ isValid, successMessage, errorMessage }) => {
  const { colors } = useTheme();

  return (
    <div 
      className={`alert ${isValid ? 'alert-success' : 'alert-danger'}`}
      role="alert"
      style={{ 
        backgroundColor: isValid ? colors.success + '20' : colors.danger + '20',
        color: isValid ? colors.success : colors.danger,
        borderColor: isValid ? colors.success : colors.danger,
        border: `1px solid ${isValid ? colors.success : colors.danger}`,
        borderRadius: '8px',
        padding: '1rem',
        margin: '1rem 0'
      }}
    >
      <i className={`fas ${isValid ? 'fa-check-circle' : 'fa-times-circle'} me-2`}></i>
      <strong>{isValid ? '¡Validación exitosa!' : 'Error de validación'}</strong>
      <br />
      {isValid ? successMessage : errorMessage}
    </div>
  );
};

ValidationAlert.propTypes = {
  isValid: PropTypes.bool.isRequired,
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
};
