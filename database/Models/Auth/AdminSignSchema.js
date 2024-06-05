const mongoose = require("mongoose");

const AdminSignUpSchema = mongoose.Schema(
  {
    adminName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "admin",
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("AdminSignUp", AdminSignUpSchema);