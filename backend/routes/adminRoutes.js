// routes/adminRoutes.js
const express = require("express");
const router = express.Router();

const { adminLogin, getDashboard } = require("../controllers/adminController");

router.post("/adminlogin", adminLogin);
router.get("/getdashboard",getDashboard);

module.exports = router;