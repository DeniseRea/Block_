import PropTypes from 'prop-types';

export const InputField=({ label, type, value, onChange, required = false })=>{
return (
    <div className="input-field">   
        <label>{label}</label>
      <input type={type} value={value} onChange={onChange} required={required} />
    </div>
)
}

//definimos que es requerido todo
InputField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool
}
