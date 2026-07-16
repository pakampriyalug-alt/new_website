const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");


// Create Order
router.post("/create", orderController.createOrder);

// Save Shipping
router.put("/shipping/:orderId", orderController.saveShippingAddress);

// Save Payment
router.put("/payment/:orderId", orderController.savePaymentMethod);

// Get Order By Id
router.get("/:orderId", orderController.getOrderById);

// Get User Orders
router.get("/user/:userId", orderController.getUserOrders);
// ⭐ ADMIN - Get All Orders
router.get("/admin/all", orderController.getAllOrders);
router.put(
  "/admin/update-delivery",
  orderController.updateDeliveryStatus
);

router.post("/cart", orderController.placeOrderFromCart);

router.get("/seller/:sellerId",orderController. getSellerOrders);
router.put("/seller/update-delivery", orderController.updateSellerDeliveryStatus);
// router.put("/api/order/paypage/:orderId", orderController.savePayment);
router.get("/sale/product-consales",orderController. controlProductSales);
router.get("/sale/sellerproduct-consales/:sellerId",orderController.getSellerMonthlySales);
module.exports = router;
