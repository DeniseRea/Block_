import PropTypes from "prop-types";

export const BlockCard = ({ index, hash, previousHash, data, showArrow }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="card mb-2 shadow-sm" style={{ width: "100%", maxWidth: "600px" }}>
        <div className="card-body">
          <h5 className="card-title"> Bloque {index}</h5>
          <p className="card-text"><strong>Hash:</strong> {hash}</p>
          <p className="card-text"><strong>Previous Hash:</strong> {previousHash}</p>
          {/*<p className="card-text"><strong>Contenido:</strong> {data}</p>*/}
        </div>
      </div>

      {showArrow && (
        <div style={{ fontSize: "2rem", marginBottom: "1rem", color: "#6c757d" }}>
          ↓
        </div>
      )}
    </div>
  );
};

BlockCard.propTypes = {
  index: PropTypes.number.isRequired,
  hash: PropTypes.string.isRequired,
  previousHash: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  showArrow: PropTypes.bool,
};
