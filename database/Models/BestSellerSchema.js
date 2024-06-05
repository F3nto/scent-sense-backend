const mongoose = require("mongoose");

const BestSellerSchema = mongoose.Schema(
  { 
    name: { type: String, required: true },
    brand: { type: String, required: true },
    desc: { type: String, required: true, maxlength: 700 },
    star : {type: Number, required : true},
    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
      required: true,
    },
    type: [
      {
        img: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: Number, required: true },
        instock : {type : Number, required : true},
      }
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("BestSeller", BestSellerSchema);
