// src/components/Table/TableBody.jsx
import PropTypes from "prop-types";
import { TableRow } from "./TableRow";

export const TableBody = ({ data, extractValues }) => (
  <tbody className="text-center">
    {data.length > 0 ? (
      data.map((item, idx) => (
        <TableRow key={idx} values={extractValues(item)} />
      ))
    ) : (
      <tr>
        <td colSpan="100%" className="text-muted">
          No hay datos disponibles.
        </td>
      </tr>
    )}
  </tbody>
);

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  extractValues: PropTypes.func.isRequired,
};
