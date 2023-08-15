const PastaFeatureImageModel = require('../schema/PastaFeatureImageModel.js');
const fs = require('fs');

exports.uploadPastaFeatureImage = async (req, res) => {
  try {
    const { image } = req.files;

    if (!image || image.size > 1000000) {
      return res
        .status(400)
        .send({ error: 'Valid image is required and should be less than 1MB' });
    }

    const pastaFeatureImage = new PastaFeatureImageModel({
      data: fs.readFileSync(image.path),
      contentType: image.contentType,
    });

    await pastaFeatureImage.save();

    res.status(201).send({
      success: true,
      message: 'Pasta Feature Image Uploaded Successfully',
      pastaFeatureImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error uploading pasta feature image',
    });
  }
};

exports.getPastaFeatureImage = async (req, res) => {
  try {
    const pastaFeatureImage = await PastaFeatureImageModel.findOne();
    if (!pastaFeatureImage) {
      return res.status(404).send({ message: 'Pasta Feature Image not found' });
    }

    res.set('Content-type', pastaFeatureImage.contentType);
    return res.status(200).send(pastaFeatureImage.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error getting pasta feature image',
    });
  }
};

exports.replacePastaFeatureImage = async (req, res) => {
  try {
    const { image } = req.files;

    if (!image || image.size > 1000000) {
      return res.status(400).send({ error: 'Invalid image' });
    }

    const existingImage = await PastaFeatureImageModel.findOne();

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
