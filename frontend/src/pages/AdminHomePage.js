import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/AdminHomePage.css";

const AdminHomePage = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/admin/borrowed",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setBorrowedBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBorrowedBooks();
  }, []);

  const handleRestock = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/admin/restock",
        { title, author, quantity },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setBooks([...books, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Home Page</h1>
      <h2>Restock Books</h2>
      <form onSubmit={handleRestock}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button type="submit">Restock</button>
      </form>

      <h2>Borrowed Books</h2>
      <ul>
        {borrowedBooks.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author} - Borrowed by {book.user.name} on{" "}
            {new Date(book.borrowedDate).toLocaleDateString()} (Due:{" "}
            {new Date(
              new Date(book.borrowedDate).getTime() + 14 * 24 * 60 * 60 * 1000
            ).toLocaleDateString()}
            )
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminHomePage;
