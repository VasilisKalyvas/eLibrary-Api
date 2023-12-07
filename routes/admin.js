const express = require('express');
const router = express.Router();
const { getAllUsers, getAllRents, getAllBooks, getUserById } = require('../controllers/admin');
const { verifyAdmin } = require('../middlewares/admin');

// GET /admin/users
router.get('/users', verifyAdmin, getAllUsers);

//Get user by id 

router.get('/user/:id', verifyAdmin, getUserById)

//Get all rents
router.get('/allbooks', verifyAdmin, getAllBooks)
router.get('/allrents', verifyAdmin, getAllRents)

module.exports = router;