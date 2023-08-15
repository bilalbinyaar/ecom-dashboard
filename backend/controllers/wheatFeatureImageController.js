const WheatFeatureImageModel = require('../schema/WheatFeatureImageModel.js');
const fs = require('fs');

exports.uploadWheatFeatureImage = async (req, res) => {
  try {
    const { image } = req.files;

    if (!image || image.size > 1000000) {
      return res
        .status(400)
        .send({ error: 'Valid image is required and should be less than 1MB' });
    }

    const wheatFeatureImage = new WheatFeatureImageModel({
      data: fs.readFileSync(image.path),
      contentType: image.contentType,
    });

    await wheatFeatureImage.save();

    res.status(201).send({
      success: true,
      message: 'Wheat Feature Image Uploaded Successfully',
      wheatFeatureImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error uploading wheat feature image',
    });
  }
};

exports.getWheatFeatureImage = async (req, res) => {
  try {
    const wheatFeatureImage = await WheatFeatureImageModel.findOne();
    if (!wheatFeatureImage) {
      return res.status(404).send({ message: 'Wheat Feature Image not found' });
    }

    res.set('Content-type', wheatFeatureImage.contentType);
    return res.status(200).send(wheatFeatureImage.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error getting wheat feature image',
    });
  }
};

exports.replaceWheatFeatureImage = async (req, res) => {
  try {
    const { image } = req.files;

    if (!image || image.size > 1000000) {
      return res.status(400).send({ error: 'Invalid image' });
    }

    const existingImage = await WheatFeatureImageModel.findOne();

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
