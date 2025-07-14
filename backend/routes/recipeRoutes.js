const express = require("express");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const authenticateToken = require("../utils/authMiddleware");
const Recipe = require("../models/Recipe"); // Mongoose model

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, require("crypto").randomBytes(16).toString("hex"))
});
const upload = multer({ storage });

// ✅ POST /api/recipes – Add a recipe
router.post("/", authenticateToken, upload.single("image"), async (req, res) => {
  try {
    const { name, origin, ingredients, instructions } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path);

    const recipe = new Recipe({
      name,
      origin,
      ingredients,
      instructions,
      imageUrl: result.secure_url
    });

    await recipe.save(); // ✅ use mongoose model
    res.status(201).json({ message: "Recipe added successfully" });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ message: "Failed to add recipe" });
  }
});

// ✅ GET /api/recipes – Fetch all recipes
router.get("/", authenticateToken, async (req, res) => {
  try {
    const recipes = await Recipe.find(); // ✅ use mongoose model
    res.json(recipes);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
});

module.exports = router;
