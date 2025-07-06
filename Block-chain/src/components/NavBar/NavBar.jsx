import { NavItem } from "./NavItem";
import { FaHome, FaUpload, FaList, FaClipboardCheck, FaCog, FaStar, FaUser } from "react-icons/fa";

export const NavBar = ({ onNavigate }) => (
  <nav className="navbar bg-primary vh-100 d-flex flex-column justify-content-center align-items-center">
    <ul className="navbar-nav text-white gap-3">
      <NavItem 
        onClick={() => onNavigate("welcome")} 
        icon={<FaHome className="text-white fs-4" />} 
      />
      <NavItem 
        onClick={() => onNavigate("upload")} 
        icon={<FaUpload className="text-white fs-4" />} 
      />
      <NavItem 
        onClick={() => onNavigate("list")} 
        icon={<FaList className="text-white fs-4" />} 
      />
      <NavItem 
        onClick={() => onNavigate("audit")} 
        icon={<FaClipboardCheck className="text-white fs-4" />} 
      />
      <NavItem 
        onClick={() => onNavigate("config")} 
        icon={<FaCog className="text-white fs-4" />} 
      />
      <NavItem 
        onClick={() => onNavigate("points")} 
        icon={<FaStar className="text-white fs-4" />} 
      />
      <NavItem 
        onClick={() => onNavigate("user")} 
        icon={<FaUser className="text-white fs-4" />} 
      />
    </ul>
  </nav>
);
