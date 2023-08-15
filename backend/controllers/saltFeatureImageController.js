const SaltFeatureImageModel = require('../schema/SaltFeatureImageModel.js');
const fs = require('fs');

exports.uploadSaltFeatureImage = async (req, res) => {
  try {
    const { image } = req.files;

    if (!image || image.size > 1000000) {
      return res
        .status(400)
        .send({ error: 'Valid image is required and should be less than 1MB' });
    }

    const saltFeatureImage = new SaltFeatureImageModel({
      data: fs.readFileSync(image.path),
      contentType: image.contentType,
    });

    await saltFeatureImage.save();

    res.status(201).send({
      success: true,
      message: 'Salt Feature Image Uploaded Successfully',
      saltFeatureImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error uploading salt feature image',
    });
  }
};

exports.getSaltFeatureImage = async (req, res) => {
  try {
    const saltFeatureImage = await SaltFeatureImageModel.findOne();
    if (!saltFeatureImage) {
      return res.status(404).send({ message: 'Salt Feature Image not found' });
    }

    res.set('Content-type', saltFeatureImage.contentType);
    return res.status(200).send(saltFeatureImage.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error getting salt feature image',
    });
  }
};

exports.replaceSaltFeatureImage = async (req, res) => {
  try {
    const { image } = req.files;

    if (!image || image.size > 1000000) {
      return res.status(400).send({ error: 'Invalid image' });
    }

    const existingImage = await SaltFeatureImageModel.findOne();

    if (!existingImage) {
      return res.status(404).send({ error: 'Image not found' });
    }

    existingImage.data = fs.readFileSync(image.path);
    existingImage.contentType = image.type;
    await existingImage.save();

    res
      .status(200)
      .send({ success: true, message: 'Image replaced successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: 'Error replacing image',
    });
  }
};
