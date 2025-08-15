import React from "react";
import { useTheme } from "../../context/ThemeContext";

export const ValidationPage = ({ fileContent }) => {
    const { colors } = useTheme();

    // Validación simplificada: cualquier archivo con contenido es válido
    const hasContent = fileContent && fileContent.trim().length > 0;
    const isValid = hasContent; // Siempre válido si tiene contenido

    return (
        <div>
            {hasContent ? (
                <>
                    <div 
                        className="alert d-flex align-items-center" 
                        role="alert"
                        style={{ 
                            backgroundColor: colors.success + '20',
                            color: colors.success,
                            borderColor: colors.success,
                            border: `1px solid ${colors.success}`,
                            borderRadius: '8px',
                            padding: '1rem'
                        }}
                    >
                        <i className="fas fa-check-circle me-3" style={{ fontSize: '1.5rem' }}></i>
                        <div>
                            <strong>¡Archivo válido!</strong>
                            <br />
                            <small>El archivo se ha cargado correctamente y está listo para procesar.</small>
                        </div>
                    </div>
                    
                    <div className="mt-3">
                        <h6 style={{ color: colors.text }}>
                            <i className="fas fa-info-circle me-2"></i>
                            Contenido del archivo:
                        </h6>
                        <pre 
                            className="p-3 rounded"
                            style={{ 
                                backgroundColor: colors.background,
                                color: colors.text,
                                border: `1px solid ${colors.border}`,
                                fontSize: '0.9rem',
                                maxHeight: '200px',
                                overflow: 'auto'
                            }}
                        >
                            {fileContent}
                        </pre>
                    </div>

                    <div className="mt-4 d-flex justify-content-center">
                        <button 
                            className="btn btn-lg px-4"
                            style={{ 
                                backgroundColor: colors.primary,
                                color: colors.light,
                                border: `1px solid ${colors.primary}`,
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = colors.secondary;
                                e.target.style.borderColor = colors.secondary;
                                e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = colors.primary;
                                e.target.style.borderColor = colors.primary;
                                e.target.style.transform = 'scale(1)';
                            }}
                            onClick={() => {
                                console.log("Archivo procesado correctamente");
                                // Aquí iría la lógica para procesar el archivo
                            }}
                        >
                            <i className="fas fa-upload me-2"></i>
                            Cargar
                        </button>
                    </div>
                </>
            ) : (
                <div 
                    className="alert d-flex align-items-center" 
                    role="alert"
                    style={{ 
                        backgroundColor: colors.warning + '20',
                        color: colors.warning,
                        borderColor: colors.warning,
                        border: `1px solid ${colors.warning}`,
                        borderRadius: '8px',
                        padding: '1rem'
                    }}
                >
                    <i className="fas fa-exclamation-triangle me-3" style={{ fontSize: '1.5rem' }}></i>
                    <div>
                        <strong>Archivo vacío</strong>
                        <br />
                        <small>No se puede validar un archivo sin contenido.</small>
                    </div>
                </div>
            )}
        </div>
    );
};

