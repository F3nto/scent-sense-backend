const express = require("express");
const bcrypt = require('bcrypt');
const SignUp = require("../../database/Models/Auth/SignUpSchema");
const router = express.Router();
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config()

router.use(cors())

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await SignUp.findOne({ email });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    
    console.log("sign in token", token)
     
     res.status(200).json({
      success: true,
      message: "Login successful.",
      user: user, 
      token : token,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please check your email and password.",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(403).json({
        success: false,
        message: "Wrong credentials. Please check your email and password.",
      });
    }

  
   
   
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
});


module.exports = router;