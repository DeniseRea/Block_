import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';

const RealMiningSimulator = () => {
  const { colors } = useTheme();
  const { state, dispatch, ACTION_TYPES } = useAppContext();
  const [isMining, setIsMining] = useState(false);
  const [currentNonce, setCurrentNonce] = useState(0);
  const [hashRate, setHashRate] = useState(0);
  const [targetHash, setTargetHash] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [foundHash, setFoundHash] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(0);
  
  const miningWorkerRef = useRef(null);
  const startTimeRef = useRef(null);
  const statsIntervalRef = useRef(null);

  // Función para cambiar dificultad con confirmación
  const changeDifficulty = (newDifficulty) => {
    const difficultyNames = {
      1: 'Muy Fácil (1 cero)',
      2: 'Fácil (2 ceros)',
      3: 'Normal (3 ceros)',
      4: 'Difícil (4 ceros)',
      5: 'Muy Difícil (5 ceros)',
      6: 'Extremo (6 ceros)',
      7: 'Insano (7 ceros)',
      8: 'Imposible (8 ceros)'
    };

    const estimatedTime = {
      1: '< 1 segundo',
      2: '1-5 segundos',
      3: '10-30 segundos',
      4: '1-3 minutos',
      5: '5-15 minutos',
      6: '30-60 minutos',
      7: '2-6 horas',
      8: '12+ horas'
    };

    Swal.fire({
      title: `🎯 Cambiar Dificultad`,
      html: `
        <div style="text-align: left;">
          <p><strong>Nueva dificultad:</strong> ${difficultyNames[newDifficulty]}</p>
          <p><strong>Tiempo estimado:</strong> ${estimatedTime[newDifficulty]}</p>
          <p style="color: ${newDifficulty >= 6 ? '#dc3545' : '#28a745'}; font-size: 0.9em;">
            ${newDifficulty >= 6 ? '⚠️ Esta dificultad consumirá muchos recursos' : '✅ Dificultad recomendada para pruebas'}
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

  // Función SHA-256 real con mayor intensidad computacional
  const calculateRealHash = (data, nonce) => {
    const input = `${data}${nonce}`;
    
    // Múltiples iteraciones de SHA-256 para aumentar la carga computacional
    let hash = input;
    for (let i = 0; i < 1000; i++) {
      hash = CryptoJS.SHA256(hash + i.toString()).toString();
    }
    
    return hash;
  };

  // Verificar si el hash cumple con la dificultad
  const isValidHash = (hash, difficulty) => {
    return hash.startsWith('0'.repeat(difficulty));
  };

  // Worker para minería intensiva en CPU
  const createMiningWorker = () => {
    const workerCode = `
      // Importar crypto-js en el worker
      importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js');
      
      self.onmessage = function(e) {
        const { data, difficulty, startNonce, batchSize } = e.data;
        let nonce = startNonce;
        let hash = '';
        let attempts = 0;
        
        const startTime = Date.now();
        
        for (let i = 0; i < batchSize; i++) {
          nonce++;
          attempts++;
          
          // Múltiples iteraciones SHA-256 para carga real
          const input = data + nonce;
          hash = input;
          for (let j = 0; j < 1000; j++) {
            hash = CryptoJS.SHA256(hash + j.toString()).toString();
          }
          
          // Verificar si encontramos un hash válido
          if (hash.startsWith('0'.repeat(difficulty))) {
            self.postMessage({
              type: 'found',
              hash: hash,
              nonce: nonce,
              attempts: attempts,
              time: Date.now() - startTime
            });
            return;
          }
          
          // Reportar progreso cada 100 intentos
          if (attempts % 100 === 0) {
            self.postMessage({
              type: 'progress',
              nonce: nonce,
              attempts: attempts,
              time: Date.now() - startTime
            });
          }
        }
        
        // Si no encontramos nada, reportar progreso
        self.postMessage({
          type: 'progress',
          nonce: nonce,
          attempts: attempts,
          time: Date.now() - startTime
        });
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
  };

  // Proceso de minería real
  const startRealMining = async () => {
    if (isMining) {
      stopMining();
      return;
    }

    const difficulty = state.mining.difficulty;

    // Mostrar advertencia para dificultades altas
    if (difficulty >= 5) {
      const result = await Swal.fire({
        title: '⚠️ Minería Real - Dificultad Alta',
        html: `
          <div style="text-align: left;">
            <p>Has seleccionado una dificultad de <strong>${difficulty} ceros</strong>.</p>
            <p><strong>⚡ Esto consumirá recursos reales de CPU</strong></p>
            <p><strong>Tiempo estimado:</strong> ${difficulty === 5 ? '5-15 minutos' : difficulty === 6 ? '30-60 minutos' : '2+ horas'}</p>
            <p style="color: #dc3545;">🔥 Tu CPU trabajará al máximo y puede calentarse.</p>
            <p style="color: #ffc107;">💡 Recomendamos cerrar otras aplicaciones pesadas.</p>
          </div>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Iniciar Minería Real',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#dc3545',
        cancelButtonColor: colors.primary,
        background: colors.cardBackground,
        color: colors.text
      });

      if (!result.isConfirmed) {
        return;
      }
    }

    setIsMining(true);
    setCurrentNonce(0);
    setElapsedTime(0);
    setFoundHash('');
    setAttempts(0);
    startTimeRef.current = Date.now();

    const target = "0".repeat(difficulty);
    setTargetHash(target);

    const newBlockIndex = state.blockchain.blocks.length;
    const previousHash = state.blockchain.lastBlockHash;
    const blockData = {
      index: newBlockIndex,
      previousHash: previousHash,
      timestamp: Date.now(),
      data: `Bloque minado por ${state.user.username || 'Usuario'} - ${new Date().toLocaleString()}`
    };
    const dataString = JSON.stringify(blockData);

    // Crear múltiples workers para usar todos los núcleos de CPU
    const numWorkers = navigator.hardwareConcurrency || 4;
    const workers = [];
    let currentNonceBase = 0;
    const batchSize = 10000;

    for (let i = 0; i < numWorkers; i++) {
      const worker = createMiningWorker();
      workers.push(worker);

      worker.onmessage = (e) => {
        const { type, hash, nonce, attempts: workerAttempts, time } = e.data;

        if (type === 'found') {
          // ¡Hash encontrado!
          workers.forEach(w => w.terminate());
          
          const newBlock = {
            ...blockData,
            hash: hash,
            nonce: nonce,
            difficulty: difficulty
          };

          dispatch({
            type: ACTION_TYPES.ADD_BLOCK,
            payload: { block: newBlock }
          });

          dispatch({
            type: ACTION_TYPES.ADD_MINING_REWARD,
            payload: {
              reward: state.mining.reward,
              blockHash: hash
            }
          });

          setFoundHash(hash);
          setCurrentNonce(nonce);
          setIsMining(false);

          // Mostrar resultado con SweetAlert2
          Swal.fire({
            title: '🎉 ¡Bloque Minado Exitosamente!',
            html: `
              <div style="text-align: left; font-size: 14px;">
                <p><strong>🏷️ Hash:</strong><br><code style="font-size: 10px; word-break: break-all;">${hash}</code></p>
                <p><strong>⛏️ Nonce:</strong> ${nonce.toLocaleString()}</p>
                <p><strong>💰 Recompensa:</strong> ${state.mining.reward} puntos</p>
                <p><strong>⏱️ Tiempo total:</strong> ${Math.round(time / 1000)}s</p>
                <p><strong>📊 Hash Rate promedio:</strong> ${Math.round(workerAttempts / (time / 1000)).toLocaleString()} H/s</p>
                <p><strong>🔥 Intentos totales:</strong> ${workerAttempts.toLocaleString()}</p>
                <p><strong>💻 Workers utilizados:</strong> ${numWorkers}</p>
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

        if (type === 'progress') {
          setCurrentNonce(nonce);
          setAttempts(prev => prev + workerAttempts);
          const elapsed = (Date.now() - startTimeRef.current) / 1000;
          setElapsedTime(elapsed);
          if (elapsed > 0) {
            setHashRate(Math.round(workerAttempts / elapsed));
          }
        }
      };

      // Iniciar worker
      worker.postMessage({
        data: dataString,
        difficulty: difficulty,
        startNonce: currentNonceBase + (i * batchSize),
        batchSize: batchSize
      });

      currentNonceBase += numWorkers * batchSize;
    }

    // Actualizar estadísticas cada segundo
    statsIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      setElapsedTime(elapsed);

      // Simular uso de CPU basado en el número de workers activos
      setCpuUsage(Math.min(95, 70 + Math.random() * 25));

      // Reiniciar workers si aún no encontramos nada
      if (isMining && elapsed > 10) { // Cada 10 segundos
        workers.forEach((worker, index) => {
          worker.postMessage({
            data: dataString,
            difficulty: difficulty,
            startNonce: currentNonceBase + (index * batchSize),
            batchSize: batchSize
          });
        });
        currentNonceBase += numWorkers * batchSize;
      }
    }, 1000);

    miningWorkerRef.current = workers;
  };

  const stopMining = () => {
    if (miningWorkerRef.current) {
      miningWorkerRef.current.forEach(worker => worker.terminate());
      miningWorkerRef.current = null;
    }
    if (statsIntervalRef.current) {
      clearInterval(statsIntervalRef.current);
      statsIntervalRef.current = null;
    }
    setIsMining(false);
    setCpuUsage(0);
  };

  useEffect(() => {
    return () => {
      stopMining();
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
            ⛏️ Minería Real con SHA-256
          </h3>
          <p style={{ color: colors.textMuted, marginBottom: 0 }}>
            Minería real que consume recursos de CPU - Algoritmo SHA-256 auténtico
          </p>
        </div>

        <div className="card-body p-4">
          {/* Estadísticas de minería */}
          <div className="row mb-4">
            <div className="col-md-2 text-center mb-3">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
              <h6 style={{ color: colors.primary }}>Dificultad</h6>
              
              {/* Control editable de dificultad */}
              <div className="d-flex justify-content-center align-items-center mb-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => changeDifficulty(state.mining.difficulty - 1)}
                  disabled={isMining || state.mining.difficulty <= 1}
                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem' }}
                >
                  -
                </button>
                <span 
                  className="badge mx-2"
                  style={{ 
                    backgroundColor: colors.warning,
                    color: '#fff',
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.8rem'
                  }}
                >
                  {state.mining.difficulty}
                </span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => changeDifficulty(state.mining.difficulty + 1)}
                  disabled={isMining || state.mining.difficulty >= 8}
                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem' }}
                >
                  +
                </button>
              </div>
              
              <div style={{ color: colors.textMuted, fontSize: '0.7rem' }}>
                Target: {targetHash.substring(0, 8)}...
              </div>
            </div>

            <div className="col-md-2 text-center mb-3">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔢</div>
              <h6 style={{ color: colors.primary }}>Nonce</h6>
              <div style={{ color: colors.text, fontSize: '1.2rem', fontWeight: 'bold' }}>
                {currentNonce.toLocaleString()}
              </div>
            </div>

            <div className="col-md-2 text-center mb-3">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
              <h6 style={{ color: colors.primary }}>Hash Rate</h6>
              <div style={{ color: colors.success, fontSize: '1rem', fontWeight: 'bold' }}>
                {hashRate.toLocaleString()} H/s
              </div>
            </div>

            <div className="col-md-2 text-center mb-3">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏱️</div>
              <h6 style={{ color: colors.primary }}>Tiempo</h6>
              <div style={{ color: colors.text, fontSize: '1rem' }}>
                {Math.floor(elapsedTime / 60)}:{String(Math.floor(elapsedTime % 60)).padStart(2, '0')}
              </div>
            </div>

            <div className="col-md-2 text-center mb-3">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔥</div>
              <h6 style={{ color: colors.primary }}>Intentos</h6>
              <div style={{ color: colors.warning, fontSize: '1rem', fontWeight: 'bold' }}>
                {attempts.toLocaleString()}
              </div>
            </div>

            <div className="col-md-2 text-center mb-3">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💻</div>
              <h6 style={{ color: colors.primary }}>CPU</h6>
              <div style={{ color: cpuUsage > 80 ? colors.danger : colors.info, fontSize: '1rem', fontWeight: 'bold' }}>
                {cpuUsage.toFixed(1)}%
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
                <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', wordBreak: 'break-all' }}>
                  <strong>Hash:</strong> {foundHash}
                </div>
              </div>
            </div>
          )}

          {/* Barra de progreso y información de CPU */}
          {isMining && (
            <div className="mb-4">
              <div className="row">
                <div className="col-md-8">
                  <div style={{ color: colors.text, marginBottom: '0.5rem' }}>
                    <small>🔍 Buscando hash válido... (Workers: {navigator.hardwareConcurrency || 4})</small>
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
                <div className="col-md-4">
                  <div style={{ color: colors.text, fontSize: '0.8rem' }}>
                    <div>💻 CPU Cores: {navigator.hardwareConcurrency || 4}</div>
                    <div>🔥 Uso CPU: <span style={{ color: cpuUsage > 80 ? colors.danger : colors.success }}>{cpuUsage.toFixed(1)}%</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Controles */}
          <div className="text-center">
            <button
              className={`btn btn-lg px-5 py-3 ${isMining ? 'btn-danger' : 'btn-primary'}`}
              onClick={startRealMining}
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
                  ⏹️ Detener Minería
                </>
              ) : (
                <>
                  ⛏️ Iniciar Minería Real
                </>
              )}
            </button>

            <div style={{ color: colors.textMuted, fontSize: '0.9rem', marginTop: '1rem' }}>
              <div>💰 Recompensa por bloque: <strong style={{ color: colors.success }}>
                {state.mining.reward} puntos
              </strong></div>
              <div>⚠️ <em>Esta minería consume recursos reales de CPU</em></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealMiningSimulator;
