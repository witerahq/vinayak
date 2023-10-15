const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authenticateToken = require('../middleware/authMiddleware');

// Create a payment
router.post('/payments', authenticateToken, paymentController.createPayment);

// Get payments by doctorId and populate patient information
router.get('/payments', authenticateToken, paymentController.getPaymentsByDoctorId);

module.exports = router;
