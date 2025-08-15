/**
 * Componente de diagnóstico para verificar el estado de la aplicación
 */

import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

const AppDiagnostic = () => {
  const { colors } = useTheme();
  const { state } = useAppContext();

  return (
    <div 
      className="container py-4"
      style={{ 
        backgroundColor: colors.background,
        color: colors.text,
        minHeight: '100vh'
      }}
    >
      <div className="text-center mb-4">
        <h3 style={{ color: colors.primary }}>
          <i className="fas fa-stethoscope me-2"></i>
          Diagnóstico del Sistema
        </h3>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div 
            className="card border-0 shadow-sm"
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: '15px'
            }}
          >
            <div className="card-body p-4">
              <h5 className="card-title" style={{ color: colors.primary }}>
                <i className="fas fa-user me-2"></i>
                Estado del Usuario
              </h5>
              
              <div className="mb-2">
                <strong>Autenticado:</strong> 
                <span className={`ms-2 badge ${state.user.isAuthenticated ? 'bg-success' : 'bg-secondary'}`}>
                  {state.user.isAuthenticated ? 'Sí' : 'No'}
                </span>
              </div>
              
              <div className="mb-2">
                <strong>Usuario:</strong> {state.user.username || 'N/A'}
              </div>
              
              <div className="mb-2">
                <strong>Puntos:</strong> {state.user.points}
              </div>
              
              <div className="mb-2">
                <strong>Bloques minados:</strong> {state.user.totalMinedBlocks}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div 
            className="card border-0 shadow-sm"
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: '15px'
            }}
          >
            <div className="card-body p-4">
              <h5 className="card-title" style={{ color: colors.primary }}>
                <i className="fas fa-link me-2"></i>
                Estado de la Blockchain
              </h5>
              
              <div className="mb-2">
                <strong>Total de bloques:</strong> {state.blockchain.blocks.length}
              </div>
              
              <div className="mb-2">
                <strong>Dificultad:</strong> {state.blockchain.difficulty}
              </div>
              
              <div className="mb-2">
                <strong>Último hash:</strong> 
                <small className="d-block text-truncate" style={{ color: colors.textMuted, maxWidth: '200px' }}>
                  {state.blockchain.lastBlockHash || 'N/A'}
                </small>
              </div>
              
              <div className="mb-2">
                <strong>Válida:</strong> 
                <span className={`ms-2 badge ${state.blockchain.isValid ? 'bg-success' : 'bg-warning'}`}>
                  {state.blockchain.isValid ? 'Sí' : 'Verificar'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div 
            className="card border-0 shadow-sm"
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: '15px'
            }}
          >
            <div className="card-body p-4">
              <h5 className="card-title" style={{ color: colors.primary }}>
                <i className="fas fa-chart-line me-2"></i>
                Sistema de Puntos
              </h5>
              
              <div className="mb-2">
                <strong>Puntos actuales:</strong> {state.points.currentPoints}
              </div>
              
              <div className="mb-2">
                <strong>Total ganado:</strong> {state.points.totalEarned}
              </div>
              
              <div className="mb-2">
                <strong>Historial:</strong> {state.points.miningHistory.length} registros
              </div>
              
              <div className="mb-2">
                <strong>Logros:</strong> {state.points.achievements.length}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div 
            className="card border-0 shadow-sm"
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: '15px'
            }}
          >
            <div className="card-body p-4">
              <h5 className="card-title" style={{ color: colors.primary }}>
                <i className="fas fa-pickaxe me-2"></i>
                Estado de Minería
              </h5>
              
              <div className="mb-2">
                <strong>Dificultad:</strong> {state.mining.difficulty}
              </div>
              
              <div className="mb-2">
                <strong>Recompensa:</strong> {state.mining.reward} puntos
              </div>
              
              <div className="mb-2">
                <strong>Procesando:</strong> 
                <span className={`ms-2 badge ${state.mining.isProcessing ? 'bg-warning' : 'bg-success'}`}>
                  {state.mining.isProcessing ? 'En proceso' : 'Disponible'}
                </span>
              </div>
              
              <div className="mb-2">
                <strong>Última minería:</strong> 
                <small className="d-block" style={{ color: colors.textMuted }}>
                  {state.mining.lastMiningTime 
                    ? new Date(state.mining.lastMiningTime).toLocaleString()
                    : 'Nunca'
                  }
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div 
            className="card border-0 shadow-sm"
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: '15px'
            }}
          >
            <div className="card-body p-4">
              <h5 className="card-title" style={{ color: colors.primary }}>
                <i className="fas fa-info-circle me-2"></i>
                Información del Sistema
              </h5>
              
              <div className="row">
                <div className="col-md-4">
                  <strong>Tema actual:</strong> {colors.isDark ? 'Oscuro' : 'Claro'}
                </div>
                <div className="col-md-4">
                  <strong>LocalStorage:</strong> 
                  <span className="ms-2 badge bg-info">
                    {localStorage.length} elementos
                  </span>
                </div>
                <div className="col-md-4">
                  <strong>IndexedDB:</strong> 
                  <span className="ms-2 badge bg-secondary">
                    {typeof indexedDB !== 'undefined' ? 'Disponible' : 'No disponible'}
                  </span>
                </div>
              </div>
              
              <hr style={{ borderColor: colors.textMuted }} />
              
              <div className="text-center">
                <small style={{ color: colors.textMuted }}>
                  Sistema de diagnóstico - Versión 1.0.0
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDiagnostic;
