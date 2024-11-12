const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { PrismaClient, Decimal } = require("@prisma/client");  // Add Decimal import
const prisma = new PrismaClient();

// Create Payment Intent stays the same
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, items } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        items: JSON.stringify(items)
      }
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
};

// Modified createOrder to handle decimals properly
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, paymentIntentId } = req.body;

    // Validate user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        error: `User with ID ${userId} not found`
      });
    }

    // Validate products exist
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.product.id }
      });

      if (!product) {
        return res.status(404).json({
          error: `Product with ID ${item.product.id} not found`
        });
      }
    }

    const orders = [];

    // Create orders with validated data
    for (const item of items) {
      const order = await prisma.order.create({
        data: {
          price: item.price * item.quantity, // Prisma will automatically convert to Decimal
          status: "Confirmed",
          paymentIntent: paymentIntentId,
          paymentStatus: "Paid",
          userId: userId,
          productId: item.product.id
        },
        include: {
          product: true,
          user: true
        }
      });
      
      orders.push(order);
    }

    res.status(201).json({
      success: true,
      orders: orders
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ 
      error: error.message,
      details: error.meta
    });
  }
};

// Get user orders stays the same
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await prisma.order.findMany({
      where: {
        userId: parseInt(userId)
      },
      include: {
        product: true,
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: error.message });
  }
};