// const express = require("express");
// const router = express.Router();
// const { addToWish} = require("../controllers/wishlistController");
// const { Wishcount, getWishlist, removeFromWishlist } = require("../controllers/wishlistController");

// router.post("/addwish", addToWish);
// router.get("/wishcount/:userId",Wishcount);
// router.get("/getwishlist/:userId",getWishlist);

// router.delete("/removewishlist", removeFromWishlist);

// module.exports = router;
const router = require("express").Router();
const wishlistController = require("../controllers/wishlistController");

router.post("/addwish", wishlistController.addToWish);
router.get("/getwishlist", wishlistController.getWishlist);
router.delete("/removewishlist", wishlistController.removeFromWishlist);
router.get("/wishcount/:userId", wishlistController.Wishcount);

module.exports = router;