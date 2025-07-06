import { NavBar } from "../../components/NavBar/NavBar";
import { WelcomePage } from "../Welcome/WelcomePage";

export const HomePage = (usuario) => {
  return (
    <div className="d-flex vh-100">
      {/* Columna izquierda: NavBar */}
      <div className="bg-primary text-white" style={{ width: "80px" }}>
        <NavBar />
      </div>

      {/* Columna derecha: Contenido principal */}
      <div className="flex-grow-1 bg-light p-4">
        <WelcomePage name={usuario.name} />
      </div>
    </div>
  );
};
