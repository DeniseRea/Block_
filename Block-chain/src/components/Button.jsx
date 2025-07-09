import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../context/ThemeContext';

export const Button = ({ type, children, variant = 'primary', ...props }) => {
  const { colors } = useTheme();

  const getButtonColors = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
          color: colors.light
        };
      case 'secondary':
        return {
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
          color: colors.light
        };
      case 'success':
        return {
          backgroundColor: colors.success,
          borderColor: colors.success,
          color: colors.light
        };
      case 'danger':
        return {
          backgroundColor: colors.danger,
          borderColor: colors.danger,
          color: colors.light
        };
      default:
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
          color: colors.light
        };
    }
  };

  return (
    <button 
      type={type} 
      className="btn w-100"
      style={{
        ...getButtonColors(),
        transition: 'all 0.3s ease'
      }}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired
};
