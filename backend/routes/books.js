// backend/routes/books.js
const express = require("express");
const authMiddleware = require("../middleware/auth");
const Book = require("../models/Book");

const router = express.Router();

// Add a new book
router.post("/", async (req, res) => {
  const { title, author, isbn } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      isbn,
      available: true,
    });

    const book = await newBook.save();
    res.json(book);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Borrow a book
router.post("/borrow/:id", async (req, res) => {
  const { userId } = req.body;
  try {
    const book = await Book.findById(req.params.id);
    if (!book.available) return res.status(400).send("Book is not available");

    book.available = false;
    book.borrowedBy = userId;
    book.borrowedAt = new Date();
    book.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 2 weeks from now

    await book.save();

    await User.findByIdAndUpdate(userId, {
      $push: { borrowedBooks: book._id },
    });

    res.json(book);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Return a book
router.post("/return/:id", async (req, res) => {
  const { userId } = req.body;
  try {
    const book = await Book.findById(req.params.id);
    if (book.available)
      return res.status(400).send("Book is already available");

    book.available = true;
    book.borrowedBy = null;
    book.borrowedAt = null;
    book.dueDate = null;

    await book.save();

    await User.findByIdAndUpdate(userId, {
      $pull: { borrowedBooks: book._id },
    });

    res.json(book);
  } catch (err) {
    res.status(500).send("Server error");
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

// Fetch user book history
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user.id });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a book
router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ msg: "Book deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});
module.exports = router;
