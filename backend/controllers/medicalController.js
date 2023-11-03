// prescriptionController.js
const Prescription = require('../models/Prescription'); // Assuming your Prescription model file
const MedicalRecord = require('../models/MedicalRecord'); // Assuming your MedicalRecord model file
const Appointment = require('../models/Appointment');

// Controller function to add a prescription to a medical record
exports.addMedicalRecord = async (req, res) => {
  try {
    const { patientId, symptoms, note, image, prescriptions, appointmentId } = req.body;

    // Create a new medical record
    const medicalRecord = new MedicalRecord({
      patientId,
      doctorId: req.user._id,
      time: new Date(),
      symptoms,
      note,
      image,
      prescriptions,
      appointment: appointmentId, // Assign the appointmentId to the medical record
    });

    await medicalRecord.save();

    // Update the medical record's appointment with the new medical record ID
    await Appointment.findByIdAndUpdate(appointmentId, { medicalRecords: medicalRecord._id });

    res.status(201).json({ message: 'Medical record added successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to add medical record' });
  }
};

// Controller function to edit a prescription
exports.editMedicalRecord = async (req, res) => {
  try {
    const { medicalRecordId, time, symptoms, note, image, prescriptions } = req.body;

    // Find and update the medical record by its ID
    await MedicalRecord.findByIdAndUpdate(medicalRecordId, {
      time: new Date(),
      symptoms,
      note,
      image,
      prescriptions,
    });

    res.status(200).json({ message: 'Medical record updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update medical record' });
  }
};

// Controller function to get prescriptions by userId and doctorId
exports.getMedicalRecords = async (req, res) => {
  try {
    const { _id: userId, role } = req.user;

    let query;
    if (role === 'patient') {
      // If the user is a patient, find prescriptions for the patient's userId
      query = { patientId: userId };
    } else if (role === 'doctor') {
      // If the user is a doctor, find prescriptions for the doctor's userId
      query = { doctorId: userId };
    } else {
      return res.status(400).json({ error: 'Invalid user role' });
    }

    // Find medical records that match the userId and doctorId
    const medicalRecords = await MedicalRecord.find(query).populate('prescriptions');

    res.status(200).json(medicalRecords);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve prescriptions' });
  }
};

// Controller function to get prescription details by prescription ID
exports.getMedicalRecordDetails = async (req, res) => {
  try {
    const { medicalRecordId } = req.params;

    // Find the medical record by its ID
    const medicalRecord = await MedicalRecord.findById(medicalRecordId)
      .populate('prescriptions');

    if (!medicalRecord) {
      return res.status(404).json({ error: 'Medical record not found' });
    }

    res.status(200).json(medicalRecord);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve prescription details' });
  }
};
