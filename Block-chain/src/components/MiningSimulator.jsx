import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import Swal from 'sweetalert2';

const MiningSimulator = () => {
  const { colors } = useTheme();
  const { state, dispatch, ACTION_TYPES } = useAppContext();
  const [isMining, setIsMining] = useState(false);
  const [currentNonce, setCurrentNonce] = useState(0);
  const [hashRate, setHashRate] = useState(0);
  const [targetHash, setTargetHash] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [foundHash, setFoundHash] = useState('');
  
  const miningIntervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // Función para cambiar dificultad con confirmación
  const changeDifficulty = (newDifficulty) => {
    const difficultyNames = {
      1: 'Muy Fácil (1 cero)',
      2: 'Fácil (2 ceros)',
      3: 'Normal (3 ceros)',
      4: 'Difícil (4 ceros)',
      5: 'Muy Difícil (5 ceros)',
      6: 'Extremo (6 ceros)'
    };

    const estimatedTime = {
      1: '< 1 segundo',
      2: '1-3 segundos',
      3: '5-15 segundos',
      4: '30-60 segundos',
      5: '2-5 minutos',
      6: '10+ minutos'
    };

    Swal.fire({
      title: `🎯 Cambiar Dificultad`,
      html: `
        <div style="text-align: left;">
          <p><strong>Nueva dificultad:</strong> ${difficultyNames[newDifficulty]}</p>
          <p><strong>Tiempo estimado:</strong> ${estimatedTime[newDifficulty]}</p>
          <p style="color: #666; font-size: 0.9em;">
            ${newDifficulty >= 5 ? '⚠️ Esta dificultad puede tomar mucho tiempo' : '✅ Dificultad recomendada para pruebas'}
          </p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Cambiar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: colors.primary,
      background: colors.cardBackground,
      color: colors.text
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: ACTION_TYPES.UPDATE_DIFFICULTY,
          payload: { difficulty: newDifficulty }
        });

        Swal.fire({
          title: '✅ Dificultad Actualizada',
          text: `Nueva dificultad: ${difficultyNames[newDifficulty]}`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: colors.cardBackground,
          color: colors.text
        });
      }
    });
  };

  // Función para calcular hash simple (simulación de SHA-256)
  const calculateHash = async (index, previousHash, data, timestamp, nonce) => {
    const input = `${index}${previousHash}${data}${timestamp}${nonce}`;
    
    // Simulación de hash usando una función simple
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Convertir a hexadecimal y agregar ceros al inicio para simular difficulty
    return Math.abs(hash).toString(16).padStart(64, '0');
  };

  // Verificar si el hash cumple con la dificultad
  const isValidHash = (hash, difficulty) => {
    const target = "0".repeat(difficulty);
    return hash.substring(0, difficulty) === target;
  };

  // Proceso de minería
  const mineBlock = async () => {
    if (isMining) {
      stopMining();
      return;
    }

    const difficulty = state.mining.difficulty;

    // Mostrar advertencia para dificultades altas
    if (difficulty >= 5) {
      const result = await Swal.fire({
        title: '⚠️ Dificultad Alta Detectada',
        html: `
          <div style="text-align: left;">
            <p>Has seleccionado una dificultad de <strong>${difficulty} ceros</strong>.</p>
            <p><strong>Tiempo estimado:</strong> ${difficulty === 5 ? '2-5 minutos' : '10+ minutos'}</p>
            <p style="color: #dc3545;">⏰ Este proceso puede tomar mucho tiempo y recursos de CPU.</p>
          </div>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Continuar de todos modos',
        cancelButtonText: 'Reducir dificultad',
        confirmButtonColor: '#dc3545',
        cancelButtonColor: colors.primary,
        background: colors.cardBackground,
        color: colors.text
      });

      if (!result.isConfirmed) {
        return; // Cancelar la minería
      }
    }

    setIsMining(true);
    setCurrentNonce(0);
    setElapsedTime(0);
    setFoundHash('');
    startTimeRef.current = Date.now();

    const target = "0".repeat(difficulty);
    setTargetHash(target);

    const newBlockIndex = state.blockchain.blocks.length;
    const previousHash = state.blockchain.lastBlockHash;
    const data = `Transacción minada por ${state.user.username || 'Usuario'} - ${new Date().toLocaleString()}`;
    const timestamp = Date.now();

    let nonce = 0;
    let hash = '';
    let attempts = 0;

    miningIntervalRef.current = setInterval(async () => {
      // Incrementar nonce y intentar hash
      for (let i = 0; i < 1000; i++) { // Procesar 1000 intentos por intervalo
        nonce++;
        attempts++;
        
        hash = await calculateHash(newBlockIndex, previousHash, data, timestamp, nonce);
        
        if (isValidHash(hash, difficulty)) {
          // ¡Bloque minado exitosamente!
          clearInterval(miningIntervalRef.current);
          
          const newBlock = {
            index: newBlockIndex,
            hash: hash,
            previousHash: previousHash,
            data: data,
            timestamp: new Date(timestamp).toISOString(),
            nonce: nonce,
            difficulty: difficulty
          };

          // Agregar bloque a la blockchain
          dispatch({
            type: ACTION_TYPES.ADD_BLOCK,
            payload: { block: newBlock }
          });

          // Agregar recompensa
          dispatch({
            type: ACTION_TYPES.ADD_MINING_REWARD,
            payload: {
              reward: state.mining.reward,
              blockHash: hash
            }
          });

          setFoundHash(hash);
          setIsMining(false);
          
          // Mostrar notificación de éxito con SweetAlert2
          Swal.fire({
            title: '🎉 ¡Bloque Minado Exitosamente!',
            html: `
              <div style="text-align: left; font-size: 14px;">
                <p><strong>�️ Hash:</strong> <code style="font-size: 12px;">${hash.substring(0, 32)}...</code></p>
                <p><strong>⛏️ Nonce:</strong> ${nonce.toLocaleString()}</p>
                <p><strong>💰 Recompensa:</strong> ${state.mining.reward} puntos</p>
                <p><strong>⏱️ Tiempo:</strong> ${Math.round((Date.now() - startTimeRef.current) / 1000)}s</p>
                <p><strong>📊 Hash Rate:</strong> ${Math.round(nonce / ((Date.now() - startTimeRef.current) / 1000)).toLocaleString()} H/s</p>
              </div>
            `,
            icon: 'success',
            confirmButtonText: 'Continuar',
            confirmButtonColor: colors.primary,
            background: colors.cardBackground,
            color: colors.text,
            showClass: {
              popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
              popup: 'animate__animated animate__bounceOut'
            }
          });
          
          return;
        }
      }

      // Actualizar estadísticas
      setCurrentNonce(nonce);
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      setElapsedTime(elapsed);
      setHashRate(Math.round(attempts / elapsed));

    }, 10); // Actualizar cada 10ms
  };

  const stopMining = () => {
    if (miningIntervalRef.current) {
      clearInterval(miningIntervalRef.current);
      miningIntervalRef.current = null;
    }
    setIsMining(false);
  };

  useEffect(() => {
    return () => {
      if (miningIntervalRef.current) {
        clearInterval(miningIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="container py-4">
      <div 
        className="card border-0 shadow-lg"
        style={{
          backgroundColor: colors.cardBackground,
          borderRadius: '20px'
        }}
      >
        <div className="card-header border-0 text-center" style={{ backgroundColor: 'transparent' }}>
          <h3 style={{ color: colors.primary, marginBottom: '0.5rem' }}>
            ⛏️ Simulador de Minería
          </h3>
          <p style={{ color: colors.textMuted, marginBottom: 0 }}>
            Simula el proceso de minería con Proof of Work
          </p>
        </div>

        <div className="card-body p-4">
          {/* Estadísticas de minería */}
          <div className="row mb-4">
            <div className="col-md-3 text-center mb-3">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
              <h5 style={{ color: colors.primary }}>Dificultad</h5>
              
              {/* Control editable de dificultad */}
              <div className="d-flex justify-content-center align-items-center mb-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => changeDifficulty(state.mining.difficulty - 1)}
                  disabled={isMining || state.mining.difficulty <= 1}
                  style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                >
                  -
                </button>
                <span 
                  className="badge fs-6 mx-2"
                  style={{ 
                    backgroundColor: colors.warning,
                    color: '#fff',
                    padding: '0.5rem 1rem' 
                  }}
                >
                  {state.mining.difficulty} ceros
                </span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => changeDifficulty(state.mining.difficulty + 1)}
                  disabled={isMining || state.mining.difficulty >= 6}
                  style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                >
                  +
                </button>
              </div>
              
              <div style={{ color: colors.textMuted, fontSize: '0.8rem', marginTop: '0.25rem' }}>
                Target: {targetHash && `${targetHash}...`}
              </div>
              <div style={{ color: colors.textMuted, fontSize: '0.7rem', marginTop: '0.25rem' }}>
                Rango: 1-6 ceros
                <button
                  className="btn btn-link p-0 ms-1"
                  style={{ fontSize: '0.7rem', color: colors.primary }}
                  onClick={() => {
                    Swal.fire({
                      title: '📚 Información de Dificultad',
                      html: `
                        <div style="text-align: left; font-size: 14px;">
                          <h6 style="color: #28a745;">🟢 Niveles de Dificultad:</h6>
                          <ul style="list-style: none; padding: 0;">
                            <li><strong>1 cero:</strong> Muy Fácil (< 1 seg)</li>
                            <li><strong>2 ceros:</strong> Fácil (1-3 seg)</li>
                            <li><strong>3 ceros:</strong> Normal (5-15 seg)</li>
                            <li><strong>4 ceros:</strong> Difícil (30-60 seg)</li>
                            <li><strong>5 ceros:</strong> Muy Difícil (2-5 min)</li>
                            <li><strong>6 ceros:</strong> Extremo (10+ min)</li>
                          </ul>
                          <hr>
                          <p><strong>📝 Explicación:</strong> La dificultad determina cuántos ceros debe tener el hash al inicio. Más ceros = más intentos necesarios.</p>
                        </div>
                      `,
                      icon: 'info',
                      confirmButtonText: 'Entendido',
                      confirmButtonColor: colors.primary,
                      background: colors.cardBackground,
                      color: colors.text
                    });
                  }}
                >
                  ℹ️
                </button>
              </div>
            </div>

            <div className="col-md-3 text-center mb-3">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔢</div>
              <h5 style={{ color: colors.primary }}>Nonce Actual</h5>
              <div style={{ color: colors.text, fontSize: '1.5rem', fontWeight: 'bold' }}>
                {currentNonce.toLocaleString()}
              </div>
            </div>

            <div className="col-md-3 text-center mb-3">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
              <h5 style={{ color: colors.primary }}>Hash Rate</h5>
              <div style={{ color: colors.success, fontSize: '1.2rem', fontWeight: 'bold' }}>
                {hashRate.toLocaleString()} H/s
              </div>
            </div>

            <div className="col-md-3 text-center mb-3">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏱️</div>
              <h5 style={{ color: colors.primary }}>Tiempo</h5>
              <div style={{ color: colors.text, fontSize: '1.2rem' }}>
                {Math.floor(elapsedTime)}s
              </div>
            </div>
          </div>

          {/* Hash encontrado */}
          {foundHash && (
            <div className="mb-4">
              <div 
                className="alert alert-success"
                style={{
                  backgroundColor: colors.success + '20',
                  borderColor: colors.success,
                  color: colors.success,
                  borderRadius: '15px'
                }}
              >
                <h6><strong>🎉 ¡Bloque Minado Exitosamente!</strong></h6>
                <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', wordBreak: 'break-all' }}>
                  <strong>Hash:</strong> {foundHash}
                </div>
              </div>
            </div>
          )}

          {/* Barra de progreso visual */}
          {isMining && (
            <div className="mb-4">
              <div style={{ color: colors.text, marginBottom: '0.5rem' }}>
                <small>Buscando hash válido...</small>
              </div>
              <div 
                className="progress"
                style={{ 
                  height: '8px',
                  backgroundColor: colors.border,
                  borderRadius: '10px'
                }}
              >
                <div 
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  style={{ 
                    backgroundColor: colors.primary,
                    width: '100%' 
                  }}
                />
              </div>
            </div>
          )}

          {/* Controles */}
          <div className="text-center">
            <button
              className={`btn btn-lg px-5 py-3 ${isMining ? 'btn-danger' : 'btn-primary'}`}
              onClick={mineBlock}
              style={{
                backgroundColor: isMining ? colors.danger : colors.primary,
                borderColor: isMining ? colors.danger : colors.primary,
                borderRadius: '15px',
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              {isMining ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Detener Minería
                </>
              ) : (
                <>
                  ⛏️ Iniciar Minería
                </>
              )}
            </button>

            <div style={{ color: colors.textMuted, fontSize: '0.9rem', marginTop: '1rem' }}>
              Recompensa por bloque: <strong style={{ color: colors.success }}>
                {state.mining.reward} puntos
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiningSimulator;
