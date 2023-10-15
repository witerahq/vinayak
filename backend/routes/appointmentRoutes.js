// routes/appointmentRoutes.js

const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authenticateToken = require('../middleware/authMiddleware');

// Get all appointments for a specific patient
router.get('/patient', authenticateToken, appointmentController.getAppointmentsByPatientId);

// Get all appointments for a specific doctor
router.get('/doctor', authenticateToken, appointmentController.getAppointmentsByDoctorId);

// Create a new appointment
router.post('/', authenticateToken, appointmentController.createAppointment);

// Update the status of an appointment
router.post('/:appointmentId', authenticateToken, appointmentController.updateAppointmentStatus);

module.exports = router;
