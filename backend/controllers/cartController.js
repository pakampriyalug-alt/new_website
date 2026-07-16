const Cart = require("../models/Cart");

// exports.addToCart = async (req, res) => {
//   try {
    
//     const existingpro= await Cart.findOne({
//         userId: req.body.userId,
//       productId:req.body.productId,
//       size:req.body.size,
//       quantity:req.body.quantity,
//     })
//     if(existingpro){
//       return res.json({
//         message: "Product already exists in cart",
//         alreadyExists: true,
//           cartId: existingpro._id, 
//       });

//     }
//     const cartItem = new Cart({
//       userId:req.body.userId,
//       productId: req.body.productId,
//       productName: req.body.productName,
//       image: req.body.image,
//       price: req.body.price,
//       size: req.body.size,
//       quantity: req.body.quantity,
//     });

//     await cartItem.save();
//      console.log("CART ITEMS:", cartItem);
//       console.log("TYPE:", typeof cartItem);
//     res.status(201).json({ message: "Added to cart successfully",
//        cartId: cartItem._id 
      
//      });
    
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
exports.addToCart = async (req, res) => {
  try {

    const existingpro = await Cart.findOne({
      userId: req.body.userId,
      productId: req.body.productId,
      size: req.body.size
    });

    if (existingpro) {
      // ✅ increase quantity instead
      existingpro.quantity += req.body.quantity;
      await existingpro.save();

      return res.json({
        message: "Quantity updated",
        cartId: existingpro._id
      });
    }

    const cartItem = new Cart({
      userId: req.body.userId,
      productId: req.body.productId,
      productName: req.body.productName,
      image: req.body.image,
      price: req.body.price,
      size: req.body.size,
      quantity: req.body.quantity,
      Sellerid:req.body.Sellerid,
    });

    await cartItem.save();
    
    console.log("CART ITEMS:", cartItem);

    res.status(201).json({
      message: "Added to cart successfully",
      cartId: cartItem._id
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.Cartcount = async (req, res) => {
  try {
    const { userId } = req.params; // get userId from URL

    if (!userId) {
      return res.json({ count: 0 });
    }

    const count = await Cart.countDocuments({ userId });

    res.json({ count });
  } catch (err) {
    res.status(500).json({ err });
  }
};
exports.getAddtocart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.find({userId}).sort({ createdAt: -1 });
    console.log({userId});
    res.json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getBuyNowProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Cart.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json(error); 
  }
};



exports.deleteAddtocart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "cart is remove" });
  } catch (err) {
    res.status(500).json(err);
  }
};



exports.updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { id } = req.params;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Quantity update failed" });
  }
};
