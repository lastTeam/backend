const express = require("express");
const router = express.Router();
const {
  getCartItems,
  addToCart,
  deleteFromCart,
} = require("../controllers/cartController");

// Get cart items for a user
router.get("/:userId", getCartItems);

// Add item to cart
router.post("/add", addToCart);

// Delete item from cart (modified to match frontend)
router.delete("/:userId/:productId", deleteFromCart);

module.exports = router;
