// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 3001;

// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB using Mongoose
// const mongoose = require('mongoose');
// const mongoURI = 'mongodb://localhost:27017/boom_db';
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on('error', (error) => {
//   console.error('Error connecting to MongoDB:', error);
// });
// db.once('open', () => {
//   console.log('Connected to MongoDB successfully');
// });

// //routes
// // app.use('/api/categories', categoryRoute);
// // app.use('/api/products', productRoute);

// // Define your Mongoose schema and model for "Categories" collection
// const categorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
// });
// const Category = mongoose.model('Category', categorySchema);

// // Endpoint to add a new category without image
// app.post('/api/categories', async (req, res) => {
//   const newCategory = req.body; // The category data sent from the frontend

//   try {
//     const createdCategory = await Category.create(newCategory);
//     res.json(createdCategory); // Return the created category as the response
//   } catch (error) {
//     console.error('Error adding category:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // FETCHING ALL CATEGORY FROM THE DB
// app.get('/api/categories', async (req, res) => {
//   try {
//     const categories = await Category.find({});
//     res.json(categories);
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
