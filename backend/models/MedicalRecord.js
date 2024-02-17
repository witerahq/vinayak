const mongoose = require('mongoose');


const prescriptionSchema = new mongoose.Schema({
  name: String,
  tests: [String],
  medicines: [{
    name: String,
    frequency: Number,
    duration: Number,
  }],
  doctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Assuming you have a 'Doctor' schema
  }
});

// Define the Medical Record schema
const medicalRecordSchema = new mongoose.Schema({
   patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming 'User' is the model for patients
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming 'User' is the model for doctors
    required: true,
  },
  time: Date,             // Date and time of the medical record entry
  symptoms: [String],     // An array of symptoms
  note: String,           // A note related to the medical record
  image: String,          // URL or path to an image, if applicable
  prescriptions: [prescriptionSchema]
  
});

// Create models for both schemas
const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

module.exports = MedicalRecord

