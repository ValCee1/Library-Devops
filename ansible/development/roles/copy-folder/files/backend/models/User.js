// models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  borrowedBooks: [
    {
      book: { type: Schema.Types.ObjectId, ref: "Book" },
      borrowedDate: { type: Date },
      dueDate: { type: Date },
      returned: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);

/* Latest User Model
// backend/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  borrowedBook: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', default: null }
});

module.exports = mongoose.model('User', UserSchema);

*/
