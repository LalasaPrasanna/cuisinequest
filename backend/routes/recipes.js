const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

router.post('/', async (req, res) => {
  const recipe = new Recipe(req.body);
  const saved = await recipe.save();
  res.status(201).json(saved);
});

module.exports = router;
