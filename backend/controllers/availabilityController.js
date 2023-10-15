// availabilityController.js

const Availability = require('../models/Availability');
const User = require('../models/User'); // Import the User model
const cron = require('node-cron');

// Function to create default availability entries for a doctor for a specific date
exports.createDefaultAvailabilityForDoctor = async (doctorId, date) => {

  const startOfSelectedDate = new Date(date);
  startOfSelectedDate.setHours(0, 0, 0, 0); 
  const endOfSelectedDate = new Date(date);
  endOfSelectedDate.setHours(23, 59, 59, 999);

  const existingAvailability = await Availability.findOne({
    doctor: doctorId,
    day: {
      '$gte': startOfSelectedDate,
      '$lte': endOfSelectedDate,
    }
  });
  if (!existingAvailability) {
    const availability = new Availability({
      doctor: doctorId,
      day: date,
      timeSlots: {
        morning: [
          { startTime: '8:00 AM', endTime: '9:00 AM', status: 'open' },
          { startTime: '9:00 AM', endTime: '10:00 AM', status: 'open' },
          { startTime: '10:00 AM', endTime: '11:00 AM', status: 'open' },
        ],
        afternoon: [
          { startTime: '1:00 PM', endTime: '2:00 PM', status: 'open' },
          { startTime: '2:00 PM', endTime: '3:00 PM', status: 'open' },
          { startTime: '3:00 PM', endTime: '4:00 PM', status: 'open' },
        ],
        evening: [
          { startTime: '5:00 PM', endTime: '6:00 PM', status: 'open' },
          { startTime: '6:00 PM', endTime: '7:00 PM', status: 'open' },
          { startTime: '7:00 PM', endTime: '8:00 PM', status: 'open' },
        ],
      },
    });

    await availability.save();
  }
};

// Function to create daily availability for all doctors
exports.createDailyAvailabilityForDoctors = async () => {
  try {
    console.log('Running daily availability creation job...');

    // Fetch all users with the role "doctor"
    const doctors = await User.find({ role: 'doctor' });

    for (const doctor of doctors) {
      const currentDate = new Date();
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        await exports.createDefaultAvailabilityForDoctor(doctor._id, date);
      }
    }

    console.log('Daily availability creation job completed.');
  } catch (err) {
    console.error('Error creating daily availability:', err);
  }
};


// Function to fetch doctor availability based on doctorId from current date to next dates
exports.getDoctorAvailability = async (req, res) => {
  const { _id: doctorId } = req.user; // Get doctorID from req.user._id
  const currentDate = new Date();

  try {
    // Find availability entries for the doctor within the next 7 days
    const availability = await Availability.find({
      doctor: doctorId,
      day: { $gte: currentDate, $lt: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000) },
    });

    res.status(200).json(availability);
  } catch (err) {
    console.error('Error fetching doctor availability:', err);
    res.status(500).json({ error: 'Error fetching doctor availability' });
  }
};

// Function to update availability status of time slots for a doctor
exports.updateAvailabilityStatus = async (req, res) => {
  const { _id: doctorId } = req.user; // Get doctorID from req.user._id
  const { updates } = req.body; // Updates is an array of objects with date, timeSlot, and status

  try {
    for (const update of updates) {
      console.log(update, 'update')
      const { day, timeSlots } = update;

      // Find the availability entry for the doctor and date
      const availability = await Availability.findOne({ doctor: doctorId, day: day });

      if (availability) {
        availability.timeSlots = timeSlots

        // Save the updated availability entry
        await availability.save();
      } else {
        res.status(404).json({ error: 'Availability entry not found' });
        return;
      }
    }

    res.status(200).json({ message: 'Availability status updated successfully' });
  } catch (err) {
    console.error('Error updating availability status:', err);
    res.status(500).json({ error: 'Error updating availability status' });
  }
};


// Controller to update the status of a timeslot
exports.updateTimeSlotStatus = async (req, res) => {
  const { availabilityId, timeSlotType, timeSlotIndex, newStatus } = req.body;

  try {
    // Find the availability entry by ID
    const availability = await Availability.findById(availabilityId);

    if (!availability) {
      return res.status(404).json({ message: 'Availability entry not found' });
    }

    // Update the status of the specified timeslot
    availability.timeSlots[timeSlotType][timeSlotIndex].status = newStatus;

    // Save the updated availability
    await availability.save();

    res.status(200).json({ message: 'Timeslot status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating timeslot status' });
  }
};


// Schedule a cron job to run daily availability creation
cron.schedule('0 0 * * *', async () => {
  await exports.createDailyAvailabilityForDoctors();
});
