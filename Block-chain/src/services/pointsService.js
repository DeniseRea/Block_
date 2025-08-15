// src/services/pointsService.js - Servicio para puntos y minería

import apiService, { ApiError } from './api.js';

class PointsService {

  /**
   * Obtiene los puntos actuales del usuario
   * @returns {Promise<Object>} Información de puntos del usuario
   */
  async getUserPoints() {
    try {
      // Modo desarrollo - datos simulados
      if (import.meta.env.MODE === 'development' || !import.meta.env.VITE_API_URL) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        return {
          current: Math.floor(Math.random() * 500) + 100,
          total: Math.floor(Math.random() * 2000) + 500,
          rank: Math.floor(Math.random() * 50) + 1,
          level: Math.floor(Math.random() * 5) + 1,
          totalMinedBlocks: Math.floor(Math.random() * 25) + 5,
          nextLevelPoints: 1000,
          history: this.generateMockHistory(),
          achievements: this.generateMockAchievements(),
          isLoading: false
        };
      }

      // Modo producción
      const data = await apiService.get('/points/user');
      
      return {
        currentPoints: data.puntosActuales || data.currentPoints || 0,
        totalEarned: data.totalGanado || data.totalEarned || 0,
        level: data.nivel || data.level || 1,
        totalMinedBlocks: data.bloquesMinados || data.totalMinedBlocks || 0,
        nextLevelPoints: data.puntosProximoNivel || data.nextLevelPoints || 1000
      };
    } catch (error) {
      console.error('Error obteniendo puntos:', error);
      throw this.handlePointsError(error, 'Error al obtener puntos del usuario');
    }
  }

  /**
   * Obtiene el historial de minería del usuario
   * @param {number} limit - Límite de resultados
   * @param {number} offset - Offset para paginación
   * @returns {Promise<Object>} Historial de minería
   */
  async getMiningHistory(limit = 50, offset = 0) {
    try {
      const data = await apiService.get('/points/mining-history', { 
        limit, 
        offset 
      });
      
      return {
        history: (data.historial || data.history || []).map(entry => ({
          id: entry.id,
          blockHash: entry.hashBloque || entry.blockHash || '',
          reward: entry.recompensa || entry.reward || 0,
          timestamp: entry.timestamp || entry.fecha || '',
          difficulty: entry.dificultad || entry.difficulty || 4,
          miningTime: entry.tiempoMinado || entry.miningTime || 0
        })),
        totalEarned: data.totalGanado || data.totalEarned || 0,
        totalEntries: data.totalRegistros || data.totalEntries || 0
      };
    } catch (error) {
      console.error('Error obteniendo historial:', error);
      throw this.handlePointsError(error, 'Error al obtener historial de minería');
    }
  }

  /**
   * Obtiene el ranking de usuarios
   * @param {number} limit - Número de usuarios en el ranking
   * @returns {Promise<Array>} Lista de usuarios en el ranking
   */
  async getLeaderboard(limit = 10) {
    try {
      // Modo desarrollo
      if (import.meta.env.MODE === 'development' || !import.meta.env.VITE_API_URL) {
        await new Promise(resolve => setTimeout(resolve, 600));
        
        return this.generateMockLeaderboard(limit);
      }

      // Modo producción
      const data = await apiService.get('/points/leaderboard', { limit });
      
      return (data.ranking || data.leaderboard || []).map((user, index) => ({
        rank: user.posicion || index + 1,
        username: user.usuario || user.username || '',
        points: user.puntos || user.points || 0,
        totalMinedBlocks: user.bloquesMinados || user.totalMinedBlocks || 0,
        level: user.nivel || user.level || 1
      }));
    } catch (error) {
      console.error('Error obteniendo ranking:', error);
      throw this.handlePointsError(error, 'Error al obtener ranking de usuarios');
    }
  }

  /**
   * Procesa la recompensa por minar un bloque
   * @param {string} blockHash - Hash del bloque minado
   * @param {number} difficulty - Dificultad de minado
   * @returns {Promise<Object>} Información de la recompensa
   */
  async processMiningReward(blockHash, difficulty) {
    try {
      const data = await apiService.post('/points/mining-reward', {
        hashBloque: blockHash,
        dificultad: difficulty
      });

      return {
        reward: data.recompensa || data.reward || 0,
        newPoints: data.puntosNuevos || data.newPoints || 0,
        newLevel: data.nivelNuevo || data.newLevel || 1,
        achievements: data.logros || data.achievements || [],
        message: data.mensaje || data.message || 'Recompensa procesada'
      };
    } catch (error) {
      console.error('Error procesando recompensa:', error);
      throw this.handlePointsError(error, 'Error al procesar recompensa de minería');
    }
  }

  /**
   * Obtiene los logros del usuario
   * @returns {Promise<Object>} Información de logros
   */
  async getUserAchievements() {
    try {
      // Modo desarrollo
      if (import.meta.env.MODE === 'development' || !import.meta.env.VITE_API_URL) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return this.generateMockAchievements();
      }

      // Modo producción
      const data = await apiService.get('/points/achievements');
      
      return {
        unlocked: (data.desbloqueados || data.unlocked || []).map(achievement => ({
          id: achievement.id,
          title: achievement.titulo || achievement.title,
          description: achievement.descripcion || achievement.description,
          icon: achievement.icono || achievement.icon,
          reward: achievement.recompensa || achievement.reward,
          unlockedAt: achievement.fechaDesbloqueo || achievement.unlockedAt
        })),
        locked: (data.bloqueados || data.locked || []).map(achievement => ({
          id: achievement.id,
          title: achievement.titulo || achievement.title,
          description: achievement.descripcion || achievement.description,
          icon: achievement.icono || achievement.icon,
          reward: achievement.recompensa || achievement.reward,
          requirement: achievement.requisito || achievement.requirement
        })),
        totalPoints: data.puntosLogros || data.achievementPoints || 0
      };
    } catch (error) {
      console.error('Error obteniendo logros:', error);
      throw this.handlePointsError(error, 'Error al obtener logros del usuario');
    }
  }

  /**
   * Obtiene estadísticas de minería del usuario
   * @returns {Promise<Object>} Estadísticas de minería
   */
  async getMiningStats() {
    try {
      const data = await apiService.get('/points/mining-stats');
      
      return {
        totalBlocks: data.totalBloques || data.totalBlocks || 0,
        totalRewards: data.totalRecompensas || data.totalRewards || 0,
        averageReward: data.promedioRecompensa || data.averageReward || 0,
        bestMiningTime: data.mejorTiempo || data.bestMiningTime || 0,
        totalMiningTime: data.tiempoTotalMinado || data.totalMiningTime || 0,
        streakDays: data.diasRacha || data.streakDays || 0,
        currentStreak: data.rachaActual || data.currentStreak || 0
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      throw this.handlePointsError(error, 'Error al obtener estadísticas de minería');
    }
  }

  /**
   * Simula una operación de minería
   * @param {string} content - Contenido para el nuevo bloque
   * @returns {Promise<Object>} Resultado de la minería simulada
   */
  async simulateMining(content) {
    try {
      const data = await apiService.post('/points/simulate-mining', {
        contenido: content
      });

      return {
        estimatedTime: data.tiempoEstimado || data.estimatedTime || 0,
        estimatedReward: data.recompensaEstimada || data.estimatedReward || 0,
        difficulty: data.dificultad || data.difficulty || 4,
        success: data.exito || data.success || false
      };
    } catch (error) {
      console.error('Error simulando minería:', error);
      throw this.handlePointsError(error, 'Error al simular minería');
    }
  }

  /**
   * Actualiza el nivel del usuario basado en los puntos
   * @param {number} points - Puntos actuales
   * @returns {Promise<Object>} Información del nivel actualizado
   */
  async updateUserLevel(points) {
    try {
      const data = await apiService.put('/points/update-level', {
        puntos: points
      });

      return {
        level: data.nivel || data.level || 1,
        pointsForNext: data.puntosProximoNivel || data.pointsForNext || 0,
        leveledUp: data.subioNivel || data.leveledUp || false,
        rewards: data.recompensas || data.rewards || [],
        message: data.mensaje || data.message
      };
    } catch (error) {
      console.error('Error actualizando nivel:', error);
      throw this.handlePointsError(error, 'Error al actualizar nivel del usuario');
    }
  }

  /**
   * Genera historial simulado para desarrollo
   */
  generateMockHistory() {
    return [
      {
        id: 1,
        type: 'minado',
        blockHash: '0000a1b2c3d4e5f6...',
        reward: 50,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        difficulty: 4
      },
      {
        id: 2,
        type: 'validacion',
        blockHash: '0000f6e5d4c3b2a1...',
        reward: 10,
        timestamp: new Date(Date.now() - 43200000).toISOString(),
        difficulty: 4
      },
      {
        id: 3,
        type: 'bonus',
        blockHash: '0000c1d2e3f4g5h6...',
        reward: 25,
        timestamp: new Date(Date.now() - 21600000).toISOString(),
        difficulty: 3
      }
    ];
  }

  /**
   * Genera logros simulados para desarrollo
   */
  generateMockAchievements() {
    return [
      { 
        id: 1, 
        name: 'Primera mina', 
        description: 'Minar tu primer bloque', 
        completed: true,
        completedAt: new Date(Date.now() - 172800000).toISOString()
      },
      { 
        id: 2, 
        name: 'Minero Novato', 
        description: 'Minar 5 bloques', 
        completed: true,
        completedAt: new Date(Date.now() - 86400000).toISOString()
      },
      { 
        id: 3, 
        name: 'Validador', 
        description: 'Validar una cadena completa', 
        completed: false,
        progress: 75
      }
    ];
  }

  /**
   * Genera leaderboard simulado para desarrollo
   */
  generateMockLeaderboard(limit = 10) {
    const mockUsers = [
      { username: 'alice_miner', points: 1250, totalMinedBlocks: 25, level: 5 },
      { username: 'bob_validator', points: 980, totalMinedBlocks: 19, level: 4 },
      { username: 'charlie_crypto', points: 850, totalMinedBlocks: 17, level: 4 },
      { username: 'diana_blockchain', points: 720, totalMinedBlocks: 14, level: 3 },
      { username: 'eve_explorer', points: 650, totalMinedBlocks: 13, level: 3 },
      { username: 'frank_node', points: 580, totalMinedBlocks: 11, level: 3 },
      { username: 'grace_hash', points: 490, totalMinedBlocks: 9, level: 2 },
      { username: 'henry_proof', points: 420, totalMinedBlocks: 8, level: 2 },
      { username: 'iris_merkle', points: 350, totalMinedBlocks: 7, level: 2 },
      { username: 'jack_consensus', points: 280, totalMinedBlocks: 5, level: 1 }
    ];

    return mockUsers.slice(0, limit).map((user, index) => ({
      rank: index + 1,
      ...user
    }));
  }

  /**
   * Maneja errores específicos del servicio de puntos
   * @param {Error} error - Error original
   * @param {string} defaultMessage - Mensaje por defecto
   * @returns {Error} Error procesado
   */
  handlePointsError(error, defaultMessage) {
    if (error instanceof ApiError) {
      switch (error.status) {
        case 400:
          return new Error('Datos de puntos inválidos');
        case 404:
          return new Error('Usuario o datos de puntos no encontrados');
        case 409:
          return new Error('Conflicto en el procesamiento de puntos');
        case 429:
          return new Error('Demasiadas solicitudes. Intenta más tarde.');
        default:
          return new Error(error.message || defaultMessage);
      }
    }
    
    return new Error(defaultMessage);
  }
}

// Instancia singleton
const pointsService = new PointsService();

export default pointsService;
