// routes/SearchRoutes.js

const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/searchController');

// Search for available doctors
router.post('/search/doctors', SearchController.searchAvailableDoctors);

module.exports = router;
