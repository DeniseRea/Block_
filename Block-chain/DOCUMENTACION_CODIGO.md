# 📖 Documentación del Código - Sistema Blockchain

## 🏗️ Arquitectura General del Proyecto

### **Estructura de Carpetas Explicada**
```
src/
├── main.jsx                    # Punto de entrada de la aplicación
├── context/                    # Estado global con Context API
│   └── ThemeContext.jsx       # Manejo de temas claro/oscuro
├── components/                 # Componentes reutilizables
│   ├── Button.jsx             # Botón personalizado con temas
│   ├── InputField.jsx         # Campo de entrada personalizado
│   ├── FileInput.jsx          # Selector de archivos con validación
│   ├── SectionTitle.jsx       # Títulos de secciones
│   ├── MascotCard.jsx         # Tarjeta de la mascota ESPEcito
│   ├── TeamCarousel.jsx       # Carrusel del equipo
│   ├── TeamMemberCard.jsx     # Tarjeta de miembro del equipo
│   ├── ValidationAlert.jsx    # Alertas de validación
│   ├── ThemeToggle.jsx        # Botón cambio de tema
│   ├── NavBar/                # Componentes de navegación
│   │   ├── NavBar.jsx         # Navbar vertical principal
│   │   └── NavItem.jsx        # Item individual del navbar
│   └── Table/                 # Componentes de tabla
│       ├── TableHeader.jsx    # Encabezado de tabla
│       ├── TableBody.jsx      # Cuerpo de tabla
│       ├── TableContainer.jsx # Contenedor de tabla
│       ├── TableRow.jsx       # Fila de tabla
│       └── AuditRow.jsx       # Fila específica para auditoría
├── pages/                     # Páginas principales
│   ├── Home/                  # Página principal
│   │   └── HomePage.jsx       # Controlador principal de navegación
│   ├── Welcome/               # Página de bienvenida
│   │   └── WelcomePage.jsx    # Dashboard principal del usuario
│   ├── Login/                 # Sistema de autenticación
│   │   ├── LoginPage.jsx      # Página de login
│   │   └── LoginForm.jsx      # Formulario de login
│   ├── Update/                # Carga de archivos
│   │   └── UpdatePage.jsx     # Página de subida de archivos
│   ├── ListBlock/             # Lista de bloques
│   │   └── ListBlock.jsx      # Visualización de blockchain
│   ├── Validation/            # Validación y auditoría
│   │   ├── ValidationPage.jsx # Validación de archivos
│   │   └── AuditPage.jsx      # Auditoría de la blockchain
│   ├── Config/                # Configuración
│   │   └── ConfigPage.jsx     # Página de configuración
│   └── Help/                  # Sistema de ayuda
│       ├── HelpPage.jsx       # Página principal de ayuda
│       ├── FAQSection.jsx     # Preguntas frecuentes
│       ├── ContactSection.jsx # Información de contacto
│       └── QuickGuideSection.jsx # Guías rápidas
├── styles/                    # Estilos globales
│   └── theme.css             # Estilos de tema y modo oscuro
├── assets/                    # Recursos estáticos
│   └── ESPEcito.png          # Imagen de la mascota
└── images/                    # Imágenes adicionales
    └── mascota.png           # Imagen alternativa de mascota
```

## 🎯 Componentes Principales Explicados

### **1. main.jsx - Punto de Entrada**
```javascript
// Configuración de la aplicación principal
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context Provider para tema global
import { ThemeProvider } from "./context/ThemeContext";

// Páginas principales
import LoginPage from "./pages/Login/LoginPage";
import { WelcomePage } from "./pages/Welcome/WelcomePage";
import { HomePage } from "./pages/Home/HomePage";

// Estilos globales
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/theme.css";

// Inyección dinámica de Bootstrap JS y Font Awesome
const bootstrapScript = document.createElement("script");
bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
bootstrapScript.defer = true;
document.head.appendChild(bootstrapScript);

const fontAwesomeLink = document.createElement("link");
fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
fontAwesomeLink.rel = "stylesheet";
document.head.appendChild(fontAwesomeLink);

// Renderizado de la aplicación con enrutamiento
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

**Explicación:**
- **StrictMode**: Detecta problemas potenciales en la aplicación
- **ThemeProvider**: Envuelve toda la app para acceso global al tema
- **Router**: Habilita navegación SPA (Single Page Application)
- **Inyección dinámica**: Bootstrap y Font Awesome se cargan programáticamente

### **2. ThemeContext.jsx - Manejo de Estado Global**
```javascript
// Contexto para manejo de temas claro/oscuro
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Hook personalizado para usar el tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Estado persistente en localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('isDarkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Paletas de colores para cada tema
  const lightColors = {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    background: '#ffffff',
    card: '#ffffff',
    text: '#212529',
    textSecondary: '#6c757d',
    border: '#dee2e6'
  };

  const darkColors = {
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#198754',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#0dcaf0',
    light: '#f8f9fa',
    dark: '#212529',
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    border: '#333333'
  };

  // Selección dinámica de colores
  const colors = isDarkMode ? darkColors : lightColors;

  // Función para cambiar tema
  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem('isDarkMode', JSON.stringify(newValue));
      return newValue;
    });
  };

  // Efecto para aplicar clase CSS al body
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

**Explicación:**
- **Context API**: Estado global sin Redux
- **localStorage**: Persistencia del tema seleccionado
- **Paletas dinámicas**: Colores adaptativos para cada tema
- **useEffect**: Aplicación automática de clases CSS

### **3. HomePage.jsx - Controlador Principal**
```javascript
// Página principal que maneja toda la navegación interna
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export const HomePage = () => {
  const location = useLocation();
  const usuario = location.state?.usuario || { name: "Usuario" };
  const [activeComponent, setActiveComponent] = useState("welcome");
  const { colors } = useTheme();

  // Función para renderizar componente según navegación
  const renderContent = () => {
    switch (activeComponent) {
      case "welcome":
        return <WelcomePage name={usuario.name} showNavBar={false} />;
      case "upload":
        return <UpdatePage />;
      case "list":
        return <ListBlock />;
      case "audit":
        return <AuditPage />;
      case "config":
        return <ConfigPage />;
      case "points":
        return <ValidationPage fileContent="Ejemplo de contenido simulado" />;
      case "user":
        return <HelpPage />;
      default:
        return <WelcomePage name={usuario.name} showNavBar={false} />;
    }
  };

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      <NavBar onNavigate={setActiveComponent} currentPage={activeComponent} />
      <ThemeToggle />
      
      <div style={{ marginLeft: '60px', minHeight: '100vh' }}>
        {renderContent()}
      </div>
    </div>
  );
};
```

**Explicación:**
- **Single Page Application**: Todo el contenido se carga dinámicamente
- **Estado local**: `activeComponent` controla qué página mostrar
- **useLocation**: Recibe datos del login via React Router
- **Layout consistente**: NavBar fijo + contenido dinámico

### **4. NavBar.jsx - Navegación Vertical**
```javascript
// Navegación vertical fija con iconos
import React from "react";
import { NavItem } from "./NavItem";
import { useTheme } from "../../context/ThemeContext";
import { FaHome, FaUpload, FaList, FaClipboardCheck, FaCog, FaStar, FaUser } from "react-icons/fa";

export const NavBar = ({ onNavigate, currentPage }) => {
  const { colors } = useTheme();

  // Configuración de elementos de navegación
  const navItems = [
    { key: "welcome", icon: FaHome, label: "Inicio" },
    { key: "upload", icon: FaUpload, label: "Subir" },
    { key: "list", icon: FaList, label: "Lista" },
    { key: "audit", icon: FaClipboardCheck, label: "Auditoría" },
    { key: "config", icon: FaCog, label: "Configuración" },
    { key: "points", icon: FaStar, label: "Puntos" },
    { key: "user", icon: FaUser, label: "Usuario" }
  ];

  return (
    <nav 
      className="d-flex flex-column justify-content-start align-items-center position-fixed"
      style={{
        left: 0,
        top: 0,
        width: "60px",
        height: "100vh",        // Altura completa de la ventana
        backgroundColor: colors.primary,
        zIndex: 1000,
        transition: "all 0.3s ease",
        paddingTop: "1rem",
        paddingBottom: "1rem"
      }}
    >
      <ul className="navbar-nav d-flex flex-column gap-3 h-100 justify-content-center">
        {navItems.map(({ key, icon: Icon, label }) => (
          <NavItem
            key={key}
            onClick={() => onNavigate(key)}    // Callback para cambiar página
            icon={<Icon className="fs-4" />}
            label={label}
            isActive={currentPage === key}     // Estado activo visual
          />
        ))}
      </ul>
    </nav>
  );
};
```

**Explicación:**
- **position: fixed**: Navbar siempre visible
- **height: 100vh**: Ocupa toda la altura de la ventana
- **react-icons**: Iconos de Font Awesome como componentes
- **Callback pattern**: `onNavigate` comunica con componente padre

### **5. FileInput.jsx - Validación de Archivos**
```javascript
// Componente para selección y validación de archivos
import React from "react";
import { useTheme } from "../context/ThemeContext";

export const FileInput = ({ onFileChange }) => {
  const { colors } = useTheme();

  // Función de validación de formato de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      // Validación de extensión
      const allowedExtensions = ['.txt', '.json', '.csv'];
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      
      if (!allowedExtensions.includes(fileExtension)) {
        // Modal de Bootstrap para error
        const modalHTML = `
          <div class="modal fade" id="errorModal" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content" style="background-color: ${colors.card}; color: ${colors.text};">
                <div class="modal-header" style="border-color: ${colors.border};">
                  <h5 class="modal-title" style="color: ${colors.danger};">
                    <i class="fas fa-times-circle me-2"></i>Error de validación
                  </h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                  <p>Formato de archivo no válido.</p>
                  <p>Solo se permiten archivos: <strong>.txt, .json, .csv</strong></p>
                  <p>Archivo seleccionado: <strong>${file.name}</strong></p>
                </div>
                <div class="modal-footer" style="border-color: ${colors.border};">
                  <button type="button" class="btn" data-bs-dismiss="modal" 
                          style="background-color: ${colors.secondary}; color: ${colors.light};">
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
        
        // Inyección y mostrado del modal
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modal = new bootstrap.Modal(document.getElementById('errorModal'));
        modal.show();
        
        // Limpieza del modal después de cerrarlo
        document.getElementById('errorModal').addEventListener('hidden.bs.modal', function () {
          this.remove();
        });
        
        // Limpiar input
        event.target.value = '';
        return;
      }
      
      // Si es válido, procesar archivo
      onFileChange(file);
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label" style={{ color: colors.text }}>
        <i className="fas fa-file me-2"></i>Elegir archivo
      </label>
      <input
        type="file"
        className="form-control"
        onChange={handleFileChange}
        accept=".txt,.json,.csv"          // Restricción nativa del navegador
        required
        style={{ 
          backgroundColor: colors.background,
          color: colors.text,
          borderColor: colors.border,
          padding: '0.75rem'
        }}
      />
      <div className="form-text" style={{ color: colors.textSecondary }}>
        Formatos soportados: .txt, .json, .csv
      </div>
    </div>
  );
};
```

**Explicación:**
- **Validación doble**: HTML5 `accept` + JavaScript personalizado
- **Modal dinámico**: Bootstrap modal creado programáticamente
- **Template literals**: HTML generado dinámicamente con estilos de tema
- **Event cleanup**: Eliminación del modal después del uso

### **6. TeamCarousel.jsx - Carrusel Interactivo**
```javascript
// Carrusel de miembros del equipo con navegación personalizada
import React, { useEffect } from "react";
import { TeamMemberCard } from "./TeamMemberCard";
import { useTheme } from "../context/ThemeContext";

export const TeamCarousel = ({ team }) => {
  const { colors, isDarkMode } = useTheme();

  useEffect(() => {
    // Inicialización del carrusel de Bootstrap
    const carouselElement = document.getElementById("teamCarousel");
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 5000,    // 5 segundos entre transiciones
        ride: "carousel",
      });
    }

    // Efectos hover personalizados para las flechas
    const prevButton = document.querySelector('[data-bs-slide="prev"]');
    const nextButton = document.querySelector('[data-bs-slide="next"]');
    
    if (prevButton) {
      prevButton.addEventListener('mouseenter', () => {
        prevButton.style.opacity = '1';
        prevButton.style.transform = 'translateY(-50%) scale(1.1)';
      });
      prevButton.addEventListener('mouseleave', () => {
        prevButton.style.opacity = '0.8';
        prevButton.style.transform = 'translateY(-50%) scale(1)';
      });
    }

    if (nextButton) {
      nextButton.addEventListener('mouseenter', () => {
        nextButton.style.opacity = '1';
        nextButton.style.transform = 'translateY(-50%) scale(1.1)';
      });
      nextButton.addEventListener('mouseleave', () => {
        nextButton.style.opacity = '0.8';
        nextButton.style.transform = 'translateY(-50%) scale(1)';
      });
    }
  }, []);

  return (
    <div
      id="teamCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="5000"
      style={{ 
        backgroundColor: colors.card,
        borderRadius: '15px',
        padding: '1rem',
        border: `1px solid ${colors.border}`,
        position: 'relative'
      }}
    >
      <div className="carousel-inner">
        {team.map((member, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <div className="d-flex justify-content-center">
              <TeamMemberCard
                photo={member.photo}
                name={member.name}
                role={member.role}
                description={member.description}
                github={member.github}
                linkedin={member.linkedin}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Flechas de navegación personalizadas */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#teamCarousel"
        data-bs-slide="prev"
        style={{ 
          width: '40px',
          height: '40px',
          backgroundColor: colors.primary,
          borderRadius: '50%',
          top: '50%',
          transform: 'translateY(-50%)',
          left: '-20px',
          opacity: '0.8',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
      >
        <i className="fas fa-chevron-left" style={{ color: colors.light, fontSize: '1.2rem' }}></i>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#teamCarousel"
        data-bs-slide="next"
        style={{ 
          width: '40px',
          height: '40px',
          backgroundColor: colors.primary,
          borderRadius: '50%',
          top: '50%',
          transform: 'translateY(-50%)',
          right: '-20px',
          opacity: '0.8',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
      >
        <i className="fas fa-chevron-right" style={{ color: colors.light, fontSize: '1.2rem' }}></i>
      </button>
    </div>
  );
};
```

**Explicación:**
- **Bootstrap Carousel**: Integración con JavaScript nativo de Bootstrap
- **useEffect**: Inicialización después del montaje del componente
- **Event listeners**: Efectos hover añadidos programáticamente
- **Iconos personalizados**: Reemplazo de flechas de Bootstrap por Font Awesome

## 🔄 Flujo de Datos Explicado

### **1. Flujo de Autenticación**
```
LoginPage → userData → navigate("/home", { state: { usuario } }) → HomePage → useLocation
```

### **2. Flujo de Tema**
```
ThemeToggle → toggleTheme() → Context → useTheme() → colors → inline styles
```

### **3. Flujo de Navegación**
```
NavBar → onNavigate(key) → setActiveComponent → renderContent() → Component
```

### **4. Flujo de Archivos**
```
FileInput → validation → onFileChange → UpdatePage → ValidationPage → valid/invalid
```

## 🎨 Patrones de Diseño Utilizados

### **1. Container/Presentational Pattern**
```javascript
// Container (lógica)
const HomePage = () => {
  const [state, setState] = useState();
  const handleAction = () => { /* lógica */ };
  
  return <WelcomePage data={state} onAction={handleAction} />;
};

// Presentational (solo UI)
const WelcomePage = ({ data, onAction }) => {
  return <div onClick={onAction}>{data}</div>;
};
```

### **2. Custom Hooks Pattern**
```javascript
// Hook personalizado para tema
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

// Uso en componentes
const MyComponent = () => {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  // ...
};
```

### **3. Render Props Pattern (implícito)**
```javascript
// ThemeProvider proporciona datos a children
<ThemeProvider>
  {/* Todos los children tienen acceso al tema */}
  <App />
</ThemeProvider>
```

## 🔧 Optimizaciones Implementadas

### **1. Lazy Loading de Recursos**
```javascript
// Bootstrap y Font Awesome se cargan de forma asíncrona
const bootstrapScript = document.createElement("script");
bootstrapScript.defer = true;  // No bloquea el parsing
```

### **2. Memoización de Estilos**
```javascript
// Los colores se calculan una vez por cambio de tema
const colors = isDarkMode ? darkColors : lightColors;
```

### **3. Event Cleanup**
```javascript
// Eliminación de modales después del uso
modal.addEventListener('hidden.bs.modal', function () {
  this.remove();  // Previene memory leaks
});
```

### **4. Persistencia Eficiente**
```javascript
// Solo se guarda en localStorage cuando cambia
const toggleTheme = () => {
  setIsDarkMode(prev => {
    const newValue = !prev;
    localStorage.setItem('isDarkMode', JSON.stringify(newValue));
    return newValue;
  });
};
```

## 🧪 Debugging y Herramientas

### **1. Console Logging Estratégico**
```javascript
onClick={() => {
  console.log("Archivo procesado correctamente");
  // Debug info para desarrollo
}}
```

### **2. Error Boundaries (recomendado)**
```javascript
// Para futuras implementaciones
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

## 📋 Convenciones de Código

### **1. Naming Conventions**
- **Componentes**: PascalCase (`HomePage`, `NavBar`)
- **Funciones**: camelCase (`handleFileChange`, `toggleTheme`)
- **Variables**: camelCase (`isDarkMode`, `fileContent`)
- **Constantes**: UPPER_SNAKE_CASE (`ALLOWED_EXTENSIONS`)

### **2. File Organization**
- **Index exports**: Cada carpeta puede tener index.js para exports limpios
- **Single responsibility**: Un componente por archivo
- **Related grouping**: Componentes relacionados en carpetas

### **3. Props Validation**
```javascript
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onAction: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object)
};

MyComponent.defaultProps = {
  onAction: () => {},
  items: []
};
```

---

**Esta documentación proporciona una comprensión completa del funcionamiento interno del código, patrones utilizados y mejores prácticas implementadas.**
