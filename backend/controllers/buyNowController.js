const Product = require("../models/product");

// Get Product For Buy Now
exports.getBuyNowProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json(error);
  }
};
