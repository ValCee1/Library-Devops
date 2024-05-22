// src/components/SearchBooks.js
import React, { useState } from "react";
import api from "../config/axios";

const SearchBooks = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.get(`/api/books/search?query=${query}`);
      setBooks(data);
    } catch (error) {
      console.error(
        "Error searching books:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div>
      <h2>Search Books</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBooks;
