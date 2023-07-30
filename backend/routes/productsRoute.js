import express from 'express';
import {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
} from '../controllers/productController';
import formidable from 'express-formidable';

const router = express.Router();

router.post('/create-product', formidable(), createProductController);
router.get('/get-product', getProductController);
router.get('/get-product/:slug', getSingleProductController);
router.get('/product-photo/:pid', productPhotoController);
router.delete('/product/:pid', deleteProductController);
router.put('/update-product/:pid', formidable(), updateProductController);

export default router;
