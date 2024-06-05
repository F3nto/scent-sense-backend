const express = require("express");
const AdminSignUpModel = require("../../database/Models/Auth/AdminSignSchema");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.use(cors());

router.post("/", cors(), (req, res) => {
  const { email, password } = req.body;

  AdminSignUpModel.findOne({ email })
    .then((admin) => {
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found. Please check your email and password.",
        });
      }

      bcrypt
        .compare(password, admin.password)
        .then((isMatch) => {
          if (isMatch) {
            const token = jwt.sign({ adminId: admin._id }, "Scent-sense", {
              expiresIn: "1h",
            });

            res.json({
              success: true,
              message: "Admin login successful.",
              token,
              admin: {
                id: admin._id,
                adminName: admin.adminName,
                email: admin.email,
              },
            });
          } else {
            // Passwords do not match
            res.status(401).json({
              success: false,
              message:
                "Incorrect password. Please check your email and password.",
            });
          }
        })
        .catch((error) => {
          console.error("Error comparing passwords:", error);
          res.status(500).json({
            success: false,
            message:
              "An error occurred while logging in. Please try again later.",
          });
        });
    })
    .catch((error) => {
      console.error("Error finding admin:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while logging in. Please try again later.",
      });
    });
});

module.exports = router;
