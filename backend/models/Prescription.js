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

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
