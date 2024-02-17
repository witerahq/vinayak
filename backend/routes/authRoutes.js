// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
