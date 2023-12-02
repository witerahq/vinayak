const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const fs = require('fs');

// Configure your AWS credentials
const AWS_ACCESS_KEY_ID = 'AKIAWHHWWWPBOCGSTYF6';
const AWS_SECRET_ACCESS_KEY = 'rV0SblN+/tLOXREDqVvL+h4EZp1GpO4MkOH0AGVx';
const AWS_BUCKET_NAME = 'vinayakmudit';

// Initialize the AWS SDK
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
   region: 'ap-south-1'
});

const s3 = new AWS.S3();


function uploadFile(req, res) {
    console.log('Request Body:',req.file);
    if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }
    
      // Decode the base64 file data from the FormData
      const fileData = Buffer.from(req.file.buffer, 'base64');
    
      const extension = path.extname(req.file.originalname); // Extract the extension from FormData
      const fileName = `uploads/${Date.now().toString()}${extension}`;
    
      const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName,
        Body: fileData,
        Expires: 31536000,
        ACL: 'public-read', // Make the uploaded file publicly accessible
      };
  
    s3.putObject(params, (err, data) => {
      if (err) {
        console.error('S3 upload error:', err);
        return res.status(400).json({ error: 'File upload failed' });
      }
  
      const fileUrl = s3.getSignedUrl('getObject', { Bucket: AWS_BUCKET_NAME, Key: fileName });
      const imageUrl=fileUrl;

      const regex = /\.(png|jpe?g|webp)/i;

// Use the regular expression to find the match in the URL
const match = imageUrl.match(regex);


  // Extract the URL up to and including the file extension
  const trimmedUrl = imageUrl.slice(0, match.index + match[0].length);
  console.log(trimmedUrl);

      // res.json({ url: fileUrl });
      res.json({ url: trimmedUrl });
      
    });
  }
  
  module.exports = { uploadFile };
