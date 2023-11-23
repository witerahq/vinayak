const mongoose = require('mongoose');

// Define the schema for an appointment
const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for patients
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for doctors
    required: true,
  },
  mode: {
    type: String,
    required: true,
    enum: ['in-person', 'online','call'], // Define the possible modes
  },
  date: {
    type: Date,
    required: true,
  },
  time:{
    type:String,
    required:true
  },
  patientName: {
    type:String
  },
  patientPhoneNumber: {
    type:String
  },
  status: {
    type: String,
    required: true,
    enum: ['scheduled', 'completed', 'canceled'], // Define possible statuses
  },
  medicalRecords: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicalRecord', // Reference to the User model for doctors
  },
});

// Create the Appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
