import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../context/ThemeContext';

export const TeamMemberCard = ({ photo, name, role, description, github, linkedin }) => {
  const { colors } = useTheme();

  return (
    <div 
      className="card text-center" 
      style={{ 
        width: "18rem",
        backgroundColor: colors.card,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        transition: 'all 0.3s ease'
      }}
    >
      <img 
        src={photo} 
        alt={name} 
        className="card-img-top rounded-circle mt-3" 
        style={{ 
          width: "150px", 
          height: "150px",
          objectFit: "cover",
          margin: "auto",
          border: `3px solid ${colors.primary}`
        }} 
      />
      <div className="card-body">
        <h5 className="card-title" style={{ color: colors.primary }}>{name}</h5>
        <p className="card-text fw-bold" style={{ color: colors.secondary }}>{role}</p>
        <p className="card-text" style={{ color: colors.textSecondary }}>{description}</p>
        <div className="d-flex justify-content-center gap-3">
          <a 
            href={github} 
            className="btn"
            style={{
              backgroundColor: colors.dark,
              color: colors.light,
              border: `1px solid ${colors.border}`
            }}
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i> GitHub
          </a>
          <a 
            href={linkedin} 
            className="btn"
            style={{
              backgroundColor: colors.primary,
              color: colors.light,
              border: `1px solid ${colors.primary}`
            }}
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

TeamMemberCard.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  github: PropTypes.string,
  linkedin: PropTypes.string
};