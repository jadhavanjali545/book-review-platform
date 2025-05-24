const Book = require('../models/Book');

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books); // Send all books
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// Get a single book by ID
const getBookById = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ error: 'Book not found' });
      res.json(book);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  

// Add a new book
const addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book); // Send created book
  } catch (err) {
    res.status(400).json({ error: 'Failed to add book' });
  }
};

module.exports = { getBooks, getBookById, addBook };
