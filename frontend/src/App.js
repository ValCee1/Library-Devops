// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import SearchBooks from "./components/SearchBooks";
import BorrowBooks from "./components/BorrowBooks";
import ReturnBooks from "./components/ReturnBooks";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
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
