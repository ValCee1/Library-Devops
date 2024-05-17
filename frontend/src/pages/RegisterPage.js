// frontend/src/pages/RegisterPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;
  const navigate = useNavigate(); // Initialize useNavigate hook

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      console.log(res.data); // Handle success (e.g., save token, redirect)
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      console.error(err.response.data); // Handle error
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
