const mongoose = require("mongoose");

const TreasureProdSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    img : {type : String, required: true},
    price: {type : String, required : true},
    brand: { type: String, required: true },
    star : {type:Number, required : true},
    desc: { type: String, required: true },
    differFolder : {type : String, required : true},
    instock : {type : Number, required : true},
    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TreasureProd", TreasureProdSchema);
