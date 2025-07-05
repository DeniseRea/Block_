import PropTypes from 'prop-types';

export const InputField = ({ label, type, value, onChange, required, accept }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        value={value}
        onChange={onChange}
        required={required}
        accept={accept} // Aceptar tipos específicos de archivos
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string, // Para tipo 'file' no lo usamos
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  accept: PropTypes.string, // Aceptamos un tipo de archivo, ej: '.txt,.csv'
};
