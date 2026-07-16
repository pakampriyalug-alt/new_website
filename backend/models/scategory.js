const mongoose = require("mongoose");

const scategorySchema = new mongoose.Schema(
  {
    Categoryid: String,
    Category: String,
    Subcategory: String,
    image: String,
    Sellerid:String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scategory", scategorySchema);
