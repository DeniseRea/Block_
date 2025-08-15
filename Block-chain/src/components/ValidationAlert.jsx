// src/components/ValidationAlert.jsx

import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "../context/ThemeContext";

const ValidationAlert = ({ isValid, successMessage, errorMessage, type, message, className }) => {
  const { colors } = useTheme();

  // Si se proporciona 'type' y 'message', usar esos valores
  if (type && message) {
    const alertType = type === 'error' ? 'danger' : type;
    const alertColor = colors[alertType] || colors.primary;
    const iconClass = type === 'error' ? 'fa-times-circle' : 
                     type === 'warning' ? 'fa-exclamation-triangle' :
                     type === 'success' ? 'fa-check-circle' : 'fa-info-circle';

    return (
      <div 
        className={`alert alert-${alertType} ${className || ''}`}
        role="alert"
        style={{ 
          backgroundColor: alertColor + '20',
          color: alertColor,
          borderColor: alertColor,
          border: `1px solid ${alertColor}`,
          borderRadius: '8px',
          padding: '1rem',
          margin: '1rem 0'
        }}
      >
        <i className={`fas ${iconClass} me-2`}></i>
        {message}
      </div>
    );
  }

  // Comportamiento original
  return (
    <div 
      className={`alert ${isValid ? 'alert-success' : 'alert-danger'} ${className || ''}`}
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
  isValid: PropTypes.bool,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  type: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  message: PropTypes.string,
  className: PropTypes.string,
};

export default ValidationAlert;
