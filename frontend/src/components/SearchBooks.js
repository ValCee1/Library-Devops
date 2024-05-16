// src/components/SearchBooks.js

import React, { useState } from "react";
import axios from "axios";

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/books?search=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching for books:", error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Search Books</h2>
      <input
        type="text"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBooks;
