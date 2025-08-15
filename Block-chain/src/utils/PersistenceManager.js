/**
 * Sistema de Persistencia Optimizada para Blockchain
 * Combina IndexedDB para datos grandes y localStorage para configuraciones
 * Incluye validación de integridad, respaldos automáticos y sincronización
 */

// Configuración de la base de datos
const DB_CONFIG = {
  name: 'BlockchainAppDB',
  version: 1,
  stores: {
    blockchain: 'blockchain',
    miningHistory: 'miningHistory', 
    userStats: 'userStats',
    auditRecords: 'auditRecords',
    backups: 'backups'
  }
};

// Configuración de localStorage
const STORAGE_KEYS = {
  user: 'blockchain-user',
  theme: 'blockchain-theme', 
  settings: 'blockchain-settings',
  lastSync: 'blockchain-last-sync',
  appVersion: 'blockchain-app-version'
};

class PersistenceManager {
  constructor() {
    this.db = null;
    this.isInitialized = false;
    this.syncCallbacks = new Set();
  }

  /**
   * Inicializar la base de datos IndexedDB
   */
  async initialize() {
    if (this.isInitialized) return true;

    try {
      this.db = await this.openDatabase();
      this.isInitialized = true;
      await this.performMaintenance();
      console.log('✅ Sistema de persistencia inicializado correctamente');
      return true;
    } catch (error) {
      console.error('❌ Error inicializando persistencia:', error);
      return false;
    }
  }

  /**
   * Abrir conexión a IndexedDB
   */
  openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Store para bloques de la blockchain
        if (!db.objectStoreNames.contains(DB_CONFIG.stores.blockchain)) {
          const blockchainStore = db.createObjectStore(DB_CONFIG.stores.blockchain, {
            keyPath: 'index'
          });
          blockchainStore.createIndex('hash', 'hash', { unique: true });
          blockchainStore.createIndex('timestamp', 'timestamp');
          blockchainStore.createIndex('difficulty', 'difficulty');
        }

        // Store para historial de minería
        if (!db.objectStoreNames.contains(DB_CONFIG.stores.miningHistory)) {
          const miningStore = db.createObjectStore(DB_CONFIG.stores.miningHistory, {
            keyPath: 'id'
          });
          miningStore.createIndex('blockHash', 'blockHash');
          miningStore.createIndex('timestamp', 'timestamp');
          miningStore.createIndex('reward', 'reward');
        }

        // Store para estadísticas del usuario
        if (!db.objectStoreNames.contains(DB_CONFIG.stores.userStats)) {
          db.createObjectStore(DB_CONFIG.stores.userStats, {
            keyPath: 'username'
          });
        }

        // Store para registros de auditoría
        if (!db.objectStoreNames.contains(DB_CONFIG.stores.auditRecords)) {
          const auditStore = db.createObjectStore(DB_CONFIG.stores.auditRecords, {
            keyPath: 'id'
          });
          auditStore.createIndex('timestamp', 'timestamp');
          auditStore.createIndex('status', 'status');
        }

        // Store para respaldos automáticos
        if (!db.objectStoreNames.contains(DB_CONFIG.stores.backups)) {
          const backupStore = db.createObjectStore(DB_CONFIG.stores.backups, {
            keyPath: 'id'
          });
          backupStore.createIndex('timestamp', 'timestamp');
          backupStore.createIndex('type', 'type');
        }
      };
    });
  }

  /**
   * BLOCKCHAIN PERSISTENCE
   */

  // Guardar blockchain completa
  async saveBlockchain(blocks) {
    if (!this.isInitialized) await this.initialize();

    try {
      const transaction = this.db.transaction([DB_CONFIG.stores.blockchain], 'readwrite');
      const store = transaction.objectStore(DB_CONFIG.stores.blockchain);

      // Limpiar store anterior y agregar bloques usando promesas
      await new Promise((resolve, reject) => {
        const clearRequest = store.clear();
        
        clearRequest.onsuccess = async () => {
          try {
            // Agregar todos los bloques
            for (const block of blocks) {
              const blockData = {
                ...block,
                savedAt: Date.now(),
                integrity: await this.calculateIntegrity(block)
              };
              
              const addRequest = store.add(blockData);
              await new Promise((resolveAdd, rejectAdd) => {
                addRequest.onsuccess = () => resolveAdd();
                addRequest.onerror = () => rejectAdd(addRequest.error);
              });
            }
            resolve();
          } catch (error) {
            reject(error);
          }
        };
        
        clearRequest.onerror = () => reject(clearRequest.error);
        transaction.onerror = () => reject(transaction.error);
        transaction.oncomplete = () => resolve();
      });

      await this.createBackup('blockchain', blocks);
      
      console.log(`✅ Blockchain guardada: ${blocks.length} bloques`);
      return true;
    } catch (error) {
      console.error('❌ Error guardando blockchain:', error);
      return false;
    }
  }

  // Cargar blockchain
  async loadBlockchain() {
    if (!this.isInitialized) await this.initialize();

    try {
      const transaction = this.db.transaction([DB_CONFIG.stores.blockchain], 'readonly');
      const store = transaction.objectStore(DB_CONFIG.stores.blockchain);
      
      const blocks = await new Promise((resolve, reject) => {
        const request = store.getAll();
        
        request.onsuccess = () => {
          const result = request.result || [];
          resolve(result);
        };
        
        request.onerror = () => reject(request.error);
        transaction.onerror = () => reject(transaction.error);
      });

      // Validar integridad
      const validBlocks = [];
      for (const block of blocks) {
        try {
          const currentIntegrity = await this.calculateIntegrity(block);
          if (currentIntegrity === block.integrity) {
            validBlocks.push(block);
          } else {
            console.warn(`⚠️ Bloque ${block.index} falló validación de integridad`);
          }
        } catch (error) {
          console.warn(`⚠️ Error validando bloque ${block.index}:`, error);
        }
      }

      // Ordenar por índice
      validBlocks.sort((a, b) => a.index - b.index);
      
      console.log(`✅ Blockchain cargada: ${validBlocks.length} bloques válidos`);
      return validBlocks;
    } catch (error) {
      console.error('❌ Error cargando blockchain:', error);
      return [];
    }
  }

  // Agregar nuevo bloque
  async addBlock(block) {
    if (!this.isInitialized) await this.initialize();

    try {
      const blockData = {
        ...block,
        savedAt: Date.now(),
        integrity: await this.calculateIntegrity(block)
      };

      const transaction = this.db.transaction([DB_CONFIG.stores.blockchain], 'readwrite');
      const store = transaction.objectStore(DB_CONFIG.stores.blockchain);
      
      // Usar promesa para manejar la transacción correctamente
      await new Promise((resolve, reject) => {
        const request = store.add(blockData);
        
        request.onsuccess = () => {
          console.log(`✅ Bloque ${block.index} agregado a la persistencia`);
          this.notifySyncCallbacks('blockAdded', block);
          resolve();
        };
        
        request.onerror = () => {
          console.error('❌ Error agregando bloque:', request.error);
          reject(request.error);
        };
        
        transaction.onerror = () => reject(transaction.error);
      });

      return true;
    } catch (error) {
      console.error('❌ Error agregando bloque:', error);
      return false;
    }
  }

  /**
   * MINING HISTORY PERSISTENCE
   */

  // Guardar historial de minería
  async saveMiningHistory(history) {
    if (!this.isInitialized) await this.initialize();

    try {
      const transaction = this.db.transaction([DB_CONFIG.stores.miningHistory], 'readwrite');
      const store = transaction.objectStore(DB_CONFIG.stores.miningHistory);

      for (const record of history) {
        const recordData = {
          ...record,
          savedAt: Date.now()
        };
        await store.put(recordData);
      }

      await transaction.complete;
      console.log(`✅ Historial de minería guardado: ${history.length} registros`);
      return true;
    } catch (error) {
      console.error('❌ Error guardando historial:', error);
      return false;
    }
  }

  // Cargar historial de minería
  async loadMiningHistory() {
    if (!this.isInitialized) await this.initialize();

    try {
      const transaction = this.db.transaction([DB_CONFIG.stores.miningHistory], 'readonly');
      const store = transaction.objectStore(DB_CONFIG.stores.miningHistory);
      const history = await store.getAll();

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
  async addMiningRecord(record) {
    if (!this.isInitialized) await this.initialize();

    try {
      const recordData = {
        ...record,
        id: record.id || Date.now(),
        savedAt: Date.now()
      };

      const transaction = this.db.transaction([DB_CONFIG.stores.miningHistory], 'readwrite');
      const store = transaction.objectStore(DB_CONFIG.stores.miningHistory);
      
      await store.add(recordData);
      await transaction.complete;

      console.log(`✅ Registro de minería agregado: ${record.reward} puntos`);
      return true;
    } catch (error) {
      console.error('❌ Error agregando registro:', error);
      return false;
    }
  }

  /**
   * USER DATA PERSISTENCE (localStorage para datos frecuentes)
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
        lastUpdated: Date.now()
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
      return {};
    }
  }

  /**
   * BACKUP SYSTEM
   */

  // Crear respaldo automático
  async createBackup(type, data) {
    if (!this.isInitialized) await this.initialize();

    try {
      const backup = {
        id: `${type}_${Date.now()}`,
        type: type,
        data: data,
        timestamp: new Date().toISOString(),
        size: JSON.stringify(data).length,
        checksum: await this.calculateChecksum(data)
      };

      const transaction = this.db.transaction([DB_CONFIG.stores.backups], 'readwrite');
      const store = transaction.objectStore(DB_CONFIG.stores.backups);
      
      await new Promise((resolve, reject) => {
        const request = store.add(backup);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
        transaction.onerror = () => reject(transaction.error);
        transaction.oncomplete = () => resolve();
      });

      // Limpiar respaldos antiguos (mantener solo los últimos 5)
      await this.cleanOldBackups(type, 5);
      
      console.log(`✅ Respaldo creado: ${type} (${backup.size} bytes)`);
      return backup.id;
    } catch (error) {
      console.error('❌ Error creando respaldo:', error);
      return null;
    }
  }

  // Restaurar desde respaldo
  async restoreFromBackup(backupId) {
    if (!this.isInitialized) await this.initialize();

    try {
      const transaction = this.db.transaction([DB_CONFIG.stores.backups], 'readonly');
      const store = transaction.objectStore(DB_CONFIG.stores.backups);
      const backup = await store.get(backupId);

      if (!backup) {
        throw new Error('Respaldo no encontrado');
      }

      // Validar checksum
      const currentChecksum = await this.calculateChecksum(backup.data);
      if (currentChecksum !== backup.checksum) {
        throw new Error('Respaldo corrupto');
      }

      console.log(`✅ Respaldo restaurado: ${backup.type}`);
      return backup.data;
    } catch (error) {
      console.error('❌ Error restaurando respaldo:', error);
      return null;
    }
  }

  /**
   * UTILITY METHODS
   */

  // Calcular integridad de datos
  async calculateIntegrity(data) {
    const encoder = new TextEncoder();
    const dataString = JSON.stringify(data);
    const dataBuffer = encoder.encode(dataString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // Calcular checksum
  async calculateChecksum(data) {
    return this.calculateIntegrity(data);
  }

  // Limpiar respaldos antiguos
  async cleanOldBackups(type, keepCount) {
    try {
      const transaction = this.db.transaction([DB_CONFIG.stores.backups], 'readwrite');
      const store = transaction.objectStore(DB_CONFIG.stores.backups);
      const index = store.index('type');
      
      // Usar cursor para obtener los respaldos
      const backups = [];
      const cursorRequest = index.openCursor(type);
      
      await new Promise((resolve, reject) => {
        cursorRequest.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            backups.push(cursor.value);
            cursor.continue();
          } else {
            resolve();
          }
        };
        cursorRequest.onerror = () => reject(cursorRequest.error);
      });

      // Verificar que backups es un array antes de ordenar
      if (Array.isArray(backups) && backups.length > keepCount) {
        backups.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Eliminar respaldos excedentes
        const toDelete = backups.slice(keepCount);
        for (const backup of toDelete) {
          await store.delete(backup.id);
        }
        
        if (toDelete.length > 0) {
          console.log(`🗑️ ${toDelete.length} respaldos antiguos eliminados`);
        }
      }

      await new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.error('❌ Error limpiando respaldos:', error);
    }
  }

  // Mantenimiento de la base de datos
  async performMaintenance() {
    console.log('🔧 Realizando mantenimiento de la base de datos...');
    
    // Actualizar timestamp de última sincronización
    localStorage.setItem(STORAGE_KEYS.lastSync, Date.now().toString());
    
    // Limpiar respaldos antiguos
    await this.cleanOldBackups('blockchain', 3);
    await this.cleanOldBackups('mining', 5);
    
    console.log('✅ Mantenimiento completado');
  }

  // Exportar todos los datos
  async exportAllData() {
    if (!this.isInitialized) await this.initialize();

    try {
      const exportData = {
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        blockchain: await this.loadBlockchain(),
        miningHistory: await this.loadMiningHistory(),
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
  async importAllData(jsonData) {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      
      if (data.blockchain) {
        await this.saveBlockchain(data.blockchain);
      }
      
      if (data.miningHistory) {
        await this.saveMiningHistory(data.miningHistory);
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

  // Obtener estadísticas de almacenamiento
  async getStorageStats() {
    try {
      const stats = {
        indexedDB: {
          blockchain: 0,
          miningHistory: 0,
          backups: 0
        },
        localStorage: {
          used: 0,
          available: 0
        },
        total: {
          records: 0,
          size: 0
        }
      };

      if (this.isInitialized) {
        // Contar registros en IndexedDB
        const blockchainTx = this.db.transaction([DB_CONFIG.stores.blockchain], 'readonly');
        stats.indexedDB.blockchain = await blockchainTx.objectStore(DB_CONFIG.stores.blockchain).count();

        const miningTx = this.db.transaction([DB_CONFIG.stores.miningHistory], 'readonly');
        stats.indexedDB.miningHistory = await miningTx.objectStore(DB_CONFIG.stores.miningHistory).count();

        const backupTx = this.db.transaction([DB_CONFIG.stores.backups], 'readonly');
        stats.indexedDB.backups = await backupTx.objectStore(DB_CONFIG.stores.backups).count();
      }

      // Calcular uso de localStorage
      let localStorageSize = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          localStorageSize += localStorage[key].length;
        }
      }
      stats.localStorage.used = localStorageSize;

      stats.total.records = stats.indexedDB.blockchain + stats.indexedDB.miningHistory;
      stats.total.size = localStorageSize;

      return stats;
    } catch (error) {
      console.error('❌ Error obteniendo estadísticas:', error);
      return null;
    }
  }

  // Registrar callback de sincronización
  onSync(callback) {
    this.syncCallbacks.add(callback);
  }

  // Notificar callbacks de sincronización
  notifySyncCallbacks(event, data) {
    this.syncCallbacks.forEach(callback => {
      try {
        callback(event, data);
      } catch (error) {
        console.error('Error en callback de sincronización:', error);
      }
    });
  }

  // Limpiar todos los datos
  async clearAllData() {
    try {
      if (this.isInitialized) {
        const transaction = this.db.transaction([
          DB_CONFIG.stores.blockchain,
          DB_CONFIG.stores.miningHistory,
          DB_CONFIG.stores.userStats,
          DB_CONFIG.stores.auditRecords,
          DB_CONFIG.stores.backups
        ], 'readwrite');

        for (const storeName of Object.values(DB_CONFIG.stores)) {
          await transaction.objectStore(storeName).clear();
        }

        await transaction.complete;
      }

      // Limpiar localStorage
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
}

// Instancia singleton
const persistenceManager = new PersistenceManager();

export default persistenceManager;
export { STORAGE_KEYS, DB_CONFIG };
