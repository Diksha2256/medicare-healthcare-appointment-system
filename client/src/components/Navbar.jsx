import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };
  const navigate = useNavigate();

const token = localStorage.getItem("token");

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
};

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        🩺 <span>MediCare</span>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Navigation */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>

        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/doctors"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Doctors
        </NavLink>

        <NavLink
          to="/appointment"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Appointments
        </NavLink>

        <NavLink
          to="/dashboard"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Dashboard
        </NavLink>
{!token ? (
  <>
    <NavLink
      to="/login"
      onClick={closeMenu}
      className="login-link"
    >
      Login
    </NavLink>

    <NavLink
      to="/register"
      onClick={closeMenu}
      className="register-link"
    >
      Register
    </NavLink>
  </>
) : (
  <button
    onClick={() => {
      closeMenu();
      handleLogout();
    }}
    className="logout-button"
  >
    Logout
  </button>
)}

      </div>

    </nav>
  );
}

export default Navbar;