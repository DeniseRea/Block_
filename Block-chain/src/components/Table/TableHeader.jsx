import PropTypes from "prop-types";

export const TableHeader = ({ headers }) => {
  return (
    <thead className="table-light text-center">
      <tr>
        {headers.map((title, idx) => (
          <th key={idx}>{title}</th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};