// src/components/Table/TableRow.jsx

import PropTypes from "prop-types";

export const TableRow = ({ values }) => {
  return (
    <tr>
      {values.map((val, idx) => (
        <td key={idx} className="text-break">{val}</td>
      ))}
    </tr>
  );
};

TableRow.propTypes = {
  values: PropTypes.arrayOf(PropTypes.node).isRequired, // string, number, JSX, etc.
};
