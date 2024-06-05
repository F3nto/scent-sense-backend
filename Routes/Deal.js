const express = require("express");
const Deal = require("../database/Models/DealSchema");
const cors = require("cors");

const router = express.Router();

router.use(cors());

router.post("/", cors(), async (req, res) => {
  const { name, brand, desc, star, gender, type } = req.body;

  const perfumType = type.map(({img, price, size, instock}) => ({
    img,
    price,
    size,
    instock
  }))

  const dealProd = new Deal({
    name,
    brand,
    desc,
    star,
    gender,
    type : perfumType
  });
  try {
    const savedDealProd = await dealProd.save();
    res.status(200).json(savedDealProd);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", cors(), async (req, res) => {
  try {
    const deals = await Deal.find();
    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
