const mongoose = require('mongoose');

// Define the Category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // You can add more fields as needed for your eCommerce admin panel
  // For example: description, imageURL, etc.
});

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
