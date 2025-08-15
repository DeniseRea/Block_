import React from "react";
import { BlockCard } from "../../components/BlockCard";
import { useTheme } from "../../context/ThemeContext";
// import { useAppContext } from "../../context/AppContext";

export const ListBlock = () => {
  const { colors } = useTheme();
  // const { state } = useAppContext();

  // Datos temporales para testing
  const blocks = [
    {
      index: 0,
      hash: '0000a1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef012345',
      previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
      data: 'Bloque génesis',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      nonce: 12345
    },
    {
      index: 1,
      hash: '0000f6e5d4c3b2a1089fedcba9876543210fedcba9876543210fedcba987654',
      previousHash: '0000a1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef012345',
      data: 'Primer bloque de transacciones',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      nonce: 67890
    }
  ];

  return (
    <div 
      className="container py-5"
      style={{ 
        backgroundColor: colors.background,
        color: colors.text,
        minHeight: '100vh'
      }}
    >
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: colors.primary }}>
          <i className="fas fa-chain me-2"></i>
          Explorador de Blockchain
        </h1>
        <p style={{ color: colors.textMuted, fontSize: '1.1rem' }}>
          Visualiza todos los bloques en la cadena de bloques
        </p>
        
        {/* Estadísticas */}
        <div className="row mt-4">
          <div className="col-md-4">
            <div 
              className="card border-0 shadow-sm"
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: '15px'
              }}
            >
              <div className="card-body py-3">
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                <h4 style={{ color: colors.primary }}>{blocks.length}</h4>
                <p style={{ color: colors.textMuted, marginBottom: 0 }}>Total de Bloques</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div 
              className="card border-0 shadow-sm"
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: '15px'
              }}
            >
              <div className="card-body py-3">
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔐</div>
                <h4 style={{ color: colors.success }}>
                  Válida
                </h4>
                <p style={{ color: colors.textMuted, marginBottom: 0 }}>Estado de la Cadena</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div 
              className="card border-0 shadow-sm"
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: '15px'
              }}
            >
              <div className="card-body py-3">
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                <h4 style={{ color: colors.warning }}>4</h4>
                <p style={{ color: colors.textMuted, marginBottom: 0 }}>Dificultad Actual</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="mb-4 text-center" style={{ color: colors.primary }}>
        <i className="fas fa-link me-2"></i>
        Cadena de Bloques
      </h3>

      {blocks.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⛓️</div>
          <h4 style={{ color: colors.textMuted }}>No hay bloques en la cadena</h4>
          <p style={{ color: colors.textMuted }}>
            Ve al simulador de minería para crear el primer bloque
          </p>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center">
          {blocks.map((block, idx) => (
            <BlockCard
              key={block.index}
              index={block.index}
              hash={block.hash}
              previousHash={block.previousHash}
              data={block.data}
              timestamp={block.timestamp}
              nonce={block.nonce}
              difficulty={4} // Puedes usar block.difficulty si lo tienes
              showArrow={idx < blocks.length - 1}
            />
          ))}
        </div>
      )}

      {/* Hash del último bloque */}
      {blocks.length > 0 && (
        <div className="mt-5 text-center">
          <div 
            className="card border-0 shadow-sm d-inline-block"
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: '15px',
              maxWidth: '600px'
            }}
          >
            <div className="card-body p-4">
              <h6 style={{ color: colors.textMuted }}>🔗 Hash del Último Bloque</h6>
              <div 
                className="p-2 rounded"
                style={{ 
                  backgroundColor: colors.border,
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  wordBreak: 'break-all',
                  color: colors.primary
                }}
              >
                {blocks[blocks.length - 1]?.hash}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


