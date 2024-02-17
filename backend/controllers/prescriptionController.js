const Prescription = require('../models/Prescription');

// Create a new prescription
const createPrescription = async (req, res) => {
  try {
    const data ={...req.body,doctorID:req.user._id}
    const prescription = new Prescription(data);
    console.log('doctorID',req.user._id,prescription)
    await prescription.save();
    res.status(201).json(prescription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Edit a prescription
const editPrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {...req.body, doctorID:req.user._id}
    const prescription = await Prescription.findByIdAndUpdate(id, data, { new: true });
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json(prescription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a prescription
const deletePrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPrescription = await Prescription.findByIdAndDelete(id);
    if (!deletedPrescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json(deletedPrescription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all prescriptions for a given doctorID
const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ doctorID:req.user._id });
    console.log('doctorID 2',req.user._id,prescriptions)
    res.json(prescriptions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createPrescription,
  editPrescription,
  deletePrescription,
  getAllPrescriptions,
};
