import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import RealMiningSimulator from '../../components/RealMiningSimulator';

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
            ⛏️ Centro de Minería Real
          </h1>
          <p style={{ color: colors.textMuted, fontSize: '1.1rem' }}>
            Minería auténtica con SHA-256 que consume recursos reales de CPU
          </p>
          <div 
            className="alert alert-warning"
            style={{
              backgroundColor: '#fff3cd',
              borderColor: '#ffecb5',
              color: '#856404',
              borderRadius: '10px',
              display: 'inline-block',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem'
            }}
          >
            ⚠️ <strong>Advertencia:</strong> Esta función consume recursos reales de CPU
          </div>
        </div>

        {/* Minería Real */}
        <RealMiningSimulator />

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
                  🎯 ¿Qué es la Minería Real?
                </h5>
                <p style={{ color: colors.text, lineHeight: '1.6' }}>
                  Esta implementación usa el algoritmo SHA-256 auténtico y consume 
                  recursos reales de CPU. Los mineros compiten para resolver un problema 
                  criptográfico computacionalmente intensivo usando múltiples Workers 
                  para aprovechar todos los núcleos del procesador.
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
                  🔢 SHA-256 Auténtico
                </h5>
                <p style={{ color: colors.text, lineHeight: '1.6' }}>
                  Utilizamos la función hash criptográfica SHA-256 real (la misma que 
                  Bitcoin) con 1000 iteraciones por intento para simular la intensidad 
                  computacional real. Esto consume verdaderos recursos de CPU.
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
                  ⚡ Procesamiento Multi-Core
                </h5>
                <p style={{ color: colors.text, lineHeight: '1.6' }}>
                  La aplicación detecta automáticamente el número de núcleos de tu CPU 
                  y lanza múltiples Workers para utilizar toda la potencia disponible. 
                  Esto maximiza el hash rate pero también el consumo de recursos.
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
                  🏆 Recompensas & Rendimiento
                </h5>
                <p style={{ color: colors.text, lineHeight: '1.6' }}>
                  Cada bloque minado exitosamente otorga puntos como recompensa. El tiempo 
                  de minería depende de tu CPU, la dificultad seleccionada y un factor de 
                  suerte. ¡CPU más potente = mayor hash rate!
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
