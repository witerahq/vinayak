// routes/documentFileRecordRoutes.js
const express = require('express');
const router = express.Router();
const medicalFileRecordController = require('../controllers/medicalFileRecords');
const authenticateToken = require('../middleware/authMiddleware');

// Create a new document file record
router.post('/',authenticateToken, medicalFileRecordController.createMedicalRecordFile);

// Fetch all document file records for a specific patient ID
router.get('/:id',authenticateToken, medicalFileRecordController.getAllMedicalRecordFiles);

// Delete a document file record by ID
router.delete('/:id',authenticateToken, medicalFileRecordController.deleteMedicalRecordFile);

module.exports = router;
