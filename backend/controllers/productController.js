import ProductModel from '../schema/ProductModel.js';
import fs from 'fs';
import slugify from 'slugify';

export const createProductController = async (res, req) => {
  try {
    const { name, description, slug, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: 'Name is required' });
      case !description:
        return res.status(500).send({ error: 'Description is required' });
      case !price:
        return res.status(500).send({ error: 'Price is required' });
      case !category:
        return res.status(500).send({ error: 'Category is required' });
      case !quantity:
        return res.status(500).send({ error: 'Quantity is required' });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: 'Photo is required and should be less than 1MB' });
    }
    const products = new ProductModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.contentType;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: 'Product Created Successfully',
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error creating product',
    });
  }
};

export const getProductController = async (res, req) => {
  try {
    const products = await ProductModel.find({})
      .populate('category')
      .select('-photo')
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: 'All Products',
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: 'Error getting all products',
    });
  }
};

export const getSingleProductController = async (res, req) => {
  try {
    const product = await ProductModel.findOne({ slug: req.params.slug })
      .select('-photo')
      .populate('category');
    res.status(200).send({
      success: true,
      message: 'Single Product Fetched',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: 'Error getting single product',
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select('photo');
    if (product.photo.data) {
      res.set('Content-type', product.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: 'Error getting product photo',
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select('-photo');
    res.status(200).send({
      success: true,
      message: 'Product Deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: 'Error Deleting Product',
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: 'Name is required' });
      case !description:
        return res.status(500).send({ error: 'Description is required' });
      case !price:
        return res.status(500).send({ error: 'Price is required' });
      case !category:
        return res.status(500).send({ error: 'Category is required' });
      case !quantity:
        return res.status(500).send({ error: 'Quantity is required' });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: 'Photo is required and should be less than 1MB' });
    }
    const products = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.contentType;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: 'Product Updated Successfully',
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: 'Error Updating Product',
    });
  }
};
