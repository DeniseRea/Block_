import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const AchievementsList = ({ achievements = [], userStats }) => {
  const { colors } = useTheme();

  // Valores por defecto para evitar errores
  const safeUserStats = userStats || { totalMinedBlocks: 0, points: 0, level: 1 };

  // Definir logros disponibles con condiciones
  const availableAchievements = [
    {
      id: 'first_block',
      title: 'Primer Bloque',
      description: 'Mina tu primer bloque',
      icon: '🎯',
      condition: safeUserStats.totalMinedBlocks >= 1,
      reward: 10
    },
    {
      id: 'ten_blocks',
      title: 'Minero Experimentado',
      description: 'Mina 10 bloques',
      icon: '⛏️',
      condition: safeUserStats.totalMinedBlocks >= 10,
      reward: 50
    },
    {
      id: 'hundred_points',
      title: 'Coleccionista',
      description: 'Acumula 100 puntos',
      icon: '💎',
      condition: safeUserStats.points >= 100,
      reward: 25
    },
    {
      id: 'thousand_points',
      title: 'Millonario Digital',
      description: 'Acumula 1000 puntos',
      icon: '💰',
      condition: safeUserStats.points >= 1000,
      reward: 100
    },
    {
      id: 'level_5',
      title: 'Experto Blockchain',
      description: 'Alcanza el nivel 5',
      icon: '🌟',
      condition: safeUserStats.level >= 5,
      reward: 200
    },
    {
      id: 'streak_7',
      title: 'Racha de Fuego',
      description: 'Mina por 7 días consecutivos',
      icon: '🔥',
      condition: false, // Se calculará con datos reales
      reward: 150
    }
  ];

  const unlockedAchievements = availableAchievements.filter(achievement => achievement.condition);
  const lockedAchievements = availableAchievements.filter(achievement => !achievement.condition);

  return (
    <div className="row">
      {/* Summary */}
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
              <div className="col-md-3">
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
                <h4 style={{ color: colors.primary }}>{unlockedAchievements.length}</h4>
                <p style={{ color: colors.textMuted, marginBottom: 0 }}>Desbloqueados</p>
              </div>
              <div className="col-md-3">
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</div>
                <h4 style={{ color: colors.textMuted }}>{lockedAchievements.length}</h4>
                <p style={{ color: colors.textMuted, marginBottom: 0 }}>Bloqueados</p>
              </div>
              <div className="col-md-3">
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💫</div>
                <h4 style={{ color: colors.success }}>
                  {unlockedAchievements.reduce((total, achievement) => total + achievement.reward, 0)}
                </h4>
                <p style={{ color: colors.textMuted, marginBottom: 0 }}>Puntos de Logros</p>
              </div>
              <div className="col-md-3">
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                <h4 style={{ color: colors.warning }}>
                  {Math.round((unlockedAchievements.length / availableAchievements.length) * 100)}%
                </h4>
                <p style={{ color: colors.textMuted, marginBottom: 0 }}>Progreso</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div className="col-12 mb-4">
          <h5 style={{ color: colors.text, marginBottom: '1rem' }}>
            🏆 Logros Desbloqueados
          </h5>
          <div className="row">
            {unlockedAchievements.map((achievement) => (
              <div key={achievement.id} className="col-lg-4 col-md-6 mb-3">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: '15px',
                    border: `2px solid ${colors.success}`,
                    transform: 'scale(1)',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div className="card-body text-center p-3">
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                      {achievement.icon}
                    </div>
                    <h6 style={{ color: colors.text, marginBottom: '0.5rem' }}>
                      {achievement.title}
                    </h6>
                    <p style={{ color: colors.textMuted, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      {achievement.description}
                    </p>
                    <div 
                      className="badge"
                      style={{ 
                        backgroundColor: colors.success,
                        color: '#fff' 
                      }}
                    >
                      +{achievement.reward} pts
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div className="col-12">
          <h5 style={{ color: colors.text, marginBottom: '1rem' }}>
            🔒 Por Desbloquear
          </h5>
          <div className="row">
            {lockedAchievements.map((achievement) => (
              <div key={achievement.id} className="col-lg-4 col-md-6 mb-3">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: '15px',
                    border: `2px dashed ${colors.border}`,
                    opacity: 0.7
                  }}
                >
                  <div className="card-body text-center p-3">
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem', filter: 'grayscale(100%)' }}>
                      {achievement.icon}
                    </div>
                    <h6 style={{ color: colors.textMuted, marginBottom: '0.5rem' }}>
                      {achievement.title}
                    </h6>
                    <p style={{ color: colors.textMuted, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      {achievement.description}
                    </p>
                    <div 
                      className="badge"
                      style={{ 
                        backgroundColor: colors.textMuted,
                        color: '#fff' 
                      }}
                    >
                      +{achievement.reward} pts
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No achievements message */}
      {unlockedAchievements.length === 0 && (
        <div className="col-12">
          <div className="text-center py-5">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎯</div>
            <h4 style={{ color: colors.text }}>¡Comienza tu Aventura!</h4>
            <p style={{ color: colors.textMuted }}>
              Mina tu primer bloque para desbloquear logros
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsList;
