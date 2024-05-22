// frontend/src/components/BookList.js

import React, { useEffect, useState } from "react";
import api from "../config/axios";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/api/books/all");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>All Books</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <h3>{book.title}</h3>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>ISBN:</strong> {book.isbn}
              </p>
              <p>
                <strong>Available Copies:</strong> {book.availableCopies}
              </p>
              <p>
                <strong>Total Copies:</strong> {book.totalCopies}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
