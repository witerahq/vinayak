// controllers/verifyEmailController.js
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Function to generate a 6-digit verification code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationEmail(user) {
  const verificationCode = generateVerificationCode();
  user.emailVerificationCode = verificationCode;
  user.lastEmailVerificationSent = new Date();
  await user.save();

  const transporter = nodemailer.createTransport({
    // Configure your email service provider here
    service: 'gmail',
    host: 'smtp.gmail.com',

    auth: {
      user: 'vinayakminfo@gmail.com',
      pass: 'yodc ovdb zhwv mgtk',
    },
  });

  const mailOptions = {
    from: '"VinayakM" <verify@vinayakm.com>',
    to: user.email,
    subject: 'VinayakM verification code',
    text: `Your email verification code is: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(info)
      console.log(`Email sent: ${info.response}`);
    }
  });
}

async function verifyEmail(req, res) {
  try {
    const { code } = req.body;
    const user = await User.findById(req.body.userId);
    console.log(user,req.body)
    console.log(user?.emailVerificationCode,code)
    if (
      !user?.emailVerificationCode ||
      user?.emailVerificationCode !== code
    ) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    const currentTime = new Date();
    const timeDiff = currentTime - user.lastEmailVerificationSent;
    const cooldown = 3 * 1000; // 30 seconds

    if (timeDiff < cooldown) {
      return res.status(400).json({
        message:
          'Please wait 30 seconds before requesting another email.',
      });
    }

    user.emailVerified = true;
    user.emailVerificationCode = null;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { sendVerificationEmail, verifyEmail };
