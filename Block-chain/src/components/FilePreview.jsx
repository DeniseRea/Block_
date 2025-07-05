export const FilePreview = ({ fileName, fileContent }) => {
  return (
    <div className="mt-4">
      <h4>Nombre del archivo: {fileName}</h4>
      <pre className="border p-3">{fileContent}</pre>
    </div>
  );
};