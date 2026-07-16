const mongoose = require("mongoose");

const sproductSchema = new mongoose.Schema({
  Productid: { type: String, required: true, unique: true },
  Product: { type: String, required: true },
  Category: { type: String, required: true },
  Subcategory: { type: String, required: true },
  Description:{
    type:String,
    required:true,
  },
  Size:{type:String,required:true},
  Stock: { type: Number, required: true },
  Price: { type: Number, required: true },
  Color: { type: String, required: true },
  Rating: { type: Number, default: 0 },
  Review: { type: String },
  image: { type: String, required: true },
   Sellerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Sproduct", sproductSchema);
