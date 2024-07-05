const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookId: Number,
  bookTitle: String,
  authorId: Number,
  authorName: String,
  publishedYear: Number,
});

const Books = mongoose.model("Books", bookSchema, "Books");

module.exports = { Books };
