const router = require('express').Router();
const Recipe = require('../models/Recipe');
const upload = require('../utils/cloudinary');
const { protect } = require('../utils/authMiddleware');

router.get('/', protect, async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 });
  res.json(recipes);
});

router.post('/', protect, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Image required' });
  const { title, origin, ingredients, instructions } = req.body;
  const newR = await Recipe.create({
    title, origin, ingredients: ingredients.split(',').map(i => i.trim()),
    instructions, image: req.file.path, createdBy: req.user._id
  });
  res.status(201).json(newR);
});

module.exports = router;
