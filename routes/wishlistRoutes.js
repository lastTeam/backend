// In wishlist.js
const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

// Wishlist routes
router.post(
  "/users/:userId/wishlist/:productId",
  wishlistController.addToWishlist
);
router.get("/users/:userId/wishlist", wishlistController.getWishlist);
router.delete(
  "/users/:userId/wishlist/:productId",
  wishlistController.removeFromWishlist
);

module.exports = router;
