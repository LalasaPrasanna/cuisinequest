require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'));

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

app.listen(5000, () => console.log('Backend running on 5000'));
