const express = require('express');
const router = express.Router();
const { getBooks, getBookById, addBook } = require('../controllers/bookController');

// Route to get all books
router.get('/', getBooks);

// Route to get a book by ID
router.get('/:id', getBookById);

// Route to add a new book (admin only - not secured here)
router.post('/', addBook);
console.log('Book controller loaded');

module.exports = router;
