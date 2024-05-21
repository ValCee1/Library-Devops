// backend/routes/users.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//Book History
router.get("/bookhistory", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "borrowedBooks.book"
    );
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user.borrowedBooks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
