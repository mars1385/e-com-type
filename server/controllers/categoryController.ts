import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { RequestError } from '../utils/errors-responses/RequestError';
import { RequestValidationError } from '../utils/errors-responses/RequestValidationError';
import { NotFoundError } from '../utils/errors-responses/NotFoundError';
import { validate } from 'class-validator';
import { Category } from '../database/entities/Category';

// @desc    Create  Category
// @route   POST api/category
// @access  Private
export const createCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;

  const existingCategory = await Category.findOne({ where: { title } });

  if (existingCategory) return next(new RequestError('Category with this title already exists.'));

  const category = await Category.create({ title, creatorId: req.session.userId });

  const validations = await validate(category);
  if (validations.length > 0) {
    return next(new RequestValidationError(validations));
  }

  await category.save();

  res.status(201).json({
    category,
  });
});

// @desc    Get all  Category
// @route   GET api/category
// @access  Public
export const getCategories = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  const categories = await Category.find();

  res.status(200).json({
    categories,
  });
});

// @desc    Delete single  Category
// @route   DELETE api/category/:categoryId
// @access  Private
export const removeCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.categoryId) return next(new NotFoundError('Cant found Category'));

  const category = await Category.findOne({
    where: { id: req.params.collectionId, creatorId: req.session.userId },
  });

  if (!category) return next(new NotFoundError('Cant found collection'));

  await Category.delete({ id: req.params.collectionId, creatorId: req.session.userId });

  res.status(200).json({
    success: true,
  });
});
