import React from "react";
import { InputField } from "./InputField";
import { useTheme } from "../context/ThemeContext";

export const FileInput = ({ onFileChange }) => {
  const { colors } = useTheme();

  // Manejamos el cambio del archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      onFileChange(file); 
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label" style={{ color: colors.text }}>
        <i className="fas fa-file me-2"></i>
        Elegir archivo
      </label>
      <input
        type="file"
        className="form-control"
        onChange={handleFileChange}
        accept=".txt,.json,.csv"
        required
        style={{ 
          backgroundColor: colors.background,
          color: colors.text,
          borderColor: colors.border,
          padding: '0.75rem'
        }}
      />
      <div className="form-text" style={{ color: colors.textSecondary }}>
        Formatos soportados: .txt, .json, .csv
      </div>
    </div>
  );
};
