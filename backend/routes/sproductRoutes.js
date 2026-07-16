const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  addsellerProduct,
  getsellerProducts,
  updatesellerProduct,
  deletesellerProduct,
  getsellerallProducts,
} = require("../controllers/sellerproductController");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/addsellerproduct", upload.single("image"), addsellerProduct);
router.put("/updatesellerproduct/:id", upload.single("image"), updatesellerProduct);
router.get("/viewsellerproduct", getsellerProducts);
router.delete("/deletesellerproduct/:id", deletesellerProduct);
router.get("/sellerallproduct",getsellerallProducts)
module.exports = router;
