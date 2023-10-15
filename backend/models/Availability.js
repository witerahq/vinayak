const mongoose = require('mongoose');

// Define the schema for an availability slot
const timeSlotSchema = new mongoose.Schema({
  startTime: String,
  endTime: String,
  status: { type: String, default: 'open' }, // Default status is 'open'
});

// Define the schema for the availability collection
const availabilitySchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' }, // Reference to the Doctor model
  day: Date, // Date for the availability entry
  timeSlots: {
    morning: [timeSlotSchema],
    afternoon: [timeSlotSchema],
    evening: [timeSlotSchema],
  },
});

// Create the Availability model
const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;
