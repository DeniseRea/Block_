// src/services/blockchainService.js - Servicio para operaciones de blockchain

import apiService, { ApiError } from './api.js';

class BlockchainService {
  
  /**
   * Obtiene toda la cadena de bloques
   * @returns {Promise<Object>} Objeto con la cadena de bloques y metadatos
   */
  async getBlockchain() {
    try {
      const data = await apiService.get('/blockchain');
      
      // Mapear datos del backend Java al formato del frontend
      return {
        blocks: data.blocks || [],
        totalBlocks: data.totalBlocks || 0,
        lastBlockHash: data.lastBlockHash || '',
        difficulty: 4, // Dificultad fija
        isValid: data.isValid !== undefined ? data.isValid : true,
        lastSync: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error obteniendo blockchain:', error);
      throw this.handleBlockchainError(error, 'Error al obtener la cadena de bloques');
    }
  }

  /**
   * Obtiene un bloque específico por su ID
   * @param {number} blockId - ID del bloque
   * @returns {Promise<Object>} Datos del bloque
   */
  async getBlock(blockId) {
    try {
      const data = await apiService.get(`/blockchain/block/${blockId}`);
      return this.mapBlockFromBackend(data);
    } catch (error) {
      console.error(`Error obteniendo bloque ${blockId}:`, error);
      throw this.handleBlockchainError(error, `Error al obtener el bloque ${blockId}`);
    }
  }

  /**
   * Mina un nuevo bloque con contenido
   * @param {string} content - Contenido del nuevo bloque
   * @param {string} previousHash - Hash del bloque anterior
   * @returns {Promise<Object>} Datos del bloque minado
   */
  async mineBlock(content, previousHash = null) {
    try {
      const requestData = {
        contenido: content,
        hashPrevio: previousHash
      };

      const data = await apiService.post('/blockchain/mine', requestData);
      
      return {
        ...this.mapBlockFromBackend(data.bloque || data),
        miningTime: data.tiempoMinado || data.miningTime || 0,
        reward: data.recompensa || data.reward || 0,
        nonce: data.nonce || 0
      };
    } catch (error) {
      console.error('Error minando bloque:', error);
      throw this.handleBlockchainError(error, 'Error al minar el bloque');
    }
  }

  /**
   * Valida la integridad de toda la cadena
   * @returns {Promise<Object>} Resultado de la validación
   */
  async validateChain() {
    try {
      const data = await apiService.post('/blockchain/validate');
      
      return {
        isValid: data.isValid || false,
        totalBlocks: data.totalBlocks || 0,
        validBlocks: data.validBlocks || 0,
        invalidBlocks: data.invalidBlocks || 0,
        errors: data.errors || [],
        integrityScore: data.integrityScore || 0,
        summary: {
          totalBlocks: data.totalBlocks || 0,
          validBlocks: data.validBlocks || 0,
          invalidBlocks: data.invalidBlocks || 0
        }
      };
    } catch (error) {
      console.error('Error validando cadena:', error);
      throw this.handleBlockchainError(error, 'Error al validar la cadena de bloques');
    }
  }

  /**
   * Agrega contenido (archivo) a un nuevo bloque
   * @param {FormData} formData - Datos del archivo a agregar
   * @returns {Promise<Object>} Resultado de la operación
   */
  async addFileToBlockchain(formData) {
    try {
      const data = await apiService.uploadFile('/blockchain/add-file', formData);
      
      return {
        success: data.exito || data.success || false,
        message: data.mensaje || data.message || 'Archivo agregado exitosamente',
        block: this.mapBlockFromBackend(data.bloque || data.block),
        fileHash: data.hashArchivo || data.fileHash || null
      };
    } catch (error) {
      console.error('Error agregando archivo:', error);
      throw this.handleBlockchainError(error, 'Error al agregar archivo al blockchain');
    }
  }

  /**
   * Obtiene la configuración actual del blockchain
   * @returns {Promise<Object>} Configuración del blockchain
   */
  async getConfiguration() {
    try {
      const data = await apiService.get('/blockchain/config');
      
      return {
        difficulty: data.numeroCeros || data.difficulty || 4,
        miningReward: data.recompensaMinado || data.miningReward || 1.0,
        genesisHash: data.hashGenesis || data.genesisHash || "0000000000000000000"
      };
    } catch (error) {
      console.error('Error obteniendo configuración:', error);
      throw this.handleBlockchainError(error, 'Error al obtener la configuración');
    }
  }

  /**
   * Actualiza la configuración del blockchain
   * @param {Object} config - Nueva configuración
   * @returns {Promise<Object>} Resultado de la actualización
   */
  async updateConfiguration(config) {
    try {
      const requestData = {
        numeroCeros: config.difficulty,
        recompensaMinado: config.miningReward
      };

      const data = await apiService.put('/blockchain/config', requestData);
      
      return {
        success: data.exito || data.success || false,
        message: data.mensaje || data.message || 'Configuración actualizada',
        config: {
          difficulty: data.numeroCeros || data.difficulty,
          miningReward: data.recompensaMinado || data.miningReward
        }
      };
    } catch (error) {
      console.error('Error actualizando configuración:', error);
      throw this.handleBlockchainError(error, 'Error al actualizar la configuración');
    }
  }

  // Métodos auxiliares

  /**
   * Mapea un bloque del formato del backend al formato del frontend
   * @param {Object} backendBlock - Bloque en formato del backend
   * @returns {Object} Bloque en formato del frontend
   */
  mapBlockFromBackend(backendBlock) {
    if (!backendBlock) return null;

    return {
      id: backendBlock.id || 0,
      index: backendBlock.id || 0,
      hash: backendBlock.hash || '',
      previousHash: backendBlock.hashPrevio || backendBlock.previousHash || '',
      content: backendBlock.contenido || backendBlock.content || '',
      contentJson: backendBlock.contenidoJson || backendBlock.contentJson || '',
      timestamp: backendBlock.timeStamp || backendBlock.timestamp || Date.now(),
      nonce: backendBlock.nonce || 0,
      data: backendBlock.contenido || backendBlock.content || '',
      isValid: backendBlock.esValido !== undefined ? backendBlock.esValido : true
    };
  }

  /**
   * Obtiene el hash del último bloque de la cadena
   * @param {Array} blocks - Array de bloques
   * @returns {string} Hash del último bloque
   */
  getLastBlockHash(blocks) {
    if (!blocks || blocks.length === 0) return '';
    const lastBlock = blocks[blocks.length - 1];
    return lastBlock.hash || lastBlock.Hash || '';
  }

  /**
   * Maneja errores específicos del blockchain
   * @param {Error} error - Error original
   * @param {string} defaultMessage - Mensaje por defecto
   * @returns {Error} Error procesado
   */
  handleBlockchainError(error, defaultMessage) {
    if (error instanceof ApiError) {
      // Mapear errores específicos del backend
      switch (error.status) {
        case 400:
          return new Error('Datos de blockchain inválidos');
        case 404:
          return new Error('Bloque o recurso no encontrado');
        case 409:
          return new Error('Conflicto en la cadena de bloques');
        case 500:
          return new Error('Error interno del servidor de blockchain');
        default:
          return new Error(error.message || defaultMessage);
      }
    }
    
    return new Error(defaultMessage);
  }

  /**
   * Genera blockchain simulado para desarrollo
   */
  generateMockBlockchain() {
    const mockBlocks = [
      {
        index: 0,
        hash: '0000a1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef012345',
        previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
        data: 'Bloque génesis',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        nonce: 12345
      },
      {
        index: 1,
        hash: '0000f6e5d4c3b2a1089fedcba9876543210fedcba9876543210fedcba987654',
        previousHash: '0000a1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef012345',
        data: 'Transacción: Alice envió 10 BTC a Bob',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        nonce: 67890
      },
      {
        index: 2,
        hash: '0000c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9',
        previousHash: '0000f6e5d4c3b2a1089fedcba9876543210fedcba9876543210fedcba987654',
        data: 'Transacción: Bob envió 5 BTC a Charlie',
        timestamp: new Date(Date.now() - 43200000).toISOString(),
        nonce: 54321
      }
    ];

    return {
      blocks: mockBlocks,
      totalBlocks: mockBlocks.length,
      lastBlockHash: mockBlocks[mockBlocks.length - 1].hash,
      difficulty: 4,
      isValid: true,
      lastSync: new Date().toISOString()
    };
  }
}

// Instancia singleton
const blockchainService = new BlockchainService();

export default blockchainService;
