import React from "react";
import { SectionTitle } from "../../components/SectionTitle";
import { LoginForm } from "./LoginForm";
import { ThemeToggle } from "../../components/ThemeToggle";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook para redirigir
  const { colors } = useTheme();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica de validación si es necesario
    console.log(`Usuario: ${username}, Contraseña: ${password}`);
    // Redirige a la página HomePage pasando el usuario
    navigate("/home", { state: { usuario: { name: username } } });
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ 
        backgroundColor: colors.background,
        color: colors.text
      }}
    >
      <ThemeToggle />
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <SectionTitle title="Blockchain" />
        <h2 className="text-center mb-4" style={{ color: colors.text }}>
          Iniciar Sesión
        </h2>
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
