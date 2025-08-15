/**
 * Sistema de Persistencia Simplificado para Blockchain
 * Usa principalmente localStorage con respaldo opcional a IndexedDB
 */

// Configuración de almacenamiento
const STORAGE_KEYS = {
  user: 'blockchain-user',
  blockchain: 'blockchain-data',
  miningHistory: 'blockchain-mining-history',
  settings: 'blockchain-settings',
  theme: 'blockchain-theme',
  lastSync: 'blockchain-last-sync',
  appVersion: 'blockchain-app-version'
};

class SimplePersistenceManager {
  constructor() {
    this.isInitialized = false;
  }

  /**
   * Inicializar el sistema de persistencia
   */
  async initialize() {
    try {
      // Verificar disponibilidad de localStorage
      if (typeof Storage === "undefined") {
        console.error('❌ localStorage no está disponible');
        return false;
      }

      // Marcar como inicializado
      this.isInitialized = true;
      
      // Actualizar versión
      localStorage.setItem(STORAGE_KEYS.appVersion, '1.0.0');
      localStorage.setItem(STORAGE_KEYS.lastSync, Date.now().toString());
      
      console.log('✅ Sistema de persistencia simple inicializado');
      return true;
    } catch (error) {
      console.error('❌ Error inicializando persistencia simple:', error);
      return false;
    }
  }

  /**
   * BLOCKCHAIN PERSISTENCE
   */

  // Guardar blockchain completa
  saveBlockchain(blocks) {
    try {
      const blockchainData = {
        blocks: blocks,
        totalBlocks: blocks.length,
        lastBlockHash: blocks[blocks.length - 1]?.hash || '',
        savedAt: Date.now(),
        version: '1.0.0'
      };
      
      localStorage.setItem(STORAGE_KEYS.blockchain, JSON.stringify(blockchainData));
      console.log(`✅ Blockchain guardada: ${blocks.length} bloques`);
      return true;
    } catch (error) {
      console.error('❌ Error guardando blockchain:', error);
      return false;
    }
  }

  // Cargar blockchain
  loadBlockchain() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.blockchain);
      if (!saved) return [];

      const blockchainData = JSON.parse(saved);
      const blocks = blockchainData.blocks || [];
      
      // Ordenar por índice para asegurar orden correcto
      blocks.sort((a, b) => a.index - b.index);
      
      console.log(`✅ Blockchain cargada: ${blocks.length} bloques`);
      return blocks;
    } catch (error) {
      console.error('❌ Error cargando blockchain:', error);
      return [];
    }
  }

  // Agregar nuevo bloque
  addBlock(block) {
    try {
      const currentBlockchain = this.loadBlockchain();
      const updatedBlockchain = [...currentBlockchain, block];
      return this.saveBlockchain(updatedBlockchain);
    } catch (error) {
      console.error('❌ Error agregando bloque:', error);
      return false;
    }
  }

  /**
   * MINING HISTORY PERSISTENCE
   */

  // Guardar historial de minería
  saveMiningHistory(history) {
    try {
      const miningData = {
        history: history,
        totalRecords: history.length,
        totalEarned: history.reduce((sum, record) => sum + record.reward, 0),
        savedAt: Date.now(),
        version: '1.0.0'
      };
      
      localStorage.setItem(STORAGE_KEYS.miningHistory, JSON.stringify(miningData));
      console.log(`✅ Historial guardado: ${history.length} registros`);
      return true;
    } catch (error) {
      console.error('❌ Error guardando historial:', error);
      return false;
    }
  }

  // Cargar historial de minería
  loadMiningHistory() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.miningHistory);
      if (!saved) return [];

      const miningData = JSON.parse(saved);
      const history = miningData.history || [];
      
      // Ordenar por timestamp descendente
      history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      console.log(`✅ Historial cargado: ${history.length} registros`);
      return history;
    } catch (error) {
      console.error('❌ Error cargando historial:', error);
      return [];
    }
  }

  // Agregar registro de minería
  addMiningRecord(record) {
    try {
      const currentHistory = this.loadMiningHistory();
      const updatedHistory = [record, ...currentHistory];
      return this.saveMiningHistory(updatedHistory);
    } catch (error) {
      console.error('❌ Error agregando registro:', error);
      return false;
    }
  }

  /**
   * USER DATA PERSISTENCE
   */

  // Guardar datos de usuario
  saveUserData(userData) {
    try {
      const userToSave = {
        ...userData,
        lastSaved: Date.now(),
        version: '1.0.0'
      };
      
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userToSave));
      console.log(`✅ Usuario guardado: ${userData.username || 'Anónimo'}`);
      return true;
    } catch (error) {
      console.error('❌ Error guardando usuario:', error);
      return false;
    }
  }

  // Cargar datos de usuario
  loadUserData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.user);
      if (!saved) return null;

      const userData = JSON.parse(saved);
      console.log(`✅ Usuario cargado: ${userData.username || 'Anónimo'}`);
      return userData;
    } catch (error) {
      console.error('❌ Error cargando usuario:', error);
      return null;
    }
  }

  /**
   * SETTINGS PERSISTENCE
   */

  // Guardar configuraciones
  saveSettings(settings) {
    try {
      const settingsToSave = {
        ...settings,
        lastUpdated: Date.now(),
        version: '1.0.0'
      };
      
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settingsToSave));
      console.log('✅ Configuraciones guardadas');
      return true;
    } catch (error) {
      console.error('❌ Error guardando configuraciones:', error);
      return false;
    }
  }

  // Cargar configuraciones
  loadSettings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.settings);
      return saved ? JSON.parse(saved) : {
        mining: { difficulty: 4, reward: 50 },
        notifications: { enabled: true, sound: true },
        performance: { workers: navigator.hardwareConcurrency || 4 }
      };
    } catch (error) {
      console.error('❌ Error cargando configuraciones:', error);
      return {
        mining: { difficulty: 4, reward: 50 },
        notifications: { enabled: true, sound: true },
        performance: { workers: navigator.hardwareConcurrency || 4 }
      };
    }
  }

  /**
   * BACKUP SYSTEM
   */

  // Exportar todos los datos
  exportAllData() {
    try {
      const exportData = {
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        blockchain: this.loadBlockchain(),
        miningHistory: this.loadMiningHistory(),
        userData: this.loadUserData(),
        settings: this.loadSettings()
      };

      const dataString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([dataString], { type: 'application/json' });
      
      console.log('✅ Datos exportados correctamente');
      return blob;
    } catch (error) {
      console.error('❌ Error exportando datos:', error);
      return null;
    }
  }

  // Importar datos
  importAllData(jsonData) {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      
      if (data.blockchain) {
        this.saveBlockchain(data.blockchain);
      }
      
      if (data.miningHistory) {
        this.saveMiningHistory(data.miningHistory);
      }
      
      if (data.userData) {
        this.saveUserData(data.userData);
      }
      
      if (data.settings) {
        this.saveSettings(data.settings);
      }

      console.log('✅ Datos importados correctamente');
      return true;
    } catch (error) {
      console.error('❌ Error importando datos:', error);
      return false;
    }
  }

  /**
   * UTILITY METHODS
   */

  // Obtener estadísticas de almacenamiento
  getStorageStats() {
    try {
      let totalSize = 0;
      let itemCount = 0;

      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key.startsWith('blockchain-')) {
          totalSize += localStorage[key].length;
          itemCount++;
        }
      }

      const blockchain = this.loadBlockchain();
      const miningHistory = this.loadMiningHistory();

      return {
        localStorage: {
          used: totalSize,
          items: itemCount
        },
        blockchain: {
          blocks: blockchain.length
        },
        miningHistory: {
          records: miningHistory.length
        },
        total: {
          records: blockchain.length + miningHistory.length,
          size: totalSize
        }
      };
    } catch (error) {
      console.error('❌ Error obteniendo estadísticas:', error);
      return null;
    }
  }

  // Limpiar todos los datos
  clearAllData() {
    try {
      // Eliminar todas las claves relacionadas con blockchain
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });

      console.log('🗑️ Todos los datos han sido eliminados');
      return true;
    } catch (error) {
      console.error('❌ Error limpiando datos:', error);
      return false;
    }
  }

  // Optimizar almacenamiento (placeholder para compatibilidad)
  performMaintenance() {
    console.log('🔧 Mantenimiento completado (localStorage no requiere optimización)');
    localStorage.setItem(STORAGE_KEYS.lastSync, Date.now().toString());
    return Promise.resolve();
  }
}

// Instancia singleton
const simplePersistenceManager = new SimplePersistenceManager();

export default simplePersistenceManager;
export { STORAGE_KEYS };
