import PropTypes from 'prop-types';

export const Button = ({ type, children }) => {
  return (
    <button type={type} className="btn btn-primary w-100">
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired
};
