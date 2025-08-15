import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { SectionTitle } from '../../components/SectionTitle';
import ValidationAlert from '../../components/ValidationAlert';
import { Button } from '../../components/Button';

const AuditPage = () => {
  const { colors } = useTheme();
  const { state, actions } = useApp();
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditResults, setAuditResults] = useState(null);

  // Simular proceso de auditoría
  const performAudit = async () => {
    setIsAuditing(true);
    setAuditProgress(0);
    setAuditResults(null);

    // Simular progreso de auditoría
    const progressInterval = setInterval(() => {
      setAuditProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simular tiempo de procesamiento
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Simular resultados de auditoría
    const mockResults = {
      totalBlocks: state.blockchain.blocks.length || 5,
      validBlocks: state.blockchain.blocks.length || 4,
      invalidBlocks: 1,
      corruptedHashes: ['0x123...abc', '0x456...def'],
      integrityScore: 85,
      lastAuditDate: new Date().toISOString(),
      issues: [
        {
          type: 'warning',
          message: 'Bloque #3 tiene un hash inconsistente',
          blockIndex: 3,
          severity: 'medium'
        },
        {
          type: 'error',
          message: 'Bloque #5 falla la validación de firma',
          blockIndex: 5,
          severity: 'high'
        }
      ],
      recommendations: [
        'Verificar la integridad de los bloques corruptos',
        'Considerar regenerar la cadena desde el último punto válido',
        'Implementar checksums adicionales para futura validación'
      ]
    };

    clearInterval(progressInterval);
    setAuditProgress(100);
    setAuditResults(mockResults);
    setIsAuditing(false);

    // Actualizar estado global
    actions.completeAudit(
      mockResults,
      mockResults.integrityScore >= 80 ? 'valid' : 'invalid',
      mockResults.issues
    );
  };

  const getStatusColor = (score) => {
    if (score >= 90) return colors.success;
    if (score >= 70) return colors.warning;
    return colors.danger;
  };

  const getStatusText = (score) => {
    if (score >= 90) return 'Excelente';
    if (score >= 70) return 'Aceptable';
    return 'Crítico';
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: colors.background }}>
      <div className="container-fluid p-4">
        {/* Header */}
        <div className="text-center mb-4">
          <SectionTitle 
            title="Auditoría de Blockchain" 
            subtitle="Verifica la integridad y validez de toda la cadena de bloques"
            icon="🔍"
          />
        </div>

        {/* Audit Controls */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8">
            <div 
              className="card border-0 shadow-sm"
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: '20px'
              }}
            >
              <div className="card-body p-4 text-center">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {isAuditing ? '🔄' : '🔍'}
                </div>
                
                <h5 style={{ color: colors.text, marginBottom: '1rem' }}>
                  {isAuditing ? 'Auditando Blockchain...' : 'Iniciar Auditoría Completa'}
                </h5>
                
                <p style={{ color: colors.textMuted, marginBottom: '1.5rem' }}>
                  {isAuditing ? 
                    'Verificando la integridad de todos los bloques en la cadena' :
                    'Analiza todos los bloques, verifica hashes y detecta inconsistencias'
                  }
                </p>

                {/* Progress Bar */}
                {isAuditing && (
                  <div className="mb-3">
                    <div 
                      className="progress"
                      style={{
                        height: '10px',
                        borderRadius: '5px',
                        backgroundColor: colors.border
                      }}
                    >
                      <div
                        className="progress-bar"
                        style={{
                          width: `${auditProgress}%`,
                          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '5px',
                          transition: 'width 0.3s ease'
                        }}
                      ></div>
                    </div>
                    <small style={{ color: colors.textMuted, marginTop: '0.5rem' }}>
                      Progreso: {Math.round(auditProgress)}%
                    </small>
                  </div>
                )}

                <Button
                  variant="primary"
                  onClick={performAudit}
                  disabled={isAuditing}
                  className="px-4"
                >
                  {isAuditing ? 'Auditando...' : 'Iniciar Auditoría'}
                </Button>

                {state.audit.lastAuditDate && (
                  <div className="mt-3">
                    <small style={{ color: colors.textMuted }}>
                      Última auditoría: {new Date(state.audit.lastAuditDate).toLocaleString()}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Audit Results */}
        {auditResults && (
          <>
            {/* Overview Cards */}
            <div className="row mb-4">
              <div className="col-lg-3 col-md-6 mb-3">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: '15px'
                  }}
                >
                  <div className="card-body text-center p-3">
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                    <h4 style={{ color: getStatusColor(auditResults.integrityScore) }}>
                      {auditResults.integrityScore}%
                    </h4>
                    <p style={{ color: colors.textMuted, marginBottom: 0 }}>
                      Puntuación de Integridad
                    </p>
                    <small style={{ color: getStatusColor(auditResults.integrityScore) }}>
                      {getStatusText(auditResults.integrityScore)}
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-3">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: '15px'
                  }}
                >
                  <div className="card-body text-center p-3">
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                    <h4 style={{ color: colors.success }}>
                      {auditResults.validBlocks}
                    </h4>
                    <p style={{ color: colors.textMuted, marginBottom: 0 }}>
                      Bloques Válidos
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-3">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: '15px'
                  }}
                >
                  <div className="card-body text-center p-3">
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>❌</div>
                    <h4 style={{ color: colors.danger }}>
                      {auditResults.invalidBlocks}
                    </h4>
                    <p style={{ color: colors.textMuted, marginBottom: 0 }}>
                      Bloques Inválidos
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-3">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: '15px'
                  }}
                >
                  <div className="card-body text-center p-3">
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
                    <h4 style={{ color: colors.primary }}>
                      {auditResults.totalBlocks}
                    </h4>
                    <p style={{ color: colors.textMuted, marginBottom: 0 }}>
                      Total de Bloques
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Issues Found */}
            {auditResults.issues.length > 0 && (
              <div className="row mb-4">
                <div className="col-12">
                  <div 
                    className="card border-0 shadow-sm"
                    style={{
                      backgroundColor: colors.cardBackground,
                      borderRadius: '20px'
                    }}
                  >
                    <div className="card-header border-0" style={{ backgroundColor: 'transparent' }}>
                      <h5 style={{ color: colors.text, marginBottom: 0 }}>
                        ⚠️ Problemas Detectados
                      </h5>
                    </div>
                    <div className="card-body p-0">
                      {auditResults.issues.map((issue, index) => (
                        <div key={index} className="px-4 py-3 border-bottom">
                          <ValidationAlert
                            type={issue.type}
                            message={issue.message}
                            className="mb-0"
                          />
                          <small style={{ color: colors.textMuted }}>
                            Bloque #{issue.blockIndex} - Severidad: {issue.severity}
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {auditResults.recommendations.length > 0 && (
              <div className="row mb-4">
                <div className="col-12">
                  <div 
                    className="card border-0 shadow-sm"
                    style={{
                      backgroundColor: colors.cardBackground,
                      borderRadius: '20px'
                    }}
                  >
                    <div className="card-header border-0" style={{ backgroundColor: 'transparent' }}>
                      <h5 style={{ color: colors.text, marginBottom: 0 }}>
                        💡 Recomendaciones
                      </h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled mb-0">
                        {auditResults.recommendations.map((recommendation, index) => (
                          <li key={index} className="mb-2">
                            <div className="d-flex align-items-start">
                              <span style={{ color: colors.primary, marginRight: '0.5rem' }}>
                                •
                              </span>
                              <span style={{ color: colors.text }}>
                                {recommendation}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export { AuditPage };
