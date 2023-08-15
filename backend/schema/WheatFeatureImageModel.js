const mongoose = require('mongoose');

const wheatFeatureImageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

module.exports = mongoose.model('WheatFeatureImage', wheatFeatureImageSchema);
