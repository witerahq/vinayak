const express = require('express');
const router = express.Router();
const { sendVerificationEmail, verifyEmail } = require('../controllers/emailController');
const User = require('../models/User');

function authenticateUser(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

router.post('/send', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    await sendVerificationEmail(user);

    res.status(200).json({ message: 'Verification email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/verify',  verifyEmail);

module.exports = router;
