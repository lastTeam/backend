const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Process credit card payment
// Process credit card payment
const processCreditCard = async (paymentDetails) => {
    try {
      console.log("Raw amount received in processCreditCard:", paymentDetails.amount); // Debugging log
  
      // Ensure amount is an integer by converting to the smallest currency unit
      const amountInMillimes = Math.round(parseFloat(paymentDetails.amount) * 100);
      console.log("Converted amount in millimes:", amountInMillimes); // Log the converted amount
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInMillimes,
        currency: "usd",
        payment_method: paymentDetails.paymentMethodId,
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never",
        },
      });
  
      if (paymentIntent.status === "succeeded") {
        return { success: true, paymentIntentId: paymentIntent.id };
      } else {
        return { success: false, message: "Payment not successful." };
      }
    } catch (error) {
      console.error("Stripe payment error:", error.message);
      return { success: false, message: error.message };
    }
  };
  

// Endpoint to handle payment
// OrderController.js
exports.handlePayment = async (req, res) => {
    const { paymentMethodId, amount } = req.body;
    console.log("Received amount:", amount); // Debugging log
  
    try {
      const result = await processCreditCard({ paymentMethodId, amount });
  
      if (result.success) {
        res.status(200).json({ message: "Payment successful", paymentId: result.paymentIntentId });
      } else {
        res.status(400).json({ error: result.message });
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      res.status(500).json({ error: "Payment processing error" });
    }
  };
  
