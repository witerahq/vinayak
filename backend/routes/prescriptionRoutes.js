const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/add', authenticateToken, prescriptionController.createPrescription);
router.post('/edit/:id', authenticateToken, prescriptionController.editPrescription);
router.post('/delete/:id', authenticateToken, prescriptionController.deletePrescription);
router.get('/doctor', authenticateToken, prescriptionController.getAllPrescriptions);

module.exports = router;
