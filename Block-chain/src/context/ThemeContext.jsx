import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Obtener el tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    // Guardar el tema en localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Agregar clase al body para estilos globales
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      primary: isDarkMode ? '#3b82f6' : '#007bff',
      secondary: isDarkMode ? '#6b7280' : '#6c757d',
      success: isDarkMode ? '#10b981' : '#28a745',
      danger: isDarkMode ? '#ef4444' : '#dc3545',
      warning: isDarkMode ? '#f59e0b' : '#ffc107',
      info: isDarkMode ? '#06b6d4' : '#17a2b8',
      light: isDarkMode ? '#374151' : '#f8f9fa',
      dark: isDarkMode ? '#f9fafb' : '#343a40',
      background: isDarkMode ? '#1f2937' : '#ffffff',
      backgroundSecondary: isDarkMode ? '#111827' : '#f8f9fa',
      text: isDarkMode ? '#f9fafb' : '#343a40',
      textSecondary: isDarkMode ? '#d1d5db' : '#6c757d',
      border: isDarkMode ? '#374151' : '#dee2e6',
      card: isDarkMode ? '#374151' : '#ffffff',
      cardHover: isDarkMode ? '#4b5563' : '#f8f9fa',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
