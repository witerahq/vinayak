const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Define routes related to the user, protected by authentication middleware
router.get('/current', authenticateToken, userController.getCurrentUser);
router.post('/update', authenticateToken, userController.updateUserDetails);
router.post('/search-doctor', userController.searchDoctorById);

module.exports = router;