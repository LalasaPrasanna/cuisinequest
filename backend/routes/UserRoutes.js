const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function genToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ message: 'User already exists' });
  const user = await User.create({ name, email, password });
  res.status(201).json({ name: user.name, email: user.email, token: genToken(user._id) });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u || !(await u.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ name: u.name, email: u.email, token: genToken(u._id) });
});

module.exports = router;
