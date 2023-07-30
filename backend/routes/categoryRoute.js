import express from 'express';
import {
  categoryController,
  createCategoryController,
  updateCategoryController,
  singleCategory,
  deleteCategoryController,
} from '../controllers/createCategoryController.js';

const router = express.Router();

router.post('/create-category', createCategoryController);
router.put('/update-category/:id', updateCategoryController);
router.get('/get-category', categoryController);
router.get('/single-category/:slug', singleCategory);
router.delete('/delete-category/:id', deleteCategoryController);

export default router;
