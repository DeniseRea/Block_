// src/pages/Validation/AuditPage.jsx
import { BlockCard } from "../../components/BlockCard";
import { ValidationAlert } from "../../components/ValidationAlert";
import { Button } from "../../components/Button";
import { TableHeader } from "../../components/Table/TableHeader";
import { AuditRow } from "../../components/Table/AuditRow";

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

  const isChainValid = blocks.every((block) => block.isValid);

  // Definir los encabezados de la tabla
  const headers = ["Índice", "Hash", "Hash Anterior", "Datos", "Estado"];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Auditoría de la Cadena</h2>

      <ValidationAlert
        isValid={isChainValid}
        successMessage="La cadena es válida. Todos los bloques están correctamente enlazados."
        errorMessage="La cadena es inválida. Se ha detectado un bloque alterado."
      />

      <div className="table-responsive mt-4">
        <table className="table table-hover table-bordered">
          <TableHeader headers={headers} />
          <tbody>
            {blocks.length > 0 ? (
              blocks.map((block) => <AuditRow key={block.index} block={block} />)
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center text-muted">
                  No hay bloques registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
