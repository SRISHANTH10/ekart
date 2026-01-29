const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

/* GET CART */
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.userId).populate("cart.productId");
  res.json(user.cart);
});

/* ADD / UPDATE CART ITEM */
router.post("/", auth, async (req, res) => {
  const { productId, qty } = req.body;
  const user = await User.findById(req.userId);

  const item = user.cart.find(i => i.productId.equals(productId));

  if (item) {
    item.qty = qty;
  } else {
    user.cart.push({ productId, qty });
  }

  await user.save();
  res.json(user.cart);
});

/* REMOVE ITEM */
router.delete("/:productId", auth, async (req, res) => {
  const user = await User.findById(req.userId);

  user.cart = user.cart.filter(
    i => !i.productId.equals(req.params.productId)
  );

  await user.save();
  res.json(user.cart);
});

module.exports = router;
