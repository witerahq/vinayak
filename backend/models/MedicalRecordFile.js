// models/MedicalFileRecord.js
const mongoose = require('mongoose');

const medicalFileRecordSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  url: {
    type: String,
    required: true
  },
  tags: [String],
  recordType: {
    type: String,
    required: true
  },
  recordFor: {
    type: String,
    required: true
  },
  documentName: {
    type: String,
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',required:true
  }
});

const MedicalFileRecord = mongoose.model('MedicalFileRecord', medicalFileRecordSchema);

module.exports = MedicalFileRecord;
