// frontend/src/pages/AdminHomePage.js

import React, { useEffect, useState } from "react";
import api from "../config/axios";
import "./css/AdminHomePage.css";

const AdminHomePage = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/api/admin/books", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBooks(res.data);
      } catch (err) {
        setError("Error fetching books");
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/admin/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsers(res.data);
      } catch (err) {
        setError("Error fetching users");
      }
    };

    fetchBooks();
    fetchUsers();
  }, []);

  const addBook = async (title, author, isbn) => {
    try {
      const res = await api.post(
        "/api/admin/books",
        { title, author, isbn },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setBooks([...books, res.data]);
    } catch (err) {
      setError("Error adding book");
    }
  };

  const deleteBook = async (id) => {
    try {
      await api.delete(`/api/admin/books/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      setError("Error deleting book");
    }
  };

  const returnBook = async (id) => {
    try {
      const res = await api.post(
        `/api/admin/return/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const updatedBooks = books.map((book) =>
        book._id === res.data._id ? res.data : book
      );
      setBooks(updatedBooks);
    } catch (err) {
      setError("Error returning book");
    }
  };

  const suspendUser = async (id) => {
    try {
      await api.patch(
        `/api/admin/users/suspend/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, suspended: true } : user
        )
      );
    } catch (err) {
      setError("Error suspending user");
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      setError("Error deleting user");
    }
  };

  return (
    <div className="admin-home-page">
      <h1>Admin Dashboard</h1>
      {error && <div className="error">{error}</div>}
      <div className="book-list">
        <h2>Books</h2>
        {books.map((book) => (
          <div key={book._id} className="book-item">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Available: {book.available ? "Yes" : "No"}</p>
            {book.borrowedBy && <p>Borrowed By: {book.borrowedBy}</p>}
            {book.dueDate && (
              <p>Due Date: {new Date(book.dueDate).toLocaleDateString()}</p>
            )}
            {!book.available && (
              <button onClick={() => returnBook(book._id)}>
                Mark as Returned
              </button>
            )}
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </div>
        ))}
        <div className="add-book">
          <h3>Add New Book</h3>
          <input type="text" placeholder="Title" id="title" />
          <input type="text" placeholder="Author" id="author" />
          <input type="text" placeholder="ISBN" id="isbn" />
          <button
            onClick={() =>
              addBook(
                document.getElementById("title").value,
                document.getElementById("author").value,
                document.getElementById("isbn").value
              )
            }
          >
            Add Book
          </button>
        </div>
      </div>
      <div className="user-list">
        <h2>Users</h2>
        {users.map((user) => (
          <div key={user._id} className="user-item">
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
            <p>Suspended: {user.suspended ? "Yes" : "No"}</p>
            <button onClick={() => suspendUser(user._id)}>Suspend</button>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHomePage;
