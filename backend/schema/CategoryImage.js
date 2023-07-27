const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    image: { type: String },
  },

  {
    collection: 'categories',
  }
);

mongoose.model('CategoryImage', imageSchema);
