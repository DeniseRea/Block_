import React, { useEffect } from "react";
import { BlockCard } from "../../components/BlockCard";
import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";
import useBlockchain from "../../hooks/useBlockchain";

export const ListBlock = () => {
  const { colors } = useTheme();
  const { state } = useApp();
  const { loadBlockchain, isLoading, error } = useBlockchain();

  useEffect(() => {
    loadBlockchain();
  }, []);

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <div className="spinner-border" style={{ color: colors.primary }} role="status">
            <span className="visually-hidden">Cargando blockchain...</span>
          </div>
          <p className="mt-3" style={{ color: colors.textMuted }}>
            Cargando bloques de la blockchain...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <div className="alert alert-danger">
            <h5>Error al cargar blockchain</h5>
            <p>{error}</p>
            <button className="btn btn-outline-danger" onClick={loadBlockchain}>
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const blocks = state.blockchain.blocks || [];

  return (
    <div 
      className="container py-5"
      style={{ 
        backgroundColor: colors.background,
        color: colors.text,
        minHeight: '100vh'
      }}
    >
      <div className="text-center mb-4">
        <h1 className="fw-bold" style={{ color: colors.primary }}>
          <i className="fas fa-list me-2"></i>
          Blockchain Completa
        </h1>
        <p style={{ color: colors.textSecondary }}>
          Explorar todos los bloques almacenados en la blockchain. Total: {blocks.length} bloques
        </p>
        {state.blockchain.lastSync && (
          <small style={{ color: colors.textMuted }}>
            Última sincronización: {new Date(state.blockchain.lastSync).toLocaleString()}
          </small>
        )}
      </div>

      <h3 className="mb-4 text-center" style={{ color: colors.primary }}>
        <i className="fas fa-link me-2"></i>
        Cadena de Bloques {state.blockchain.isValid ? '✅' : '❌'}
      </h3>

      {blocks.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
          <h4 style={{ color: colors.textMuted }}>No hay bloques disponibles</h4>
          <p style={{ color: colors.textMuted }}>
            La blockchain está vacía o aún no se ha cargado.
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
              showArrow={idx < blocks.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
