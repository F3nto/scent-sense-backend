const express = require("express");
const cors = require("cors");
const TopRated = require("../database/Models/TopRatedSchema");

const router = express.Router();

router.post("/", cors(), async (req, res) => {
  const { name, brand, desc, gender, instock, type } = req.body;

  const perfumType = type.map(({img, price, size}) => ({
    img,
    price,
    size
  }))
  
  const topRatedProd = new TopRated({
    name,
    brand,
    desc,
    gender,
    instock,
    type : perfumType
  });
  try {
    const savedTopRated = await topRatedProd.save();
    res.status(200).json(savedTopRated)
  } catch (error) {
    res.status(500).json({error : error.message})
  }
});

router.get("/", cors(), async(req, res) => {
    try {
        const topRatedProds = await TopRated.find();
        res.status(200).json(topRatedProds)
    } catch (error) {
        res.status(500).json({error: error.message})
    }

})

module.exports = router;