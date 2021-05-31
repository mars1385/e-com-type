import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { RequestError } from '../utils/errors-responses/RequestError';
import { RequestValidationError } from '../utils/errors-responses/RequestValidationError';
import { NotFoundError } from '../utils/errors-responses/NotFoundError';
import { validate } from 'class-validator';
import { Category } from '../database/entities/Category';
import { Product } from 'database/entities/Product';

// @desc    Get All Product
// @route   GET api/product
// @access  Public
export const getProducts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {});

// @desc    Add Product to Category
// @route   POST api/category/:categoryId/category
// @access  Private Admin Access
export const addCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;

  if (!req.params.categoryId) return next(new NotFoundError('Cant found Category'));

  const category = await Category.findOne({ where: { id: req.params.categoryId } });

  if (!category) return next(new NotFoundError('Cant found Category'));

  const existingCategoryProduct = await Product.findOne({ where: { title } });

  if (existingCategoryProduct) {
    return next(new RequestError('Category Product with this title already exists.'));
  }

  const product = await Product.create({
    title,
    genre,
    categoryId: category.id,
  });

  const validations = await validate(product);
  if (validations.length > 0) {
    return next(new RequestValidationError(validations));
  }

  await product.save();
  res.status(201).json({
    product,
  });
});
