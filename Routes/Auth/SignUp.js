const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const SignUp = require("../../database/Models/Auth/SignUpSchema");

const router = express.Router();
router.use(cors());
dotenv.config();

//! nodemailer setup

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pyaesonetun1141999@gmail.com",
    pass: "ejlj pmcc buyu adfs",
  },
});

//! generate OTP

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// ! send OTP
const OTPStore = {}; // Using an object instead of an array
const sendOTPRouter = express.Router();
sendOTPRouter.post("/", async (req, res) => {
  const { email } = req.body;

  const existingUser = await SignUp.findOne( { email });

  if (existingUser) {
 
    return res.status(409).json({
      success: false,
      message: "User with this email or username already exists.",
      userExits : true,
    });
  }

  const OTP = generateOTP();
  console.log("Generated OTP:", OTP); 
  OTPStore[email] = OTP; 
  console.log("OTP stored for email:", email); 

  const mailOptions = {
    from: process.env.USERNAME,
    to: email,
    subject: "OTP Verification",
    html: `<b>Your OTP code is: ${OTP}</b>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to send OTP" });
    } else {
      console.log("Email sent " + info.messageId);
      res.status(200).json({
        success: true,
        message: "OTP sent successfully",
      });
      res.status(200).json({ message: "OTP sent successfully" });
    }
  });
});

const verifyOTPRouter = express.Router();
verifyOTPRouter.post("/", async (req, res) => {
  const { name, email, password, otp } = req.body;
  try {

    // const existingUser = await SignUp.findOne( { email });

    // if (existingUser) {
   
    //   return res.status(409).json({
    //     success: false,
    //     message: "User with this email or username already exists.",
    //     userExits : true,
    //   });
    // }

    const serverCode = OTPStore;

    const hashedPassword = await bcrypt.hash(password, 10);
    const extractedOTP = Object.values(serverCode);
    if (extractedOTP.includes(parseInt(otp))) {
      const signUpdata = new SignUp({
        name,
        email,
        password: hashedPassword,
      });
      await signUpdata.save();

      const token = jwt.sign({ userId: signUpdata._id }, process.env.JWT_SECRET);

      res.status(200).json({
        success: true,
        message: "User registration successful.",
        user: signUpdata,
        token: token,
        userExits : false,
      });
    } else {

      res.status(400).json({ success: false, error: "Verification failed" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const getUserDataRouter = express.Router();
getUserDataRouter.get("/", async (req, res) => {
  try {
    const userData = await SignUp.find();
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = { sendOTPRouter, verifyOTPRouter, getUserDataRouter };
