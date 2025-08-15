// src/hooks/useAuth.js - Hook para manejo de autenticación

import { useState, useCallback, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import authService from '../services/authService';
import useAsync from './useAsync';

/**
 * Hook para manejar autenticación y estado del usuario
 */
export const useAuth = () => {
  const { state, actions } = useApp();
  const [isInitialized, setIsInitialized] = useState(false);

  // Hook para login
  const {
    loading: loggingIn,
    error: loginError,
    execute: executeLogin
  } = useAsync(authService.login);

  // Hook para registro
  const {
    loading: registering,
    error: registerError,
    execute: executeRegister
  } = useAsync(authService.register);

  // Hook para verificar perfil
  const {
    data: profileData,
    loading: loadingProfile,
    error: profileError,
    execute: executeGetProfile
  } = useAsync(authService.getProfile);

  /**
   * Inicializa la autenticación verificando token guardado
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const userData = await authService.verifyToken();
        if (userData) {
          actions.login(userData);
        }
      } catch (error) {
        console.warn('No se pudo verificar token:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    if (!isInitialized) {
      initializeAuth();
    }
  }, [isInitialized, actions]);

  /**
   * Realiza login de usuario
   */
  const login = useCallback(async (username, password) => {
    try {
      const userData = await executeLogin(username, password);
      if (userData) {
        actions.login(userData);
      }
      return userData;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }, [executeLogin, actions]);

  /**
   * Registra nuevo usuario
   */
  const register = useCallback(async (userData) => {
    try {
      const result = await executeRegister(userData);
      // Después del registro, automáticamente hacer login
      if (result) {
        const loginData = await login(userData.username, userData.password);
        return loginData;
      }
      return result;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }, [executeRegister, login]);

  /**
   * Cierra sesión
   */
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.warn('Error en logout:', error);
    } finally {
      actions.logout();
    }
  }, [actions]);

  /**
   * Obtiene y actualiza perfil del usuario
   */
  const refreshProfile = useCallback(async () => {
    try {
      const profile = await executeGetProfile();
      if (profile) {
        // Actualizar datos del usuario en el contexto
        actions.login({
          ...state.user,
          ...profile,
          isAuthenticated: true
        });
      }
      return profile;
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      throw error;
    }
  }, [executeGetProfile, actions, state.user]);

  /**
   * Actualiza puntos del usuario
   */
  const updateUserPoints = useCallback(async (points) => {
    try {
      const result = await authService.updatePoints(points);
      if (result) {
        actions.updateUserPoints({ points: result.points });
      }
      return result;
    } catch (error) {
      console.error('Error actualizando puntos:', error);
      throw error;
    }
  }, [actions]);

  /**
   * Obtiene historial de minería del usuario
   */
  const getMiningHistory = useCallback(async () => {
    try {
      return await authService.getMiningHistory();
    } catch (error) {
      console.error('Error obteniendo historial:', error);
      throw error;
    }
  }, []);

  /**
   * Verifica si el usuario está autenticado
   */
  const isAuthenticated = state.user.isAuthenticated;

  /**
   * Verifica si tiene permisos de administrador
   */
  const isAdmin = state.user.role === 'admin' || state.user.isAdmin;

  /**
   * Obtiene información básica del usuario
   */
  const currentUser = {
    username: state.user.username,
    email: state.user.email,
    points: state.user.points,
    level: state.user.level,
    totalMinedBlocks: state.user.totalMinedBlocks,
    isAuthenticated: state.user.isAuthenticated
  };

  /**
   * Verifica si la sesión ha expirado
   */
  const checkSession = useCallback(async () => {
    if (!isAuthenticated) return false;

    try {
      const userData = await authService.verifyToken();
      return !!userData;
    } catch (error) {
      // Sesión expirada, hacer logout
      await logout();
      return false;
    }
  }, [isAuthenticated, logout]);

  return {
    // Estado de autenticación
    isAuthenticated,
    isAdmin,
    isInitialized,
    currentUser,
    
    // Estados de carga
    loggingIn,
    registering,
    loadingProfile,
    
    // Errores
    loginError,
    registerError,
    profileError,
    
    // Datos
    profileData,
    
    // Acciones
    login,
    register,
    logout,
    refreshProfile,
    updateUserPoints,
    getMiningHistory,
    checkSession,
    
    // Utilidades
    hasToken: authService.isAuthenticated(),
    token: authService.getToken()
  };
};

export default useAuth;
