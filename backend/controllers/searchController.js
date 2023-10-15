// controllers/SearchController.js

const Availability = require('../models/Availability');
const User = require('../models/User');

// Function to search for doctors available on the selected date with a specific speciality
exports.searchAvailableDoctors = async (req, res) => {
  try {
    const { selectedDate, speciality } = req.body;

    // Find doctors with the role 'doctor' and the specified speciality
    const doctorsWithSpeciality = await User.find({ role: 'doctor', speciality });

    // Create an array to store doctor data along with availability
    const doctorsWithAvailability = [];

    console.log('doctorsWithSpeciality',doctorsWithSpeciality)
    const startOfSelectedDate = new Date(selectedDate);
    startOfSelectedDate.setHours(0, 0, 0, 0); // Set to the beginning of the day
    const endOfSelectedDate = new Date(selectedDate);
    endOfSelectedDate.setHours(23, 59, 59, 999);
    // Iterate through each doctor and fetch their availability
    for (const doctor of doctorsWithSpeciality) {
      const availability = await Availability.findOne({
        doctor: doctor._id,
        day: {
            '$gte': startOfSelectedDate,
            '$lte': endOfSelectedDate,
          },
        $or: [
          { 'timeSlots.morning.status': 'open' },
          { 'timeSlots.afternoon.status': 'open' },
          { 'timeSlots.evening.status': 'open' },
        ],
      });

      
      if (availability) {
          // If availability data exists, add it to the doctor object
          
          let data = {...doctor}
          delete data['_doc']['password']
          data['availability'] = availability
          console.log(data)
        doctorsWithAvailability.push(data);
      }
    }

    res.status(200).json(doctorsWithAvailability);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error searching for available doctors' });
  }
};
