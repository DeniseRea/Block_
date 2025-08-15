import React, { createContext, useContext, useReducer, useEffect } from 'react';
import authService from '../services/authService';

// Estados iniciales
const initialState = {
  // Usuario autenticado
  user: {
    isAuthenticated: false,
    username: '',
    email: '',
    points: 0,
    level: 1,
    totalMinedBlocks: 0,
    isLoading: false
  },
  
  // Estado de la blockchain
  blockchain: {
    blocks: [],
    totalBlocks: 0,
    lastBlockHash: '',
    difficulty: 4,
    isValid: true,
    lastValidation: null,
    isLoading: false,
    lastSync: null
  },
  
  // Sistema de puntos
  points: {
    current: 0,
    total: 0,
    rank: 0,
    history: [],
    leaderboard: [],
    achievements: [],
    isLoading: false
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
  UPDATE_POINTS: 'UPDATE_POINTS',
  UPDATE_LEADERBOARD: 'UPDATE_LEADERBOARD',
  UPDATE_ACHIEVEMENTS: 'UPDATE_ACHIEVEMENTS',
  ADD_ACHIEVEMENT: 'ADD_ACHIEVEMENT',
  
  // Minería
  START_MINING: 'START_MINING',
  COMPLETE_MINING: 'COMPLETE_MINING',
  
  // Archivos
  START_FILE_UPLOAD: 'START_FILE_UPLOAD',
  COMPLETE_FILE_UPLOAD: 'COMPLETE_FILE_UPLOAD',
  
  // Auditoría
  START_AUDIT: 'START_AUDIT',
  COMPLETE_AUDIT: 'COMPLETE_AUDIT',
  UPDATE_AUDIT_RESULTS: 'UPDATE_AUDIT_RESULTS'
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
      
    case ACTION_TYPES.UPDATE_POINTS:
      return {
        ...state,
        points: {
          ...state.points,
          ...action.payload
        }
      };
      
    case ACTION_TYPES.UPDATE_LEADERBOARD:
      return {
        ...state,
        points: {
          ...state.points,
          leaderboard: action.payload
        }
      };
      
    case ACTION_TYPES.UPDATE_ACHIEVEMENTS:
      return {
        ...state,
        points: {
          ...state.points,
          achievements: action.payload
        }
      };
      
    case ACTION_TYPES.UPDATE_AUDIT_RESULTS:
      return {
        ...state,
        audit: {
          ...state.audit,
          ...action.payload
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
  
  // Cargar datos del localStorage al iniciar
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
  
  // Guardar usuario en localStorage cuando cambie
  useEffect(() => {
    if (state.user.isAuthenticated) {
      localStorage.setItem('blockchain-user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('blockchain-user');
    }
  }, [state.user]);
  
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
    
    // Puntos
    updatePoints: (pointsData) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_POINTS,
        payload: pointsData
      });
    },
    
    updateLeaderboard: (leaderboard) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_LEADERBOARD,
        payload: leaderboard
      });
    },
    
    updateAchievements: (achievements) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_ACHIEVEMENTS,
        payload: achievements
      });
    },
    
    // Auditoría
    updateAuditResults: (auditData) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_AUDIT_RESULTS,
        payload: auditData
      });
    },
    
    completeAudit: (results, status, errors = []) => {
      dispatch({
        type: ACTION_TYPES.COMPLETE_AUDIT,
        payload: { results, status, errors }
      });
    }
  };
  
  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
