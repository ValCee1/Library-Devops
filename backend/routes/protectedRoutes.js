// routes/protectedRoutes.js

const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/protected", requireAuth, (req, res) => {
  res.status(200).json({ message: "Protected route accessed successfully" });
});

module.exports = router;
