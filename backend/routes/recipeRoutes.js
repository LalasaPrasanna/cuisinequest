const express = require('express');
const Recipe = require('../models/Recipe');
const auth = require('../utils/authMiddleware');

const router = express.Router();

// Get all recipes
router.get('/', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// Add recipe (protected)
router.post('/', auth, async (req, res) => {
  try {
    const recipe = new Recipe({ ...req.body, createdBy: req.user.id });
    const saved = await recipe.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save recipe' });
  }
});

module.exports = router;
