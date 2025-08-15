import React from "react";
import { SectionTitle } from "../../components/SectionTitle";
import { LoginForm } from "./LoginForm";
import { ThemeToggle } from "../../components/ThemeToggle";
import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { login, loggingIn, loginError } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      await login(username, password);
      navigate('/home');
    } catch (err) {
      // Los errores ya se manejan en useAuth
      console.error('Error en login:', err);
    }
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
        {loginError && (
          <div className="alert alert-danger" role="alert">
            {loginError}
          </div>
        )}
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          password={password}
          onUsernameChange={(e) => setUsername(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          isLoading={loggingIn}
        />
      </div>
    </div>
  );
}
