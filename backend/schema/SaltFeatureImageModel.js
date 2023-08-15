const mongoose = require('mongoose');

const saltFeatureImageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

module.exports = mongoose.model('SaltFeatureImage', saltFeatureImageSchema);
