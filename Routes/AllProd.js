const express = require("express");
const AllProduct = require("../database/Models/AllProd");
const cors = require("cors");

const router = express.Router();

router.use(cors());

router.post("/", cors(), async (req, res) => {
  const { name, brand, desc, star, gender, type } = req.body;

  const perfumType = type.map(({ img, price, size, instock }) => ({
    img,
    price,
    size,
    instock,
  }));

  const AllProds = new AllProduct({
    name,
    brand,
    desc,
    star,
    gender,
    type: perfumType,
  });

  if ("differFolder" in req.body) {
    productData.differFolder = req.body.differFolder;
  }

  try {
    const savedAllProd = await AllProds.save();
    res.status(200).json(savedAllProd);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//! update
router.patch("/:id", cors(), async (req, res) => {
  const { instock, typeID } = req.body;
  console.log(req.body);

  try {
    const updatedProduct = await AllProduct.findOneAndUpdate(
      { "type._id": typeID },
      { $set: { "type.$.instock": instock } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("success");
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", cors(), async (req, res) => {
  try {
    const AllProds = await AllProduct.find();
    res.status(200).json(AllProds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
