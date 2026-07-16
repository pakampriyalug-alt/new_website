const Product = require("../models/product");
   // admin
const Sproduct = require("../models/sproduct"); 
exports.addProduct = async (req, res) => {
  const pro = new Product({
    Productid: req.body.Productid,
    Product: req.body.Product,
    Category: req.body.Category,
    Subcategory: req.body.Subcategory,
    Description:req.body.Description,
    Stock: req.body.Stock,
    Size:req.body.Size,
    Price: req.body.Price,
    Color: req.body.Color,
    Rating: req.body.Rating,
    Review: req.body.Review,
    image: req.file.filename,
  });

  const saved = await pro.save();
  res.json(saved);
};

exports.getProducts = async (req, res) => {
   try {
    const { Category } = req.query;

    let filter = {};
    if (Category) {
      filter.Category = Category;
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
  
};

exports.updateProduct = async (req, res) => {
  const data = {
    Productid: req.body.Productid,
    Product: req.body.Product,
    Category: req.body.Category,
    Subcategory: req.body.Subcategory,
    Description:req.body.Description,
    Stock: req.body.Stock,
    Size:req.body.Size,
    Price: req.body.Price,
    Color: req.body.Color,
    Rating: req.body.Rating,
    Review: req.body.Review,
  };

  if (req.file) data.image = req.file.filename;

  const updated = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(updated);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};




exports.searchProducts = async (req, res) => {
  try {
    const keyword = req.query.q;

    if (!keyword) return res.json([]);

    const products = await Product.find({
      Product: { $regex: keyword, $options: "i" }
    }).limit(10);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


