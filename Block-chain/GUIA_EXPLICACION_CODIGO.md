# 📖 Guía de Explicación del Código - Sistema Blockchain

## 🎯 Índice
1. [Estructura General del Proyecto](#estructura-general)
2. [Configuración y Punto de Entrada](#configuración-inicial)
3. [Sistema de Temas (Modo Oscuro)](#sistema-de-temas)
4. [Navegación y Enrutamiento](#navegación-y-enrutamiento)
5. [Componentes Principales](#componentes-principales)
6. [Páginas y Vistas](#páginas-y-vistas)
7. [Validación de Archivos](#validación-de-archivos)
8. [Estilos y UI](#estilos-y-ui)
9. [Flujo de la Aplicación](#flujo-de-la-aplicación)

---

## 🏗️ Estructura General del Proyecto {#estructura-general}

### **¿Cómo está organizado el código?**

```
src/
├── main.jsx                 # 🚀 Punto de entrada de la aplicación
├── context/                 # 🌐 Gestión de estado global
│   └── ThemeContext.jsx     # 🎨 Manejo del modo oscuro/claro
├── components/              # 🧩 Componentes reutilizables
│   ├── Button.jsx           # 🔘 Botones personalizados
│   ├── InputField.jsx       # 📝 Campos de entrada
│   ├── FileInput.jsx        # 📁 Subida de archivos
│   ├── ValidationAlert.jsx  # ⚠️ Alertas de validación
│   ├── ThemeToggle.jsx      # 🌙 Interruptor de tema
│   └── NavBar/              # 🧭 Sistema de navegación
│       ├── NavBar.jsx       # 📋 Barra de navegación principal
│       └── NavItem.jsx      # 📌 Elementos del menú
├── pages/                   # 📄 Páginas principales
│   ├── Login/               # 🔐 Sistema de autenticación
│   ├── Welcome/             # 👋 Página de bienvenida
│   ├── Home/                # 🏠 Dashboard principal
│   ├── Update/              # 📤 Subida de archivos
│   ├── Validation/          # ✅ Validación de datos
│   ├── ListBlock/           # 📋 Lista de bloques
│   ├── Config/              # ⚙️ Configuración
│   └── Help/                # ❓ Ayuda y soporte
└── styles/                  # 🎨 Estilos globales
    └── theme.css            # 🌈 Variables de tema
```

---

## 🚀 Configuración y Punto de Entrada {#configuración-inicial}

### **main.jsx - El corazón de la aplicación**

```javascript
// main.jsx - Explicado paso a paso

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 1️⃣ Importamos el contexto de tema para toda la app
import { ThemeProvider } from "./context/ThemeContext.jsx";

// 2️⃣ Importamos las páginas principales
import LoginPage from "./pages/Login/LoginPage.jsx";
import WelcomePage from "./pages/Welcome/WelcomePage.jsx";
import HomePage from "./pages/Home/HomePage.jsx";

// 3️⃣ Importamos estilos globales
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/theme.css";

// 4️⃣ Cargamos Bootstrap JS dinámicamente
const bootstrapScript = document.createElement("script");
bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
document.head.appendChild(bootstrapScript);

// 5️⃣ Renderizamos la aplicación
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>      {/* 🌐 Proveedor de tema global */}
      <Router>           {/* 🧭 Sistema de navegación */}
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

**¿Qué hace cada parte?**
- **StrictMode**: Detecta problemas en el código durante desarrollo
- **ThemeProvider**: Proporciona el sistema de modo oscuro a toda la app
- **Router**: Maneja la navegación entre páginas sin recargar el navegador
- **Routes**: Define qué componente mostrar según la URL

---

## 🌐 Sistema de Temas (Modo Oscuro) {#sistema-de-temas}

### **ThemeContext.jsx - Gestión global del tema**

```javascript
// ThemeContext.jsx - Explicado paso a paso

import React, { createContext, useContext, useState, useEffect } from 'react';

// 1️⃣ Creamos el contexto
const ThemeContext = createContext();

// 2️⃣ Hook personalizado para usar el tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
};

// 3️⃣ Proveedor del contexto
export const ThemeProvider = ({ children }) => {
  // 4️⃣ Estado del tema - se guarda en localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('isDarkMode');
    return saved ? JSON.parse(saved) : false; // Por defecto: modo claro
  });

  // 5️⃣ Función para cambiar el tema
  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('isDarkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  // 6️⃣ Paletas de colores
  const lightColors = {
    background: '#ffffff',
    surface: '#f8f9fa',
    primary: '#007bff',
    text: '#212529',
    // ... más colores
  };

  const darkColors = {
    background: '#121212',
    surface: '#1e1e1e',
    primary: '#0d6efd',
    text: '#ffffff',
    // ... más colores
  };

  // 7️⃣ Seleccionamos la paleta según el modo
  const colors = isDarkMode ? darkColors : lightColors;

  // 8️⃣ Aplicamos estilos globales al body
  useEffect(() => {
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.text;
    document.body.style.transition = 'all 0.3s ease';
  }, [colors]);

  // 9️⃣ Proporcionamos el contexto a los componentes hijos
  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleTheme, 
      colors 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

**¿Cómo funciona?**
1. **Persistencia**: El tema se guarda en localStorage del navegador
2. **Reactividad**: Cuando cambia el tema, todos los componentes se actualizan
3. **Paletas**: Cada modo tiene su propia paleta de colores
4. **Automático**: Los estilos se aplican automáticamente al body

---

## 🧭 Navegación y Enrutamiento {#navegación-y-enrutamiento}

### **NavBar.jsx - Barra de navegación vertical**

```javascript
// NavBar.jsx - Explicado paso a paso

import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import NavItem from './NavItem';

const NavBar = () => {
  const { colors } = useTheme(); // 1️⃣ Obtenemos los colores del tema
  const location = useLocation(); // 2️⃣ Obtenemos la ruta actual

  // 3️⃣ Configuración de elementos del menú
  const menuItems = [
    { 
      icon: 'fas fa-home', 
      tooltip: 'Inicio', 
      section: 'welcome' 
    },
    { 
      icon: 'fas fa-upload', 
      tooltip: 'Subir Archivo', 
      section: 'update' 
    },
    { 
      icon: 'fas fa-check-circle', 
      tooltip: 'Validación', 
      section: 'validation' 
    },
    // ... más elementos
  ];

  // 4️⃣ Función para manejar la navegación
  const handleNavigation = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',    // Desplazamiento suave
        block: 'start'         // Alinear al inicio
      });
    }
  };

  return (
    <nav 
      className="navbar-vertical"
      style={{ 
        backgroundColor: colors.surface,  // 5️⃣ Color del tema
        borderRight: `1px solid ${colors.border}`
      }}
    >
      {/* 6️⃣ Logo */}
      <div className="navbar-brand">
        <i className="fas fa-cube" style={{ color: colors.primary }}></i>
      </div>

      {/* 7️⃣ Elementos del menú */}
      <div className="navbar-menu">
        {menuItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            tooltip={item.tooltip}
            isActive={location.hash === `#${item.section}`} // 8️⃣ Estado activo
            onClick={() => handleNavigation(item.section)}  // 9️⃣ Navegación
          />
        ))}
      </div>
    </nav>
  );
};
```

**¿Cómo funciona la navegación?**
1. **Scroll suave**: Navega a secciones con desplazamiento animado
2. **Estado activo**: Resalta el elemento actual del menú
3. **Tooltips**: Muestra ayuda al pasar el mouse
4. **Responsive**: Se adapta a diferentes tamaños de pantalla

---

## 🧩 Componentes Principales {#componentes-principales}

### **FileInput.jsx - Subida de archivos con validación**

```javascript
// FileInput.jsx - Explicado paso a paso

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import ValidationAlert from './ValidationAlert';

const FileInput = ({ onFileSelect, onValidationChange }) => {
  const { colors } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // 1️⃣ Extensiones permitidas
  const allowedExtensions = ['.txt', '.json', '.csv'];

  // 2️⃣ Función para validar el archivo
  const validateFile = (file) => {
    if (!file) return false;
    
    const fileName = file.name.toLowerCase();
    const isValid = allowedExtensions.some(ext => 
      fileName.endsWith(ext)
    );
    
    return isValid;
  };

  // 3️⃣ Manejador de selección de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const isValid = validateFile(file);
      
      if (isValid) {
        // ✅ Archivo válido
        setSelectedFile(file);
        onFileSelect(file);
        onValidationChange(true);
      } else {
        // ❌ Archivo inválido
        setSelectedFile(null);
        onFileSelect(null);
        onValidationChange(false);
        setShowErrorModal(true); // Mostrar error
        event.target.value = ''; // Limpiar input
      }
    }
  };

  return (
    <div className="file-input-container">
      {/* 4️⃣ Input de archivo */}
      <div className="file-input-wrapper">
        <input
          type="file"
          id="fileInput"
          className="file-input"
          onChange={handleFileChange}
          accept=".txt,.json,.csv" // 5️⃣ Filtro visual
        />
        <label 
          htmlFor="fileInput" 
          className="file-input-label"
          style={{ backgroundColor: colors.primary }}
        >
          <i className="fas fa-upload"></i>
          Seleccionar Archivo
        </label>
      </div>

      {/* 6️⃣ Información del archivo seleccionado */}
      {selectedFile && (
        <div className="file-info">
          <i className="fas fa-file-alt"></i>
          <span>{selectedFile.name}</span>
          <span className="file-size">
            ({(selectedFile.size / 1024).toFixed(2)} KB)
          </span>
        </div>
      )}

      {/* 7️⃣ Modal de error */}
      <ValidationAlert
        show={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        type="error"
        title="Formato de archivo no válido"
        message={`Solo se permiten archivos: ${allowedExtensions.join(', ')}`}
      />
    </div>
  );
};
```

**¿Cómo funciona la validación?**
1. **Extensiones**: Solo permite .txt, .json, .csv
2. **Feedback visual**: Muestra información del archivo válido
3. **Error modal**: Alerta con Bootstrap si el formato es incorrecto
4. **Limpieza**: Borra la selección si el archivo no es válido

---

## 📄 Páginas y Vistas {#páginas-y-vistas}

### **HomePage.jsx - Dashboard principal**

```javascript
// HomePage.jsx - Explicado paso a paso

import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import NavBar from '../../components/NavBar/NavBar';
import ThemeToggle from '../../components/ThemeToggle';

// Importamos las secciones
import WelcomePage from '../Welcome/WelcomePage';
import UpdatePage from '../Update/UpdatePage';
import ValidationPage from '../Validation/ValidationPage';
// ... más páginas

const HomePage = () => {
  const { colors } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div 
      className="home-container"
      style={{ backgroundColor: colors.background }}
    >
      {/* 1️⃣ Barra de navegación fija */}
      <NavBar />

      {/* 2️⃣ Botón de cambio de tema */}
      <ThemeToggle />

      {/* 3️⃣ Contenido principal */}
      <main className="main-content">
        
        {/* 4️⃣ Sección de bienvenida */}
        <section id="welcome">
          <WelcomePage name="Usuario" />
        </section>

        {/* 5️⃣ Sección de subida de archivos */}
        <section id="update">
          <UpdatePage 
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
          />
        </section>

        {/* 6️⃣ Sección de validación */}
        <section id="validation">
          <ValidationPage selectedFile={selectedFile} />
        </section>

        {/* ... más secciones */}
      </main>
    </div>
  );
};
```

**¿Cómo está estructurada la página principal?**
1. **Layout fijo**: NavBar siempre visible en el lateral
2. **Secciones**: Cada funcionalidad en su propia sección
3. **Estado compartido**: El archivo seleccionado se pasa entre secciones
4. **Scroll navigation**: Navegación fluida entre secciones

---

## ✅ Validación de Archivos {#validación-de-archivos}

### **ValidationPage.jsx - Procesamiento de archivos**

```javascript
// ValidationPage.jsx - Explicado paso a paso

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../../components/Button';

const ValidationPage = ({ selectedFile }) => {
  const { colors } = useTheme();
  const [validationStatus, setValidationStatus] = useState('pending');
  const [fileContent, setFileContent] = useState('');

  // 1️⃣ Efecto para validar cuando cambia el archivo
  useEffect(() => {
    if (selectedFile) {
      validateFile(selectedFile);
    } else {
      setValidationStatus('pending');
      setFileContent('');
    }
  }, [selectedFile]);

  // 2️⃣ Función de validación del archivo
  const validateFile = async (file) => {
    try {
      setValidationStatus('validating');
      
      // 3️⃣ Leemos el contenido del archivo
      const content = await readFileContent(file);
      setFileContent(content);

      // 4️⃣ Validamos según el tipo de archivo
      const isValid = await performValidation(file, content);
      
      setValidationStatus(isValid ? 'valid' : 'invalid');
    } catch (error) {
      console.error('Error validating file:', error);
      setValidationStatus('error');
    }
  };

  // 5️⃣ Lector de archivos
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      
      reader.readAsText(file);
    });
  };

  // 6️⃣ Lógica de validación específica
  const performValidation = async (file, content) => {
    const extension = file.name.toLowerCase().split('.').pop();
    
    switch (extension) {
      case 'json':
        return validateJSON(content);
      case 'csv':
        return validateCSV(content);
      case 'txt':
        return validateTXT(content);
      default:
        return false;
    }
  };

  // 7️⃣ Validadores específicos
  const validateJSON = (content) => {
    try {
      JSON.parse(content);
      return true;
    } catch {
      return false;
    }
  };

  const validateCSV = (content) => {
    const lines = content.split('\n');
    return lines.length > 1 && lines[0].includes(',');
  };

  const validateTXT = (content) => {
    return content.trim().length > 0;
  };

  // 8️⃣ Función para cargar/procesar el archivo
  const handleUpload = () => {
    if (validationStatus === 'valid') {
      // Procesar archivo válido
      processValidFile();
    }
  };

  // 9️⃣ Renderizado condicional del estado
  const renderValidationStatus = () => {
    switch (validationStatus) {
      case 'pending':
        return (
          <div className="validation-pending">
            <i className="fas fa-clock"></i>
            <span>Esperando archivo...</span>
          </div>
        );
      
      case 'validating':
        return (
          <div className="validation-loading">
            <div className="spinner-border" role="status"></div>
            <span>Validando archivo...</span>
          </div>
        );
      
      case 'valid':
        return (
          <div className="validation-success">
            <i className="fas fa-check-circle"></i>
            <span>Archivo válido ✅</span>
          </div>
        );
      
      case 'invalid':
        return (
          <div className="validation-error">
            <i className="fas fa-times-circle"></i>
            <span>Archivo inválido ❌</span>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="validation-page">
      <h2>Validación de Archivo</h2>
      
      {/* 🔟 Estado de validación */}
      {renderValidationStatus()}
      
      {/* 1️⃣1️⃣ Botón de carga (solo si es válido) */}
      {validationStatus === 'valid' && (
        <Button
          variant="success"
          onClick={handleUpload}
          className="upload-btn"
        >
          <i className="fas fa-upload"></i>
          Cargar Archivo
        </Button>
      )}
    </div>
  );
};
```

**¿Cómo funciona la validación?**
1. **Automática**: Se ejecuta al seleccionar un archivo
2. **Por tipo**: Cada extensión tiene su propia validación
3. **Asíncrona**: Usa Promises para leer archivos
4. **Estados visuales**: Feedback claro del proceso
5. **Botón condicional**: Solo aparece si el archivo es válido

---

## 🎨 Estilos y UI {#estilos-y-ui}

### **theme.css - Variables globales de tema**

```css
/* theme.css - Explicado paso a paso */

/* 1️⃣ Variables CSS para modo claro */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
  
  --light-bg: #ffffff;
  --light-surface: #f8f9fa;
  --light-text: #212529;
  --light-border: #dee2e6;
  
  --transition: all 0.3s ease;
  --border-radius: 8px;
  --box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 2️⃣ Variables para modo oscuro */
[data-theme="dark"] {
  --dark-bg: #121212;
  --dark-surface: #1e1e1e;
  --dark-text: #ffffff;
  --dark-border: #333333;
}

/* 3️⃣ Estilos del navbar vertical */
.navbar-vertical {
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 100vh;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  transition: var(--transition);
}

/* 4️⃣ Elementos del menú */
.nav-item {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
}

/* 5️⃣ Efectos hover */
.nav-item:hover {
  transform: scale(1.1);
  box-shadow: var(--box-shadow);
}

/* 6️⃣ Estado activo */
.nav-item.active {
  background-color: var(--primary-color);
  color: white;
}

/* 7️⃣ Tooltips */
.nav-item .tooltip {
  position: absolute;
  left: 70px;
  background: #333;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition);
}

.nav-item:hover .tooltip {
  opacity: 1;
  visibility: visible;
}

/* 8️⃣ Contenido principal */
.main-content {
  margin-left: 80px; /* Espacio para el navbar */
  min-height: 100vh;
  transition: var(--transition);
}

/* 9️⃣ Secciones */
.section {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 🔟 Responsivo */
@media (max-width: 768px) {
  .navbar-vertical {
    width: 100%;
    height: 60px;
    flex-direction: row;
    justify-content: space-around;
    bottom: 0;
    top: auto;
  }
  
  .main-content {
    margin-left: 0;
    margin-bottom: 60px;
  }
}
```

**¿Cómo funcionan los estilos?**
1. **Variables CSS**: Facilitan el cambio de tema
2. **Transiciones**: Animaciones suaves en toda la UI
3. **Flexbox**: Layout flexible y responsive
4. **Mobile-first**: Se adapta a dispositivos móviles
5. **Estados visuales**: Hover, active, focus bien definidos

---

## 🔄 Flujo de la Aplicación {#flujo-de-la-aplicación}

### **Diagrama del flujo principal**

```
🚀 Inicio de la aplicación
├── main.jsx
├── ThemeProvider inicializa tema
├── Router configura navegación
└── LoginPage (ruta inicial "/")

👤 Usuario se autentica
├── LoginForm valida credenciales
├── Redirección a "/welcome"
└── WelcomePage muestra bienvenida

🏠 Dashboard principal ("/home")
├── NavBar lateral fijo
├── ThemeToggle en esquina
└── Secciones principales:
    ├── 👋 Welcome (presentación)
    ├── 📤 Update (subida de archivos)
    ├── ✅ Validation (validación)
    ├── 📋 ListBlock (lista de bloques)
    ├── ⚙️ Config (configuración)
    └── ❓ Help (ayuda)

📁 Flujo de subida de archivos
├── Update: Usuario selecciona archivo
├── FileInput: Valida extensión (.txt, .json, .csv)
├── Si es válido: guarda en estado
├── Si es inválido: muestra modal de error
└── Validation: Procesa contenido automáticamente

✅ Flujo de validación
├── Recibe archivo del estado compartido
├── Lee contenido con FileReader
├── Valida según tipo:
│   ├── JSON: intenta parsear
│   ├── CSV: verifica formato
│   └── TXT: verifica contenido
├── Muestra estado (pending/validating/valid/invalid)
└── Si es válido: habilita botón "Cargar"

🌙 Flujo de cambio de tema
├── ThemeToggle: usuario hace clic
├── ThemeContext: cambia isDarkMode
├── localStorage: persiste preferencia
├── Todos los componentes: reciben nuevos colores
└── CSS: aplica transiciones suaves
```

### **Estados de la aplicación**

```javascript
// Estados principales que maneja la aplicación

// 1️⃣ Estado global de tema
const themeState = {
  isDarkMode: boolean,        // true = oscuro, false = claro
  colors: object,            // paleta de colores actual
  toggleTheme: function      // función para cambiar tema
};

// 2️⃣ Estado de navegación
const navigationState = {
  currentSection: string,    // sección activa ('welcome', 'update', etc.)
  location: object          // objeto de react-router-dom
};

// 3️⃣ Estado de archivo
const fileState = {
  selectedFile: File | null,     // archivo seleccionado
  isValid: boolean,             // si el archivo es válido
  validationStatus: string,     // 'pending' | 'validating' | 'valid' | 'invalid'
  content: string              // contenido del archivo
};

// 4️⃣ Estado de UI
const uiState = {
  showErrorModal: boolean,      // mostrar modal de error
  isLoading: boolean,          // estado de carga
  activeNavItem: string        // elemento activo del menú
};
```

---

## 🎯 Conceptos Clave de React Utilizados

### **1. Hooks Principales**

```javascript
// useState - Manejo de estado local
const [selectedFile, setSelectedFile] = useState(null);

// useEffect - Efectos secundarios
useEffect(() => {
  // Se ejecuta cuando selectedFile cambia
  validateFile(selectedFile);
}, [selectedFile]);

// useContext - Consumo de contexto
const { colors, isDarkMode, toggleTheme } = useTheme();

// Custom hook - Lógica reutilizable
const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};
```

### **2. Patrones de Componentes**

```javascript
// Componente funcional con props
const Button = ({ children, variant, onClick, ...props }) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Componente con validación de props
Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  onClick: PropTypes.func
};

// Valores por defecto
Button.defaultProps = {
  variant: 'primary'
};
```

### **3. Context API**

```javascript
// Crear contexto
const ThemeContext = createContext();

// Proveedor
const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Consumidor
const MyComponent = () => {
  const { isDarkMode } = useContext(ThemeContext);
  return <div>{isDarkMode ? 'Oscuro' : 'Claro'}</div>;
};
```

---

## 🔍 Debugging y Herramientas de Desarrollo

### **Cómo debuggear el código**

```javascript
// 1️⃣ Console.log para seguimiento
const handleFileChange = (file) => {
  console.log('Archivo seleccionado:', file);
  console.log('Extensión:', file.name.split('.').pop());
  
  const isValid = validateFile(file);
  console.log('¿Es válido?', isValid);
};

// 2️⃣ React Developer Tools
// Instalar extensión del navegador para ver:
// - Árbol de componentes
// - Props y estado
// - Context values
// - Performance profiling

// 3️⃣ Error boundaries (para futuro)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Algo salió mal.</h1>;
    }
    return this.props.children;
  }
}
```

### **Herramientas útiles**

- **React DevTools**: Extensión del navegador
- **ESLint**: Detecta errores en el código
- **Vite DevTools**: Hot reloading y debugging
- **Browser DevTools**: Network, Console, Elements

---

## 📚 Recursos de Aprendizaje

### **Documentación oficial**
- [React Docs](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Vite](https://vitejs.dev/)

### **Conceptos importantes para estudiar**
1. **React Hooks**: useState, useEffect, useContext
2. **Context API**: Para estado global
3. **React Router**: Navegación SPA
4. **Event Handling**: Manejo de eventos
5. **Conditional Rendering**: Renderizado condicional
6. **Props y State**: Diferencias y uso
7. **Component Lifecycle**: Ciclo de vida de componentes
8. **CSS-in-JS**: Estilos dinámicos con JavaScript

---

**Esta guía explica el funcionamiento completo del código del proyecto, desde la configuración inicial hasta los detalles de implementación de cada funcionalidad.**
