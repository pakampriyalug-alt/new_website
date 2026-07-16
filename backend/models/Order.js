const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },



  products: [
    {
      productId: String,
      productName: String,
      image: String,
      price: Number,
      size: String,
      quantity: Number,

      Sellerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        default: null   // null = admin product
      },

      deliveryStatus: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered"],
        default: "Pending"
      }
    }
  ],

  totalAmount: {
    type: Number,
    default: 0,
  },

  shippingAddress: {
    fullName: String,
    mobile: String,
    email: String,
    address: String,
    city: String,
    state: String,
    pincode: String
  },

  paymentMethod: {
    type: String,
    enum: ["UPI", "COD"],
  },

  orderStatus: {
    type: String,
    default: "Order Placed"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
