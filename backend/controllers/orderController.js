const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/product");
const Sproduct = require("../models/sproduct");
exports.createOrder = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { userId, product, totalAmount } = req.body;

    if (!userId || !product || !totalAmount) {
      return res.status(400).json({
        message: "Missing Fields"
      });
    }

 const items = [product];

for (let item of items) {

  console.log("ITEM:", item);

  let existingProduct;

  // ✅ seller product
  if (item.Sellerid) {
    existingProduct = await Sproduct.findOne({
      _id: item.productId,
      Sellerid: item.Sellerid
    });
  } else {
    existingProduct = await Product.findById(item.productId);
  }

  console.log("FOUND PRODUCT:", existingProduct);

  if (!existingProduct) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  // ✅ use Stock (capital)
  if (existingProduct.Stock <= 0) {
    return res.status(400).json({ message: "Out of Stock" });
  }

  if (existingProduct.Stock < item.quantity) {
    return res.status(400).json({ message: "Not Enough Stock" });
  }

  // ✅ UPDATE STOCK
  if (item.Sellerid) {
    await Sproduct.updateOne(
      {
        _id: item.productId,
        Sellerid: item.Sellerid
      },
      {
        $inc: { Stock: -item.quantity }   // ✅ correct field
      }
    );
  } else {
    await Product.updateOne(
      { _id: item.productId },
      { $inc: { Stock: -item.quantity } }
    );
  }
}

//  let existingProduct;


// if (product.Sellerid) {
//   existingProduct = await Sproduct.findById(product.productId);
// } else {
//   existingProduct = await Product.findById(product.productId);
// }

// if (!existingProduct) {
//   return res.status(404).json({ message: "Product Not Found" });
// }

// if (existingProduct.Stock <= 0) {
//   return res.status(400).json({ message: "Out Of Stock" });
// }
// if (existingProduct.Stock < product.quantity) {
//   return res.status(400).json({ message: "Not Enough Stock" });
// }

// if (product.Sellerid) {
//   await Sproduct.updateOne(
//     { _id: product.productId },
//     { $inc: { Stock: -product.quantity } }
//   );
// } else {
//   await Product.updateOne(
//     { _id: product.productId },
//     { $inc: { Stock: -product.quantity } }
//   );
// }

    
  //   const order = new Order({
  //     userId,
  //     product: Array.isArray(product) ? product[0] : product,
  //     totalAmount,
  //      orderStatus: "Created",
  // deliveryStatus: "Pending"
  //   });
   const order = new Order({
      userId,
      products: [   
        {
          productId: product.productId,
          productName: product.productName,
          price: product.price,
          quantity: product.quantity,
          size: product.size,
          image: product.image,
          Sellerid:product.Sellerid,
          deliveryStatus: "Pending"
        }
      ],
      totalAmount,
      orderStatus: "Created",
      
    });

    const saved = await order.save();


    res.status(201).json({
      success: true,
      orderId: saved._id
    });

  } catch (error) {
    console.log("ORDER ERROR:", error);
    res.status(500).json({
      message: "Order Failed",
      error: error.message
    });
  }
};


// const Order = require("../models/Order");



// exports.createOrder = async (req, res) => {
//   try {
//  const { userId, product,totalAmount } = req.body;
//  const order = new Order({
//   userId,
//   product,
//   totalAmount,
//   orderStatus: "Created",
//   deliveryStatus: "Pending"
// });


//     const savedOrder = await order.save();

//     res.status(201).json({
//       success: true,
//       message: "Order Created",
//       orderId: savedOrder._id
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Order Create Failed"
//     });
//   }
// };



 
exports.saveShippingAddress = async (req, res) => {
  try {

    const { shippingAddress } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        shippingAddress,
        orderStatus: "Shipping Added"
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Shipping Saved",
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Shipping Save Failed"
    });
  }
};



exports.savePaymentMethod = async (req, res) => {
  try {

    const { paymentMethod } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        paymentMethod,
        orderStatus: "Order Placed"
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Payment Saved",
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Payment Save Failed"
    });
  }
};



exports.getOrderById = async (req, res) => {
  try {

    const order = await Order.findById(req.params.orderId);

    res.json(order);

  } catch (error) {
    res.status(500).json({
      message: "Order Fetch Failed"
    });
  }
};




exports.getUserOrders = async (req, res) => {
  try {

    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: "User Orders Fetch Failed"
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      totalOrders: orders.length,
      orders
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Fetch All Orders Failed"
    });
  }
};

exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { orderId, productId, deliveryStatus } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const product = order.products.find(
      item => item.productId === productId
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.deliveryStatus = deliveryStatus;

    await order.save();

    res.json({ success: true });

  } catch (err) {
    console.log(err); // 🔥 add this
    res.status(500).json({ message: "Update failed" });
  }
};
// exports.placeOrderFromCart = async (req, res) => {
//   try {
//     const { userId, shippingAddress } = req.body;

//     const cartItems = await Cart.find({ userId });

//     if (cartItems.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     const products = cartItems.map(item => ({
//       productId: item.productId,
//       productName: item.productName,
//       price: item.price,
//       quantity: item.quantity,
//       image: item.image
//     }));

//     const totalAmount = cartItems.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );

//     const order = new Order({
//       userId,
//       product:products,
//       totalAmount,
//       shippingAddress,
//       orderStatus: "Placed"
//     });

//     await order.save();

//     // ✅ CLEAR CART
//     await Cart.deleteMany({ userId });

//     res.json({
//       success: true,
//       message: "Order Placed Successfully",
//       orderId: order._id
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Order Failed" });
//   }
// };
// 
// 
// exports.placeOrderFromCart = async (req, res) => {
//   try {
//     const { userId, shippingAddress } = req.body;

    
//     const cartItems = await Cart.find({ userId });

//     console.log("CART ITEMS:", cartItems);
//     console.log("IS ARRAY:", Array.isArray(cartItems));

//     if (!cartItems || cartItems.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

  
//     const products = cartItems.map(item => ({
//       productId: item.productId,
//       productName: item.productName,
//       price: item.price,
//       image: item.image,
//       quantity: item.quantity,
//       size: item.size
      
//     }));

//     const totalAmount = cartItems.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );

   
//     const order = new Order({
//       userId,
//       product:products,  
//       totalAmount,
//       shippingAddress,
//       orderStatus: "Placed",
//       deliveryStatus: "Pending"
//     });

//     await order.save();

  
//     await Cart.deleteMany({ userId });

//     res.json({
//       success: true,
//       message: "Order Placed Successfully",
//       orderId: order._id
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Order Failed" });
//   }
// };

exports.placeOrderFromCart = async (req, res) => {
  try {

    const { userId, shippingAddress } = req.body;

    const cartItems = await Cart.find({ userId });

    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart empty" });
    }
     for (let item of cartItems) {

      console.log("CART ITEM:", item);

      let existingProduct;

      // ✅ SELLER PRODUCT
      if (item.Sellerid) {
        existingProduct = await Sproduct.findOne({
          _id: item.productId,
          Sellerid: item.Sellerid
        });
      } else {
        existingProduct = await Product.findById(item.productId);
      }

      console.log("FOUND PRODUCT:", existingProduct);

      if (!existingProduct) {
        return res.status(404).json({ message: "Product Not Found" });
      }

      // ✅ CHECK STOCK (your DB uses Stock)
      if (existingProduct.Stock <= 0) {
        return res.status(400).json({ message: "Out of Stock" });
      }

      if (existingProduct.Stock < item.quantity) {
        return res.status(400).json({ message: "Not Enough Stock" });
      }

      // ✅ REDUCE STOCK
      if (item.Sellerid) {
        await Sproduct.updateOne(
          {
            _id: item.productId,
            Sellerid: item.Sellerid
          },
          {
            $inc: { Stock: -item.quantity }
          }
        );
      } else {
        await Product.updateOne(
          { _id: item.productId },
          { $inc: { Stock: -item.quantity } }
        );
      }
    }


    // ✅ calculate total
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // ✅ create ONE order
    const order = new Order({
      userId,
      products: cartItems.map(item => ({
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        size: item.size,
        Sellerid: item.Sellerid || null,
        deliveryStatus: "Pending"
      })),
      totalAmount,
      shippingAddress,
      orderStatus: "Order Placed"
    });



    const savedOrder = await order.save();

    // ✅ clear cart
    await Cart.deleteMany({ userId });

    res.json({
      success: true,
      message: "Order Placed Successfully",
      orderId: savedOrder._id
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Order failed" });
  }
};
// exports.savePayment = async (req, res) => {
//   try {
//     const { paymentMethod } = req.body;

//     await Order.findByIdAndUpdate(req.params.orderId, {
//       paymentMethod,
//     });

//     res.json({ success: true });

//   } catch (err) {
//     res.status(500).json({ message: "Payment failed" });
//   }
// };
// GET seller orders
// GET SELLER PRODUCTS FROM ORDERS
// GET SELLER ORDERS
exports.getSellerOrders = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const orders = await Order.find({
      "products.Sellerid": sellerId
    });

    
    const filteredOrders = orders.map(order => ({
      ...order._doc,
      products: order.products.filter(
        item => item.Sellerid && item.Sellerid.toString() === sellerId
      )
    }));

    console.log("Filtered Orders:", filteredOrders);

    res.json({ orders: filteredOrders });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching seller orders" });
  }
};
exports.updateSellerDeliveryStatus = async (req, res) => {
  try {
    const { orderId, productId, deliveryStatus } = req.body;

    const order = await Order.findById(orderId);

    const product = order.products.find(
      item => item.productId === productId
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.deliveryStatus = deliveryStatus;

    await order.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
exports.controlProductSales = async (req, res) => {
  try {
    const orders = await Order.find();

    const result = {};

    orders.forEach(order => {
      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "short"
      }); // Jan, Feb, Mar...

      if (!result[month]) {
        result[month] = 0;
      }

      order.products.forEach(item => {
        result[month] += item.price * item.quantity;
      });
    });

    // ✅ Convert to array
    const formattedData = Object.keys(result).map(month => ({
      month,
      sales: result[month]
    }));

    // ✅ Sort in correct month order
    const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    formattedData.sort(
      (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    );

    res.json(formattedData);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
};
exports.getSellerMonthlySales = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const orders = await Order.find({
      "products.Sellerid": sellerId
    });

    const result = {};

    orders.forEach(order => {
      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "short"
      });

      if (!result[month]) {
        result[month] = 0;
      }

      order.products.forEach(item => {
        
        if (item.Sellerid && item.Sellerid.toString() === sellerId) {
          result[month] += item.price * item.quantity;
        }
      });
    });

    const formattedData = Object.keys(result).map(month => ({
      month,
      sales: result[month]
    }));

    const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    formattedData.sort(
      (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    );

    res.json(formattedData);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
};