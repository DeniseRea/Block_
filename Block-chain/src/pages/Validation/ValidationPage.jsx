export const ValidationPage = ({ fileContent }) => {

    /**aqui irian las validaciones*/
    const isValid = fileContent.includes("cadena:");

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center">Validar archivo</h2>
            {isValid ? (
                <div className="alert alert-success" role="alert">
                    El archivo es válido.
                </div>
            ) : (
                <div className="alert alert-danger" role="alert">
                    El archivo no es válido.
                </div>
            )}
        </div>
    );
};