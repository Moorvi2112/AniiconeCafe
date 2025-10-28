require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');

const createAdmin = async () => {
  await connectDB();
  const exists = await User.findOne({ email: 'admin@aniicone.com' });
  if (exists) {
    console.log('Admin already exists');
    process.exit();
  }
  const hash = await bcrypt.hash('AdminPass123', 10);
  const admin = new User({ name: 'Admin', email: 'admin@aniicone.com', password: hash, role: 'admin' });
  await admin.save();
  console.log('✅ Admin created successfully');
  process.exit();
};

createAdmin();
