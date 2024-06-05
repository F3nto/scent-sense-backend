const express = require("express");
const TreasureProduct = require("../database/Models/TreasureProd");
const cors = require("cors");

const router = express.Router();

router.use(cors());

router.post("/", cors(), async (req, res) => {
  const { name, img, price, brand, star, differFolder, desc, instock, gender } = req.body;

  const TreasureProds = new TreasureProduct({
    name, 
    img,
    price,
    brand,
    desc,
    star,
    differFolder,
    instock,
    gender
  });

  try {
    const savedTreasureProd = await TreasureProds.save();
    res.status(200).json(savedTreasureProd);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", cors(), async (req, res) => {
  try {
    const TreasureProds = await TreasureProduct.find();
    res.status(200).json(TreasureProds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
