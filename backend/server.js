const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

// Connect to MongoDB using Mongoose
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/boom_db'; // Replace this with your MongoDB connection string
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

// Define your API endpoints here

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
