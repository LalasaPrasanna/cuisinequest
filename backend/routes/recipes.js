const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const upload = require('../utils/cloudinary'); // ✅ Import cloudinary uploader
const { protect } = require('../utils/authMiddleware');

router.post('/', protect, upload.single('image'), async (req, res) => {
  const { title, cuisine, ingredients, instructions } = req.body;
  const imageUrl = req.file?.path;

  const recipe = new Recipe({
    title,
    cuisine,
    ingredients,
    instructions,
    image: imageUrl,
    createdBy: req.user.id,
  });

  try {
    const saved = await recipe.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving recipe:', err);
    res.status(400).json({ message: 'Error saving recipe' });
  }
});

module.exports = router;
