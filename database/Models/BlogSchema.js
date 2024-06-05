const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  img: { type: String, required: true },
  title: { type: String, required: true },
  overview: { type: String, required: true },
  details: [
    {
      sectionTitle: { type: String, required: true },
      sectionContent: { type: String, required: true },
    },
  ],
  date: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model("Blogs", BlogSchema);
