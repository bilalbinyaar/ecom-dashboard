const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');
const {
  uploadWheatFeatureImage,
  getWheatFeatureImage,
  replaceWheatFeatureImage,
} = require('../controllers/wheatFeatureImageController.js');

router.post(
  '/upload-wheat-feature-image',
  formidable(),
  uploadWheatFeatureImage
);
router.get('/get-wheat-feature-image', getWheatFeatureImage);
router.put(
  '/replace-wheat-feature-image',
  formidable(),
  replaceWheatFeatureImage
);

module.exports = router;
