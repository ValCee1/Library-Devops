const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Book = require("../models/Book");
const nodemailer = require("nodemailer");

router.post("/send-reminders", [auth, admin], async (req, res) => {
  const books = await Book.find({ isAvailable: false }).populate(
    "borrower",
    "email username"
  );
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.admin_Mail,
      pass: process.env.mail_Password,
    },
  });

  books.forEach((book) => {
    const mailOptions = {
      from: "Library Admin",
      to: book.borrower.email,
      subject: "Book Return Reminder",
      text: `Dear ${
        book.borrower.username
      },\n\nThis is to remind you to return the book "${
        book.title
      }" by ${book.dueDate.toDateString()}.\n\nThank you!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  });

  res.json({ msg: "Reminders sent" });
});

module.exports = router;
