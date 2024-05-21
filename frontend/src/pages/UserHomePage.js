// frontend/src/pages/UserHomePage.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/UserHomePage.css";

const UserHomePage = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBook, setBorrowedBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      } catch (err) {
        setError("Error fetching books");
      }
    };

    const fetchBorrowedBook = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books/borrowed");
        setBorrowedBook(res.data);
      } catch (err) {
        setError("Error fetching borrowed book");
      }
    };

    fetchBooks();
    fetchBorrowedBook();
  }, []);

  const borrowBook = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/books/borrow/${id}`,
        {},
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      setBorrowedBook(res.data);
    } catch (err) {
      setError("Error borrowing book");
    }
  };

  return (
    <div className="user-home-page">
      <h1>User Dashboard</h1>
      {error && <div className="error">{error}</div>}
      <div className="book-list">
        {books.map((book) => (
          <div key={book._id} className="book-item">
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Available: {book.available ? "Yes" : "No"}</p>
            {book.available && !borrowedBook && (
              <button onClick={() => borrowBook(book._id)}>Borrow</button>
            )}
          </div>
        ))}
      </div>
      {borrowedBook && (
        <div>
          <h2>Your Borrowed Book</h2>
          <div className="book-item">
            <h2>{borrowedBook.title}</h2>
            <p>Author: {borrowedBook.author}</p>
            <p>ISBN: {borrowedBook.isbn}</p>
            <p>
              Due Date: {new Date(borrowedBook.dueDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHomePage;

/*
// src/pages/UserHomePage.js

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/UserHomePage.css";

const UserHomePage = () => {
  const [books, setBooks] = useState([]);
  const [bookHistory, setBookHistory] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  const fetchBookHistory = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/bookhistory",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setBookHistory(response.data);
    } catch (error) {
      console.error("Error fetching book history:", error);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
    fetchBookHistory();
  }, [fetchBooks, fetchBookHistory]);

  const handleBorrow = async (bookId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/books/borrow/${bookId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // Refresh the book list and history
      fetchBooks();
      fetchBookHistory();
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  };

  return (
    <div className="user-homepage">
      <div className="welcome-message">Welcome to the Library!</div>

      <div className="book-list">
        {books.map((book) => (
          <div key={book._id} className="book-item">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Status: {book.isAvailable ? "Available" : "Borrowed"}</p>
            {book.isAvailable && (
              <button
                className="borrow-button"
                onClick={() => handleBorrow(book._id)}
              >
                Borrow Book
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="book-history">
        <h3>Your Book History</h3>
        {bookHistory.length === 0 ? (
          <p>You have not borrowed or returned any book yet</p>
        ) : (
          bookHistory.map((history) => (
            <div key={history.book._id} className="book-history-item">
              <p>Title: {history.book.title}</p>
              <p>
                Borrowed Date:{" "}
                {new Date(history.borrowedDate).toLocaleDateString()}
              </p>
              <p>Due Date: {new Date(history.dueDate).toLocaleDateString()}</p>
              <p>Status: {history.returned ? "Returned" : "Not Returned"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserHomePage;
*/
