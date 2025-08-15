import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { SectionTitle } from '../../components/SectionTitle';
import PointsDisplay from './PointsDisplay';
import MiningHistory from './MiningHistory';
import PointsLeaderboard from './PointsLeaderboard';
import AchievementsList from './AchievementsList';
import useAsync from '../../hooks/useAsync';
import pointsService from '../../services/pointsService';

const PointsPage = () => {
  const { colors } = useTheme();
  const { state, actions } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  // Cargar datos de puntos desde el backend
  const {
    data: pointsData,
    loading: pointsLoading,
    error: pointsError,
    execute: loadPoints
  } = useAsync(pointsService.getUserPoints, false);

  const {
    data: leaderboardData,
    loading: leaderboardLoading,
    execute: loadLeaderboard
  } = useAsync(pointsService.getLeaderboard, false);

  const {
    data: achievementsData,
    loading: achievementsLoading,
    execute: loadAchievements
  } = useAsync(pointsService.getUserAchievements, false);

  useEffect(() => {
    loadPoints();
    loadLeaderboard();
    loadAchievements();
  }, []);

  // Actualizar estado global cuando se cargan los datos
  useEffect(() => {
    if (pointsData) {
      actions.updatePoints(pointsData);
    }
  }, [pointsData, actions]);

  useEffect(() => {
    if (leaderboardData) {
      actions.updateLeaderboard(leaderboardData);
    }
  }, [leaderboardData, actions]);

  useEffect(() => {
    if (achievementsData) {
      actions.updateAchievements(achievementsData);
    }
  }, [achievementsData, actions]);

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

        {/* Loading State */}
        {(pointsLoading || leaderboardLoading || achievementsLoading) && (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: colors.primary }} role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3" style={{ color: colors.textMuted }}>
              Cargando datos de puntos...
            </p>
          </div>
        )}

        {/* Error State */}
        {pointsError && (
          <div className="alert alert-danger text-center">
            <h5>Error al cargar datos</h5>
            <p>{pointsError}</p>
            <button 
              className="btn btn-outline-danger" 
              onClick={() => {
                loadPoints();
                loadLeaderboard();
                loadAchievements();
              }}
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Tab Content */}
        {!pointsLoading && !pointsError && (
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
                  history={state.points.history || []}
                  totalEarned={state.points.total || 0}
                />
              )}
              
              {activeTab === 'leaderboard' && (
                <PointsLeaderboard 
                  currentUser={state.user}
                  leaderboard={state.points.leaderboard || []}
                />
              )}
              
              {activeTab === 'achievements' && (
                <AchievementsList 
                  achievements={state.points.achievements || []}
                  userStats={state.user}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PointsPage;
