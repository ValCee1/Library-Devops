const cron = require("node-cron");
const nodemailer = require("nodemailer");
const Book = require("./models/Book");

// Daily at 8 AM
cron.schedule("0 8 * * *", async () => {
  const books = await Book.find({
    isAvailable: false,
    dueDate: { $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
  }).populate("borrower", "email username");

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
      text: `Dear ${book.borrower.username},\n\nPlease return the book "${
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
});
