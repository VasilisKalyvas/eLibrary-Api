const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
const { verifyAdmin } = require('../middlewares/admin');

// Create a new book
router.post('/', verifyAdmin, bookController.createBook);

// Create a new book
router.post('/create/many', verifyAdmin, bookController.createManyBooks);

// Get recent all books
router.get('/recent', bookController.getRecentBooks);

// Get all books
router.get('/', bookController.getAllBooks);

// Get a specific book by ID
router.get('/:id', bookController.getBookById);

// Update a book
router.put('/:id', verifyAdmin, bookController.updateBook);

// Delete a book
router.delete('/:id', verifyAdmin, bookController.deleteBook);
router.delete('/delete/deleteAll', verifyAdmin, bookController.deleteAllBooks);

module.exports = router;
