// src/pages/UserHomePage.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/UserHomePage.css";

const UserHomePage = () => {
  const [books, setBooks] = useState([]);
  const [bookHistory, setBookHistory] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/api/books", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      if (error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const fetchBookHistory = async () => {
    try {
      const response = await axios.get("/api/users/bookhistory", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBookHistory(response.data);
    } catch (error) {
      console.error("Error fetching book history:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchBookHistory();
  }, [navigate]);

  const handleBorrow = async (bookId) => {
    try {
      await axios.post(
        `/api/books/borrow/${bookId}`,
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
