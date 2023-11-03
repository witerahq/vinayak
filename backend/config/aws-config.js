// aws-config.js

const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAWHHWWWPBOCGSTYF6',
  secretAccessKey: 'rV0SblN+/tLOXREDqVvL+h4EZp1GpO4MkOH0AGVx',
  region: 'ap-south-1', // Update with your preferred region
});

module.exports = AWS;
