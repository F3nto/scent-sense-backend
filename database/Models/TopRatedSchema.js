const mongoose = require("mongoose");

const TopRatedSchema = mongoose.Schema(
  { 
    name: { type: String, required: true },
    brand: { type: String, required: true },
    desc: { type: String, required: true, maxlength: 700 },
    instock : {type : Number, required : true},
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
      }
    ],
  },


  { timestamps: true }
);

module.exports = mongoose.model("TopRated", TopRatedSchema);
