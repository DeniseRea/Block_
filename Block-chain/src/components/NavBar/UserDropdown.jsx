import PropTypes from "prop-types";


export const UserDropdown = ({ username, onLogout }) => (
  <div className="dropdown">
    <button
      className="btn btn-secondary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {username}
    </button>
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <button className="dropdown-item" onClick={onLogout}>
          Cerrar sesión
        </button>
      </li>
    </ul>
  </div>
);

UserDropdown.propTypes = {
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};