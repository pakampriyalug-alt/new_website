const Category = require("../models/category");

exports.addUser = async (req, res) => {
  try {
    const user = new Category({
  
      Category: req.body.Category,
      Subcategory: req.body.Subcategory,
      // Stock: req.body.Stock,
      image: req.file ? req.file.filename : null,
    });

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const data = {
    
      Category: req.body.Category,
      Subcategory: req.body.Subcategory,
      // Stock: req.body.Stock,
    };

    if (req.file) {
      data.image = req.file.filename;
    }

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};
