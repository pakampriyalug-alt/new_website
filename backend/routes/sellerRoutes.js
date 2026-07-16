const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
sellerRegadded,
  sellerLogin,
  getsellerProfile,

  getRegseller,
  deleteSeller,
  sellerUpdate,
  updateSellerStatus,
  getsellerDashboard
} = require("../controllers/sellercontroller");

// Routes
router.post("/sellerregadded", sellerRegadded);
router.put("/sellerupdate/:id",sellerUpdate)
router.post("/sellerlogin", sellerLogin);
router.get("/sellerprofile",auth, getsellerProfile);
router.put("/updatesellerstatus",updateSellerStatus);
router.get("/viewallseller",getRegseller);
router.delete("/deleteseller/:id",deleteSeller);
router.get("/getsellerdashboard/:sellerId",getsellerDashboard);


module.exports = router;