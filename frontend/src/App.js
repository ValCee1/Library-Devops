// frontend/src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserHomePage from "./pages/UserHomePage";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./pages/UserManagement";
import NavBar from "./components/NavBar";
import "./pages/css/App.css";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/search" element={<SearchPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/user" element={<UserHomePage />} />
        <Route exact path="/admin" element={<AdminHomePage />} />
        <Route exact path="/admin/users" element={<UserManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
