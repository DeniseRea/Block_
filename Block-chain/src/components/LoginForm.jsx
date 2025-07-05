import { Button } from "./Button";
import { InputField } from "./InputField";

export const LoginForm = ({ onSubmit, username, password, onUsernameChange, onPasswordChange }) => {
  return (
    <form onSubmit={onSubmit} className="p-4 bg-light border rounded shadow-sm">
      <InputField label="Usuario" type="text" value={username} onChange={onUsernameChange} required />
      <InputField label="Contraseña" type="password" value={password} onChange={onPasswordChange} required />
      <Button type="submit">Iniciar Sesión</Button>
    </form>
  );
};
