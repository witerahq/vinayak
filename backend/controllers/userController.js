// controllers/userController.js

const User = require('../models/User');
const Availability = require('../models/Availability');

// Get information about the currently logged-in user
async function getCurrentUser(req, res) {
    try {
        // The authenticated user's information is available in req.user
        // You can access it to retrieve user data
        console.log(req.user,'request')
        const userId = req.user._id; // Assuming the user's ID is stored in the token

        // Fetch the user's data from the database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Exclude sensitive fields if necessary before sending the response
        const sanitizedUserData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            latitude:user.latitude,
            speciality:user.speciality,
            longitude:user.longitude,
            licenseNumber:user.licenseNumber,
            fullName:user.fullName,
            image:user.image,
            age:user.age,
            experience:user.experience,
            address:user.address,
            gender:user.gender,
            language:user.language,
            hospital:user.hospital,
            "Primary Specialist": user["Primary Specialist"],
            "Secondary Specialist": user["Secondary Specialist"],
            "Tertiary Specialist": user["Tertiary Specialist"],
            priceAppointment:user.priceAppointment
            // Include other user properties as needed
        };

        res.status(200).json(sanitizedUserData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Update user details
async function updateUserDetails(req, res) {
    try {
        const userId = req.user._id; // Assuming the user's ID is in the token
        const updates = req.body; // Fields to be updated

        console.log(updates)

        const user = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const searchDoctorById = async (req, res) => {
    try {
      const doctorId = req.body.doctor_id;
  
      // Search for the doctor by _id, excluding the password field
      const doctor = await User.findById(doctorId).select('-password');
  
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
       // Set time to 0:00:00 for the current date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Set time to 23:59:59 for the day after tomorrow date
    const dayAfterTomorrowDate = new Date(currentDate);
    dayAfterTomorrowDate.setDate(currentDate.getDate() + 2);
    dayAfterTomorrowDate.setHours(23, 59, 59, 999);

    const availability = await Availability.find({
      doctor: doctor._id,
      day: {
        $gte: currentDate.toISOString(),
        $lte: dayAfterTomorrowDate.toISOString(),
      },
    })
    .populate('timeSlots.morning')
    .populate('timeSlots.afternoon')
    .populate('timeSlots.evening');
  
      return res.status(200).json({ doctor, availability });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getCurrentUser, updateUserDetails, searchDoctorById };