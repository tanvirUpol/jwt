const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    product: { type: String, required: true },
    price: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
