const express = require("express");
const Promo = require("../database/Models/PromoSchema");
const cors = require("cors");

const router = express.Router();

router.use(cors());

router.post("/", cors(), async (req, res) => {
  try {
    const { img, promoday, wish, discount, duration } = req.body;
        
    if (
      !img ||
      !promoday ||
      !discount ||
      !duration ||
      !duration.start ||
      !duration.end
    ) {
      return res.status(400).json({ error: "Missing required fields!!!" });
    }

    const promoSeason = new Promo({
      img,
      promoday,
      discount,
      duration: {
        start: new Date(duration.start),
        end: new Date(duration.end),
      },
    });

    const savedPromoSeason = await promoSeason.save();
    res.status(200).json(savedPromoSeason);
  } catch (error) {
    console.error("Error creating promo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", cors(), async (req, res) => {
  try {
    const promos = await Promo.find();
    res.status(200).json(promos);
  } catch (error) {
    console.error("Error fetching promos:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
