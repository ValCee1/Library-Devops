const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  borrower: { type: Schema.Types.ObjectId, ref: "User" },
  borrowedDate: { type: Date },
  dueDate: { type: Date },
});

module.exports = mongoose.model("Book", bookSchema);
