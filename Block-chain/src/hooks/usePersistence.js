/**
 * Hook personalizado para manejar la persistencia de datos en React
 * Integra PersistenceManager con el contexto de la aplicación
 */

import { useEffect, useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import persistenceManager from '../utils/PersistenceManager';
import Swal from 'sweetalert2';

export const usePersistence = () => {
  const { state, dispatch, ACTION_TYPES } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [storageStats, setStorageStats] = useState(null);

  // Inicializar persistencia al montar el hook
  useEffect(() => {
    const initializePersistence = async () => {
      setIsLoading(true);
      try {
        const success = await persistenceManager.initialize();
        if (success) {
          setIsInitialized(true);
          await loadAllData();
          await updateStorageStats();
          
          // Registrar callback para sincronización automática
          persistenceManager.onSync((event, data) => {
            console.log(`🔄 Evento de sincronización: ${event}`, data);
            updateStorageStats();
          });
        }
      } catch (error) {
        console.error('❌ Error inicializando persistencia:', error);
        Swal.fire({
          title: 'Error de Persistencia',
          text: 'No se pudo inicializar el sistema de almacenamiento',
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializePersistence();
  }, []);

  // Cargar todos los datos al inicializar
  const loadAllData = useCallback(async () => {
    try {
      // Cargar datos de usuario
      const userData = persistenceManager.loadUserData();
      if (userData && userData.isAuthenticated) {
        dispatch({
          type: ACTION_TYPES.LOGIN_SUCCESS,
          payload: userData
        });
      }

      // Cargar configuraciones
      const settings = persistenceManager.loadSettings();
      if (settings.mining) {
        dispatch({
          type: ACTION_TYPES.UPDATE_DIFFICULTY,
          payload: { difficulty: settings.mining.difficulty }
        });
      }

      // Cargar blockchain
      const blockchain = await persistenceManager.loadBlockchain();
      if (blockchain.length > 0) {
        dispatch({
          type: ACTION_TYPES.SET_BLOCKCHAIN,
          payload: { blocks: blockchain }
        });
      }

      // Cargar historial de minería
      const miningHistory = await persistenceManager.loadMiningHistory();
      if (miningHistory.length > 0) {
        // Actualizar puntos basado en historial
        const totalEarned = miningHistory.reduce((sum, record) => sum + record.reward, 0);
        dispatch({
          type: ACTION_TYPES.UPDATE_USER_POINTS,
          payload: { 
            totalEarned,
            miningHistory 
          }
        });
      }

      console.log('✅ Todos los datos cargados correctamente');
    } catch (error) {
      console.error('❌ Error cargando datos:', error);
    }
  }, [dispatch, ACTION_TYPES]);

  // Guardar datos de usuario automáticamente
  useEffect(() => {
    if (isInitialized && state.user.isAuthenticated) {
      persistenceManager.saveUserData(state.user);
    }
  }, [state.user, isInitialized]);

  // Guardar blockchain automáticamente
  useEffect(() => {
    if (isInitialized && state.blockchain.blocks.length > 0) {
      persistenceManager.saveBlockchain(state.blockchain.blocks);
    }
  }, [state.blockchain.blocks, isInitialized]);

  // Guardar historial de minería automáticamente
  useEffect(() => {
    if (isInitialized && state.points.miningHistory.length > 0) {
      persistenceManager.saveMiningHistory(state.points.miningHistory);
    }
  }, [state.points.miningHistory, isInitialized]);

  // Actualizar estadísticas de almacenamiento
  const updateStorageStats = useCallback(async () => {
    try {
      const stats = await persistenceManager.getStorageStats();
      setStorageStats(stats);
    } catch (error) {
      console.error('❌ Error obteniendo estadísticas:', error);
    }
  }, []);

  // Funciones manuales de persistencia
  const saveCurrentState = useCallback(async () => {
    if (!isInitialized) return false;

    setIsLoading(true);
    try {
      // Guardar todos los datos
      persistenceManager.saveUserData(state.user);
      await persistenceManager.saveBlockchain(state.blockchain.blocks);
      await persistenceManager.saveMiningHistory(state.points.miningHistory);
      
      const settings = {
        mining: { 
          difficulty: state.mining.difficulty, 
          reward: state.mining.reward 
        },
        notifications: { enabled: true, sound: true },
        performance: { workers: navigator.hardwareConcurrency || 4 }
      };
      persistenceManager.saveSettings(settings);

      await updateStorageStats();
      
      Swal.fire({
        title: '✅ Guardado Exitoso',
        text: 'Todos los datos han sido guardados correctamente',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });

      return true;
    } catch (error) {
      console.error('❌ Error guardando estado:', error);
      Swal.fire({
        title: 'Error de Guardado',
        text: 'No se pudieron guardar los datos',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [state, isInitialized, updateStorageStats]);

  // Crear respaldo manual
  const createBackup = useCallback(async () => {
    if (!isInitialized) return false;

    setIsLoading(true);
    try {
      const backupBlob = await persistenceManager.exportAllData();
      if (backupBlob) {
        // Crear enlace de descarga
        const url = URL.createObjectURL(backupBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `blockchain-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        Swal.fire({
          title: '📁 Respaldo Creado',
          text: 'El archivo de respaldo se ha descargado correctamente',
          icon: 'success',
          confirmButtonText: 'Perfecto'
        });

        return true;
      }
    } catch (error) {
      console.error('❌ Error creando respaldo:', error);
      Swal.fire({
        title: 'Error de Respaldo',
        text: 'No se pudo crear el archivo de respaldo',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    } finally {
      setIsLoading(false);
    }
    return false;
  }, [isInitialized]);

  // Restaurar desde respaldo
  const restoreFromBackup = useCallback(async (file) => {
    if (!isInitialized) return false;

    setIsLoading(true);
    try {
      const result = await Swal.fire({
        title: '⚠️ Confirmar Restauración',
        text: 'Esto sobrescribirá todos los datos actuales. ¿Estás seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, restaurar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33'
      });

      if (!result.isConfirmed) {
        setIsLoading(false);
        return false;
      }

      // Leer archivo
      const reader = new FileReader();
      const fileContent = await new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsText(file);
      });

      // Importar datos
      const success = await persistenceManager.importAllData(fileContent);
      if (success) {
        // Recargar datos en la aplicación
        await loadAllData();
        await updateStorageStats();

        Swal.fire({
          title: '✅ Restauración Exitosa',
          text: 'Los datos han sido restaurados correctamente',
          icon: 'success',
          confirmButtonText: 'Excelente'
        });

        return true;
      }
    } catch (error) {
      console.error('❌ Error restaurando respaldo:', error);
      Swal.fire({
        title: 'Error de Restauración',
        text: 'No se pudieron restaurar los datos',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    } finally {
      setIsLoading(false);
    }
    return false;
  }, [isInitialized, loadAllData, updateStorageStats]);

  // Limpiar todos los datos
  const clearAllData = useCallback(async () => {
    if (!isInitialized) return false;

    try {
      const result = await Swal.fire({
        title: '🗑️ ¿Eliminar Todos los Datos?',
        text: 'Esta acción no se puede deshacer. Se eliminará toda la blockchain, historial y configuraciones.',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar todo',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33'
      });

      if (!result.isConfirmed) return false;

      setIsLoading(true);
      const success = await persistenceManager.clearAllData();
      
      if (success) {
        // Limpiar estado de la aplicación
        dispatch({ type: ACTION_TYPES.LOGOUT });
        dispatch({ 
          type: ACTION_TYPES.SET_BLOCKCHAIN, 
          payload: { blocks: [] } 
        });

        await updateStorageStats();

        Swal.fire({
          title: '🗑️ Datos Eliminados',
          text: 'Todos los datos han sido eliminados correctamente',
          icon: 'info',
          confirmButtonText: 'Entendido'
        });

        return true;
      }
    } catch (error) {
      console.error('❌ Error eliminando datos:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron eliminar todos los datos',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    } finally {
      setIsLoading(false);
    }
    return false;
  }, [isInitialized, dispatch, ACTION_TYPES, updateStorageStats]);

  // Optimizar almacenamiento
  const optimizeStorage = useCallback(async () => {
    if (!isInitialized) return false;

    setIsLoading(true);
    try {
      await persistenceManager.performMaintenance();
      await updateStorageStats();

      Swal.fire({
        title: '🔧 Optimización Completa',
        text: 'El almacenamiento ha sido optimizado correctamente',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });

      return true;
    } catch (error) {
      console.error('❌ Error optimizando:', error);
      Swal.fire({
        title: 'Error de Optimización',
        text: 'No se pudo optimizar el almacenamiento',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    } finally {
      setIsLoading(false);
    }
    return false;
  }, [isInitialized, updateStorageStats]);

  // Obtener información del estado de persistencia
  const getPersistenceInfo = useCallback(() => {
    return {
      isInitialized,
      isLoading,
      storageStats,
      hasData: storageStats ? storageStats.total.records > 0 : false,
      lastSync: localStorage.getItem('blockchain-last-sync'),
      version: '1.0.0'
    };
  }, [isInitialized, isLoading, storageStats]);

  return {
    // Estado
    isLoading,
    isInitialized,
    storageStats,
    
    // Funciones de persistencia
    saveCurrentState,
    loadAllData,
    
    // Respaldos
    createBackup,
    restoreFromBackup,
    
    // Mantenimiento
    clearAllData,
    optimizeStorage,
    updateStorageStats,
    
    // Información
    getPersistenceInfo
  };
};

export default usePersistence;
