const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Search books
router.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const books = await Book.find({ title: new RegExp(query, "i") });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Borrow book
router.post("/borrow", async (req, res) => {
  const { bookId } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book || !book.available)
      return res.status(400).json({ message: "Book not available" });

    book.available = false;
    await book.save();
    res.json({ message: "Book borrowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Return book
router.post("/return", async (req, res) => {
  const { bookId } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book || book.available)
      return res.status(400).json({ message: "Book not borrowed" });

    book.available = true;
    await book.save();
    res.json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
