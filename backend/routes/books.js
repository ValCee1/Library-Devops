// backend/routes/books.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Book = require("../models/Book");

// Middleware to check if the user is an admin
const adminMiddleware = [auth, admin];

// Get all books
router.get("/", auth, async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get all books
router.get("/", auth, async (req, res) => {
  const books = await Book.find().populate("borrower", "username email");
  res.json(books);
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
router.put("/borrow/:id", auth, async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ msg: "Book not found" });
  if (!book.isAvailable)
    return res.status(400).json({ msg: "Book is already borrowed" });

  book.isAvailable = false;
  book.borrower = req.user.id;
  book.borrowedDate = new Date();
  book.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 2 weeks from now

  await book.save();
  res.json(book);
});

// Return a book
router.put("/return/:id", auth, async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ msg: "Book not found" });
  if (book.isAvailable)
    return res.status(400).json({ msg: "Book is already available" });

  book.isAvailable = true;
  book.borrower = null;
  book.borrowedDate = null;
  book.dueDate = null;

  await book.save();
  res.json(book);
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
