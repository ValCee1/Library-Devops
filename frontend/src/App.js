import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserHomePage from "./pages/UserHomePage";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import AdminHomePage from "./pages/AdminHomePage";
import "./pages/css/App.css";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/user/home"
          element={<PrivateRoute element={<UserHomePage />} />}
        />
        <Route exact path="/admin-home" element={<AdminHomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
