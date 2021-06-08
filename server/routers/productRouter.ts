import { Router } from 'express';
import {
  imageUpload,
  getProduct,
  getProducts,
  createProduct,
  removeProduct,
  editProduct,
} from '../controllers/productController';

import { protectedRoute, adminRoute } from '../middleware/auth';

const router = Router({ mergeParams: true });

// "api/category/:categoryId/product"
// "api/product"
router.route('/').post(protectedRoute, adminRoute, createProduct).get(getProducts);

// "/api/product/:productId"
router
  .route('/:productId')
  .get(getProduct)
  .delete(protectedRoute, adminRoute, removeProduct)
  .put(protectedRoute, adminRoute, editProduct);

// "api/product/image/:productId"
router.route('/image/:productId').put(protectedRoute, adminRoute, imageUpload);

export default router;
