// prescriptionRoutes.js
const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/medicalController');
const authenticateToken = require('../middleware/authMiddleware');

// Define routes
router.post('/add', authenticateToken, prescriptionController.addMedicalRecord);
router.post('/edit', authenticateToken, prescriptionController.editMedicalRecord);
router.get('/user', authenticateToken, prescriptionController.getMedicalRecords);
router.get('/:medicalRecordId', authenticateToken, prescriptionController.getMedicalRecordDetails);

module.exports = router;
