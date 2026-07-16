const Sproduct = require("../models/sproduct");


exports.addsellerProduct = async (req, res) => {
  const pro = new Sproduct({
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
    Sellerid:req.body.Sellerid,
    image: req.file.filename,
  });

  const saved = await pro.save();
  res.json(saved);
};

exports.getsellerProducts = async (req, res) => {
   try {
    const {sellerId } = req.query;

    let filter = {Sellerid:sellerId};
    
    const products = await Sproduct.find(filter).populate("Sellerid", "shopname shopaddress");
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
  
};
// exports.getsellerallProducts = async (req, res) => {
//    try {
//     const { Category } = req.query;

//     let filter = {};
//     if (Category) {
//       filter.Category = Category;
//     }

//     const sproducts = await Sproduct.find(filter);
//     res.json(sproducts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
  
// };
exports.getsellerallProducts = async (req, res) => {
  try {
    const { Category } = req.query;

    let filter = {};
    if (Category) {
      filter.Category = Category;
    }

    const sproducts = await Sproduct
      .find(filter)
      .populate("Sellerid", "shopname shopaddress");  // ⭐ ADD THIS

    res.json(sproducts);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatesellerProduct = async (req, res) => {
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

  const updated = await Sproduct.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(updated);
};

exports.deletesellerProduct = async (req, res) => {
  await Sproduct.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
