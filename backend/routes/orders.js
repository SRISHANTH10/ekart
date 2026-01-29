const express = require("express");
const Order = require("../models/Order");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

/* PLACE ORDER */
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.userId).populate("cart.productId");

  if (!user.cart.length) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const items = user.cart.map(item => ({
    productId: item.productId._id,
    name: item.productId.name,
    price: item.productId.price,
    qty: item.qty,
    img: item.productId.img
  }));

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const order = new Order({
    user: user._id,
    items,
    total
  });

  await order.save();

  // Clear cart after order
  user.cart = [];
  await user.save();

  res.json({ message: "Order placed successfully", order });
});

/* GET USER ORDERS */
router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
