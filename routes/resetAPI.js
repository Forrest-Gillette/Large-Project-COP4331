const router = require("express").Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendEmail = require("../util/sendEmailAPI");
const crypto = require("crypto");

router.post("/:id/reset/:token", async (req, res) => {
    try {
      const { error } = validatePassword(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });
  
      const { id, token } = req.params;
      const { password } = req.body;
  
      // Verify the token
      const resetToken = await Token.findOne({ userId: id, token });
      if (!resetToken)
        return res.status(400).send({ message: "Invalid reset password link" });
  
      // Find the user
      const user = await User.findById(id);
      if (!user) return res.status(400).send({ message: "Invalid user" });
  
      // Update the user's password
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(password, salt);
      await User.updateOne({ _id: user._id }, { password: hashPassword });
  
      res.status(200).send({ message: "Password successfully reset" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
  
  
const validatePassword = (data) => {
    const schema = Joi.object({
      password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = router;
