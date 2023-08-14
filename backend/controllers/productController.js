const ProductModel = require('../schema/ProductModel.js');
const fs = require('fs');
const slugify = require('slugify');
const CategoryController = require('./categoryController.js');

exports.createProductController = async (req, res) => {
  try {
    const { name, description, price, category, weight, brand } = req.fields;
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
      case !weight:
        return res.status(500).send({ error: 'Weight is required' });
      case !brand:
        return res.status(500).send({ error: 'Brand is required' });
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

exports.getProductController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate('category')
      .select('-photo')
      // .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      // counTotal: products.length,
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

exports.getSingleProductController = async (req, res) => {
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

exports.productPhotoController = async (req, res) => {
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

exports.deleteProductController = async (req, res) => {
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

exports.updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, weight, brand } = req.fields;
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
      case !brand:
        return res.status(500).send({ error: 'Brand is required' });
      case !weight:
        return res.status(500).send({ error: 'Weight is required' });
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
    if (!products) {
      return res.status(404).send({ error: 'Product not found' });
    }
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

// NEW CODE FOR CATEGORY PRODUCTS FETCHING
exports.getSaltProducts = async (req, res) => {
  try {
    const saltsCategoryId = await CategoryController.getCategoryIdByName(
      'Salts'
    );
    const saltProducts = await ProductModel.find({
      category: saltsCategoryId,
    }).populate('category');

    res.status(200).send({
      success: true,
      message: 'Products with the category of "Salts"',
      products: saltProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error fetching products with the category of "Salts"',
    });
  }
};

exports.getPastaProducts = async (req, res) => {
  try {
    const pastaCategoryId = await CategoryController.getCategoryIdByName(
      'Pasta'
    );
    const pastaProducts = await ProductModel.find({
      category: pastaCategoryId,
    }).populate('category');

    res.status(200).send({
      success: true,
      message: 'Products with the category of "Pasta"',
      products: pastaProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error fetching products with the category of "Pasta"',
    });
  }
};

exports.getWheatFlourProducts = async (req, res) => {
  try {
    const wheatFlourCategoryId = await CategoryController.getCategoryIdByName(
      'Wheat Flour'
    );
    const wheatFlourProducts = await ProductModel.find({
      category: wheatFlourCategoryId,
    }).populate('category'); // Populate the category field

    res.status(200).send({
      success: true,
      message: 'Products with the category of "Wheat Flour"',
      products: wheatFlourProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error fetching products with the category of "Wheat Flour"',
    });
  }
};
