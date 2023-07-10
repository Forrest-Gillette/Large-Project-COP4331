const router = require("express").Router();
const { User, validate } = require("../models/userAPI");
const bcrypt = require("bcrypt");
const Token = require("../models/tokenAPI");
const sendEmail = require("../util/sendEmailAPI");
const crypto = require("crypto");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });

    if (user)
      return res
        .status(409)
        .send({ message: "User with this email already exists." });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({ ...req.body, password: hashPassword }).save();

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify your email bucco!", url);

    res.status(201).send({ message: "Verification Email Sent!" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/:id/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send({ message: "Invalid link" });

    await User.updateOne({ _id: user._id }, { verified: true });
    await User.updateOne({ _id: user._id }, { verified: true });
    await token.remove();

    res.status(200).send({ message: "Email Successfully Verified!" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
