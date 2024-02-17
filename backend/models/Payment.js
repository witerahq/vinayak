const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
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
  amount: {
    type: Number,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  transactionID: {
    type: String,
    required: true,
    unique: true,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;