import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const MiningHistory = ({ history, totalEarned }) => {
  const { colors } = useTheme();

  if (history.length === 0) {
    return (
      <div className="text-center py-5">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⛏️</div>
        <h4 style={{ color: colors.text }}>Sin Historial de Minería</h4>
        <p style={{ color: colors.textMuted }}>
          Comienza a minar bloques para ver tu historial aquí
        </p>
      </div>
    );
  }

  return (
    <div className="row">
      {/* Summary Card */}
      <div className="col-12 mb-4">
        <div 
          className="card border-0 shadow-sm"
          style={{
            backgroundColor: colors.cardBackground,
            borderRadius: '20px'
          }}
        >
          <div className="card-body p-4">
            <div className="row text-center">
              <div className="col-md-4">
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                <h4 style={{ color: colors.primary }}>{history.length}</h4>
                <p style={{ color: colors.textMuted, marginBottom: 0 }}>Bloques Minados</p>
              </div>
              <div className="col-md-4">
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
                <h4 style={{ color: colors.success }}>{totalEarned.toLocaleString()}</h4>
                <p style={{ color: colors.textMuted, marginBottom: 0 }}>Total Ganado</p>
              </div>
              <div className="col-md-4">
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
                <h4 style={{ color: colors.warning }}>{Math.round(totalEarned / history.length) || 0}</h4>
                <p style={{ color: colors.textMuted, marginBottom: 0 }}>Promedio por Bloque</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="col-12">
        <div 
          className="card border-0 shadow-sm"
          style={{
            backgroundColor: colors.cardBackground,
            borderRadius: '20px'
          }}
        >
          <div className="card-header border-0" style={{ backgroundColor: 'transparent' }}>
            <h5 style={{ color: colors.text, marginBottom: 0 }}>
              📋 Historial Detallado
            </h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-borderless mb-0">
                <thead>
                  <tr style={{ backgroundColor: colors.border }}>
                    <th style={{ color: colors.text, padding: '1rem' }}>Fecha</th>
                    <th style={{ color: colors.text, padding: '1rem' }}>Hash del Bloque</th>
                    <th style={{ color: colors.text, padding: '1rem' }}>Recompensa</th>
                    <th style={{ color: colors.text, padding: '1rem' }}>Dificultad</th>
                  </tr>
                </thead>
                <tbody>
                  {history.slice().reverse().map((entry, index) => (
                    <tr key={entry.id}>
                      <td style={{ color: colors.text, padding: '1rem' }}>
                        <div>
                          <div>{new Date(entry.timestamp).toLocaleDateString()}</div>
                          <small style={{ color: colors.textMuted }}>
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </small>
                        </div>
                      </td>
                      <td style={{ color: colors.text, padding: '1rem' }}>
                        <code 
                          style={{ 
                            backgroundColor: colors.border,
                            color: colors.primary,
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.8rem'
                          }}
                        >
                          {entry.blockHash ? entry.blockHash.substring(0, 16) + '...' : 'N/A'}
                        </code>
                      </td>
                      <td style={{ color: colors.success, padding: '1rem', fontWeight: 'bold' }}>
                        +{entry.reward} pts
                      </td>
                      <td style={{ color: colors.text, padding: '1rem' }}>
                        <span 
                          className="badge"
                          style={{
                            backgroundColor: colors.warning,
                            color: '#fff'
                          }}
                        >
                          {entry.difficulty} ceros
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiningHistory;


