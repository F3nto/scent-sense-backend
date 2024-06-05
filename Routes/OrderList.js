const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const OrderList = require("../database/Models/OrderList");
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()


router.use(cors())

router.post("/api/v1/order-list", async (req, res) => {
  const { userId, username, items, totalPrice, address, city, phone } = req.body;
    const order = await new OrderList({
      userId,
      username,
      items,
      totalPrice,
      address,
      city,
      phone,
    });
  try {
    const savedOrder = await order.save();
    res.status(200).json({ success: true, data: savedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/api/v1/order-list", async (req, res) => {

  const headerToken = req.headers.authorization;
  console.log(headerToken);

  const token = headerToken.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
  if (!decodedToken) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
  const userId = decodedToken.userId;

  try {

    const orders = await OrderList.find({ userId });
    console.log(orders)
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/api/v1/order-list/all-orderlist", async (req, res) => {

  try {
    const orders = await OrderList.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
