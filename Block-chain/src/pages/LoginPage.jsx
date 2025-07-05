import { useState } from "react";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
return (
    <div className="login-container">
      <h1>Iniciar sesion</h1>
      <LoginForm />
    </div>
  );
}

