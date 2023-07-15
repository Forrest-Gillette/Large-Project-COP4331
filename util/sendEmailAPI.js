const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    if (!email) {
        throw new Error("No recipient email specified");
    }

    const transport = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.SECURE === 'true',
      auth: {
        user: process.env.ADMIN,
        pass: process.env.PASS,
      },
    });

    await transport.sendMail({
      from: process.env.ADMIN,
      //  to: 'tyler.beach@ucf.edu',
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent!");
  } catch (error) {
    console.log("Email not sent :(");
    console.log(error);
  }
};
