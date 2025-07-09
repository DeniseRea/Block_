import React from "react";
import { useTheme } from "../context/ThemeContext";

export const FileInput = ({ onFileChange }) => {
  const { colors } = useTheme();

  // Función para validar el formato del archivo
  const validateFileFormat = (file) => {
    const allowedExtensions = ['.txt', '.json', '.csv'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  };

  // Función para mostrar modal de error
  const showErrorModal = (message) => {
    // Crear modal dinámicamente
    const modalHtml = `
      <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content" style="background-color: ${colors.card}; color: ${colors.text}; border: 1px solid ${colors.border};">
            <div class="modal-header" style="border-bottom: 1px solid ${colors.border};">
              <h5 class="modal-title" id="errorModalLabel" style="color: ${colors.danger};">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Error de validación
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p style="color: ${colors.text};">${message}</p>
              <p style="color: ${colors.textSecondary}; font-size: 0.9rem;">
                <i class="fas fa-info-circle me-1"></i>
                Formatos soportados: .txt, .json, .csv
              </p>
            </div>
            <div class="modal-footer" style="border-top: 1px solid ${colors.border};">
              <button type="button" class="btn" data-bs-dismiss="modal" style="background-color: ${colors.primary}; color: ${colors.light}; border: 1px solid ${colors.primary};">
                <i class="fas fa-check me-1"></i>
                Entendido
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Eliminar modal existente si existe
    const existingModal = document.getElementById('errorModal');
    if (existingModal) {
      existingModal.remove();
    }

    // Agregar modal al DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('errorModal'));
    modal.show();

    // Limpiar modal después de cerrarlo
    document.getElementById('errorModal').addEventListener('hidden.bs.modal', function () {
      this.remove();
    });
  };

  // Manejamos el cambio del archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      // Validar formato
      if (!validateFileFormat(file)) {
        // Limpiar el input
        event.target.value = '';
        
        // Mostrar modal de error
        showErrorModal(`El archivo "${file.name}" no tiene un formato válido.`);
        return;
      }
      
      // Si es válido, proceder
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
        <i className="fas fa-info-circle me-1"></i>
        Formatos soportados: .txt, .json, .csv
      </div>
    </div>
  );
};
