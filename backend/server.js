const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const multer = require('multer'); // Import multer for image upload
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/boom_db'; // Replace this with your MongoDB connection string
const Grid = require('gridfs-stream'); // Import GridFS for storing images in the database

app.use(express.json());
app.use(cors());

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

// Set up GridFS
let gfs;
db.once('open', () => {
  gfs = Grid(db.db, mongoose.mongo);
  gfs.collection('uploads'); // Create a 'uploads' collection in GridFS
});

// Define your Mongoose schema and model for "Categories" collection
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Add imageUrl field for the image URL
});
const Category = mongoose.model('Category', categorySchema);

// Set up Multer storage configuration
const storage = multer.memoryStorage(); // Use memory storage for handling the file upload in memory

const upload = multer({ storage });

// Endpoint to add a new category with image
app.post('/api/categories', upload.single('image'), async (req, res) => {
  const newCategory = req.body; // The category data sent from the frontend

  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided.' });
  }

  try {
    const imageUrl = `/api/images/${req.file.originalname}`; // Generate the image URL based on the original filename

    newCategory.imageUrl = imageUrl; // Add the imageUrl to the category data

    const createdCategory = await Category.create(newCategory);
    res.json(createdCategory); // Return the created category as the response
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get images from GridFS
app.get('/api/images/:filename', (req, res) => {
  const filename = req.params.filename;

  // Stream the image from GridFS
  const readStream = gfs.createReadStream({ filename });
  readStream.pipe(res);
});

// FETCHING ALL CATEGORY FROM THE DB
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
