const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByKeyword,
  getProductById,
} = require("../controllers/productcontroller");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/addproduct", upload.single("image"), addProduct);
router.put("/updateproduct/:id", upload.single("image"), updateProduct);
router.get("/search", searchProducts);



router.get("/viewproduct", getProducts);
router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;
