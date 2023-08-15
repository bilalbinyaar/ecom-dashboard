const mongoose = require('mongoose');

const pastaFeatureImageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

module.exports = mongoose.model('PastaFeatureImage', pastaFeatureImageSchema);
