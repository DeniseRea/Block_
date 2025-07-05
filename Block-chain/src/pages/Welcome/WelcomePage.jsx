export const WelcomePage = ({ name }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="mb-4">¡Bienvenido, {name}!</h1>
        <h1 className="mb-4">Nos da gusto tenerte aquí de nuevo</h1>
        <p className="lead">Has iniciado sesión correctamente.</p>
      </div>
    </div>
  );
};
