import { SectionTitle } from "../../components/SectionTitle";
import { LoginForm } from "./LoginForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook para redirigir

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica de validación si es necesario
    alert(`Usuario: ${username}, Contraseña: ${password}`);
    navigate("/welcome"); // Redirige a la página WelcomePage
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-body-secondary">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <SectionTitle title="Block Block" />
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          password={password}
          onUsernameChange={(e) => setUsername(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
  );
}
