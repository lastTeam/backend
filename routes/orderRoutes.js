const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post("/pay", orderController.handlePayment);

module.exports = router;