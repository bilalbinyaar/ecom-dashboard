const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');
const {
  uploadPastaFeatureImage,
  getPastaFeatureImage,
  replacePastaFeatureImage,
} = require('../controllers/pastaFeatureImageController.js');

router.post(
  '/upload-pasta-feature-image',
  formidable(),
  uploadPastaFeatureImage
);
router.get('/get-pasta-feature-image', getPastaFeatureImage);
router.put(
  '/replace-pasta-feature-image',
  formidable(),
  replacePastaFeatureImage
);

module.exports = router;
