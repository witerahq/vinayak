const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const User = require('./models/User'); // Replace with your User model import
const https = require('https');
const fs = require('fs');

const port = 3000; // Default HTTPS port

const options = {
  key: fs.readFileSync('./certs/private.key'),         // Your SSL key
  cert: fs.readFileSync('./certs/certificate.crt'),       // Your SSL certificate
  ca: fs.readFileSync('./certs/ca_bundle.crt'),      // Your CA bundle certificate
};

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
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
app.use('/api/medicalrecord', require('./routes/medicalRecordRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/file', require('./routes/uploadFileRoutes'));



app.get('/', (req, res) => {
  res.send('Hello, HTTPS World (Local Test)!');
});

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`HTTPS server is running on port ${port}`);
});
