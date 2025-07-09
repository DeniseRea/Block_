import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";

export const NavItem = ({ onClick, icon, label, isActive }) => {
  const { colors } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <li className="nav-item position-relative">
      <button 
        className="btn p-2 d-flex align-items-center justify-content-center rounded-circle" 
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ 
          background: isActive ? colors.light : 'none', 
          border: 'none',
          color: isActive ? colors.primary : colors.light,
          width: '45px',
          height: '45px',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          boxShadow: isHovered || isActive ? `0 4px 12px ${colors.primary}40` : 'none'
        }}
        title={label}
      >
        {icon}
      </button>
      
      {/* Tooltip */}
      {isHovered && (
        <div
          className="position-absolute start-100 top-50 translate-middle-y ms-2 px-2 py-1 rounded"
          style={{
            backgroundColor: colors.dark,
            color: colors.light,
            fontSize: '0.8rem',
            whiteSpace: 'nowrap',
            zIndex: 1001,
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
        >
          {label}
          <div
            className="position-absolute top-50 translate-middle-y"
            style={{
              left: '-4px',
              width: 0,
              height: 0,
              borderTop: '4px solid transparent',
              borderBottom: '4px solid transparent',
              borderRight: `4px solid ${colors.dark}`
            }}
          />
        </div>
      )}
    </li>
  );
};

NavItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool
};
