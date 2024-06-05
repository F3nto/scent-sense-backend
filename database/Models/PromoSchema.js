const mongoose = require("mongoose");

const PromoSchema = mongoose.Schema(
  {
    img: { type: String, required: true },
    promoday: { type: String, required: true },
    discount: { type: Number, required: true },
    duration: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Promo", PromoSchema);
