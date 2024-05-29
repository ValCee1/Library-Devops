// frontend/src/components/Book.js
import React from "react";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";

const Book = ({ book }) => {
  const navigate = useNavigate();

  const handleBorrow = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      await api.post(
        `/api/books/borrow/${book._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Book borrowed successfully!");
    } catch (err) {
      alert("Error borrowing book");
    }
  };

  return (
    <div>
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Status: {book.isAvailable ? "Available" : "Not Available"}</p>
      {book.isAvailable && <button onClick={handleBorrow}>Borrow</button>}
    </div>
  );
};

export default Book;
