import React from "react";
import { SectionTitle } from "../../components/SectionTitle";
import { TeamCarousel } from "../../components/TeamCarousel";
import { MascotCard } from "../../components/MascotCard";
import { ThemeToggle } from "../../components/ThemeToggle";
import { NavBar } from "../../components/NavBar/NavBar";
import { useTheme } from "../../context/ThemeContext";
import ESPEcito from "../../assets/ESPEcito.png";

export const WelcomePage = ({ name, showNavBar = true }) => {
  const { colors } = useTheme();

  const team = [
    {
      photo: "https://avatars.githubusercontent.com/u/132452462?v=4",
      name: "Mesias",
      role: "Desarrollador",
      description: "Especialista en Frontend",
      github: "https://github.com/AMVMesias",
      linkedin: "https://www.linkedin.com",
    },
    {
      photo: "https://avatars.githubusercontent.com/u/96481219?v=4",
      name: "Julio",
      role: "Desarrollador",
      description: "Experto en Backend",
      github: "https://github.com/JulioViche",
      linkedin: "https://www.linkedin.com",
    },
    {
      photo: "https://avatars.githubusercontent.com/u/105187806?v=4",
      name: "Denise",
      role: "Diseñadora",
      description: "Creativa y apasionada por el diseño",
      github: "https://github.com/DeniseRea",
      linkedin: "https://www.linkedin.com",
    },
  ];

  return (
    <div 
      className="position-relative"
      style={{ 
        backgroundColor: colors.background,
        color: colors.text,
        minHeight: '100vh'
      }}
    >
      {showNavBar && <NavBar />}
      {showNavBar && <ThemeToggle />}
      
      <div 
        className="welcome-container"
        style={{ 
          marginLeft: showNavBar ? '60px' : '0',
          padding: '2rem'
        }}
      >
        <div className="container-fluid">
          {/* Header Section */}
          <div className="welcome-header fade-in-up">
            <div className="blockchain-subtitle float-animation">
              <i className="fas fa-link me-2"></i>
              Sistema Blockchain
            </div>
            <h1 className="welcome-title">
              ¡Bienvenido, {name}!
            </h1>
            <h2 className="welcome-subtitle" style={{ color: colors.text }}>
              Nos da gusto tenerte aquí de nuevo
            </h2>
            <p className="welcome-description" style={{ color: colors.textSecondary }}>
              Has iniciado sesión correctamente en nuestro sistema de blockchain seguro y confiable. 
              Explora todas las funcionalidades que tenemos para ti: gestión de bloques, 
              validación de transacciones, auditoría y mucho más.
            </p>
          </div>

          {/* Team Section - Movido antes que la mascota */}
          <div className="team-section">
            <SectionTitle 
              icon={<i className="fas fa-users"></i>}
              title="Nuestro Equipo"
              subtitle="Conoce a quienes hicieron este proyecto posible" 
            />
            <div className="row justify-content-center">
              <div className="col-md-8">
                <TeamCarousel team={team} />
              </div>
            </div>
          </div>

          {/* Mascot Section - Movido después del equipo */}
          <div className="row justify-content-center my-5">
            <div className="col-md-6">
              <div className="mascot-section">
                <SectionTitle 
                  icon={<i className="fas fa-paw"></i>}
                  title="Conoce a ESPEcito"
                  subtitle="Nuestra mascota oficial de la carrera"
                />
                <div className="d-flex justify-content-center">
                  <MascotCard 
                    name="ESPEcito"
                    description="¡Hola! Soy ESPEcito, la mascota oficial de la carrera de Ingeniería en Sistemas de la ESPE. Estoy aquí para acompañarte en tu viaje académico y profesional. ¡Vamos a explorar juntos el mundo de la tecnología blockchain!"
                    image={ESPEcito}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div 
                className="card h-100 text-center p-4 feature-card"
                style={{ 
                  backgroundColor: colors.card,
                  color: colors.text,
                  border: `1px solid ${colors.border}`
                }}
              >
                <div className="card-body">
                  <i className="fas fa-link fa-3x mb-3" style={{ color: colors.primary }}></i>
                  <h5 className="card-title" style={{ color: colors.primary }}>Blockchain</h5>
                  <p className="card-text" style={{ color: colors.textSecondary }}>
                    Explora nuestra implementación de blockchain segura y eficiente con tecnología de vanguardia
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div 
                className="card h-100 text-center p-4 feature-card"
                style={{ 
                  backgroundColor: colors.card,
                  color: colors.text,
                  border: `1px solid ${colors.border}`
                }}
              >
                <div className="card-body">
                  <i className="fas fa-shield-alt fa-3x mb-3" style={{ color: colors.success }}></i>
                  <h5 className="card-title" style={{ color: colors.success }}>Seguridad</h5>
                  <p className="card-text" style={{ color: colors.textSecondary }}>
                    Máxima seguridad en todas las transacciones y validaciones con encriptación avanzada
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div 
                className="card h-100 text-center p-4 feature-card"
                style={{ 
                  backgroundColor: colors.card,
                  color: colors.text,
                  border: `1px solid ${colors.border}`
                }}
              >
                <div className="card-body">
                  <i className="fas fa-rocket fa-3x mb-3" style={{ color: colors.warning }}></i>
                  <h5 className="card-title" style={{ color: colors.warning }}>Innovación</h5>
                  <p className="card-text" style={{ color: colors.textSecondary }}>
                    Tecnología de vanguardia para el futuro digital con soluciones innovadoras
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Blockchain Features */}
          <div className="row mt-5">
            <div className="col-12">
              <SectionTitle 
                icon={<i className="fas fa-cube"></i>}
                title="Funcionalidades Blockchain"
                subtitle="Descubre todo lo que puedes hacer con nuestro sistema"
              />
            </div>
            <div className="col-md-6 mb-4">
              <div 
                className="card h-100 p-4 feature-card"
                style={{ 
                  backgroundColor: colors.card,
                  color: colors.text,
                  border: `1px solid ${colors.border}`
                }}
              >
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-plus-circle fa-2x me-3" style={{ color: colors.info }}></i>
                    <h5 className="card-title mb-0" style={{ color: colors.info }}>Crear Bloques</h5>
                  </div>
                  <p className="card-text" style={{ color: colors.textSecondary }}>
                    Crea y gestiona nuevos bloques en la cadena con validación automática
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div 
                className="card h-100 p-4 feature-card"
                style={{ 
                  backgroundColor: colors.card,
                  color: colors.text,
                  border: `1px solid ${colors.border}`
                }}
              >
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-search fa-2x me-3" style={{ color: colors.secondary }}></i>
                    <h5 className="card-title mb-0" style={{ color: colors.secondary }}>Validar Transacciones</h5>
                  </div>
                  <p className="card-text" style={{ color: colors.textSecondary }}>
                    Verifica y valida transacciones con algoritmos de consenso avanzados
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
