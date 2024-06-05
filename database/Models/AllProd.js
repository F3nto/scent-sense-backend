const mongoose = require("mongoose");

const AllProdSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    desc: { type: String, required: true },
    star : {type:Number, required : true},
    differFolder : {type : String, required : true},
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
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("AllProd", AllProdSchema);
