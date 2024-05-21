// src/components/ReturnBooks.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ReturnBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/books");
        setBorrowedBooks(data.filter((book) => !book.available));
      } catch (error) {
        console.error(
          "Error fetching books:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchBooks();
  }, []);

  const handleReturn = async (bookId) => {
    try {
      await axios.post("http://localhost:5000/api/books/return", { bookId });
      setBorrowedBooks(borrowedBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error(
        "Error returning book:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div>
      <h2>Return Books</h2>
      <ul>
        {borrowedBooks.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author}{" "}
            <button onClick={() => handleReturn(book._id)}>Return</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReturnBooks;
