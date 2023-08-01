const express = require('express');
const router = express.Router();
const {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategory,
  deleteCategoryController,
} = require('../controllers/categoryController.js');

router.post('/create-category', createCategoryController);
router.put('/update-category/:id', updateCategoryController);
router.get('/get-category', categoryController);
router.get('/single-category/:slug', singleCategory);
router.delete('/delete-category/:id', deleteCategoryController);

module.exports = router;
