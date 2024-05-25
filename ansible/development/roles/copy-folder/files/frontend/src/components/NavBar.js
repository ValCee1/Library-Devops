// frontend/src/components/NavBar.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/css/NavBar.css"; // Import the CSS file

const NavBar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/search" className="navbar-link">
            Search
          </Link>
        </li>
        {!token ? (
          <>
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </li>
          </>
        ) : (
          <li className="navbar-item">
            <button onClick={handleLogout} className="navbar-link">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
