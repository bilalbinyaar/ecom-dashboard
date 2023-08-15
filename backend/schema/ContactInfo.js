// models/contactInfo.js

const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);

module.exports = ContactInfo;
