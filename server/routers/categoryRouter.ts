import { Router } from 'express';
import {
  createCategory,
  editCategory,
  getCategories,
  getCategory,
  imageUpload,
  removeCategory,
} from '../controllers/categoryController';

import { protectedRoute, adminRoute } from '../middleware/auth';

const router = Router();

// "/api/category"
router.route('/').post(protectedRoute, adminRoute, createCategory).get(getCategories);

// "/api/category/:categoryId"
router
  .route('/:categoryId')
  .get(getCategory)
  .delete(protectedRoute, adminRoute, removeCategory)
  .put(protectedRoute, adminRoute, editCategory);

// "api/category/image/:categoryId"
router.route('/image/:categoryId').put(protectedRoute, adminRoute, imageUpload);

export default router;
