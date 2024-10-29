const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get cart items for a specific user
const getCartItems = async (req, res) => {
  const { userId } = req.params; // Get userId from the route parameters

  try {
    // Convert userId to an integer
    const userIdInt = parseInt(userId, 10);

    if (isNaN(userIdInt)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    // Fetch the cart order for the user
    const order = await prisma.order.findFirst({
      where: {
        userId: userIdInt, // Use the integer value
        status: "cart",
      },
      include: {
        product: true, // Assuming you have a relation to fetch product details
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Cart not found for this user." });
    }

    // Return the items in the cart
    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching cart items." });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  const { productId, userId, quantity } = req.body; // Assuming you send productId, userId, and quantity in the request body

  try {
    // Check if the product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const productPrice = product.discountPrice || product.basePrice;

    // Check if a cart order exists for the user
    const existingOrder = await prisma.order.findFirst({
      where: {
        userId: userId,
        status: "cart",
      },
    });

    if (existingOrder) {
      // Update the existing order by adding the product
      await prisma.order.update({
        where: { id: existingOrder.id },
        data: {
          productId: productId,
          price: productPrice,
          status: "cart",
          paymentIntent: "pending", // Placeholder
          paymentStatus: "pending", // Placeholder for payment status
        },
      });
    } else {
      // Create a new order if it doesn't exist
      await prisma.order.create({
        data: {
          userId: userId,
          productId: productId,
          price: productPrice,
          status: "cart",
          paymentIntent: "pending", // Placeholder
          paymentStatus: "pending", // Placeholder for payment status
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

module.exports = {
  getCartItems,
  addToCart,
};
