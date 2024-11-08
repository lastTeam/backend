const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const prisma = require("@prisma/client");

const processCreditCardPayment = async (paymentDetails) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(paymentDetails.amount * 100), // Convert to smallest currency unit
      currency: "usd", // Adjust currency as needed
      payment_method: paymentDetails.paymentMethodId,
      confirm: true,
    });

    return paymentIntent.status === "succeeded"
      ? { success: true, paymentIntentId: paymentIntent.id }
      : { success: false, message: "Payment not successful." };
  } catch (error) {
    console.error("Stripe payment error:", error.message);
    return { success: false, message: error.message };
  }
};

exports.handlePayment = async (req, res) => {
  const { paymentMethodId, amount, userId, productId } = req.body;

  try {
    // 1. Process Payment
    const paymentResult = await processCreditCardPayment({
      paymentMethodId,
      amount,
    });

    if (!paymentResult.success) {
      return res.status(400).json({ error: paymentResult.message });
    }

    // 2. Create Order in Database
    const newOrder = await prisma.order.create({
      data: {
        price: amount, // Prisma automatically handles Decimal conversion
        status: "Pending",
        paymentIntent: paymentResult.paymentIntentId,
        paymentStatus: "Paid",
        userId: userId,
        productId: productId,
      },
    });

    res.status(200).json({
      message: "Payment and order processing successful",
      orderId: newOrder.id,
    });
  } catch (error) {
    console.error("Error processing order:", error.message);
    res.status(500).json({ error: "Payment processing error" });
  }
};
