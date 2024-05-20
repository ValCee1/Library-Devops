const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Book = require("../models/Book");
const User = require("../models/User");
const admin = require("../middleware/admin");

// Middleware to check if the user is an admin
const adminMiddleware = [auth, admin];

router.get("/users", adminMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Restock a book
router.post("/restock", [auth, admin], async (req, res) => {
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
router.get("/borrowed", [auth, admin], async (req, res) => {
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
