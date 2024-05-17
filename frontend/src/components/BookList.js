// frontend/src/components/BookList.js

import React from "react";

const BookList = ({ books }) => {
  return (
    <div>
      <h3>Search Results</h3>
      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <strong>Title:</strong> {book.title} | <strong>Author:</strong>{" "}
              {book.author} | <strong>Genre:</strong> {book.genre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
