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

// Get books borrowed by the logged-in user
router.get("/borrowed", auth, async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user contains the logged-in user's details
    const borrowedBooks = await Book.find({ borrower: userId });
    console.log(borrowedBooks);
    if (!borrowedBooks.length) {
      return res.json({ message: "You have not borrowed any books" });
    }
    res.json(borrowedBooks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching borrowed books", error: error.message });
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

router.post("/borrow/:id", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: "Book not found" });

    if (!book.isAvailable)
      return res.status(400).json({ msg: "Book is already borrowed" });

    book.borrowedBy = req.user.id;
    book.borrowedDate = new Date();
    book.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // Due in 2 weeks
    book.isAvailable = false;

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

// Get user's borrowed books history
router.get("/my-history", auth, async (req, res) => {
  try {
    const books = await Book.find({ borrowedBy: req.user.id });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
