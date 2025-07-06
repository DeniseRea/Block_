import PropTypes from "prop-types";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { ImageDisplay } from "../../components/ImageDisplay";

export const LoginForm = ({ onSubmit, username, password, onUsernameChange, onPasswordChange }) => {
  return (
    <form onSubmit={onSubmit} className="p-4 bg-light border rounded shadow-sm">
      <div className="text-center mb-4">
        <ImageDisplay src="/src/assets/user_michi.png" alt="Usuario" />
      </div>
      <InputField label="Usuario" type="text" value={username} onChange={onUsernameChange} required />
      <InputField label="Contraseña" type="password" value={password} onChange={onPasswordChange} required />
      <Button type="submit">Iniciar Sesión</Button>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
};