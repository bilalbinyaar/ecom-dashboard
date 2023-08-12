const express = require('express');
const {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  getSaltProducts,
  getPastaProducts,
  getWheatFlourProducts,
} = require('../controllers/productController');
const formidable = require('express-formidable');

const router = express.Router();

router.post('/create-product', formidable(), createProductController);
router.get('/get-product', getProductController);
router.get('/get-product/:slug', getSingleProductController);
router.get('/product-photo/:pid', productPhotoController);
router.delete('/delete-product/:pid', deleteProductController);
router.put('/update-product/:pid', formidable(), updateProductController);
router.get('/salt-products', getSaltProducts);
router.get('/pasta-products', getPastaProducts);
router.get('/wheat-flour-products', getWheatFlourProducts);

module.exports = router;
