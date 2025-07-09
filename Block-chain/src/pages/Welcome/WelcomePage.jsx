import { SectionTitle } from "../../components/SectionTitle";
import { TeamCarousel } from "../../components/TeamCarousel";

export const WelcomePage = ({ name }) => {
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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="mb-4">¡Bienvenido, {name}!</h1>
        <h1 className="mb-4">Nos da gusto tenerte aquí de nuevo</h1>
        <p className="lead">Has iniciado sesión correctamente.</p>
      </div>
      <div>
        <SectionTitle subtitle="Conoce a quienes hicieron este proyecto posible" />
        <div
          className="d-flex justify-content-center mt-4"
          style={{ width: "400px", margin: "0 auto" }} // Limitar ancho del carrusel
        >
          <TeamCarousel team={team} />
        </div>
      </div>
    </div>
  );
};
