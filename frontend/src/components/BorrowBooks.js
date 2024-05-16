// src/components/BorrowBooks.js

import React, { useState } from "react";
import axios from "axios";

const BorrowBooks = () => {
  const [bookId, setBookId] = useState("");

  const handleBorrow = async () => {
    try {
      await axios.post(
        "/api/books/borrow",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in request headers
          },
        }
      );
      console.log("Book borrowed successfully");
    } catch (error) {
      console.error("Error borrowing book:", error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Borrow Books</h2>
      <input
        type="text"
        placeholder="Enter book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      />
      <button onClick={handleBorrow}>Borrow</button>
    </div>
  );
};

export default BorrowBooks;
