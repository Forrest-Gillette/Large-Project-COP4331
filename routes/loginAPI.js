const router = require("express").Router();
const {User} = require("../models/userModel");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const Token = require("../models/tokenModel");
const sendEmail = require("../util/sendEmailAPI");
const crypto = require("crypto");

router.post("/", async(req, res) => {
    try {
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message});
        
        const user = await User.findOne({email: req.body.email});
        if(!user)
            return res.status(401).send({message: "Invalid Email!"});
        
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );
        if(!validPassword)
            return res.status(401).send({message: "Invalid Password!"});

        if(!user.verified) {
            let token = await Token.findOne({userId: user._id});
            if(!token) {
                token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();
            }
            const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`
            await sendEmail(user.email, "Verify your email bucco!", url);

            return res.status(400).send({message: "Another email has been sent, please verify your account before signing in."})
        }

        const token = user.generateAuthToken();
        res.status(200).send({data: token, message: "Login Successful!"})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal Server Error"})
    }
})

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
}

module.exports = router;