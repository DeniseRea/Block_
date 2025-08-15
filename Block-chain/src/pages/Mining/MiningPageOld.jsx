import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import MiningSimulator from '../../components/MiningSimulator';

const MiningPage = () => {
  const { colors } = useTheme();

  return (
    <div 
      style={{ 
        backgroundColor: colors.background,
        minHeight: '100vh',
        paddingTop: '2rem'
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold" style={{ color: colors.primary }}>
            ⛏️ Centro de Minería
          </h1>
          <p style={{ color: colors.textMuted, fontSize: '1.1rem' }}>
            Simula el proceso de minería de bloques con Proof of Work
          </p>
        </div>

        {/* Simulador de Minería */}
        <MiningSimulator />
          </div>
        </div>

        {/* Información educativa */}
        <div className="row mt-5">
          <div className="col-md-6">
            <div 
              className="card border-0 shadow-sm"
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: '15px'
              }}
            >
              <div className="card-body p-4">
                <h5 style={{ color: colors.primary }}>
                  🎯 ¿Qué es la Minería?
                </h5>
                <p style={{ color: colors.text, lineHeight: '1.6' }}>
                  La minería es el proceso de validar transacciones y crear nuevos bloques 
                  en la blockchain. Los mineros compiten para resolver un problema 
                  criptográfico (Proof of Work) y el primero en encontrar la solución 
                  recibe una recompensa.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div 
              className="card border-0 shadow-sm"
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: '15px'
              }}
            >
              <div className="card-body p-4">
                <h5 style={{ color: colors.primary }}>
                  🔢 Proof of Work
                </h5>
                <p style={{ color: colors.text, lineHeight: '1.6' }}>
                  El minero debe encontrar un número (nonce) que, al ser incluido en 
                  el bloque y procesado con una función hash, produzca un resultado 
                  que comience con un número específico de ceros (dificultad).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 mb-5">
          <div className="col-md-6">
            <div 
              className="card border-0 shadow-sm"
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: '15px'
              }}
            >
              <div className="card-body p-4">
                <h5 style={{ color: colors.primary }}>
                  ⚡ Dificultad
                </h5>
                <p style={{ color: colors.text, lineHeight: '1.6' }}>
                  La dificultad determina qué tan difícil es encontrar un hash válido. 
                  Más ceros requeridos = mayor dificultad = más tiempo de procesamiento.
                  La dificultad actual es de <strong>4 ceros</strong>.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div 
              className="card border-0 shadow-sm"
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: '15px'
              }}
            >
              <div className="card-body p-4">
                <h5 style={{ color: colors.primary }}>
                  🏆 Recompensas
                </h5>
                <p style={{ color: colors.text, lineHeight: '1.6' }}>
                  Cada bloque minado exitosamente otorga <strong>50 puntos</strong>. 
                  Estos puntos representan las criptomonedas que recibiría un minero 
                  real por su trabajo computacional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiningPage;


