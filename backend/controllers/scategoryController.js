const Scategory = require("../models/scategory");

exports.addCategoryseller = async (req, res) => {
  try {
    const seller = new Scategory({
      Categoryid: req.body.Categoryid,
      Category: req.body.Category,
      Subcategory: req.body.Subcategory,
      
      image: req.file ? req.file.filename : null,
      Sellerid:req.body.Sellerid,
    });

    await seller.save();
    res.json(seller);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getCategoryseller = async (req, res) => {
  try {
    const sellers = await Scategory.find({Sellerid:req.params.sellerId});
    res.json(sellers);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateCategoryseller = async (req, res) => {
  try {
    const data = {
      Categoryid: req.body.Categoryid,
      Category: req.body.Category,
      Subcategory: req.body.Subcategory,
      Sellerid:req.body.Sellerid,
      // Stock: req.body.Stock,
    };

    if (req.file) {
      data.image = req.file.filename;
    }

    const updated = await Scategory.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteCategoryseller = async (req, res) => {
  try {
    await Scategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};
