const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  userRegister,
  userLogin,
  getUserProfile,
  verifyUser,
  getRegister,
  deleteNewRegister,
  userUpdate,
} = require("../controllers/userController");

// Routes
router.post("/register", userRegister);
router.put("/userupdate/:id",userUpdate)
router.post("/userlogin", userLogin);


router.get("/profile", auth, getUserProfile);
router.post("/verify", verifyUser);
router.get("/viewallregister",getRegister);
router.delete("/deleteregister/:id",deleteNewRegister);

module.exports = router;