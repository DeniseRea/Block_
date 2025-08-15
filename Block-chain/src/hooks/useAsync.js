// src/hooks/useAsync.js - Hook para manejo de operaciones asíncronas

import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Hook personalizado para manejar estados de operaciones asíncronas
 * @param {Function} asyncFunction - Función asíncrona a ejecutar
 * @param {boolean} immediate - Si ejecutar inmediatamente al montar
 * @returns {Object} Estado y funciones de control
 */
export const useAsync = (asyncFunction, immediate = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  // Cleanup al desmontar componente
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFunction(...args);
      
      if (mountedRef.current) {
        setData(result);
        setError(null);
      }
      
      return result;
    } catch (err) {
      if (mountedRef.current) {
        setError(err);
        setData(null);
      }
      throw err;
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [asyncFunction]);

  // Ejecutar inmediatamente si se especifica
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    isIdle: !loading && !data && !error,
    isSuccess: !loading && !error && data !== null,
    isError: !loading && error !== null
  };
};

export default useAsync;
