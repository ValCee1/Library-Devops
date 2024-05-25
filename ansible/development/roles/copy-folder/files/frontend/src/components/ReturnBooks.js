import React, { useEffect, useState } from "react";
import api from "../config/axios";

const ReturnBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/api/books");
        setBooks(res.data);
      } catch (err) {
        setError("Error fetching books");
      }
    };

    fetchBooks();
  }, []);

  const returnBook = async (id) => {
    try {
      const res = await api.post(
        `/api/books/return/${id}`,
        {},
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
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

  return (
    <div className="admin-home-page">
      <h1>Admin Dashboard</h1>
      {error && <div className="error">{error}</div>}
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
            {!book.available && (
              <button onClick={() => returnBook(book._id)}>
                Mark as Returned
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHomePage;
