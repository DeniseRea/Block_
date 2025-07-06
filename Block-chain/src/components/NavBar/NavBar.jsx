// src/components/Navbar/UserDropdown.jsx
import { NavItem } from "./NavItem";
import { FaHome, FaUpload, FaList, FaClipboardCheck, FaCog, FaStar, FaUser } from "react-icons/fa"; // Importación de íconos

export const NavBar = () => (
  <nav className="navbar bg-primary vh-100 d-flex flex-column justify-content-center align-items-center">
    <ul className="navbar-nav text-white gap-5"> {/* Agregamos gap entre los íconos */}
      <NavItem to="/welcome" icon={<FaHome className="text-white fs-4" />} />
      <NavItem to="/upload" icon={<FaUpload className="text-white fs-4" />} />
      <NavItem to="/list" icon={<FaList className="text-white fs-4" />} />
      <NavItem to="/audit" icon={<FaClipboardCheck className="text-white fs-4" />} />
      <NavItem to="/config" icon={<FaCog className="text-white fs-4" />} />
      <NavItem to="/points" icon={<FaStar className="text-white fs-4" />} />
      <NavItem to="/user" icon={<FaUser className="text-white fs-4" />} />
    </ul>
  </nav>
);
