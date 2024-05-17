// frontend/src/pages/SearchPage.js

import React, { useState } from "react";
import SearchForm from "../components/SearchForm";
import BookList from "../components/BookList"; // Assuming you have a BookList component to display search results

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchCriteria) => {
    try {
      const response = await fetch(
        `/api/books/search?title=${searchCriteria.title}&author=${searchCriteria.author}&genre=${searchCriteria.genre}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for books:", error);
    }
  };

  return (
    <div>
      <h2>Search for Books</h2>
      <SearchForm onSearch={handleSearch} />
      <BookList books={searchResults} />
    </div>
  );
};

export default SearchPage;
