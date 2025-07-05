import { Button } from "./Button"
import { InputField } from "./InputField"

export const LoginForm = ({ onSubmit, username, password, onUsernameChange, onPasswordChange }) => {

    return (
        <form onSubmit={onSubmit}>
            <InputField label="Username" type="text" value={username} onChange={onUsernameChange} required />
            <InputField label="Password" type="password" value={password} onChange={onPasswordChange} required />
            <Button type="submit">Iniciar Sesión</Button>
        </form>
    )
}