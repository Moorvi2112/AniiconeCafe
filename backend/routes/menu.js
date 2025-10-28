const express = require('express');
const MenuItem = require('../models/MenuItem');
const { auth, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
});

router.post('/', auth, adminOnly, async (req, res) => {
  const newItem = new MenuItem(req.body);
  await newItem.save();
  res.json(newItem);
});

module.exports = router;
