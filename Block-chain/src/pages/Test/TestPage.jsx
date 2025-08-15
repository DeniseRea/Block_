import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAppContext } from '../../context/AppContext';

const TestPage = () => {
  const { colors } = useTheme();
  
  // Comentamos temporalmente para evitar errores
  // const { state } = useAppContext();

  return (
    <div 
      style={{ 
        backgroundColor: colors.background,
        minHeight: '100vh',
        padding: '2rem'
      }}
    >
      <div className="container text-center">
        <h1 style={{ color: colors.primary }}>
          🎉 ¡Funcionalidad Implementada!
        </h1>
        <p style={{ color: colors.text, fontSize: '1.2rem' }}>
          Las páginas de blockchain están funcionando correctamente
        </p>
        
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
                <h3 style={{ color: colors.primary }}>🔗 Explorador de Bloques</h3>
                <p style={{ color: colors.text }}>
                  Visualiza la cadena de bloques completa con hashes, timestamps y más información detallada.
                </p>
                <small style={{ color: colors.textMuted }}>
                  Accede desde la navegación lateral
                </small>
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
                <h3 style={{ color: colors.primary }}>⛏️ Centro de Minería</h3>
                <p style={{ color: colors.text }}>
                  Aprende sobre minería de criptomonedas y los conceptos de Proof of Work.
                </p>
                <small style={{ color: colors.textMuted }}>
                  Simulador completo próximamente
                </small>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-5">
          <h4 style={{ color: colors.primary }}>🚀 Próximas funcionalidades:</h4>
          <div className="row mt-3">
            <div className="col-md-4">
              <div className="p-3" style={{ backgroundColor: colors.border, borderRadius: '10px' }}>
                <h6 style={{ color: colors.text }}>✅ Simulador de Minería Real</h6>
                <small style={{ color: colors.textMuted }}>Con Proof of Work funcional</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3" style={{ backgroundColor: colors.border, borderRadius: '10px' }}>
                <h6 style={{ color: colors.text }}>✅ Validador de Blockchain</h6>
                <small style={{ color: colors.textMuted }}>Verificación de integridad</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3" style={{ backgroundColor: colors.border, borderRadius: '10px' }}>
                <h6 style={{ color: colors.text }}>✅ Sistema de Recompensas</h6>
                <small style={{ color: colors.textMuted }}>Puntos por minería exitosa</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;


