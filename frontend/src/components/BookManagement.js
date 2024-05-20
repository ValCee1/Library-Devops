// frontend/src/components/BookManagement.js

import React, { useState } from "react";
import axios from "axios";
import "../pages/css/BookManagement.css";

const BookManagement = ({ books }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const addBook = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/books",
        { title, author },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      // Refresh book list or handle state update
    } catch (err) {
      setError("Error adding book");
    }
  };

  const deleteBook = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      // Refresh book list or handle state update
    } catch (err) {
      setError("Error deleting book");
    }
  };

  const sendReminders = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/reminders/send-reminders",
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      // Display success message or handle state update
    } catch (err) {
      setError("Error sending reminders");
    }
  };

  return (
    <div className="book-management">
      <h2>Book Management</h2>
      {error ? <p>{error}</p> : null}
      <div className="add-book-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={addBook}>Add Book</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isAvailable ? "Available" : "Borrowed"}</td>
              <td>
                <button onClick={() => deleteBook(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={sendReminders}>Send Reminders</button>
    </div>
  );
};

export default BookManagement;
