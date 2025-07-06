// src/components/Navbar/NavItem.jsx
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const NavItem = ({ to, label, icon }) => (
  <li className="nav-item">
    <Link className="nav-link d-flex align-items-center" to={to}>
      {icon && <span className="me-2">{icon}</span>}
      {label}
    </Link>
  </li>
);

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node, // Puede ser un componente React o un elemento JSX
};
