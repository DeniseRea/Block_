// src/hooks/useBlockchain.js - Hook para operaciones de blockchain

import { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import blockchainService from '../services/blockchainService';
import useAsync from './useAsync';

/**
 * Hook para manejar operaciones de blockchain
 */
export const useBlockchain = () => {
  const { state, actions } = useApp();
  const [miningProgress, setMiningProgress] = useState(0);

  // Hook para obtener la cadena de bloques
  const {
    data: blockchainData,
    loading: loadingBlockchain,
    error: blockchainError,
    execute: fetchBlockchain
  } = useAsync(blockchainService.getBlockchain);

  // Hook para minar bloques
  const {
    loading: miningBlock,
    error: miningError,
    execute: executeMining
  } = useAsync(blockchainService.mineBlock);

  // Hook para validar cadena
  const {
    data: validationResult,
    loading: validatingChain,
    error: validationError,
    execute: executeValidation
  } = useAsync(blockchainService.validateChain);

  // Hook para agregar archivos
  const {
    loading: addingFile,
    error: fileError,
    execute: executeAddFile
  } = useAsync(blockchainService.addFileToBlockchain);

  /**
   * Obtiene y actualiza la cadena de bloques en el estado global
   */
  const refreshBlockchain = useCallback(async () => {
    try {
      const blockchain = await fetchBlockchain();
      if (blockchain) {
        actions.setBlockchain(blockchain.blocks);
      }
      return blockchain;
    } catch (error) {
      console.error('Error refrescando blockchain:', error);
      throw error;
    }
  }, [fetchBlockchain, actions]);

  /**
   * Mina un nuevo bloque con progreso simulado
   */
  const mineNewBlock = useCallback(async (content) => {
    try {
      // Iniciar proceso de minado
      actions.startMining();
      setMiningProgress(0);

      // Simular progreso
      const progressInterval = setInterval(() => {
        setMiningProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      // Obtener último hash de la cadena
      const lastHash = state.blockchain.blocks.length > 0 
        ? state.blockchain.blocks[state.blockchain.blocks.length - 1].hash
        : null;

      // Ejecutar minado en el backend
      const result = await executeMining(content, lastHash);

      // Limpiar progreso
      clearInterval(progressInterval);
      setMiningProgress(100);

      if (result) {
        // Actualizar estado global
        actions.addBlock(result);
        actions.completeMining(result.hash, result.reward);

        // Refrescar blockchain completo
        await refreshBlockchain();
      }

      setTimeout(() => setMiningProgress(0), 2000);
      return result;

    } catch (error) {
      setMiningProgress(0);
      console.error('Error minando bloque:', error);
      throw error;
    }
  }, [executeMining, actions, state.blockchain.blocks]);

  /**
   * Valida la integridad de toda la cadena
   */
  const validateBlockchain = useCallback(async () => {
    try {
      const validation = await executeValidation();
      if (validation) {
        actions.completeAudit(
          validation,
          validation.isValid ? 'valid' : 'invalid',
          validation.errors
        );
      }
      return validation;
    } catch (error) {
      console.error('Error validando cadena:', error);
      throw error;
    }
  }, [executeValidation, actions]);

  /**
   * Agrega un archivo al blockchain
   */
  const addFileToBlockchain = useCallback(async (file, description = '') => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', description);

      const result = await executeAddFile(formData);
      
      if (result && result.success) {
        // Actualizar blockchain después de agregar archivo
        await refreshBlockchain();
        
        // Si hay recompensa, actualizar puntos
        if (result.reward) {
          actions.completeMining(result.block?.hash, result.reward);
        }
      }

      return result;
    } catch (error) {
      console.error('Error agregando archivo:', error);
      throw error;
    }
  }, [executeAddFile, refreshBlockchain, actions]);

  /**
   * Obtiene configuración actual del blockchain
   */
  const getConfiguration = useCallback(async () => {
    try {
      return await blockchainService.getConfiguration();
    } catch (error) {
      console.error('Error obteniendo configuración:', error);
      throw error;
    }
  }, []);

  /**
   * Actualiza configuración del blockchain
   */
  const updateConfiguration = useCallback(async (config) => {
    try {
      const result = await blockchainService.updateConfiguration(config);
      
      if (result && result.success) {
        // Actualizar estado local si es necesario
        // actions.updateDifficulty(config.difficulty);
      }

      return result;
    } catch (error) {
      console.error('Error actualizando configuración:', error);
      throw error;
    }
  }, []);

  return {
    // Estados
    blockchain: blockchainData || state.blockchain,
    miningProgress,
    
    // Loading states
    loadingBlockchain,
    isLoading: loadingBlockchain,
    miningBlock,
    isMining: miningBlock,
    validatingChain,
    isValidating: validatingChain,
    addingFile,
    
    // Errors
    blockchainError,
    miningError,
    validationError,
    fileError,
    
    // Datos específicos
    validationResult,
    
    // Acciones
    refreshBlockchain,
    mineNewBlock,
    validateBlockchain,
    addFileToBlockchain,
    getConfiguration,
    updateConfiguration,
    
    // Estado actual desde contexto
    currentBlocks: state.blockchain.blocks,
    totalBlocks: state.blockchain.totalBlocks,
    lastBlockHash: state.blockchain.lastBlockHash,
    difficulty: state.blockchain.difficulty,
    isChainValid: state.blockchain.isValid
  };
};

export default useBlockchain;
