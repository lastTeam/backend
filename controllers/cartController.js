const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get cart items for a specific user
const getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const userIdInt = parseInt(userId, 10);

    if (isNaN(userIdInt)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: userIdInt,
        status: "cart",
      },
      include: {
        product: true,
      },
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching cart items." });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  const { productId, userId, quantity } = req.body;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const productPrice = product.discountPrice || product.basePrice;

    // Check if this product is already in the user's cart
    const existingOrder = await prisma.order.findFirst({
      where: {
        userId: userId,
        productId: productId,
        status: "cart",
      },
    });

    if (existingOrder) {
      // If the product is already in cart, you might want to update quantity instead
      await prisma.order.update({
        where: { id: existingOrder.id },
        data: {
          price: productPrice,
        },
      });
    } else {
      // Create a new order for this product
      await prisma.order.create({
        data: {
          userId: userId,
          productId: productId,
          price: productPrice,
          status: "cart",
          paymentIntent: "pending",
          paymentStatus: "pending",
        },
      });
    }

    return res
      .status(200)
      .json({ message: "Item added to cart successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding item to cart." });
  }
};

// Delete item from cart
const deleteFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const userIdInt = parseInt(userId, 10);
    const productIdInt = parseInt(productId, 10);

    if (isNaN(userIdInt) || isNaN(productIdInt)) {
      return res
        .status(400)
        .json({ message: "Invalid user ID or product ID." });
    }

    const order = await prisma.order.findFirst({
      where: {
        userId: userIdInt,
        productId: productIdInt,
        status: "cart",
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    await prisma.order.delete({
      where: {
        id: order.id,
      },
    });

    return res
      .status(200)
      .json({ message: "Item removed from cart successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error removing item from cart." });
  }
};

module.exports = {
  getCartItems,
  addToCart,
  deleteFromCart,
};
