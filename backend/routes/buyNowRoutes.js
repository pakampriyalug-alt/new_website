const express = require("express");
const router = express.Router();

const buyNow = require("../controllers/buyNowController");

// Buy Now Get Product Using ID
router.get("/buynow/:id", buyNow.getBuyNowProduct);

module.exports = router;
