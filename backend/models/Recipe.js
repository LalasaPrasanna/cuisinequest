const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  cuisine: String,
  ingredients: [String],
  instructions: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', recipeSchema);
