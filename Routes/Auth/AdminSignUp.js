const express = require("express");
const AdminSignUpModel = require("../../database/Models/Auth/AdminSignSchema");
const bcrypt = require("bcrypt");
const cors = require("cors")
const router = express.Router();


router.use(cors());
router.post("/", cors(), async (req, res) => {
  const { adminName, email, password } = req.body;

  try {
    const existingAdmin = await AdminSignUpModel.findOne({ $or: [{ adminName }, { email }] });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await AdminSignUpModel.create({
      adminName,
      email,
      password: hashedPassword,
    });

    res.json({
      success: true,
      message: "Admin registration successful.",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register Admin. Please try again later.",
    });
  }
});

module.exports = router;