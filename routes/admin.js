const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/admin');
const { verifyAdmin } = require('../middlewares/admin');

// GET /admin/users
router.get('/users', verifyAdmin, getAllUsers);

module.exports = router;