// server.js

// require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");

const app = express();

// Middleware
app.use(express.json());
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
app.use("/api/books", bookRoutes); // Add this line to use book routes
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
