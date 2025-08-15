import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

const BlockchainValidator = () => {
  const { colors } = useTheme();
  const { state } = useAppContext();
  const [validationResult, setValidationResult] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  // Función para calcular hash (mismo algoritmo que en MiningSimulator)
  const calculateHash = async (index, previousHash, data, timestamp, nonce) => {
    const input = `${index}${previousHash}${data}${timestamp}${nonce}`;
    
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    return Math.abs(hash).toString(16).padStart(64, '0');
  };

  // Validar un bloque individual
  const validateBlock = async (block, expectedPreviousHash) => {
    const errors = [];
    
    // Verificar hash anterior
    if (block.previousHash !== expectedPreviousHash) {
      errors.push(`Hash anterior incorrecto: esperado ${expectedPreviousHash}, actual ${block.previousHash}`);
    }
    
    // Recalcular hash del bloque
    const calculatedHash = await calculateHash(
      block.index,
      block.previousHash,
      block.data,
      new Date(block.timestamp).getTime(),
      block.nonce
    );
    
    // Verificar hash del bloque
    if (block.hash !== calculatedHash) {
      errors.push(`Hash del bloque incorrecto: esperado ${calculatedHash}, actual ${block.hash}`);
    }
    
    // Verificar dificultad (hash debe empezar con ceros)
    const requiredZeros = 4; // Dificultad por defecto
    const target = "0".repeat(requiredZeros);
    if (!block.hash.startsWith(target)) {
      errors.push(`Hash no cumple con la dificultad requerida (debe empezar con ${requiredZeros} ceros)`);
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  };

  // Validar toda la blockchain
  const validateBlockchain = async () => {
    setIsValidating(true);
    setValidationResult(null);

    try {
      const blocks = state.blockchain.blocks;
      const results = [];
      let chainValid = true;
      
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const expectedPreviousHash = i === 0 
          ? "0".repeat(64) // Bloque génesis
          : blocks[i - 1].hash;
        
        const blockResult = await validateBlock(block, expectedPreviousHash);
        
        results.push({
          blockIndex: block.index,
          isValid: blockResult.isValid,
          errors: blockResult.errors
        });
        
        if (!blockResult.isValid) {
          chainValid = false;
        }
        
        // Simular tiempo de procesamiento
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      setValidationResult({
        isChainValid: chainValid,
        totalBlocks: blocks.length,
        validBlocks: results.filter(r => r.isValid).length,
        invalidBlocks: results.filter(r => !r.isValid).length,
        blockResults: results,
        timestamp: new Date()
      });
      
    } catch (error) {
      setValidationResult({
        error: 'Error al validar la blockchain: ' + error.message,
        timestamp: new Date()
      });
    }
    
    setIsValidating(false);
  };

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
            🔍 Validador de Blockchain
          </h3>
          <p style={{ color: colors.textMuted, marginBottom: 0 }}>
            Verifica la integridad y validez de toda la cadena de bloques
          </p>
        </div>

        <div className="card-body p-4">
          {/* Información de la blockchain */}
          <div className="row mb-4">
            <div className="col-md-4 text-center">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⛓️</div>
              <h5 style={{ color: colors.primary }}>Total de Bloques</h5>
              <div style={{ color: colors.text, fontSize: '1.5rem', fontWeight: 'bold' }}>
                {state.blockchain.totalBlocks}
              </div>
            </div>
            
            <div className="col-md-4 text-center">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔐</div>
              <h5 style={{ color: colors.primary }}>Estado Actual</h5>
              <span 
                className="badge fs-6"
                style={{ 
                  backgroundColor: state.blockchain.isValid ? colors.success : colors.danger,
                  color: 'white',
                  padding: '0.5rem 1rem'
                }}
              >
                {state.blockchain.isValid ? 'Válida' : 'Inválida'}
              </span>
            </div>
            
            <div className="col-md-4 text-center">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
              <h5 style={{ color: colors.primary }}>Última Validación</h5>
              <div style={{ color: colors.textMuted, fontSize: '0.9rem' }}>
                {state.blockchain.lastValidation 
                  ? new Date(state.blockchain.lastValidation).toLocaleString()
                  : 'Nunca'
                }
              </div>
            </div>
          </div>

          {/* Botón de validación */}
          <div className="text-center mb-4">
            <button
              className="btn btn-primary btn-lg px-5 py-3"
              onClick={validateBlockchain}
              disabled={isValidating}
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.primary,
                borderRadius: '15px',
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              {isValidating ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Validando Blockchain...
                </>
              ) : (
                <>
                  🔍 Iniciar Validación
                </>
              )}
            </button>
          </div>

          {/* Resultados de validación */}
          {validationResult && (
            <div className="mt-4">
              {validationResult.error ? (
                <div 
                  className="alert alert-danger"
                  style={{
                    backgroundColor: colors.danger + '20',
                    borderColor: colors.danger,
                    color: colors.danger,
                    borderRadius: '15px'
                  }}
                >
                  <h6><strong>❌ Error en la Validación</strong></h6>
                  <p>{validationResult.error}</p>
                </div>
              ) : (
                <div>
                  {/* Resumen general */}
                  <div 
                    className={`alert ${validationResult.isChainValid ? 'alert-success' : 'alert-danger'}`}
                    style={{
                      backgroundColor: validationResult.isChainValid 
                        ? colors.success + '20' 
                        : colors.danger + '20',
                      borderColor: validationResult.isChainValid ? colors.success : colors.danger,
                      color: validationResult.isChainValid ? colors.success : colors.danger,
                      borderRadius: '15px'
                    }}
                  >
                    <h6>
                      <strong>
                        {validationResult.isChainValid ? '✅ Blockchain Válida' : '❌ Blockchain Inválida'}
                      </strong>
                    </h6>
                    <p>
                      {validationResult.validBlocks} de {validationResult.totalBlocks} bloques son válidos
                      {validationResult.invalidBlocks > 0 && ` (${validationResult.invalidBlocks} inválidos)`}
                    </p>
                    <small>Validado el {validationResult.timestamp.toLocaleString()}</small>
                  </div>

                  {/* Resultados detallados por bloque */}
                  <div 
                    className="card border-0"
                    style={{
                      backgroundColor: colors.background,
                      borderRadius: '15px'
                    }}
                  >
                    <div className="card-header border-0" style={{ backgroundColor: 'transparent' }}>
                      <h6 style={{ color: colors.text, marginBottom: 0 }}>
                        📋 Resultados Detallados
                      </h6>
                    </div>
                    <div className="card-body p-3">
                      {validationResult.blockResults.map((result, index) => (
                        <div key={index} className="mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span style={{ color: colors.text, fontWeight: 'bold' }}>
                              Bloque #{result.blockIndex}
                            </span>
                            <span 
                              className="badge"
                              style={{ 
                                backgroundColor: result.isValid ? colors.success : colors.danger,
                                color: 'white'
                              }}
                            >
                              {result.isValid ? '✅ Válido' : '❌ Inválido'}
                            </span>
                          </div>
                          {result.errors.length > 0 && (
                            <ul style={{ color: colors.danger, fontSize: '0.9rem', marginBottom: 0 }}>
                              {result.errors.map((error, errorIndex) => (
                                <li key={errorIndex}>{error}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockchainValidator;
