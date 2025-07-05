import { InputField } from "./InputField";

export const FileInput = ({ onFileChange }) => {
  // Manejamos el cambio del archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      onFileChange(file); 
    }
  };

  return (
    <div className="mb-3">
      <InputField
        label="Subir archivo"
        type="file"
        onChange={handleFileChange}
        required={true}
        accept=".txt,.json,.csv" 
      />
    </div>
  );
};
