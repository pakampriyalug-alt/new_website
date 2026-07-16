// const Wishlist = require("../models/Wishlist");


// exports.addToWish = async (req, res) => {
//   try {

//      const { userId, productId, productName, image, price,rating,review } = req.body;

//     const exist = await Wishlist.findOne({ userId, productId });

//     if (exist) {
//       return res.json({ message: "Already in wishlist" });
//     }

//     const wishItem = new Wishlist({
//       userId,
//       productId,
      
      
//     });

//     await wishItem.save();
    
//     console.log("CART ITEMS:", wishItem);

//     res.status(201).json({
//       message: "Added to wishlist successfully",
//       wishId:wishItem._id
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// exports.Wishcount = async (req, res) => {
//   try {
//     const { userId } = req.params; // get userId from URL

//     if (!userId) {
//       return res.json({ count: 0 });
//     }

//     const count = await Wishlist.countDocuments({ userId });

//     res.json({ count });
//   } catch (err) {
//     res.status(500).json({ err });
//   }
// };
// // exports.getWishlist = async (req, res) => {
// //   try {
// //     const { userId } = req.params;
// //     const wishlist = await Wishlist.find({userId}).sort({ createdAt: -1 });
// //     console.log({userId});
// //     res.json(wishlist);
// //   } catch (err) {
// //     res.status(500).json(err);
// //   }
// // };
// exports.getWishlist = async (req, res) => {
//   try {
//     const { userId } = req.query;   // ✅ FIXED

//     const wishlist = await Wishlist.find({ userId })
//       .populate("productId")
//       .sort({ createdAt: -1 });

//     res.json(wishlist);

//   } catch (err) {
//     res.status(500).json(err);
//   }
// };



// // exports.deleteWishlist = async (req, res) => {
// //   try {
// //     await Wishlist.findByIdAndDelete(req.params.id);
// //     res.json({ message: "cart is remove" });
// //   } catch (err) {
// //     res.status(500).json(err);
// //   }
// // };
// // exports.removeWishlist = async (req, res) => {
// //   try {
// //     const { userId, productId } = req.query;

// //     if (!userId || !productId) {
// //       return res.status(400).json({ message: "Missing data" });
// //     }

// //     await Wishlist.findOneAndDelete({ userId, productId });

// //     res.json({ success: true });

// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ message: err.message });
// //   }
// // };


// exports.removeFromWishlist = async (req, res) => {
//   const { userId, productId } = req.query;

//   try {
//     await Wishlist.findOneAndDelete({
//       userId,
//       productId: new mongoose.Types.ObjectId(productId), // ✅ FIX
//     });

//     res.json({ message: "Removed from wishlist" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
const Wishlist = require("../models/Wishlist");
const mongoose = require("mongoose");
const Product = require("../models/product");
const Sproduct = require("../models/sproduct");


// ✅ ADD
exports.addToWish = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const exist = await Wishlist.findOne({ userId, productId });

    if (exist) {
      return res.json({ message: "Already in wishlist" });
    }

    const wishItem = new Wishlist({ userId, productId });
    await wishItem.save();

    res.json({ message: "Added to wishlist" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET


exports.getWishlist = async (req, res) => {
  try {
    const { userId } = req.query;

    const wishlist = await Wishlist
      .find({ userId })
      .sort({ createdAt: -1 });

    const result = [];

    for (let item of wishlist) {

      let product =
        await Product.findById(item.productId) ||
        await Sproduct.findById(item.productId);

      if (product) {
        result.push({
          ...item._doc,
          productId: product
        });
      }

    }

    res.json(result);

  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ REMOVE (IMPORTANT FIX)
exports.removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    await Wishlist.findOneAndDelete({
      userId,
      productId: new mongoose.Types.ObjectId(productId),
    });

    res.json({ message: "Removed" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ COUNT
exports.Wishcount = async (req, res) => {
  try {
    const { userId } = req.params;

    const count = await Wishlist.countDocuments({ userId });

    res.json({ count });

  } catch (err) {
    res.status(500).json({ err });
  }
};