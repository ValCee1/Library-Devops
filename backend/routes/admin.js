const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Book = require("../models/Book");
const User = require("../models/User");

// Middleware to check if user is admin
const adminAuth = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: "Access denied, admin only" });
  }
  next();
};

// Restock a book
router.post("/restock", [auth, adminAuth], async (req, res) => {
  const { title, author, quantity } = req.body;

  try {
    let book = await Book.findOne({ title, author });

    if (book) {
      book.quantity += quantity;
    } else {
      book = new Book({
        title,
        author,
        quantity,
      });
    }

    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get all borrowed books with due dates
router.get("/borrowed", [auth, adminAuth], async (req, res) => {
  try {
    const books = await Book.find({ borrowedDate: { $exists: true } }).populate(
      "user",
      "name"
    );
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
