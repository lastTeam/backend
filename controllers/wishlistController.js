const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// In-memory wishlist for demo (can be replaced with Redis or other storage)
const wishlistStore = {}; // { userId: [productId, productId, ...] }

exports.addToWishlist = async (req, res) => {
  const { userId, productId } = req.params; // Adjusted to use req.params

  if (!userId || !productId) {
    return res
      .status(400)
      .json({ error: "User ID and Product ID are required." });
  }

  try {
    // Ensure the user and product exist
    const userExists = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    const productExists = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!userExists || !productExists) {
      return res.status(404).json({ error: "User or Product not found." });
    }

    // Add product to user's wishlist
    if (!wishlistStore[userId]) wishlistStore[userId] = [];
    // Convert productId to integer before pushing to the wishlist
    if (!wishlistStore[userId].includes(parseInt(productId))) {
      wishlistStore[userId].push(parseInt(productId));
    }

    res.status(200).json({ message: "Product added to wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getWishlist = async (req, res) => {
  const userId = parseInt(req.params.userId); // Adjusted to use req.params

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const wishlistProductIds = wishlistStore[userId] || [];
    // Convert product IDs to integers
    const integerProductIds = wishlistProductIds.map((id) => parseInt(id, 10));

    const products = await prisma.product.findMany({
      where: { id: { in: integerProductIds } },
      include: {
        owner: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
            email: true,
          },
        },
        category: {
          select: { name: true },
        },
      },
    });
    res.status(200).json({ wishlist: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.params;

  if (!userId || !productId) {
    return res
      .status(400)
      .json({ error: "User ID and Product ID are required." });
  }

  try {
    if (wishlistStore[userId]) {
      // Convert both to integers for comparison
      wishlistStore[userId] = wishlistStore[userId].filter(
        (id) => id !== parseInt(productId)
      );
    }

    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
