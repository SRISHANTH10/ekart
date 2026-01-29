const mongoose = require("mongoose");
const Product = require("./models/product");
const products = require("./products.json");
require("dotenv").config();

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // OPTIONAL: clear existing products
    await Product.deleteMany();
    console.log("🗑 Old products removed");

    // Insert new products
    await Product.insertMany(products);
    console.log("🎉 Products seeded successfully");

    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seedProducts();
