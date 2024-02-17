// controllers/SearchController.js

const Availability = require('../models/Availability');
const User = require('../models/User');

// Function to search for doctors available on the selected date with a specific speciality
exports.searchAvailableDoctors = async (req, res) => {
  try {
    const { selectedDate, speciality, symptoms } = req.body;

    // Find doctors with the role 'doctor' and the specified speciality
    if(typeof speciality == 'string'){

    
    let query = { role: 'doctor' };

    if (speciality && speciality !== 'all') {
      query.speciality = speciality;
    }

    if (symptoms) {
      query.fullName =  { $regex: new RegExp(symptoms, 'i') };;
    }

    // Search for doctors with the specified criteria
    var doctorsWithSpeciality = await User.find(query);

    if (doctorsWithSpeciality.length === 0) {
      delete query.name;
      doctorsWithSpeciality = await User.find(query); 
    }

      // If doctors found with query.name or without it, return the response
      const doctorsWithAvailability = [];
      const startOfSelectedDate = new Date(selectedDate);
      startOfSelectedDate.setHours(0, 0, 0, 0); // Set to the beginning of the day
      const endOfSelectedDate = new Date(selectedDate);
      endOfSelectedDate.setHours(23, 59, 59, 999);

      // Iterate through each doctor and fetch their availability
      for (const doctor of doctorsWithSpeciality) {
        const availability = await Availability.findOne({
          doctor: doctor._id,
          day: {
            $gte: startOfSelectedDate,
            $lte: endOfSelectedDate,
          },
          status:'open',
          $or: [
            { 'timeSlots.morning.status': 'open' },
            { 'timeSlots.afternoon.status': 'open' },
            { 'timeSlots.evening.status': 'open' },
          ]
        });

        if (availability) {
          // If availability data exists, add it to the doctor object
          let data = { ...doctor.toObject() };
          delete data.password;
          data.availability = availability;
          console.log(data);
          doctorsWithAvailability.push(data);
        }
      }

      res.status(200).json(doctorsWithAvailability);
    } else {
      let query = { role: 'doctor' };
      const specialties = [
        speciality["Primary Specialist"],
        speciality["Secondary Specialist"],
        speciality["Tertiary Specialist"],
        speciality["Anatomical Region"]
      ].filter(value => value !== "");

      if (specialties.length > 0) {
        query.$or = [
          { speciality: { $in: specialties.map(value => new RegExp(value, 'i')) } },
          { "Primary Specialist": { $in: specialties.map(value => new RegExp(value, 'i')) } },
          { "Secondary Specialist": { $in: specialties.map(value => new RegExp(value, 'i')) } },
          { "Tertiary Specialist": { $in: specialties.map(value => new RegExp(value, 'i')) } }
        ];
      }
      
      // Search for doctors with the specified criteria
      var doctorsWithSpeciality = await User.find(query);

        // If doctors found with query.name or without it, return the response
        const doctorsWithAvailability = [];
        const startOfSelectedDate = new Date(selectedDate);
        startOfSelectedDate.setHours(0, 0, 0, 0); // Set to the beginning of the day
        const endOfSelectedDate = new Date(selectedDate);
        endOfSelectedDate.setHours(23, 59, 59, 999);
  
        // Iterate through each doctor and fetch their availability
        for (const doctor of doctorsWithSpeciality) {
          const availability = await Availability.findOne({
            doctor: doctor._id,
            day: {
              $gte: startOfSelectedDate,
              $lte: endOfSelectedDate,
            },
            status:'open',
            $or: [
              { 'timeSlots.morning.status': 'open' },
              { 'timeSlots.afternoon.status': 'open' },
              { 'timeSlots.evening.status': 'open' },
            ]
          });
  
          if (availability) {
            // If availability data exists, add it to the doctor object
            let data = { ...doctor.toObject() };
            delete data.password;
            data.availability = availability;
            console.log(data);
            doctorsWithAvailability.push(data);
          }
        }
  
        res.status(200).json(doctorsWithAvailability);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error searching for available doctors' });
  }
};
