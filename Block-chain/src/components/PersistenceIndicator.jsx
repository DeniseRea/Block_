/**
 * Indicador de estado de persistencia
 * Muestra el estado del sistema de almacenamiento en la interfaz
 */

import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import usePersistence from '../hooks/usePersistence';

const PersistenceIndicator = () => {
  const { colors } = useTheme();
  const { isInitialized, isLoading, storageStats } = usePersistence();
  const [isVisible, setIsVisible] = useState(true);

  // Auto-ocultar después de unos segundos si todo está bien
  useEffect(() => {
    if (isInitialized && !isLoading) {
      const timer = setTimeout(() => setIsVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isInitialized, isLoading]);

  if (!isVisible && isInitialized) return null;

  const getStatus = () => {
    if (isLoading) return { icon: 'fas fa-spinner fa-spin', color: colors.warning, text: 'Cargando...' };
    if (isInitialized) return { icon: 'fas fa-database', color: colors.success, text: 'Persistencia activa' };
    return { icon: 'fas fa-exclamation-triangle', color: colors.danger, text: 'Error de almacenamiento' };
  };

  const status = getStatus();

  return (
    <div 
      className="position-fixed bottom-0 end-0 m-3"
      style={{ 
        zIndex: 1050,
        maxWidth: '300px'
      }}
    >
      <div 
        className="alert d-flex align-items-center shadow-sm"
        style={{
          backgroundColor: colors.cardBackground,
          border: `1px solid ${status.color}`,
          color: colors.text
        }}
      >
        <i 
          className={status.icon} 
          style={{ color: status.color, marginRight: '10px' }}
        ></i>
        <div>
          <strong>{status.text}</strong>
          {storageStats && (
            <small className="d-block" style={{ color: colors.textMuted }}>
              {storageStats.total.records} registros almacenados
            </small>
          )}
        </div>
        {isInitialized && (
          <button
            type="button"
            className="btn-close ms-auto"
            onClick={() => setIsVisible(false)}
            style={{ filter: 'invert(1)' }}
          ></button>
        )}
      </div>
    </div>
  );
};

export default PersistenceIndicator;
