// src/components/BorrowBooks.js
import React, { useState, useEffect } from "react";
import api from "../config/axios";

const BorrowBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.get("/api/books");
        setBooks(data.filter((book) => book.available));
      } catch (error) {
        console.error(
          "Error fetching books:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchBooks();
  }, []);

  const handleBorrow = async (bookId) => {
    try {
      await api.post("/api/books/borrow", { bookId });
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error(
        "Error borrowing book:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div>
      <h2>Borrow Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author}{" "}
            <button onClick={() => handleBorrow(book._id)}>Borrow</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BorrowBooks;
