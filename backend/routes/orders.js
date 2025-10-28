const express = require('express');
const Order = require('../models/Order');
const { auth, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Create order
router.post('/', async (req, res) => {
  const { items, customerName } = req.body;
  const total = items.reduce((a, b) => a + b.price * b.qty, 0);
  const tax = +(total * (process.env.TAX_RATE || 0.05)).toFixed(2);
  const finalAmount = total + tax;

  const order = new Order({ items, customerName, total, tax, finalAmount });
  await order.save();
  res.json(order);
});

// Admin: view all orders
router.get('/', auth, adminOnly, async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;
