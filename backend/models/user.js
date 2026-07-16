
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    mobile:String,
    address:String,
    gender: {
  type: String,

},
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);