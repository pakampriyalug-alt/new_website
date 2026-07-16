const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    
    Category: String,
    Subcategory: String,
    // Stock: Number,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
