# ⚛️ Conceptos de React Implementados

## 🎯 Hooks Utilizados

### **1. useState - Manejo de Estado Local**
```javascript
// Ejemplo en UpdatePage.jsx
const [fileContent, setFileContent] = useState("");
const [fileName, setFileName] = useState("");
const [isFileLoaded, setIsFileLoaded] = useState(false);

// ¿Por qué useState?
// - Estado local del componente
// - Re-renderiza cuando cambia
// - Patrón immutable
```

### **2. useEffect - Efectos Secundarios**
```javascript
// Ejemplo en ThemeContext.jsx
useEffect(() => {
  document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
}, [isDarkMode]); // Dependency array

// Ejemplo en TeamCarousel.jsx
useEffect(() => {
  const carouselElement = document.getElementById("teamCarousel");
  if (carouselElement) {
    new bootstrap.Carousel(carouselElement, {
      interval: 5000,
      ride: "carousel",
    });
  }
}, []); // Solo una vez al montar

// ¿Por qué useEffect?
// - DOM manipulation
// - Event listeners
// - API calls
// - Cleanup functions
```

### **3. useContext - Estado Global**
```javascript
// Creación del Context
const ThemeContext = createContext();

// Hook personalizado
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Uso en componentes
const { colors, isDarkMode, toggleTheme } = useTheme();

// ¿Por qué useContext?
// - Evita prop drilling
// - Estado global sin Redux
// - Patrón Provider/Consumer
```

### **4. useLocation - React Router**
```javascript
// En HomePage.jsx
import { useLocation } from "react-router-dom";

const location = useLocation();
const usuario = location.state?.usuario || { name: "Usuario" };

// ¿Por qué useLocation?
// - Acceso a datos de navegación
// - Información de la URL actual
// - Estado pasado entre rutas
```

## 🏗️ Patrones de Componentes

### **1. Functional Components**
```javascript
// Patrón moderno preferido
const HomePage = ({ usuario }) => {
  // Hooks y lógica
  const [state, setState] = useState();
  
  // JSX return
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

// VS Class Components (obsoleto)
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return <div></div>;
  }
}
```

### **2. Controlled Components**
```javascript
// Input controlado por React
const LoginForm = ({ username, password, onUsernameChange, onPasswordChange }) => {
  return (
    <form>
      <input
        type="text"
        value={username}                    // Valor controlado por React
        onChange={onUsernameChange}         // Handler para cambios
        placeholder="Usuario"
      />
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Contraseña"
      />
    </form>
  );
};

// ¿Por qué Controlled Components?
// - Single source of truth
// - Validación en tiempo real
// - Estado predecible
```

### **3. Conditional Rendering**
```javascript
// Renderizado condicional múltiple
const ValidationPage = ({ fileContent }) => {
  const hasContent = fileContent && fileContent.trim().length > 0;
  
  return (
    <div>
      {hasContent ? (
        <>
          <div className="alert alert-success">¡Archivo válido!</div>
          <div className="content">{fileContent}</div>
          <button>Cargar</button>
        </>
      ) : (
        <div className="alert alert-warning">Archivo vacío</div>
      )}
    </div>
  );
};

// Operador ternario vs &&
{isLoading ? <Spinner /> : <Content />}        // Ternario para dos opciones
{isVisible && <Modal />}                       // && para mostrar/ocultar
```

### **4. Event Handling**
```javascript
// Event handlers con parámetros
const NavBar = ({ onNavigate, currentPage }) => {
  const navItems = [
    { key: "welcome", icon: FaHome, label: "Inicio" },
    { key: "upload", icon: FaUpload, label: "Subir" }
  ];

  return (
    <ul>
      {navItems.map(({ key, icon: Icon, label }) => (
        <NavItem
          key={key}
          onClick={() => onNavigate(key)}    // Closure para pasar parámetros
          icon={<Icon />}
          label={label}
          isActive={currentPage === key}
        />
      ))}
    </ul>
  );
};

// Event object handling
const handleFileChange = (event) => {
  const file = event.target.files[0];
  event.preventDefault();  // Prevenir comportamiento default
  // Lógica...
};
```

## 🔄 Comunicación Entre Componentes

### **1. Props Down, Events Up**
```javascript
// Parent Component
const HomePage = () => {
  const [activeComponent, setActiveComponent] = useState("welcome");
  
  return (
    <div>
      <NavBar 
        onNavigate={setActiveComponent}     // Función hacia abajo
        currentPage={activeComponent}       // Data hacia abajo
      />
      {renderContent()}
    </div>
  );
};

// Child Component
const NavBar = ({ onNavigate, currentPage }) => {
  return (
    <button onClick={() => onNavigate("upload")}>  {/* Evento hacia arriba */}
      Upload
    </button>
  );
};
```

### **2. Context para Estado Global**
```javascript
// Provider level (alto en el árbol)
<ThemeProvider>
  <App />
</ThemeProvider>

// Consumer level (cualquier nivel profundo)
const Button = () => {
  const { colors } = useTheme();  // Acceso directo sin props
  return <button style={{ backgroundColor: colors.primary }}>Click</button>;
};
```

### **3. Render Props Pattern (implícito)**
```javascript
// ThemeProvider actúa como render prop
const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}  {/* Render prop implícito */}
    </ThemeContext.Provider>
  );
};
```

## 🎨 JSX Patterns

### **1. Dynamic Class Names**
```javascript
// Condicional simple
<div className={`carousel-item ${index === 0 ? "active" : ""}`}>

// Con template literals
<button 
  className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
  style={{ 
    backgroundColor: isActive ? colors.primary : colors.secondary 
  }}
>
```

### **2. Dynamic Styles**
```javascript
// Inline styles con objetos
<div 
  style={{ 
    backgroundColor: colors.background,
    color: colors.text,
    minHeight: '100vh',
    marginLeft: showNavBar ? '60px' : '0'  // Condicional
  }}
>

// Computed styles
const buttonStyle = {
  backgroundColor: colors.primary,
  color: colors.light,
  border: `1px solid ${colors.primary}`,
  borderRadius: '8px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease'
};
```

### **3. List Rendering**
```javascript
// Map con key props
{team.map((member, index) => (
  <div key={index} className="carousel-item">  {/* Key obligatorio */}
    <TeamMemberCard {...member} />             {/* Spread operator */}
  </div>
))}

// Destructuring en map
{navItems.map(({ key, icon: Icon, label }) => (  // Renaming con :
  <NavItem
    key={key}
    icon={<Icon className="fs-4" />}
    label={label}
  />
))}
```

### **4. Fragment Usage**
```javascript
// Fragment explícito
<React.Fragment>
  <div>Elemento 1</div>
  <div>Elemento 2</div>
</React.Fragment>

// Fragment implícito (shorthand)
<>
  <div>Elemento 1</div>
  <div>Elemento 2</div>
</>

// ¿Cuándo usar Fragment?
// - Evitar div wrappers innecesarios
// - Mantener estructura HTML semántica
```

## 🔧 Performance Patterns

### **1. Dependency Arrays en useEffect**
```javascript
// Sin dependencies - se ejecuta en cada render
useEffect(() => {
  console.log('Every render');
});

// Con array vacío - solo una vez
useEffect(() => {
  console.log('Component mounted');
}, []);

// Con dependencies específicas
useEffect(() => {
  document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
}, [isDarkMode]);  // Solo cuando isDarkMode cambia
```

### **2. Memoization (futuro)**
```javascript
// useMemo para cálculos costosos
const expensiveValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// useCallback para funciones
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// React.memo para componentes
const MemoizedComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

## 🎯 Error Handling Patterns

### **1. Error Boundaries (clase)**
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### **2. Try-Catch en useEffect**
```javascript
useEffect(() => {
  const initializeCarousel = async () => {
    try {
      const carouselElement = document.getElementById("teamCarousel");
      if (carouselElement) {
        new bootstrap.Carousel(carouselElement);
      }
    } catch (error) {
      console.error('Carousel initialization failed:', error);
    }
  };
  
  initializeCarousel();
}, []);
```

### **3. Conditional Rendering para Errores**
```javascript
const MyComponent = () => {
  const [error, setError] = useState(null);
  
  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }
  
  return <div>Normal content</div>;
};
```

## 🔄 React Router Patterns

### **1. Navegación Programática**
```javascript
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de login...
    navigate("/home", { 
      state: { usuario: { name: username } }  // Pasar datos
    });
  };
};
```

### **2. Route Configuration**
```javascript
// En main.jsx
<Router>
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/welcome" element={<WelcomePage name="Usuario" />} />
    <Route path="/home" element={<HomePage />} />
  </Routes>
</Router>
```

### **3. Protected Routes (pattern)**
```javascript
// Pattern para rutas protegidas (futuro)
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Uso
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

---

**Estos patrones de React forman la base arquitectónica del proyecto y representan las mejores prácticas modernas de desarrollo.**
