import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const MascotCard = ({ name, description, image }) => {
  const { colors } = useTheme();

  return (
    <div 
      className="card text-center shadow p-4 mb-5 rounded fade-in-up"
      style={{ 
        maxWidth: '400px', 
        margin: 'auto',
        backgroundColor: colors.card,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        transition: 'all 0.3s ease'
      }}
    >
      <div className="d-flex justify-content-center mb-3">
        <img 
          src={image} 
          className="mascot-image pulse-animation" 
          alt={`Foto de ${name}`}
          style={{ maxWidth: '250px', width: '100%' }}
        />
      </div>
      <div className="card-body">
        <h3 className="card-title mt-3" style={{ color: colors.primary }}>
          {name}
        </h3>
        <p className="card-text" style={{ color: colors.textSecondary }}>
          {description}
        </p>
      </div>
    </div>
  );
};
