import { LoginForm } from "./LoginForm";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Usuario: ${username}, Contraseña: ${password}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-body-secondary">
      <div className="w-100" style={{ maxWidth: "400px" }}>
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
