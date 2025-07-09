# 🔧 Guía Técnica - Sistema Blockchain

## 📚 Librerías y Dependencias Instaladas

### **Dependencias de Producción**

#### **React Ecosystem**
```json
"react": "^19.1.0"              // Framework principal
"react-dom": "^19.1.0"          // Renderizado DOM
"react-router-dom": "^7.6.3"    // Enrutamiento SPA
```

#### **UI y Estilos**
```json
"bootstrap": "^5.3.7"           // Framework CSS
"react-icons": "^5.5.0"         // Iconos (Font Awesome, etc.)
```

#### **Validación y Alertas**
```json
"prop-types": "^15.8.1"         // Validación de tipos
"sweetalert2": "^11.22.2"       // Alertas emergentes (opcional)
```

### **Dependencias de Desarrollo**

#### **Build Tools**
```json
"vite": "^6.3.5"                     // Build tool moderno
"@vitejs/plugin-react": "^4.4.1"     // Plugin React para Vite
```

#### **Linting y Calidad**
```json
"eslint": "^9.25.0"                      // Linter principal
"@eslint/js": "^9.25.0"                  // Configuración base
"eslint-plugin-react-hooks": "^5.2.0"    // Reglas para hooks
"eslint-plugin-react-refresh": "^0.4.19" // HMR optimization
"globals": "^16.0.0"                     // Variables globales
```

#### **Types (para desarrollo)**
```json
"@types/react": "^19.1.2"          // Tipos TypeScript para React
"@types/react-dom": "^19.1.2"      // Tipos TypeScript para React DOM
```

## 🛠️ Comandos de Instalación

### **Instalación inicial del proyecto**
```bash
# Crear proyecto con Vite
npm create vite@latest block-chain -- --template react
cd block-chain
npm install
```

### **Instalación de dependencias adicionales**
```bash
# UI Framework
npm install bootstrap@^5.3.7

# Iconos
npm install react-icons@^5.5.0

# Enrutamiento
npm install react-router-dom@^7.6.3

# Validación
npm install prop-types@^15.8.1

# Alertas (opcional - actualmente no en uso)
npm install sweetalert2@^11.22.2
```

## ⚙️ Configuración de Herramientas

### **Vite Configuration (vite.config.js)**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Puerto personalizado
    open: true   // Abrir navegador automáticamente
  }
})
```

### **ESLint Configuration (eslint.config.js)**
```javascript
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
```

## 🎨 Bootstrap Integration

### **Importación en main.jsx**
```javascript
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/theme.css";

// JavaScript de Bootstrap (dinámico)
const bootstrapScript = document.createElement("script");
bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
bootstrapScript.defer = true;
document.head.appendChild(bootstrapScript);
```

### **Font Awesome Integration**
```javascript
// Font Awesome (dinámico)
const fontAwesomeLink = document.createElement("link");
fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
fontAwesomeLink.rel = "stylesheet";
document.head.appendChild(fontAwesomeLink);
```

## 🔄 React Router Setup

### **Configuración en main.jsx**
```javascript
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/welcome" element={<WelcomePage name="Usuario" />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </StrictMode>
);
```

## 🎯 Context API Implementation

### **ThemeContext Structure**
```javascript
// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('isDarkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Color schemes
  const lightColors = { /* ... */ };
  const darkColors = { /* ... */ };
  
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## 📱 Component Architecture

### **Component Patterns**
```javascript
// Functional Component with Hooks
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../context/ThemeContext';

const MyComponent = ({ title, onAction }) => {
  const { colors } = useTheme();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    // Effect logic
  }, []);

  return (
    <div style={{ backgroundColor: colors.background }}>
      {/* Component JSX */}
    </div>
  );
};

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onAction: PropTypes.func
};

export default MyComponent;
```

## 🔧 Build and Development

### **Development Workflow**
```bash
# Iniciar desarrollo
npm run dev          # Puerto automático (usualmente 5173)

# Revisar código
npm run lint         # ESLint check
npm run lint -- --fix  # Auto-fix issues

# Construcción
npm run build        # Build para producción
npm run preview      # Preview del build
```

### **Project Structure Best Practices**
```
src/
├── components/          # Componentes reutilizables
│   ├── common/         # Componentes básicos (Button, Input, etc.)
│   ├── layout/         # Componentes de layout (NavBar, etc.)
│   └── specific/       # Componentes específicos de dominio
├── pages/              # Páginas/Vistas principales
├── context/            # React Contexts
├── hooks/              # Custom hooks (futuro)
├── utils/              # Utilidades y helpers
├── styles/             # Estilos globales y temas
└── assets/             # Recursos estáticos
```

## 🚀 Performance Optimizations

### **Vite Optimizations**
- **Hot Module Replacement (HMR)**: Actualizaciones instantáneas
- **Tree Shaking**: Eliminación de código no utilizado
- **Code Splitting**: División automática del código
- **Asset Optimization**: Optimización de imágenes y recursos

### **React Optimizations**
- **Functional Components**: Mejor performance que class components
- **React.memo**: Para componentes que no cambian frecuentemente
- **useCallback/useMemo**: Para optimizar renders costosos

## 🧪 Testing Setup (Recomendado para futuro)

```bash
# Testing libraries (para futuras implementaciones)
npm install --save-dev @testing-library/react
npm install --save-dev @testing-library/jest-dom
npm install --save-dev vitest
```

## 📦 Package.json Explanation

```json
{
  "type": "module",           // Habilita ES modules
  "scripts": {
    "dev": "vite",           // Servidor de desarrollo
    "build": "vite build",   // Build de producción
    "lint": "eslint .",      // Análisis de código
    "preview": "vite preview" // Preview del build
  }
}
```

## 🔒 Security Considerations

- **PropTypes**: Validación de tipos en tiempo de ejecución
- **ESLint**: Detección de problemas de seguridad básicos
- **Dependency Audit**: `npm audit` para verificar vulnerabilidades
- **HTTPS**: En producción usar HTTPS siempre

## 📈 Monitoring and Analytics (Future)

```bash
# Para futuras implementaciones
npm install @sentry/react      # Error tracking
npm install react-ga4         # Google Analytics
```

---

**Esta guía técnica proporciona todo lo necesario para entender, mantener y expandir el proyecto.**
