const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const User = require('./models/User'); // Replace with your User model import

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Configure Passport.js
passport.use(new LocalStrategy(User.authenticate())); // Use Passport-Local strategy with User model
passport.serializeUser(User.serializeUser()); // Serialize user for session
passport.deserializeUser(User.deserializeUser()); // Deserialize user from session

// Initialize session middleware
app.use(
  session({
    secret: process.env.PASSPORT_KEY, // Replace with a secret key
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and session middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/email', require('./routes/verifyEmail'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/prescriptions', require('./routes/prescriptionRoutes'));
app.use('/api/doctor', require('./routes/doctorAvailabilityRoutes'));
app.use('/api', require('./routes/searchRoutes'));
app.use('/api', require('./routes/paymentRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
