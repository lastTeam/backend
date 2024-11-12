const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create payment intent
router.post('/create-payment-intent', orderController.createPaymentIntent);

// Create order after successful payment
router.post('/', orderController.createOrder);

// Get user orders
router.get('/user/:userId', orderController.getUserOrders);

module.exports = router;