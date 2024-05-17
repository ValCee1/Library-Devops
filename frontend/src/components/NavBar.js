// frontend/src/components/NavBar.js

import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/borrow">Borrow Book</Link>
        </li>
        <li>
          <Link to="/return">Return Book</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
