import { useState } from "react";
import { FileInput } from "../../components/FileInput"; 
import { FilePreview } from "../../components/FilePreview";

export const UpdatePage = () => {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  
  const handleFileChange = (file) => {
    setFileName(file.name); 

    
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent(event.target.result); 
    };

    reader.readAsText(file); 
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Cargar archivo</h2>

      
      <FileInput onFileChange={handleFileChange} />

      <FilePreview fileName={fileName} fileContent={fileContent} />

    </div>
  );
}
