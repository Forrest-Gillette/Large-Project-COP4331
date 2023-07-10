const express = require('express');
const router = express.Router();
const { User } = require('../models/userAPI');
const Token = require('../models/tokenAPI');
const sendEmail = require('../util/sendEmailAPI');
const crypto = require('crypto');

router.post('/', async (req, res) => {
  console.log("hello");
  try {
    const { email } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    // Generate a unique token
    const token = crypto.randomBytes(32).toString('hex');

    // Create a new token and save it in the database
    const newToken = new Token({ userId: user._id, token });
    await newToken.save();

    // Generate the reset password link
    const resetLink = `${process.env.BASE_URL}users/${user._id}/reset-password/${token}`;

    // Send the password reset email
    await sendEmail(user.email, 'Password Reset', resetLink);

    res.status(200).send({ message: 'Password reset link sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;
