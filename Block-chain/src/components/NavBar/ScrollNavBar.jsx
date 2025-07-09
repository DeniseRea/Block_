import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaHome, FaUpload, FaList, FaClipboardCheck, FaCog, FaStar, FaUser, FaLink } from 'react-icons/fa';

export const ScrollNavBar = ({ onNavigate, currentPage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { colors, isDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 200); // Mostrar navbar después de 200px de scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'welcome', icon: FaHome, label: 'Inicio' },
    { key: 'upload', icon: FaUpload, label: 'Subir' },
    { key: 'list', icon: FaList, label: 'Lista' },
    { key: 'audit', icon: FaClipboardCheck, label: 'Auditoría' },
    { key: 'config', icon: FaCog, label: 'Configuración' },
    { key: 'points', icon: FaStar, label: 'Puntos' },
    { key: 'user', icon: FaUser, label: 'Usuario' }
  ];

  return (
    <nav 
      className={`navbar navbar-expand-lg fixed-top transition-all ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}
      style={{
        backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${colors.border}`,
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'all 0.3s ease-in-out',
        zIndex: 1000
      }}
    >
      <div className="container-fluid">
        <a 
          className="navbar-brand d-flex align-items-center"
          href="#"
          style={{ color: colors.primary }}
        >
          <FaLink className="me-2" />
          <span className="fw-bold">Block Chain</span>
        </a>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style={{ borderColor: colors.border }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navItems.map(({ key, icon: Icon, label }) => (
              <li className="nav-item" key={key}>
                <button
                  className={`nav-link btn btn-link d-flex align-items-center px-3 py-2 rounded-pill mx-1 ${
                    currentPage === key ? 'active' : ''
                  }`}
                  onClick={() => onNavigate(key)}
                  style={{
                    color: currentPage === key ? colors.light : colors.text,
                    backgroundColor: currentPage === key ? colors.primary : 'transparent',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== key) {
                      e.target.style.backgroundColor = colors.cardHover;
                      e.target.style.color = colors.primary;
                      e.target.style.boxShadow = `0 4px 12px ${colors.primary}30`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== key) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = colors.text;
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  <Icon className="me-2" />
                  <span className="d-none d-lg-inline">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
