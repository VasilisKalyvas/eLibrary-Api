const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const { verifyAdmin } = require('../middlewares/admin');

// Create a new category
router.post('/', verifyAdmin, categoryController.createCategory);

// Create a new category
router.post('/create/many', verifyAdmin, categoryController.createCategories);

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get a specific category by ID
router.get('/:id', categoryController.getCategoryById);

// Update a category
router.put('/:id', verifyAdmin, categoryController.updateCategory);

// Delete a category
router.delete('/:id', verifyAdmin, categoryController.deleteCategory);

module.exports = router;
