const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');
const {
  uploadSaltFeatureImage,
  getSaltFeatureImage,
  replaceSaltFeatureImage,
} = require('../controllers/saltFeatureImageController.js');

router.post('/upload-salt-feature-image', formidable(), uploadSaltFeatureImage);
router.get('/get-salt-feature-image', getSaltFeatureImage);
router.put(
  '/replace-salt-feature-image',
  formidable(),
  replaceSaltFeatureImage
);

module.exports = router;
