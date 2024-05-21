// backend/routes/books.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Book = require("../models/Book");

// Middleware to check if the user is an admin
const adminMiddleware = [auth, admin];

// Fetch all books
router.get("/", auth, async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error fetching books" });
  }
});

// Fetch borrowed books for the logged-in user
router.get("/borrowed", auth, async (req, res) => {
  try {
    const books = await Book.find({ borrower: req.user.id });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error fetching borrowed books" });
  }
});

// Search for books
router.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
      ],
    });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Fetch user book history
router.get("/history", adminMiddleware, async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user.id });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Borrow a book
router.post("/borrow/:id", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    if (!book.isAvailable) {
      return res.status(400).json({ msg: "Book is not available" });
    }

    // Check if the user already has a borrowed book
    const user = await User.findById(req.user.id);
    const borrowedBook = await Book.findOne({ borrowedBy: user.username });

    if (borrowedBook) {
      return res.status(400).json({
        msg: "You already have a borrowed book. Please return it first.",
      });
    }

    book.isAvailable = false;
    book.borrower = req.user.id;
    book.borrowedDate = new Date();
    book.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 2 weeks from now

    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Return a book
router.post("/return/:id", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    if (book.available) {
      return res
        .status(400)
        .json({ msg: "Book is already marked as available" });
    }

    book.isAvailable = true;
    book.borrower = null;
    book.borrowedDate = null;
    book.dueDate = null;

    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Add a new book
router.post("/", adminMiddleware, async (req, res) => {
  const { title, author } = req.body;
  let book = new Book({ title, author });
  book = await book.save();
  res.json(book);
});

// Delete a book
router.delete("/:id", adminMiddleware, async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ msg: "Book not found" });
  res.json({ msg: "Book deleted" });
});
module.exports = router;
