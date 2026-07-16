
const Admin = require("../models/Admin");
const User =require("../models/user");
const Order =require("../models/Order");
const Product=require("../models/product");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email, password });
    console.log(email);
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      admin,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getDashboard =async(req,res)=>{
  try{
    const users=await User.countDocuments();
    const orders=await Order.countDocuments();
    const products=await Product.countDocuments();
    const sales=await Order.aggregate([
      
 {
    $group: {
      _id: null, 
      totalAmount: { $sum: "$totalAmount" } 
    }
  }

    ]);
    const totalsale= sales.length > 0 ? sales[0].totalAmount : 0

    

 

console.log(totalsale);

    res.json({
      users,
      orders,
      products,
      totalsale
    });
  }catch(err){
    res.status(500).json({message:err.message});
  }
};