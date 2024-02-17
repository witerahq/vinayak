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
const xlsx = require('xlsx'); // Import the xlsx module for Excel file handling
const SymptomModel = require('./models/Symptom');
const { searchSymptoms } = require('./controllers/elasticSearchController');

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
const client = mongoose.connect(process.env.MONGODB_URI, {
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


// import excel data
async function importExcelToMongo(req, res) {
  try {
    // Replace 'path/to/your/excel-file.xlsx' with the actual path to your Excel file
    const excelFilePath = './symptoms.xlsx';

    // Connect to MongoDB
    // const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    // await client.connect();
    // console.log('Connected to MongoDB');

    // Read Excel File
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Insert Data into MongoDB
    // const db = client.db();
    // const collection = db.collection('symptoms'); // Replace with your MongoDB collection name
    // const result = await collection.insertMany(excelData);

    console.log(`Inserted ${excelData[0]} documents into MongoDB`);

    // Close MongoDB Connection
    const result = await SymptomModel.insertMany(excelData);

    // await client.close();
    // console.log('Disconnected from MongoDB');

    res.json({ success: true, message: 'Data imported successfully',data:result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}





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

app.get('/api/import-excel', importExcelToMongo);
// Update this line in your app.js or route configuration
app.get('/api/search-symptoms/:query', searchSymptoms);


app.get('/', (req, res) => {
  res.send('Hello, HTTPS World (Local Test)!');
});


const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`HTTPS server is running on port ${port}`);
});
