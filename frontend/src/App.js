// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import SearchBooks from "./components/SearchBooks";
import BorrowBooks from "./components/BorrowBooks";
import ReturnBooks from "./components/ReturnBooks";

import HomePage from "./pages/HomePage"; // Assuming you have a HomePage component
import NavBar from "./components/NavBar"; // Import the NavBar component

const App = () => {
  return (
    <Router>
      <NavBar /> {/* Include the NavBar component */}
      <div>
        <Routes>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchBooks />} />
          <Route path="/borrow" element={<BorrowBooks />} />
          <Route path="/return" element={<ReturnBooks />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
