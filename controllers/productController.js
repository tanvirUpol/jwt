const Product = require("../models/ProductModel");
const mongoose = require("mongoose");

// get all
const getProducts = async (req, res) => {
  const products = await Product.find({user_id: req.user._id});
  res.status(200).json(products);
};

// get single Product
const getProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such product" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "No such producr" });
  }

  res.status(200).json(product);
};

// create product

const uploadProduct = async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    await Product.create(req.body);

    res.status(200).json({ message: "Data uploaded successfully." });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Failed to upload data." });
  }
};

module.exports = {
  getProducts,
  uploadProduct,
  getProduct,
};
