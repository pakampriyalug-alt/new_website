const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
   userId: {   // ✅ ADD THIS FIELD
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  Sellerid: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Seller",
  default: null
},
  productName: String,
  image: String,
  price: Number,
  size: String,
  quantity:{
    type:Number,
    default:1,
  },
  
},
 { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
