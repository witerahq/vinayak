// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function register(req, res) {
    try {
        const { 
            email, phoneNumber, password,
            role, latitude, speciality, longitude,
            location, licenseNumber, fullName,
        } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return res.status(400).json({ message: 'Email address is already registered' });
        }
    
        // Generate a unique username based on the email
        const username = email.split('@')[0] + Date.now();

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            latitude,
            speciality,
            longitude,
            location:latitude+'-'+longitude, 
            licenseNumber,
            fullName,
        });

        let data = await user.save();

        res.status(200).json({ message: 'User registered successfully',data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function login(req, res) {
    try {
        const { email, password,role } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({
            username: user.username,
            email: user.email,
            role: user.role,
            _id:user._id
        }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { register, login };