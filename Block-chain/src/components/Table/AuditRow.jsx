// src/components/Table/AuditRow.jsx

import PropTypes from "prop-types";

export const AuditRow = ({ block }) => {
  const { index, hash, previousHash, data, isValid } = block;

  const rowClass = isValid ? "" : "table-danger"; 

  return (
    <tr className={rowClass}>
      <td>{index}</td>
      <td className="text-break">{hash}</td>
      <td className="text-break">{previousHash}</td>
      <td>{data}</td>
      <td>
        {isValid ? (
          <span className="badge bg-success">Válido </span>
        ) : (
          <span className="badge bg-danger">Inválido </span>
        )}
      </td>
    </tr>
  );
};

AuditRow.propTypes = {
  block: PropTypes.shape({
    index: PropTypes.number.isRequired,
    hash: PropTypes.string.isRequired,
    previousHash: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    isValid: PropTypes.bool.isRequired,
  }).isRequired,
};
