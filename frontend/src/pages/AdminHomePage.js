import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/AdminHomePage.css";
import BookManagement from "../components/BookManagement";
import UserManagement from "../components/UserManagement";

const AdminHomePage = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/books", {
          headers: {
            "x-auth-token": token,
          },
        });
        setBooks(response.data);
      } catch (err) {
        setError("Error fetching books");
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            "x-auth-token": token,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError("Error fetching users");
      }
    };

    fetchBooks();
    fetchUsers();
  }, []);

  return (
    <div className="admin-homepage">
      <h1>Admin Dashboard</h1>
      {error ? <p>{error}</p> : null}
      <UserManagement users={users} />
      <BookManagement books={books} />
    </div>
  );
};

export default AdminHomePage;
