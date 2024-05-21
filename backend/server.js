// server.js

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const remindersRoutes = require("./routes/reminders");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Enable CORS
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.DB_URL, {
    //    useCreateIndex: true,
    auth: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reminders", remindersRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes); // Add this line to use book routes

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
