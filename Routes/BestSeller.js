const express = require("express");
const BestSeller = require("../database/Models/BestSellerSchema");
const cors = require("cors");

const router = express.Router();

router.use(cors());

router.post("/", cors(), async (req, res) => {
  const { name, brand, desc, star, gender, type } = req.body;  

  const perfumType = type.map(({img ,price, size, instock}) => ({
    img,
    price, 
    size,
    instock,
  }))

  const bestSellerProd = new BestSeller({
    name,
    brand,
    desc,
    star,
    gender,
    type : perfumType
  });

  try {
    const savedBestSellerProd = await bestSellerProd.save();
    res.status(200).json(savedBestSellerProd);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", cors(), async (req, res) => {
  try {
    const bestSellers = await BestSeller.find();
    res.status(200).json(bestSellers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
