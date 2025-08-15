import React from 'react';
import { useTheme } from '../context/ThemeContext';

const NavigationTest = () => {
  const { colors } = useTheme();

  return (
    <div 
      style={{ 
        backgroundColor: colors.background,
        minHeight: '100vh',
        padding: '2rem'
      }}
    >
      <div className="container">
        <h1 className="text-center mb-5" style={{ color: colors.primary }}>
          🧭 Centro de Navegación - Blockchain App
        </h1>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <div 
              className="card border-0 shadow-lg h-100"
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: '20px'
              }}
            >
              <div className="card-body p-4 text-center">
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔗</div>
                <h3 style={{ color: colors.primary }}>Explorador de Bloques</h3>
                <p style={{ color: colors.text, lineHeight: '1.6' }}>
                  Visualiza la cadena de bloques completa con información detallada 
                  de cada bloque incluyendo hash, timestamp, nonce y más.
                </p>
                <a 
                  href="/blocks" 
                  className="btn btn-primary btn-lg"
                  style={{
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                    borderRadius: '15px'
                  }}
                >
                  Ver Bloques
                </a>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-4">
            <div 
              className="card border-0 shadow-lg h-100"
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: '20px'
              }}
            >
              <div className="card-body p-4 text-center">
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⛏️</div>
                <h3 style={{ color: colors.primary }}>Centro de Minería</h3>
                <p style={{ color: colors.text, lineHeight: '1.6' }}>
                  Aprende sobre minería de criptomonedas, Proof of Work y 
                  simula el proceso de minado de bloques.
                </p>
                <a 
                  href="/mining" 
                  className="btn btn-success btn-lg"
                  style={{
                    backgroundColor: colors.success,
                    borderColor: colors.success,
                    borderRadius: '15px'
                  }}
                >
                  Iniciar Minería
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row mt-4">
          <div className="col-12">
            <div 
              className="card border-0 shadow-sm"
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: '15px'
              }}
            >
              <div className="card-body p-4">
                <h4 style={{ color: colors.primary }}>📋 Funcionalidades Implementadas</h4>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <div className="d-flex align-items-center mb-2">
                      <div style={{ fontSize: '1.5rem', marginRight: '10px' }}>✅</div>
                      <span style={{ color: colors.text }}>Sistema de Bloques</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center mb-2">
                      <div style={{ fontSize: '1.5rem', marginRight: '10px' }}>✅</div>
                      <span style={{ color: colors.text }}>Explorador Visual</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center mb-2">
                      <div style={{ fontSize: '1.5rem', marginRight: '10px' }}>✅</div>
                      <span style={{ color: colors.text }}>Información Educativa</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center mb-2">
                      <div style={{ fontSize: '1.5rem', marginRight: '10px' }}>🚧</div>
                      <span style={{ color: colors.textMuted }}>Simulador de Minería</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center mb-2">
                      <div style={{ fontSize: '1.5rem', marginRight: '10px' }}>🚧</div>
                      <span style={{ color: colors.textMuted }}>Validador de Blockchain</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center mb-2">
                      <div style={{ fontSize: '1.5rem', marginRight: '10px' }}>🚧</div>
                      <span style={{ color: colors.textMuted }}>Sistema de Recompensas</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3" style={{ backgroundColor: colors.background, borderRadius: '10px' }}>
                  <h6 style={{ color: colors.primary }}>🎯 Estado Actual:</h6>
                  <p style={{ color: colors.text, marginBottom: 0 }}>
                    ✅ La aplicación carga correctamente<br/>
                    ✅ Las rutas están configuradas<br/>
                    ✅ Los componentes están funcionales<br/>
                    🔄 Próximo: Integración completa con el contexto global
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationTest;
