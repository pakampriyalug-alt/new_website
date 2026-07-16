
const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    mobile:String,
    shopname:String,
    shopaddress:String,
   status: {
  type: String,
  enum: ["Pending", "Approved", "Rejected"],
  default: "Pending"
}
   
   


 
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);