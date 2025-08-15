// Test export para verificar sintaxis
import React, { createContext, useContext } from 'react';

export const TestContext = createContext();

export const TestProvider = ({ children }) => {
  return (
    <TestContext.Provider value={{ test: "working" }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTestContext = () => {
  return useContext(TestContext);
};
