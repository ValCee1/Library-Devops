// frontend/src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/search" element={<SearchPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
