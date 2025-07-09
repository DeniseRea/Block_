import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../context/ThemeContext';

export const InputField = ({ label, type, value, onChange, required, accept }) => {
  const { colors } = useTheme();

  return (
    <div className="mb-3">
      <label 
        className="form-label"
        style={{ color: colors.text }}
      >
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        value={value}
        onChange={onChange}
        required={required}
        accept={accept}
        style={{
          backgroundColor: colors.background,
          borderColor: colors.border,
          color: colors.text,
          transition: 'all 0.3s ease'
        }}
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string, // Para tipo 'file' no lo usamos
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  accept: PropTypes.string, // Aceptamos un tipo de archivo, ej: '.txt,.csv'
};
