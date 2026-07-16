const express = require("express");
const router = express.Router();
const { addToCart, Cartcount,getAddtocart,deleteAddtocart, updateCartQuantity,getBuyNowProduct } = require("../controllers/cartController");

router.post("/addcart", addToCart);
router.get("/cartcount/:userId",Cartcount);
router.get("/getaddtocart/:userId",getAddtocart);
router.delete("/deleteaddtocart/:id", deleteAddtocart);
router.put("/updatecartquantity/:id",updateCartQuantity);
router.get("/buynow/:id",getBuyNowProduct);

module.exports = router;
