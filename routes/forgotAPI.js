const router = require("express").Router();
const { User } = require("../models/userModel");
const Token = require("../models/tokenModel");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const sendEmail = require("../util/sendEmailAPI");
const crypto = require("crypto");

router.post("/", async (req, res) => {
  try {
    const { error } = validateEmail(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email!" });

    // Check if a token already exists for the user
    let token = await Token.findOne({ userId: user._id });

    if (!token) {
      // If no token exists, create a new one
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    } else {
      // If a token already exists, update it
      token.token = crypto.randomBytes(32).toString("hex");
      await token.save();
    }

    const url = `${process.env.BASE_URL}users/${user._id}/reset-password/${token.token}`;

    await sendEmail(user.email, "Reset that password buddy!", url);

    res.status(201).send({ message: "Password change link sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


const validateEmail = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
  });
  return schema.validate(data);
};

module.exports = router;
