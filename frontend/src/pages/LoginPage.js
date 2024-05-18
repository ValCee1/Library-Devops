import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/LoginPage.css";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        identifier,
        password,
      });
      const { token } = res.data;

      // Decode the token to get user information
      const user = JSON.parse(atob(token.split(".")[1]));

      // Store the token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", user.user.isAdmin);

      // Redirect based on admin status
      if (user.user.isAdmin) {
        navigate("/admin-home");
      } else {
        navigate("/user-home");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
