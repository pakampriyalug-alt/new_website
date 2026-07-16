const Seller = require("../models/seller");
const Sproduct =require("../models/sproduct");
const Order =require("../models/Order");
const bcrypt = require("bcryptjs");
exports.sellerRegadded = async (req, res) => {
  try {
    const { name, email, password,mobile,shopname,shopaddress} = req.body;

    if (!name || !email || !password ||!mobile || !shopname || !shopaddress ) {
      return res.status(400).json({ message: "All fields required" });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be 8 characters" });
    }

    const exist = await Seller.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already registered" });
    }
  const hashedPassword = await bcrypt.hash(password, 10);
    const seller = new Seller({ name, email, password:hashedPassword,mobile,shopname,shopaddress });
    await seller.save();

    res.status(201).json({
      message: "Registered Successfully",
      seller, 
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.sellerUpdate= async(req,res)=>{

try{

const seller = await Seller.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

res.json({
message:"Profile Updated Successfully",
seller:seller
});

}
catch(err){
res.status(500).json(err);
}

};

// exports.sellerLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const seller = await Seller.findOne({ email });

//     if (!seller) {
//       return res.json({ message: "Seller not found" });
//     }

//     if (seller.password !== password) {
//       return res.json({ message: "Invalid password" });
//     }

//     // 🔥 IMPORTANT LOGIC
//     if (seller.status === "Pending") {
//       return res.json({ message: "Waiting for admin approval" });
//     }

//     if (seller.status === "Rejected") {
//       return res.json({ message: "Admin rejected your account" });
//     }

//     // ✅ Only approved can login
//     if (seller.status === "Approved") {
//       return res.json({
//         message: "Login success",
//         seller: seller
//       });
//     }

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
const jwt = require("jsonwebtoken");
exports.sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // 🎟️ CREATE TOKEN
   const token = jwt.sign(
  { id: seller._id, role: "seller" },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

    res.status(200).json({
      message: "Login Success",
      token,   // ✅ send token
      seller
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// exports.sellerLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email & Password required" });
//     }

//     const seller = await Seller.findOne({ email, password });

//     if (!seller) {
//       return res.status(401).json({ message: "Invalid Email or Password" });
//     }

//     res.status(200).json({
//       message: "Login Success",
//       seller, // ✅ always send user
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// exports.getsellerProfile = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const seller = await Seller.findById(userId).select("-password");

//     if (!seller) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(seller);

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.getsellerProfile = async (req, res) => {
//   try {
//     const seller = await Seller.findById(req.seller.id).select("-password");

//     if (!seller) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(seller);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getsellerProfile = async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Seller only access" });
    }

    const seller = await Seller.findById(req.user.id).select("-password");

    res.json(seller);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifySeller = async (req, res) => {
  try {
    const { email } = req.body;

    const seller = await Seller.findOne({ email }).select("-password");

    if (!seller) {
      return res.json({ message: "User not found" });
    }

    res.json({ message: "User valid", user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSellerStatus = async (req, res) => {
  try {
    const { sellerId, status } = req.body;

    const seller = await Seller.findById(sellerId);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // ✅ update status
    seller.status = status;

    await seller.save();

    res.json({ success: true, message: "Status updated" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update failed" });
  }
};
exports.getRegseller = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.deleteSeller = async (req, res) => {
  try {
    await Seller.findByIdAndDelete(req.params.id);
    res.json({ message: "user deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getsellerDashboard = async (req, res) => {
  try {
     console.log("API HIT ✅");

    // ✅ GET sellerId from URL
    const { sellerId } = req.params;

    console.log("Backend SellerId:", sellerId);
  
 
    // ✅ 1. Product Count
    const products = await Sproduct.countDocuments({
      Sellerid: sellerId,
    });

  const ordersList = await Order.find({
      "products.Sellerid": sellerId,
    });

    console.log("Orders:", ordersList);

    const orders = ordersList.length;

    // ✅ Total Sales
    let totalSales = 0;

    ordersList.forEach(order => {
      order.products.forEach(item => {
        if (item.Sellerid == sellerId) {
          totalSales += item.price * item.quantity;
        }
      });
    });

    res.json({
      products,
      orders,
      totalSales,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// exports.getsellerDashboard =async(req,res)=>{
//   try{
//     const sellerId =req.params;
//     const products=await Sproduct.countDocuments({ sellerId: new mongoose.Types.ObjectId(sellerId) });
// //     const orders=await Order.countDocuments();
// //     const products=await Product.countDocuments();
// //     const sales=await Order.aggregate([
      
// //  {
// //     $group: {
// //       _id: null, 
// //       totalAmount: { $sum: "$totalAmount" } 
// //     }
// //   }

// //     ]);
// //     const totalsale= sales.length > 0 ? sales[0].totalAmount : 0

    

 

// // console.log(totalsale);

//     res.json({
     
//       products,
      
//     });
//   }catch(err){
//     res.status(500).json({message:err.message});
//   }
// };