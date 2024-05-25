// frontend/src/pages/UserHomePage.js

import React, { useEffect, useState } from "react";
import api from "../config/axios";
import "./css/UserHomePage.css"; // Import the CSS file for styling

const UserHomePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);
  const [borrowedBook, setBorrowedBook] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(res.data);
      } catch (err) {
        setError("Error fetching user data");
      }
    };

    const fetchBooks = async () => {
      try {
        const res = await api.get("/api/books", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBooks(res.data);
      } catch (err) {
        setError("Error fetching books");
      }
    };

    const fetchBorrowedBook = async () => {
      try {
        const res = await api.get("/api/books/borrowed", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBorrowedBook(res.data);
      } catch (err) {
        setError("Error fetching borrowed book");
      }
    };

    fetchUser();
    fetchBooks();
    fetchBorrowedBook();
  }, []);

  const borrowBook = async (id) => {
    try {
      const res = await api.post(
        `/api/books/borrow/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setBorrowedBook(res.data);
    } catch (err) {
      setError("Error borrowing book");
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-home-page">
      <h1 className="title">User Dashboard</h1>
      <h2 className="welcome">Welcome, {user.username}</h2>
      {error && <div className="error">{error}</div>}
      <div className="container">
        <h2>Your Borrowed Books</h2>
        {borrowedBook.length === 0 ? (
          <p>You have not borrowed or returned any book yet</p>
        ) : (
          <ul className="book-list">
            {books.map((borrowedBook) => (
              <li key={borrowedBook._id} className="book-item">
                <h3>{borrowedBook.title}</h3>
                <p>Author: {borrowedBook.author}</p>
                <p>
                  Borrowed Date:{" "}
                  {borrowedBook.borrowedDate
                    ? new Date(borrowedBook.borrowedDate).toLocaleDateString()
                    : "N/A"}
                </p>
                {borrowedBook.returnDate ? (
                  <p>
                    Returned Date:{" "}
                    {new Date(borrowedBook.returnDate).toLocaleDateString()}
                  </p>
                ) : (
                  <p>
                    Due Date:{" "}
                    {new Date(borrowedBook.dueDate).toLocaleDateString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="book-list">
        {books.map((book) => (
          <div key={book._id} className="book-item">
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Available: {book.isAvailable ? "Yes" : "No"}</p>
            {book.isAvailable && !borrowedBook && (
              <button onClick={() => borrowBook(book._id)}>Borrow</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHomePage;
