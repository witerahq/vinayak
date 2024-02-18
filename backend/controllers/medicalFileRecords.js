// controllers/MedicalRecordFileController.js
const MedicalRecordFile = require('../models/MedicalRecordFile');

// Create a new document file record
exports.createMedicalRecordFile = async (req, res) => {
  try {
    let data = {...req.body,patientId:req.user._id}
    const medicalRecordFile = await MedicalRecordFile.create(data);
    res.status(201).json(medicalRecordFile);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Fetch all document file records for a specific patient ID
exports.getAllMedicalRecordFiles = async (req, res) => {
  const patientId = req.params.id;

  try {
    const medicalRecordFiles = await MedicalRecordFile.find({ patientId });
    console.log(req.params,'patientID')
    res.status(200).json(medicalRecordFiles);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a document file record by ID
exports.deleteMedicalRecordFile = async (req, res) => {
  try {
    await MedicalRecordFile.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
