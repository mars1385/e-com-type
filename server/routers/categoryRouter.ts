import { Router } from 'express';
import { createCategory, getCategories, removeCategory } from '../controllers/categoryController';

import { protectedRoute, adminRoute } from '../middleware/auth';

const router = Router();

// "/api/category"
router.route('/').post(protectedRoute, adminRoute, createCategory).get(getCategories);

// "/api/category/:categoryId"
router.route('/:categoryId').delete(protectedRoute, adminRoute, removeCategory);

export default router;
