// src/components/Navbar/NavItem.jsx
import PropTypes from "prop-types";

export const NavItem = ({ onClick, icon }) => (
  <li className="nav-item">
    <button 
      className="btn p-2 d-flex align-items-center justify-content-center" 
      onClick={onClick}
      style={{ background: 'none', border: 'none' }}
    >
      {icon}
    </button>
  </li>
);

NavItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
};
