const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Book = require("../models/Book");
const User = require("../models/User");
const admin = require("../middleware/admin");
const nodemailer = require("nodemailer");

// Middleware to check if the user is an admin
const adminMiddleware = [auth, admin];

//Get All Users
router.get("/users", adminMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Get all books
router.get("/books", adminMiddleware, async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Restock a book
router.post("/restock", adminMiddleware, async (req, res) => {
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
    res.status(500).send("Server Error");
  }
});

// Get all borrowed books with due dates
router.get("/borrowed", adminMiddleware, async (req, res) => {
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

// Mark a book as returned
router.put("/return/:id", adminMiddleware, async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ msg: "Book not found" });

  book.isAvailable = true;
  book.borrower = null;
  book.borrowedDate = null;
  book.dueDate = null;

  await book.save();
  res.json(book);
});

// Send reminder email
router.post("/send-reminder/:id", adminMiddleware, async (req, res) => {
  const book = await Book.findById(req.params.id).populate(
    "borrower",
    "email username"
  );
  if (!book || book.isAvailable)
    return res.status(400).json({ msg: "Book not borrowed" });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.admin_Mail,
      pass: "mail_Password",
    },
  });

  const mailOptions = {
    from: "Library Admin",
    to: book.borrower.email,
    subject: "Book Return Reminder",
    text: `Dear ${book.borrower.username},\n\nKindly return the book: "${
      book.title
    }" by ${book.dueDate.toDateString()}.\n\nThank you!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ msg: "Error sending email" });
    }
    res.json({ msg: "Reminder sent" });
  });
});

// Extend borrow time by 1 week
router.put("/extend/:id", adminMiddleware, async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ msg: "Book not found" });
  if (!book.dueDate || book.dueDate <= new Date())
    return res.status(400).json({ msg: "Cannot extend due date" });

  const newDueDate = new Date(book.dueDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Extend by 1 week
  book.dueDate = newDueDate;

  await book.save();
  res.json(book);
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

// Add a new book
router.post(
  "/books",
  [
    adminMiddleware,
    [
      check("title", "Title is required").not().isEmpty(),
      check("author", "Author is required").not().isEmpty(),
      check("isbn", "ISBN is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, isbn } = req.body;

    try {
      const newBook = new Book({
        title,
        author,
        isbn,
      });

      const book = await newBook.save();
      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// Delete a book
router.delete("/books/:id", adminMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    await book.remove();
    res.json({ msg: "Book removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Suspend a user
router.patch("/users/suspend/:id", adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.suspended = true;
    await user.save();
    res.json({ msg: "User suspended" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a user
router.delete("/users/:id", adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.remove();
    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
