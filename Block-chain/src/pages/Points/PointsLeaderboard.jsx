import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const PointsLeaderboard = ({ currentUser, leaderboard }) => {
  const { colors } = useTheme();

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '👤';
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return '#FFD700';
      case 2: return '#C0C0C0';
      case 3: return '#CD7F32';
      default: return colors.text;
    }
  };

  return (
    <div className="row">
      {/* Top 3 Podium */}
      <div className="col-12 mb-4">
        <div 
          className="card border-0 shadow-sm"
          style={{
            backgroundColor: colors.cardBackground,
            borderRadius: '20px'
          }}
        >
          <div className="card-body p-4">
            <h5 style={{ color: colors.text, textAlign: 'center', marginBottom: '2rem' }}>
              🏆 Top 3 Mineros
            </h5>
            
            <div className="row text-center">
              {leaderboard.slice(0, 3).map((user, index) => (
                <div key={user.username} className="col-md-4 mb-3">
                  <div 
                    className="p-3"
                    style={{
                      backgroundColor: user.username === currentUser.username ? colors.primary + '20' : 'transparent',
                      borderRadius: '15px',
                      border: user.username === currentUser.username ? `2px solid ${colors.primary}` : 'none'
                    }}
                  >
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                      {getRankIcon(user.rank)}
                    </div>
                    <h6 style={{ color: getRankColor(user.rank), marginBottom: '0.5rem' }}>
                      {user.username}
                      {user.username === currentUser.username && (
                        <span style={{ color: colors.primary, marginLeft: '0.5rem' }}>
                          (Tú)
                        </span>
                      )}
                    </h6>
                    <div style={{ color: colors.text, fontSize: '1.1rem', fontWeight: 'bold' }}>
                      {user.points.toLocaleString()} pts
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
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
              📊 Ranking Completo
            </h5>
          </div>
          <div className="card-body p-0">
            <div className="list-group list-group-flush">
              {leaderboard.map((user, index) => (
                <div 
                  key={user.username}
                  className="list-group-item border-0"
                  style={{
                    backgroundColor: user.username === currentUser.username ? 
                      colors.primary + '10' : 'transparent',
                    borderLeft: user.username === currentUser.username ? 
                      `4px solid ${colors.primary}` : 'none'
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between py-2">
                    <div className="d-flex align-items-center">
                      <div 
                        className="me-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: getRankColor(user.rank) + '20',
                          color: getRankColor(user.rank),
                          fontSize: '1.2rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {user.rank <= 3 ? getRankIcon(user.rank) : user.rank}
                      </div>
                      <div>
                        <div style={{ color: colors.text, fontWeight: 'bold' }}>
                          {user.username}
                          {user.username === currentUser.username && (
                            <span 
                              className="badge ms-2"
                              style={{ backgroundColor: colors.primary, color: '#fff' }}
                            >
                              Tú
                            </span>
                          )}
                        </div>
                        <small style={{ color: colors.textMuted }}>
                          Posición #{user.rank}
                        </small>
                      </div>
                    </div>
                    
                    <div className="text-end">
                      <div style={{ color: colors.text, fontSize: '1.1rem', fontWeight: 'bold' }}>
                        {user.points.toLocaleString()}
                      </div>
                      <small style={{ color: colors.textMuted }}>puntos</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsLeaderboard;


