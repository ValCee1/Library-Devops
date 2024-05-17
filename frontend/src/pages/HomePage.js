// frontend/src/pages/HomePage.js

import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Library App</h1>
      <p>Find and borrow your favorite books online!</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/search" style={{ marginRight: "20px" }}>
          Search for Books
        </Link>
        <Link to="/profile">View Profile</Link>
      </div>
    </div>
  );
};

export default HomePage;
