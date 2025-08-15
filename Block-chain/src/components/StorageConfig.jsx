/**
 * Componente para gestionar la configuración de almacenamiento y persistencia
 * Permite crear respaldos, restaurar datos, ver estadísticas y optimizar el almacenamiento
 */

import React, { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import usePersistence from '../hooks/usePersistence';
import Swal from 'sweetalert2';

const StorageConfig = () => {
  const { colors } = useTheme();
  const {
    isLoading,
    isInitialized,
    storageStats,
    saveCurrentState,
    createBackup,
    restoreFromBackup,
    clearAllData,
    optimizeStorage,
    updateStorageStats,
    getPersistenceInfo
  } = usePersistence();

  const [activeTab, setActiveTab] = useState('overview');
  const fileInputRef = useRef(null);

  const persistenceInfo = getPersistenceInfo();

  // Formatear tamaño de bytes
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Formatear fecha
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Nunca';
    return new Date(parseInt(timestamp)).toLocaleString('es-ES');
  };

  // Manejar restauración desde archivo
  const handleFileRestore = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await restoreFromBackup(file);
      // Limpiar input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Mostrar información detallada
  const showDetailedStats = async () => {
    await updateStorageStats();
    
    if (!storageStats) return;

    Swal.fire({
      title: '📊 Estadísticas Detalladas',
      html: `
        <div style="text-align: left; padding: 10px;">
          <h5>IndexedDB</h5>
          <p>• Bloques de blockchain: ${storageStats.indexedDB.blockchain}</p>
          <p>• Historial de minería: ${storageStats.indexedDB.miningHistory}</p>
          <p>• Respaldos automáticos: ${storageStats.indexedDB.backups}</p>
          
          <h5 style="margin-top: 20px;">LocalStorage</h5>
          <p>• Espacio utilizado: ${formatBytes(storageStats.localStorage.used)}</p>
          
          <h5 style="margin-top: 20px;">Total</h5>
          <p>• Registros totales: ${storageStats.total.records}</p>
          <p>• Tamaño estimado: ${formatBytes(storageStats.total.size)}</p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'Cerrar',
      width: 500
    });
  };

  if (!isInitialized) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" style={{ color: colors.primary }} role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3" style={{ color: colors.textMuted }}>
          Inicializando sistema de almacenamiento...
        </p>
      </div>
    );
  }

  return (
    <div 
      className="container py-4"
      style={{ 
        backgroundColor: colors.background,
        color: colors.text,
        minHeight: '100vh'
      }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold" style={{ color: colors.primary }}>
          <i className="fas fa-database me-2"></i>
          Configuración de Almacenamiento
        </h2>
        <p style={{ color: colors.textMuted }}>
          Gestiona los datos almacenados, crea respaldos y optimiza el rendimiento
        </p>
      </div>

      {/* Tabs de navegación */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-lg-8">
          <ul className="nav nav-pills justify-content-center">
            {[
              { id: 'overview', label: 'Vista General', icon: 'fas fa-chart-pie' },
              { id: 'backup', label: 'Respaldos', icon: 'fas fa-shield-alt' },
              { id: 'maintenance', label: 'Mantenimiento', icon: 'fas fa-tools' }
            ].map(tab => (
              <li className="nav-item me-2" key={tab.id}>
                <button
                  className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                  style={{
                    backgroundColor: activeTab === tab.id ? colors.primary : 'transparent',
                    color: activeTab === tab.id ? '#ffffff' : colors.text,
                    border: `1px solid ${colors.primary}`,
                    borderRadius: '10px'
                  }}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={`${tab.icon} me-2`}></i>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contenido de las tabs */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          
          {/* Vista General */}
          {activeTab === 'overview' && (
            <div className="row">
              {/* Estado del sistema */}
              <div className="col-md-6 mb-4">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: '15px'
                  }}
                >
                  <div className="card-body p-4">
                    <h5 className="card-title" style={{ color: colors.primary }}>
                      <i className="fas fa-info-circle me-2"></i>
                      Estado del Sistema
                    </h5>
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span style={{ color: colors.textMuted }}>Estado:</span>
                        <span className={`badge ${isInitialized ? 'bg-success' : 'bg-warning'}`}>
                          {isInitialized ? 'Activo' : 'Inicializando'}
                        </span>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span style={{ color: colors.textMuted }}>Versión:</span>
                        <span style={{ color: colors.text }}>{persistenceInfo.version}</span>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span style={{ color: colors.textMuted }}>Última sincronización:</span>
                        <span style={{ color: colors.text, fontSize: '0.9em' }}>
                          {formatDate(persistenceInfo.lastSync)}
                        </span>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <span style={{ color: colors.textMuted }}>Datos almacenados:</span>
                        <span className={`badge ${persistenceInfo.hasData ? 'bg-info' : 'bg-secondary'}`}>
                          {persistenceInfo.hasData ? 'Sí' : 'No'}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      className="btn btn-outline-primary btn-sm w-100"
                      onClick={showDetailedStats}
                      disabled={isLoading}
                    >
                      <i className="fas fa-chart-line me-2"></i>
                      Ver Estadísticas Detalladas
                    </button>
                  </div>
                </div>
              </div>

              {/* Estadísticas rápidas */}
              <div className="col-md-6 mb-4">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: '15px'
                  }}
                >
                  <div className="card-body p-4">
                    <h5 className="card-title" style={{ color: colors.primary }}>
                      <i className="fas fa-chart-bar me-2"></i>
                      Estadísticas Rápidas
                    </h5>
                    
                    {storageStats ? (
                      <div className="row text-center">
                        <div className="col-4">
                          <div className="mb-2">
                            <i className="fas fa-link fa-2x" style={{ color: colors.primary }}></i>
                          </div>
                          <h6 className="mb-1">{storageStats.indexedDB.blockchain}</h6>
                          <small style={{ color: colors.textMuted }}>Bloques</small>
                        </div>
                        <div className="col-4">
                          <div className="mb-2">
                            <i className="fas fa-pickaxe fa-2x" style={{ color: colors.success }}></i>
                          </div>
                          <h6 className="mb-1">{storageStats.indexedDB.miningHistory}</h6>
                          <small style={{ color: colors.textMuted }}>Minarías</small>
                        </div>
                        <div className="col-4">
                          <div className="mb-2">
                            <i className="fas fa-save fa-2x" style={{ color: colors.info }}></i>
                          </div>
                          <h6 className="mb-1">{storageStats.indexedDB.backups}</h6>
                          <small style={{ color: colors.textMuted }}>Respaldos</small>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="spinner-border spinner-border-sm" role="status">
                          <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="mt-2 mb-0" style={{ color: colors.textMuted }}>
                          Cargando estadísticas...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Acciones rápidas */}
              <div className="col-12">
                <div 
                  className="card border-0 shadow-sm"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: '15px'
                  }}
                >
                  <div className="card-body p-4">
                    <h5 className="card-title" style={{ color: colors.primary }}>
                      <i className="fas fa-bolt me-2"></i>
                      Acciones Rápidas
                    </h5>
                    
                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <button
                          className="btn btn-outline-success w-100"
                          onClick={saveCurrentState}
                          disabled={isLoading}
                        >
                          <i className="fas fa-save me-2"></i>
                          Guardar Ahora
                        </button>
                      </div>
                      <div className="col-md-3 mb-3">
                        <button
                          className="btn btn-outline-info w-100"
                          onClick={createBackup}
                          disabled={isLoading}
                        >
                          <i className="fas fa-download me-2"></i>
                          Crear Respaldo
                        </button>
                      </div>
                      <div className="col-md-3 mb-3">
                        <button
                          className="btn btn-outline-warning w-100"
                          onClick={optimizeStorage}
                          disabled={isLoading}
                        >
                          <i className="fas fa-magic me-2"></i>
                          Optimizar
                        </button>
                      </div>
                      <div className="col-md-3 mb-3">
                        <button
                          className="btn btn-outline-primary w-100"
                          onClick={updateStorageStats}
                          disabled={isLoading}
                        >
                          <i className="fas fa-sync-alt me-2"></i>
                          Actualizar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Respaldos */}
          {activeTab === 'backup' && (
            <div className="row">
              <div className="col-md-6 mb-4">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: '15px'
                  }}
                >
                  <div className="card-body p-4">
                    <h5 className="card-title" style={{ color: colors.success }}>
                      <i className="fas fa-download me-2"></i>
                      Crear Respaldo
                    </h5>
                    <p style={{ color: colors.textMuted }}>
                      Descarga una copia de seguridad completa de todos tus datos, 
                      incluyendo blockchain, historial de minería y configuraciones.
                    </p>
                    
                    <div className="mb-3 p-3 rounded" style={{ backgroundColor: colors.background }}>
                      <h6 style={{ color: colors.text }}>Incluye:</h6>
                      <ul style={{ color: colors.textMuted, fontSize: '0.9em' }}>
                        <li>Blockchain completa</li>
                        <li>Historial de minería</li>
                        <li>Datos de usuario</li>
                        <li>Configuraciones</li>
                      </ul>
                    </div>
                    
                    <button
                      className="btn btn-success w-100"
                      onClick={createBackup}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Creando respaldo...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-download me-2"></i>
                          Descargar Respaldo
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: '15px'
                  }}
                >
                  <div className="card-body p-4">
                    <h5 className="card-title" style={{ color: colors.info }}>
                      <i className="fas fa-upload me-2"></i>
                      Restaurar Respaldo
                    </h5>
                    <p style={{ color: colors.textMuted }}>
                      Restaura todos tus datos desde un archivo de respaldo previo. 
                      Esto sobrescribirá los datos actuales.
                    </p>
                    
                    <div className="alert alert-warning" style={{ fontSize: '0.9em' }}>
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      <strong>Advertencia:</strong> Esta acción reemplazará todos los datos actuales.
                    </div>
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".json"
                      onChange={handleFileRestore}
                      style={{ display: 'none' }}
                    />
                    
                    <button
                      className="btn btn-info w-100"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isLoading}
                    >
                      <i className="fas fa-upload me-2"></i>
                      Seleccionar Archivo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mantenimiento */}
          {activeTab === 'maintenance' && (
            <div className="row">
              <div className="col-md-6 mb-4">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: '15px'
                  }}
                >
                  <div className="card-body p-4">
                    <h5 className="card-title" style={{ color: colors.warning }}>
                      <i className="fas fa-tools me-2"></i>
                      Optimizar Almacenamiento
                    </h5>
                    <p style={{ color: colors.textMuted }}>
                      Limpia respaldos antiguos, optimiza el rendimiento de la base de datos 
                      y libera espacio innecesario.
                    </p>
                    
                    <div className="mb-3 p-3 rounded" style={{ backgroundColor: colors.background }}>
                      <h6 style={{ color: colors.text }}>Optimizaciones:</h6>
                      <ul style={{ color: colors.textMuted, fontSize: '0.9em' }}>
                        <li>Limpieza de respaldos antiguos</li>
                        <li>Compactación de la base de datos</li>
                        <li>Validación de integridad</li>
                        <li>Actualización de índices</li>
                      </ul>
                    </div>
                    
                    <button
                      className="btn btn-warning w-100"
                      onClick={optimizeStorage}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Optimizando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-magic me-2"></i>
                          Optimizar Ahora
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: '15px'
                  }}
                >
                  <div className="card-body p-4">
                    <h5 className="card-title" style={{ color: colors.danger }}>
                      <i className="fas fa-trash-alt me-2"></i>
                      Eliminar Todos los Datos
                    </h5>
                    <p style={{ color: colors.textMuted }}>
                      Elimina permanentemente todos los datos almacenados, 
                      incluyendo blockchain, historial y configuraciones.
                    </p>
                    
                    <div className="alert alert-danger" style={{ fontSize: '0.9em' }}>
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      <strong>¡Peligro!</strong> Esta acción no se puede deshacer.
                    </div>
                    
                    <button
                      className="btn btn-danger w-100"
                      onClick={clearAllData}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Eliminando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-trash-alt me-2"></i>
                          Eliminar Todo
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer con información */}
      <div className="text-center mt-5">
        <small style={{ color: colors.textMuted }}>
          <i className="fas fa-shield-alt me-2"></i>
          Sistema de persistencia optimizada para blockchain v{persistenceInfo.version}
        </small>
      </div>
    </div>
  );
};

export default StorageConfig;
