const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  image: { // <--- ADD THIS FIELD
    type: String, // String type for the path/filename
    required: false // Image might be optional for some books
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);

