import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/UserHomePage.css";

const UserHomePage = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/books/history", {
          headers: {
            "x-auth-token": token,
          },
        });
        if (res.data.msg) {
          setMessage(res.data.msg);
        } else {
          setBooks(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div class="container">
      <h1>User Home Page</h1>
      {message && <p>{message}</p>}
      {books.length > 0 && (
        <div>
          <h2>Your Book History</h2>
          <ul>
            {books.map((book) => (
              <li key={book._id}>
                {book.title} by {book.author} (Borrowed on:{" "}
                {new Date(book.borrowedDate).toLocaleDateString()})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserHomePage;
