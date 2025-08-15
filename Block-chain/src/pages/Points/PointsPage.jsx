import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { SectionTitle } from '../../components/SectionTitle';
import PointsDisplay from './PointsDisplay';
import MiningHistory from './MiningHistory';
import PointsLeaderboard from './PointsLeaderboard';
import AchievementsList from './AchievementsList';

const PointsPage = () => {
  const { colors } = useTheme();
  const { state, actions } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  // Simular datos de leaderboard (normalmente vendría del backend)
  useEffect(() => {
    // Datos de ejemplo
    const mockLeaderboard = [
      { id: 1, username: state.user.username, points: state.user.points, rank: 1 },
      { id: 2, username: 'Alice', points: 750, rank: 2 },
      { id: 3, username: 'Bob', points: 650, rank: 3 },
      { id: 4, username: 'Charlie', points: 500, rank: 4 },
      { id: 5, username: 'Diana', points: 350, rank: 5 }
    ];
    
    // En una app real, esto vendría de una API
    // actions.updateLeaderboard(mockLeaderboard);
  }, [state.user.points]);

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: '📊' },
    { id: 'history', label: 'Historial', icon: '📋' },
    { id: 'leaderboard', label: 'Ranking', icon: '🏆' },
    { id: 'achievements', label: 'Logros', icon: '🎯' }
  ];

  return (
    <div className="min-vh-100" style={{ backgroundColor: colors.background }}>
      <div className="container-fluid p-4">
        {/* Header */}
        <div className="text-center mb-4">
          <SectionTitle 
            title="Sistema de Puntos" 
            subtitle="Gestiona tus recompensas y progreso en el blockchain"
            icon="💎"
          />
        </div>

        {/* Tabs Navigation */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8">
            <ul className="nav nav-pills justify-content-center" style={{ backgroundColor: colors.cardBackground, borderRadius: '15px', padding: '10px' }}>
              {tabs.map((tab) => (
                <li key={tab.id} className="nav-item">
                  <button
                    className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                    style={{
                      backgroundColor: activeTab === tab.id ? colors.primary : 'transparent',
                      color: activeTab === tab.id ? '#fff' : colors.text,
                      border: 'none',
                      borderRadius: '10px',
                      margin: '0 5px',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="me-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tab Content */}
        <div className="row justify-content-center">
          <div className="col-12">
            {activeTab === 'overview' && (
              <PointsDisplay 
                user={state.user}
                pointsData={state.points}
                miningStatus={state.mining}
              />
            )}
            
            {activeTab === 'history' && (
              <MiningHistory 
                history={state.points.miningHistory}
                totalEarned={state.points.totalEarned}
              />
            )}
            
            {activeTab === 'leaderboard' && (
              <PointsLeaderboard 
                currentUser={state.user}
                leaderboard={[
                  { username: state.user.username, points: state.user.points, rank: 1 },
                  { username: 'Alice', points: 750, rank: 2 },
                  { username: 'Bob', points: 650, rank: 3 },
                  { username: 'Charlie', points: 500, rank: 4 }
                ]}
              />
            )}
            
            {activeTab === 'achievements' && (
              <AchievementsList 
                achievements={state.points.achievements}
                userStats={state.user}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsPage;
