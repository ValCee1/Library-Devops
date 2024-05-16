// src/components/ReturnBooks.js

import React, { useState } from "react";
import axios from "axios";

const ReturnBooks = () => {
  const [bookId, setBookId] = useState("");

  const handleReturn = async () => {
    try {
      await axios.post(
        "/api/books/return",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in request headers
          },
        }
      );
      console.log("Book returned successfully");
    } catch (error) {
      console.error("Error returning book:", error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Return Books</h2>
      <input
        type="text"
        placeholder="Enter book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      />
      <button onClick={handleReturn}>Return</button>
    </div>
  );
};

export default ReturnBooks;
