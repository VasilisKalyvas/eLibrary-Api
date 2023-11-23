const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');
const { verifyAdmin } = require('../middlewares/admin');

// Create a new author
router.post('/', verifyAdmin, authorController.createAuthor);

// Create a new author
router.post('/create/many', verifyAdmin, authorController.createAuthors);

// Get all authors
router.get('/', authorController.getAllAuthors);

// Get a specific author by ID
router.get('/:id', authorController.getAuthorById);

// Update an author
router.put('/:id', verifyAdmin, authorController.updateAuthor);

// Delete an author
router.delete('/:id', verifyAdmin, authorController.deleteAuthor);

module.exports = router;
