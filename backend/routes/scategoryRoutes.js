const express = require("express");
const router = express.Router();


const {
  addCategoryseller,
  getCategoryseller,
  updateCategoryseller,
  deleteCategoryseller,
} = require("../controllers/scategoryController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


router.post("/addcategoryseller", upload.single("image"), addCategoryseller);
router.put("/updatecategoryseller/:id", upload.single("image"), updateCategoryseller);

router.get("/viewcategoryseller/:sellerId", getCategoryseller);

router.delete("/deletecategoryseller/:id", deleteCategoryseller);

module.exports = router;
