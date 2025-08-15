// src/services/authService.js - Servicio de autenticación

import apiService, { ApiError } from './api.js';

class AuthService {
  
  /**
   * Realiza login de usuario
   * @param {string} username - Nombre de usuario
   * @param {string} password - Contraseña
   * @returns {Promise<Object>} Datos del usuario autenticado
   */
  async login(username, password) {
    try {
      // Modo desarrollo - simular respuesta
      if (import.meta.env.MODE === 'development' || !import.meta.env.VITE_API_URL) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simular login exitoso
        const mockUserData = {
          username: username,
          email: `${username}@blockchain.com`,
          points: Math.floor(Math.random() * 500) + 100,
          level: Math.floor(Math.random() * 5) + 1,
          totalMinedBlocks: Math.floor(Math.random() * 20),
          isAuthenticated: true,
          token: `mock-token-${Date.now()}`
        };

        // Simular algunos usuarios inválidos
        if (password.length < 3) {
          throw new Error('Contraseña demasiado corta');
        }

        // Guardar token simulado
        localStorage.setItem('auth-token', mockUserData.token);
        
        return mockUserData;
      }

      // Modo producción - llamada real al backend
      const data = await apiService.post('/auth/login', {
        username,
        password
      });

      // Guardar token de autenticación
      if (data.token) {
        localStorage.setItem('auth-token', data.token);
      }

      // Mapear respuesta del backend
      const userData = {
        username: data.username || data.usuario || username,
        email: data.email || data.correo || `${username}@blockchain.com`,
        points: data.puntos || data.points || 0,
        level: data.nivel || data.level || 1,
        totalMinedBlocks: data.bloquesMinados || data.totalMinedBlocks || 0,
        token: data.token || null,
        isAuthenticated: true
      };

      return userData;
    } catch (error) {
      console.error('Error en login:', error);
      this.handleAuthError(error, 'Error al iniciar sesión');
    }
  }

  /**
   * Registra un nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @returns {Promise<Object>} Usuario registrado
   */
  async register(userData) {
    try {
      const data = await apiService.post('/auth/register', {
        username: userData.username,
        email: userData.email,
        password: userData.password
      });

      return {
        username: data.username || data.usuario,
        email: data.email || data.correo,
        points: data.puntos || data.points || 0,
        level: data.nivel || data.level || 1,
        totalMinedBlocks: 0,
        message: data.mensaje || data.message || 'Usuario registrado exitosamente'
      };
    } catch (error) {
      console.error('Error en registro:', error);
      this.handleAuthError(error, 'Error al registrar usuario');
    }
  }

  /**
   * Cierra sesión del usuario
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      // Intentar logout en el servidor
      await apiService.post('/auth/logout');
    } catch (error) {
      console.warn('Error en logout del servidor:', error);
    } finally {
      // Siempre limpiar datos locales
      localStorage.removeItem('auth-token');
      localStorage.removeItem('blockchain-user');
    }
  }

  /**
   * Verifica si el token actual es válido
   * @returns {Promise<Object|null>} Datos del usuario si es válido
   */
  async verifyToken() {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      return null;
    }

    try {
      // Modo desarrollo - simular verificación
      if (import.meta.env.MODE === 'development' || !import.meta.env.VITE_API_URL) {
        // Simular delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Si hay token simulado, devolver datos de usuario
        if (token.startsWith('mock-token-')) {
          return {
            username: 'usuario_demo',
            email: 'demo@blockchain.com', 
            points: 250,
            level: 3,
            totalMinedBlocks: 12,
            token: token,
            isAuthenticated: true
          };
        }
      }

      // Modo producción
      const data = await apiService.get('/auth/verify');
      
      return {
        username: data.username || data.usuario,
        email: data.email || data.correo,
        points: data.puntos || data.points || 0,
        level: data.nivel || data.level || 1,
        totalMinedBlocks: data.bloquesMinados || data.totalMinedBlocks || 0,
        token: token,
        isAuthenticated: true
      };
    } catch (error) {
      console.warn('Token inválido:', error);
      localStorage.removeItem('auth-token');
      return null;
    }
  }

  /**
   * Obtiene el perfil del usuario actual
   * @returns {Promise<Object>} Datos del perfil
   */
  async getProfile() {
    try {
      const data = await apiService.get('/auth/profile');
      
      return {
        username: data.username || data.usuario,
        email: data.email || data.correo,
        points: data.puntos || data.points || 0,
        level: data.nivel || data.level || 1,
        totalMinedBlocks: data.bloquesMinados || data.totalMinedBlocks || 0,
        joinDate: data.fechaRegistro || data.joinDate,
        lastLogin: data.ultimoLogin || data.lastLogin
      };
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      throw this.handleAuthError(error, 'Error al obtener perfil de usuario');
    }
  }

  /**
   * Actualiza los puntos del usuario
   * @param {number} points - Nuevos puntos
   * @returns {Promise<Object>} Usuario actualizado
   */
  async updatePoints(points) {
    try {
      const data = await apiService.put('/auth/points', {
        puntos: points
      });

      return {
        points: data.puntos || data.points,
        level: data.nivel || data.level,
        totalMinedBlocks: data.bloquesMinados || data.totalMinedBlocks,
        message: data.mensaje || data.message || 'Puntos actualizados'
      };
    } catch (error) {
      console.error('Error actualizando puntos:', error);
      throw this.handleAuthError(error, 'Error al actualizar puntos');
    }
  }

  /**
   * Obtiene el historial de minería del usuario
   * @returns {Promise<Array>} Historial de minería
   */
  async getMiningHistory() {
    try {
      const data = await apiService.get('/auth/mining-history');
      
      return (data.historial || data.history || []).map(entry => ({
        id: entry.id,
        blockHash: entry.hashBloque || entry.blockHash,
        reward: entry.recompensa || entry.reward,
        timestamp: entry.timestamp || entry.fecha,
        difficulty: entry.dificultad || entry.difficulty
      }));
    } catch (error) {
      console.error('Error obteniendo historial:', error);
      throw this.handleAuthError(error, 'Error al obtener historial de minería');
    }
  }

  /**
   * Verifica si hay un usuario autenticado localmente
   * @returns {boolean} True si hay sesión local
   */
  isAuthenticated() {
    return !!localStorage.getItem('auth-token');
  }

  /**
   * Obtiene el token almacenado localmente
   * @returns {string|null} Token de autenticación
   */
  getToken() {
    return localStorage.getItem('auth-token');
  }

  /**
   * Maneja errores de autenticación
   * @param {Error} error - Error original
   * @param {string} defaultMessage - Mensaje por defecto
   * @throws {Error} Error procesado
   */
  handleAuthError(error, defaultMessage) {
    if (error instanceof ApiError) {
      switch (error.status) {
        case 401:
          localStorage.removeItem('auth-token');
          throw new Error('Credenciales inválidas');
        case 403:
          throw new Error('Acceso denegado');
        case 409:
          throw new Error('El usuario ya existe');
        case 422:
          throw new Error('Datos de usuario inválidos');
        default:
          throw new Error(error.message || defaultMessage);
      }
    }
    
    throw new Error(defaultMessage);
  }
}

// Instancia singleton
const authService = new AuthService();

export default authService;
