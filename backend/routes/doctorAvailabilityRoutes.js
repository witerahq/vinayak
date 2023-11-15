// doctorAvailabilityRoutes.js
const express = require('express');
const router = express.Router();
const DoctorAvailabilityController = require('../controllers/availabilityController');
const authenticateToken = require('../middleware/authMiddleware');

// Get doctor availability
router.get('/availability',authenticateToken, DoctorAvailabilityController.getDoctorAvailability);

// Update availability status
router.post('/availability',authenticateToken, DoctorAvailabilityController.updateAvailabilityStatus);

// Route to update timeslot status
router.post('/update-timeslot-status',authenticateToken, DoctorAvailabilityController.updateTimeSlotStatus);

// Route to update dayslot status
router.post('/update-day-status',authenticateToken, DoctorAvailabilityController.updateDayAvailabilityStatus);


module.exports = router;
