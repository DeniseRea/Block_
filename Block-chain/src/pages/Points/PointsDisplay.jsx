import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const PointsDisplay = ({ user, pointsData, miningStatus }) => {
  const { colors } = useTheme();

  // Valores por defecto para evitar errores
  const safeUser = user || { points: 0, totalMinedBlocks: 0, level: 1 };
  const safePointsData = pointsData || { totalEarned: 0 };
  const safeMiningStatus = miningStatus || { reward: 50, difficulty: 4, isProcessing: false, lastMiningTime: null };

  const statsCards = [
    {
      title: 'Puntos Actuales',
      value: safeUser.points.toLocaleString(),
      icon: '💎',
      color: colors.primary,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Total Ganado',
      value: safePointsData.totalEarned.toLocaleString(),
      icon: '🎯',
      color: colors.success,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Bloques Minados',
      value: safeUser.totalMinedBlocks,
      icon: '⛏️',
      color: colors.warning,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Nivel Actual',
      value: `Nivel ${safeUser.level}`,
      icon: '🌟',
      color: colors.info,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  return (
    <div className="row">
      {/* Stats Cards */}
      {statsCards.map((card, index) => (
        <div key={index} className="col-lg-3 col-md-6 mb-4">
          <div 
            className="card h-100 border-0 shadow-sm"
            style={{
              background: card.gradient,
              borderRadius: '20px',
              color: '#fff',
              transform: 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div className="card-body text-center p-4">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {card.icon}
              </div>
              <h3 className="mb-2">{card.value}</h3>
              <p className="mb-0 opacity-75">{card.title}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Mining Status */}
      <div className="col-12 mb-4">
        <div 
          className="card border-0 shadow-sm"
          style={{
            backgroundColor: colors.cardBackground,
            borderRadius: '20px'
          }}
        >
          <div className="card-body p-4">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h5 style={{ color: colors.text, marginBottom: '0.5rem' }}>
                  Estado de Minería
                </h5>
                <p style={{ color: colors.textMuted, marginBottom: 0 }}>
                  {safeMiningStatus.isProcessing ? 
                    '🔄 Procesando nuevo bloque...' : 
                    '✅ Listo para minar'
                  }
                </p>
              </div>
              <div className="text-end">
                <div style={{ color: colors.text, fontSize: '1.2rem' }}>
                  Recompensa: {safeMiningStatus.reward} puntos
                </div>
                <small style={{ color: colors.textMuted }}>
                  Dificultad: {safeMiningStatus.difficulty} ceros
                </small>
              </div>
            </div>
            
            {safeMiningStatus.lastMiningTime && (
              <div className="mt-3 pt-3 border-top">
                <small style={{ color: colors.textMuted }}>
                  Último bloque minado: {new Date(safeMiningStatus.lastMiningTime).toLocaleString()}
                </small>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress to Next Level */}
      <div className="col-12">
        <div 
          className="card border-0 shadow-sm"
          style={{
            backgroundColor: colors.cardBackground,
            borderRadius: '20px'
          }}
        >
          <div className="card-body p-4">
            <h5 style={{ color: colors.text, marginBottom: '1rem' }}>
              🚀 Progreso al Siguiente Nivel
            </h5>
            
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span style={{ color: colors.text }}>Nivel {safeUser.level}</span>
              <span style={{ color: colors.text }}>Nivel {safeUser.level + 1}</span>
            </div>
            
            <div 
              className="progress"
              style={{
                height: '10px',
                borderRadius: '5px',
                backgroundColor: colors.border
              }}
            >
              <div
                className="progress-bar"
                style={{
                  width: `${Math.min((safeUser.points % 1000) / 1000 * 100, 100)}%`,
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '5px'
                }}
              ></div>
            </div>
            
            <div className="text-center mt-2">
              <small style={{ color: colors.textMuted }}>
                {1000 - (safeUser.points % 1000)} puntos para el siguiente nivel
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsDisplay;
