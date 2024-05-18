import React, { useState } from "react";
import axios from "axios";
import "./css/SearchPage.css";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const onChange = (e) => setQuery(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:5000/api/books?search=${query}`
      );
      setBooks(res.data);
      setError(null);
    } catch (err) {
      setError("Error fetching books");
    }
  };

  return (
    <div className="container">
      <h1>Search Books</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="query">Search</label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div className="results">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="book">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
