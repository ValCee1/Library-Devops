// frontend/src/pages/AdminHomePage.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import UserManagement from "../components/UserManagement";
import "./css/AdminHomePage.css";

const AdminHomePage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [newBook, setNewBook] = useState({ title: "", author: "", isbn: "" });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      setError("Error fetching books");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks();
    } catch (err) {
      setError("Error deleting book");
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/books", newBook);
      setNewBook({ title: "", author: "", isbn: "" });
      fetchBooks();
    } catch (err) {
      setError("Error adding book");
    }
  };

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleReturn = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/books/return/${id}`, {
        userId: null,
      });
      fetchBooks();
    } catch (err) {
      setError("Error returning book");
    }
  };

  return (
    <div className="admin-home-page">
      <h1>Admin Dashboard</h1>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleAddBook}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={newBook.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newBook.author}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={newBook.isbn}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Book</button>
      </form>

      <UserManagement />

      <div className="book-list">
        {books.map((book) => (
          <div key={book._id} className="book-item">
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Available: {book.available ? "Yes" : "No"}</p>
            {book.borrowedBy && <p>Borrowed By: {book.borrowedBy}</p>}
            {book.dueDate && (
              <p>Due Date: {new Date(book.dueDate).toLocaleDateString()}</p>
            )}
            <div className="actions">
              <button className="delete" onClick={() => handleDelete(book._id)}>
                Delete
              </button>
              {!book.available && (
                <button onClick={() => handleReturn(book._id)}>Return</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHomePage;
