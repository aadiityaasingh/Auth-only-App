const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOtpEmail(email, otp) {
  try {
    const info = await transporter.sendMail({
      from: `"Edith" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email – OTP Code Inside",
      text: `Your verification code is ${otp}. It expires in 10 minutes.`,
      html: `
        <h2>Email Verification</h2>
        <p>Your 6-digit verification code is:</p>
        <h1 style="letter-spacing: 5px;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
      `,
    });

    console.log("OTP email sent:", info.response);
    return info;
  } catch (err) {
    console.error("Error sending OTP email:", err);
    throw err;
  }
}

async function sendWelcomeEmail(email, name) {
  try {
    const info = await transporter.sendMail({
      from: `"Edith" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Edith 🎉",
      html: `
        <h2>Welcome, ${name}!</h2>
        <p>Your email has been successfully verified.</p>
        <p>We're excited to have you on board 🚀</p>
      `,
    });

    console.log("Welcome email sent:", info.response);
    return info;
  } catch (err) {
    console.error("Error sending welcome email:", err);
    throw err;
  }
}


module.exports = { sendOtpEmail,
    sendWelcomeEmail,
 };
