// backend/routes/books.js
const express = require("express");
const authMiddleware = require("../middleware/auth");
const Book = require("../models/Book");

const router = express.Router();

// Add a new book
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all books
router.get("/all", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Borrow a book
router.post("/borrow/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (!book.available) {
      return res
        .status(400)
        .json({ message: "Book is not available for borrowing" });
    }
    book.available = false;
    await book.save();
    res.json({ message: "Book borrowed successfully", book });
  } catch (error) {
    console.error("Error borrowing book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Return a book
router.post("/return/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.available) {
      return res.status(400).json({ message: "Book is already available" });
    }
    book.available = true;
    await book.save();
    res.json({ message: "Book returned successfully", book });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to search for books
router.get("/search", async (req, res) => {
  try {
    const { title, author, genre } = req.query;

    // Build the search query based on provided criteria
    const query = {};
    if (title) query.title = { $regex: new RegExp(title, "i") }; // Case-insensitive search for title
    if (author) query.author = { $regex: new RegExp(author, "i") }; // Case-insensitive search for author
    if (genre) query.genre = { $regex: new RegExp(genre, "i") }; // Case-insensitive search for genre

    // Execute the search query
    const books = await Book.find(query);

    // Return the search results
    res.json(books);
  } catch (error) {
    console.error("Error searching for books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
