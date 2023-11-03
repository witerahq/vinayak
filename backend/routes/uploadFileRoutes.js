const express = require('express');
const { uploadFile } = require('../controllers/fileUploadController');

const router = express.Router();
let multer = require('multer');
let upload = multer();

router.post('/upload',upload.single('file'), uploadFile);

module.exports = router;
