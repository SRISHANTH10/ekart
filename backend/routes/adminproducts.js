const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

/* GET ALL PRODUCTS */
router.get("/", auth, admin, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

/* ADD PRODUCT */
router.post("/", auth, admin, async (req, res) => {
  const { name, price, category, img } = req.body;

  if (!name || !price || !category || !img) {
    return res.status(400).json({ message: "All fields required" });
  }

  const product = new Product({ name, price, category, img });
  await product.save();

  res.status(201).json(product);
});

/* DELETE PRODUCT */
router.delete("/:id", auth, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;
