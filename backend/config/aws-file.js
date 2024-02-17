// Update AWS SDK to version 3
const { S3Client } = require('@aws-sdk/client-s3');
const { fromIni } = require('@aws-sdk/credential-provider-ini');

// Update Multer to version 2
const multer = require('multer');
const { S3 } = require('multer-s3');

const s3 = new S3Client({
    credentials: fromIni(),
    region: 'ap-south-1',
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
};

const upload = multer({
    fileFilter,
    storage: new S3({
        client: s3,
        bucket: 'demo.moveies.com',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        },
    }),
});

module.exports = upload;