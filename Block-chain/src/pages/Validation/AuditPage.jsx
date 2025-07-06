// src/pages/Validation/AuditPage.jsx
import { BlockCard } from "../../components/BlockCard";
import { ValidationAlert } from "../../components/ValidationAlert";
import { Button } from "../../components/Button";

export const AuditPage = () => {
  const blocks = [
    {
      index: 1,
      hash: "0000a1...",
      previousHash: "0000...0000",
      data: "Bloque inicial",
      isValid: true,
    },
    {
      index: 2,
      hash: "0000b1...",
      previousHash: "0000a1...",
      data: "Transacción: Alice → Bob",
      isValid: true,
    },
    {
      index: 3,
      hash: "0000c1...",
      previousHash: "XXXXXX...", // Manipulado
      data: "Transacción: Bob → Charlie",
      isValid: false,
    },
  ];

  const isChainValid = blocks.every(b => b.isValid);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4"> Auditoría de la Cadena</h2>

      <ValidationAlert
        isValid={isChainValid}
        successMessage=" La cadena es válida. Todos los bloques están correctamente enlazados."
        errorMessage=" La cadena es inválida. Se ha detectado un bloque alterado."
      />

      <div className="d-flex flex-column align-items-center">
        {blocks.map((block, idx) => (
          <BlockCard
            key={block.index}
            index={block.index}
            hash={block.hash}
            previousHash={block.previousHash}
            data={block.data}
            showArrow={idx < blocks.length - 1}
            isValid={block.isValid}
          />
        ))}
      </div>
    </div>
  );
};
