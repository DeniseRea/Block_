import React, { useState } from "react";
import { FileInput } from "../../components/FileInput"; 
import { FilePreview } from "../../components/FilePreview";
import { Button } from "../../components/Button";
import { ValidationPage } from "../Validation/ValidationPage";
import { useTheme } from "../../context/ThemeContext";

export const UpdatePage = () => {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [isFileLoaded, setIsFileLoaded] = useState(false);
  const { colors } = useTheme();
  
  const handleFileChange = (file) => {
    setFileName(file.name); 

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setFileContent(content); 
      setIsFileLoaded(true);
    };

    reader.readAsText(file); 
  };

  return (
    <div 
      className="container py-5"
      style={{ 
        backgroundColor: colors.background,
        color: colors.text,
        minHeight: '100vh'
      }}
    >
      <div className="text-center mb-5">
        <h2 className="mb-4" style={{ color: colors.primary }}>
          <i className="fas fa-upload me-2"></i>
          Cargar archivo
        </h2>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div 
            className="card p-4"
            style={{ 
              backgroundColor: colors.card,
              borderColor: colors.border,
              border: `1px solid ${colors.border}`
            }}
          >
            <h3 className="mb-4" style={{ color: colors.text }}>
              <i className="fas fa-file-upload me-2"></i>
              Subir archivo
            </h3>
            
            <FileInput onFileChange={handleFileChange} />

            {fileName && (
              <div className="mt-3">
                <label className="form-label" style={{ color: colors.text }}>
                  Nombre del archivo:
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={fileContent || fileName}
                  readOnly
                  style={{ 
                    backgroundColor: colors.background,
                    color: colors.text,
                    borderColor: colors.border
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {isFileLoaded && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <div 
              className="card p-4"
              style={{ 
                backgroundColor: colors.card,
                borderColor: colors.border,
                border: `1px solid ${colors.border}`
              }}
            >
              <h3 className="mb-4" style={{ color: colors.primary }}>
                <i className="fas fa-check-circle me-2"></i>
                Validar archivo
              </h3>
              <ValidationPage fileContent={fileContent} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
