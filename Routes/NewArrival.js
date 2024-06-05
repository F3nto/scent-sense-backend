const express = require("express");
const cors = require("cors");
const NewArrival = require("../database/Models/NewArrivalSchema");

const router = express.Router();

router.use(cors());

router.post("/", cors(), async (req, res) => {
  const { name, brand, desc, star, gender, type} = req.body;

  const perfumType = type.map(({img, price, size, instock}) => ({
    img,
    price,
    size,
    instock
  }))

  const newArrivalProd = new NewArrival({
    name,
    brand,
    desc,
    star,
    gender,
    type: perfumType
  });

  try {
    const savedNewArrivalProd = await newArrivalProd.save();
    res.status(200).json(savedNewArrivalProd);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", cors(), async (req, res) => {
  try {
    const newArrivals = await NewArrival.find();
    res.status(200).json(newArrivals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
