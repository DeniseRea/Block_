import React, { createContext, useContext, useReducer, useEffect } from 'react';
import persistenceManager from '../utils/PersistenceManager';

// Estados iniciales
const initialState = {
  // Usuario autenticado
  user: {
    isAuthenticated: false,
    username: '',
    email: '',
    points: 0,
    level: 1,
    totalMinedBlocks: 0
  },
  
  // Estado de la blockchain
  blockchain: {
    blocks: [
      // Datos de ejemplo para testing
      {
        index: 0,
        hash: '0000a1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef012345',
        previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
        data: 'Bloque génesis',
        timestamp: new Date(Date.now() - 172800000).toISOString(), // Hace 2 días
        nonce: 12345
      },
      {
        index: 1,
        hash: '0000f6e5d4c3b2a1089fedcba9876543210fedcba9876543210fedcba987654',
        previousHash: '0000a1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef012345',
        data: 'Primer bloque de transacciones',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // Ayer
        nonce: 67890
      }
    ],
    totalBlocks: 2,
    lastBlockHash: '0000f6e5d4c3b2a1089fedcba9876543210fedcba9876543210fedcba987654',
    difficulty: 4,
    isValid: true,
    lastValidation: null
  },
  
  // Sistema de puntos
  points: {
    currentPoints: 0,
    totalEarned: 0,
    miningHistory: [
      // Datos de ejemplo para testing
      {
        id: 1,
        blockHash: '0000a1b2c3d4e5f6...',
        reward: 50,
        timestamp: new Date(Date.now() - 86400000).toISOString(), // Ayer
        difficulty: 4
      },
      {
        id: 2,
        blockHash: '0000f6e5d4c3b2a1...',
        reward: 50,
        timestamp: new Date(Date.now() - 43200000).toISOString(), // Hace 12 horas
        difficulty: 4
      }
    ],
    leaderboard: [],
    achievements: []
  },
  
  // Configuración de minería
  mining: {
    difficulty: 4,
    reward: 50,
    isProcessing: false,
    lastMiningTime: null
  },
  
  // Sistema de archivos
  files: {
    uploadedFiles: [],
    currentFile: null,
    uploadProgress: 0
  },
  
  // Auditoría
  audit: {
    lastAuditDate: null,
    auditResults: [],
    integrityStatus: 'unknown',
    errors: []
  }
};

// Tipos de acciones
const ACTION_TYPES = {
  // Autenticación
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  UPDATE_USER_POINTS: 'UPDATE_USER_POINTS',
  
  // Blockchain
  SET_BLOCKCHAIN: 'SET_BLOCKCHAIN',
  ADD_BLOCK: 'ADD_BLOCK',
  UPDATE_DIFFICULTY: 'UPDATE_DIFFICULTY',
  
  // Puntos
  ADD_MINING_REWARD: 'ADD_MINING_REWARD',
  UPDATE_LEADERBOARD: 'UPDATE_LEADERBOARD',
  ADD_ACHIEVEMENT: 'ADD_ACHIEVEMENT',
  SET_MINING_HISTORY: 'SET_MINING_HISTORY',
  
  // Minería
  START_MINING: 'START_MINING',
  COMPLETE_MINING: 'COMPLETE_MINING',
  
  // Archivos
  START_FILE_UPLOAD: 'START_FILE_UPLOAD',
  COMPLETE_FILE_UPLOAD: 'COMPLETE_FILE_UPLOAD',
  
  // Auditoría
  START_AUDIT: 'START_AUDIT',
  COMPLETE_AUDIT: 'COMPLETE_AUDIT'
};

// Reducer principal
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          isAuthenticated: true,
          username: action.payload.username,
          email: action.payload.email,
          points: action.payload.points || 0
        }
      };
      
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        user: {
          ...initialState.user
        }
      };
      
    case ACTION_TYPES.UPDATE_USER_POINTS:
      return {
        ...state,
        user: {
          ...state.user,
          points: action.payload.points
        },
        points: {
          ...state.points,
          currentPoints: action.payload.points
        }
      };
      
    case ACTION_TYPES.SET_BLOCKCHAIN:
      return {
        ...state,
        blockchain: {
          ...state.blockchain,
          blocks: action.payload.blocks,
          totalBlocks: action.payload.blocks.length,
          lastBlockHash: action.payload.blocks[action.payload.blocks.length - 1]?.hash || ''
        }
      };
      
    case ACTION_TYPES.ADD_BLOCK:
      return {
        ...state,
        blockchain: {
          ...state.blockchain,
          blocks: [...state.blockchain.blocks, action.payload.block],
          totalBlocks: state.blockchain.totalBlocks + 1,
          lastBlockHash: action.payload.block.hash
        }
      };

    case ACTION_TYPES.UPDATE_DIFFICULTY:
      return {
        ...state,
        mining: {
          ...state.mining,
          difficulty: action.payload.difficulty
        }
      };
      
    case ACTION_TYPES.ADD_MINING_REWARD:
      return {
        ...state,
        user: {
          ...state.user,
          points: state.user.points + action.payload.reward,
          totalMinedBlocks: state.user.totalMinedBlocks + 1
        },
        points: {
          ...state.points,
          currentPoints: state.points.currentPoints + action.payload.reward,
          totalEarned: state.points.totalEarned + action.payload.reward,
          miningHistory: [
            ...state.points.miningHistory,
            {
              id: Date.now(),
              blockHash: action.payload.blockHash,
              reward: action.payload.reward,
              timestamp: new Date().toISOString(),
              difficulty: state.mining.difficulty
            }
          ]
        }
      };
      
    case ACTION_TYPES.SET_MINING_HISTORY:
      return {
        ...state,
        points: {
          ...state.points,
          miningHistory: action.payload.miningHistory,
          totalEarned: action.payload.totalEarned,
          currentPoints: action.payload.totalEarned
        }
      };
      
    case ACTION_TYPES.START_MINING:
      return {
        ...state,
        mining: {
          ...state.mining,
          isProcessing: true
        }
      };
      
    case ACTION_TYPES.COMPLETE_MINING:
      return {
        ...state,
        mining: {
          ...state.mining,
          isProcessing: false,
          lastMiningTime: new Date().toISOString()
        }
      };
      
    case ACTION_TYPES.COMPLETE_AUDIT:
      return {
        ...state,
        audit: {
          ...state.audit,
          lastAuditDate: new Date().toISOString(),
          auditResults: action.payload.results,
          integrityStatus: action.payload.status,
          errors: action.payload.errors || []
        }
      };
      
    default:
      return state;
  }
};

// Contexto
const AppContext = createContext();

// Hook personalizado
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};

// Provider del contexto
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Inicializar persistencia al montar
  useEffect(() => {
    const initializePersistence = async () => {
      try {
        const isInitialized = await persistenceManager.initialize();
        if (isInitialized) {
          console.log('✅ Sistema de persistencia inicializado');
          
          // Cargar datos persistentes
          const userData = persistenceManager.loadUserData();
          if (userData && userData.isAuthenticated) {
            dispatch({
              type: ACTION_TYPES.LOGIN_SUCCESS,
              payload: userData
            });
          }

          // Cargar configuraciones
          const settings = persistenceManager.loadSettings();
          if (settings.mining && settings.mining.difficulty) {
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
            const totalEarned = miningHistory.reduce((sum, record) => sum + record.reward, 0);
            
            // Actualizar puntos del usuario
            if (userData) {
              dispatch({
                type: ACTION_TYPES.UPDATE_USER_POINTS,
                payload: { points: totalEarned }
              });
            }
            
            // Actualizar historial
            dispatch({
              type: ACTION_TYPES.SET_MINING_HISTORY,
              payload: { 
                miningHistory,
                totalEarned
              }
            });
          }
        }
      } catch (error) {
        console.error('❌ Error inicializando persistencia:', error);
      }
    };

    initializePersistence();
  }, []);
  
  // Cargar datos del localStorage al iniciar (fallback)
  useEffect(() => {
    const savedUser = localStorage.getItem('blockchain-user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      dispatch({
        type: ACTION_TYPES.LOGIN_SUCCESS,
        payload: userData
      });
    }
  }, []);
  
  // Guardar usuario automáticamente cuando cambie
  useEffect(() => {
    if (state.user.isAuthenticated) {
      // Guardar en localStorage (inmediato)
      localStorage.setItem('blockchain-user', JSON.stringify(state.user));
      
      // Guardar en persistencia (asíncrono)
      persistenceManager.saveUserData(state.user).catch(error => {
        console.error('Error guardando usuario:', error);
      });
    } else {
      localStorage.removeItem('blockchain-user');
    }
  }, [state.user]);

  // Guardar blockchain automáticamente cuando cambie
  useEffect(() => {
    if (state.blockchain.blocks.length > 0) {
      persistenceManager.saveBlockchain(state.blockchain.blocks).catch(error => {
        console.error('Error guardando blockchain:', error);
      });
    }
  }, [state.blockchain.blocks]);

  // Guardar historial de minería automáticamente
  useEffect(() => {
    if (state.points.miningHistory.length > 0) {
      persistenceManager.saveMiningHistory(state.points.miningHistory).catch(error => {
        console.error('Error guardando historial:', error);
      });
    }
  }, [state.points.miningHistory]);
  
  // Acciones
  const actions = {
    // Autenticación
    login: (userData) => {
      dispatch({
        type: ACTION_TYPES.LOGIN_SUCCESS,
        payload: userData
      });
    },
    
    logout: () => {
      dispatch({ type: ACTION_TYPES.LOGOUT });
    },
    
    // Blockchain
    setBlockchain: (blocks) => {
      dispatch({
        type: ACTION_TYPES.SET_BLOCKCHAIN,
        payload: { blocks }
      });
    },
    
    addBlock: (block) => {
      dispatch({
        type: ACTION_TYPES.ADD_BLOCK,
        payload: { block }
      });
    },
    
    // Minería
    startMining: () => {
      dispatch({ type: ACTION_TYPES.START_MINING });
    },
    
    completeMining: (blockHash, reward) => {
      dispatch({ type: ACTION_TYPES.COMPLETE_MINING });
      dispatch({
        type: ACTION_TYPES.ADD_MINING_REWARD,
        payload: { blockHash, reward }
      });
    },
    
    // Auditoría
    completeAudit: (results, status, errors = []) => {
      dispatch({
        type: ACTION_TYPES.COMPLETE_AUDIT,
        payload: { results, status, errors }
      });
    }
  };
  
  return (
    <AppContext.Provider value={{ state, actions, dispatch, ACTION_TYPES }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext debe usarse dentro de un AppProvider');
  }
  return context;
};

export default AppContext;
