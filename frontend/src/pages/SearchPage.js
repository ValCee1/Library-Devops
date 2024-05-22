// frontend/src/pages/SearchPage.js

import React, { useState } from "react";
import api from "../config/axios";
import "./css/SearchPage.css";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await api.get(`/api/books/search?query=${query}`);
      setBooks(res.data);
    } catch (err) {
      console.error(err.message);
      alert("Error searching for books");
    }
  };

  const handleBorrow = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to borrow books");
        return;
      }
      await api.post(
        `/api/books/borrow/${bookId}`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      alert("Book borrowed successfully");
      handleSearch(); // Refresh the search results
    } catch (err) {
      console.error(err.message);
      alert("Error borrowing the book");
    }
  };

  return (
    <div className="container">
      <h1>Search for Books</h1>

      <div className="form-group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>

      <div className="results">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="book">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <button
                onClick={() => handleBorrow(book._id)}
                disabled={!book.isAvailable}
              >
                {book.isAvailable ? "Borrow" : "Unavailable"}
              </button>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
