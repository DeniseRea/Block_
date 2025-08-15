import PropTypes from "prop-types";
import { useTheme } from "../context/ThemeContext";

export const BlockCard = ({ 
  index, 
  hash, 
  previousHash, 
  data, 
  timestamp, 
  nonce, 
  difficulty,
  showArrow 
}) => {
  const { colors } = useTheme();

  // Función para determinar si el hash es válido (empieza con ceros)
  const isValidHash = (hash, diff) => {
    if (!hash || !diff) return false;
    return hash.substring(0, diff) === "0".repeat(diff);
  };

  const hashValid = isValidHash(hash, difficulty || 4);

  return (
    <div className="d-flex flex-column align-items-center">
      <div 
        className="card mb-2 shadow-lg border-0" 
        style={{ 
          width: "100%", 
          maxWidth: "700px",
          backgroundColor: colors.cardBackground,
          borderRadius: "20px",
          border: hashValid ? `3px solid ${colors.success}` : `2px solid ${colors.border}`
        }}
      >
        <div className="card-header border-0 d-flex justify-content-between align-items-center"
             style={{ backgroundColor: 'transparent', paddingBottom: '0.5rem' }}>
          <h5 className="card-title mb-0" style={{ color: colors.primary }}>
            🔗 Bloque #{index}
          </h5>
          {hashValid && (
            <span 
              className="badge"
              style={{ 
                backgroundColor: colors.success,
                color: 'white',
                fontSize: '0.8rem'
              }}
            >
              ✅ Válido
            </span>
          )}
        </div>

        <div className="card-body pt-2">
          {/* Hash del bloque */}
          <div className="mb-3">
            <label style={{ color: colors.textMuted, fontSize: '0.9rem', fontWeight: 'bold' }}>
              🔐 Hash del Bloque:
            </label>
            <div 
              className="p-2 rounded"
              style={{ 
                backgroundColor: colors.border,
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                wordBreak: 'break-all',
                color: hashValid ? colors.success : colors.text,
                border: hashValid ? `1px solid ${colors.success}` : 'none'
              }}
            >
              {hash}
            </div>
          </div>

          {/* Hash anterior */}
          <div className="mb-3">
            <label style={{ color: colors.textMuted, fontSize: '0.9rem', fontWeight: 'bold' }}>
              ⬅️ Hash Anterior:
            </label>
            <div 
              className="p-2 rounded"
              style={{ 
                backgroundColor: colors.border,
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                wordBreak: 'break-all',
                color: colors.textMuted
              }}
            >
              {previousHash}
            </div>
          </div>

          {/* Información adicional */}
          <div className="row">
            {timestamp && (
              <div className="col-md-6 mb-2">
                <label style={{ color: colors.textMuted, fontSize: '0.9rem', fontWeight: 'bold' }}>
                  📅 Timestamp:
                </label>
                <div style={{ color: colors.text, fontSize: '0.9rem' }}>
                  {new Date(timestamp).toLocaleString()}
                </div>
              </div>
            )}
            
            {nonce !== undefined && (
              <div className="col-md-3 mb-2">
                <label style={{ color: colors.textMuted, fontSize: '0.9rem', fontWeight: 'bold' }}>
                  🔢 Nonce:
                </label>
                <div style={{ color: colors.primary, fontSize: '1rem', fontWeight: 'bold' }}>
                  {nonce?.toLocaleString()}
                </div>
              </div>
            )}

            {difficulty && (
              <div className="col-md-3 mb-2">
                <label style={{ color: colors.textMuted, fontSize: '0.9rem', fontWeight: 'bold' }}>
                  🎯 Dificultad:
                </label>
                <div>
                  <span 
                    className="badge"
                    style={{ 
                      backgroundColor: colors.warning,
                      color: 'white'
                    }}
                  >
                    {difficulty} ceros
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Datos del bloque */}
          {data && (
            <div className="mt-3">
              <label style={{ color: colors.textMuted, fontSize: '0.9rem', fontWeight: 'bold' }}>
                📄 Datos del Bloque:
              </label>
              <div 
                className="p-2 rounded"
                style={{ 
                  backgroundColor: colors.background,
                  color: colors.text,
                  fontSize: '0.9rem',
                  border: `1px solid ${colors.border}`
                }}
              >
                {data}
              </div>
            </div>
          )}
        </div>
      </div>

      {showArrow && (
        <div style={{ 
          fontSize: "2.5rem", 
          marginBottom: "1rem", 
          color: colors.primary,
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
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
  data: PropTypes.string,
  timestamp: PropTypes.string,
  nonce: PropTypes.number,
  difficulty: PropTypes.number,
  showArrow: PropTypes.bool,
};
