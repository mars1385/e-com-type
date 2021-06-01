import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { RequestError } from '../utils/errors-responses/RequestError';
import { AuthorizationError } from '../utils/errors-responses/AuthorizationError';
import { RequestValidationError } from '../utils/errors-responses/RequestValidationError';
import { NotFoundError } from '../utils/errors-responses/NotFoundError';
import { validate } from 'class-validator';
import { Category } from '../database/entities/Category';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { getConnection } from 'typeorm';

// @desc    Create  Category
// @route   POST api/category
// @access  Private/admin
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

// @desc    Upload Image for Category
// @route   PUT api/category/image/:categoryId
// @access  Private/admin
export const imageUpload = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // find Category
  if (!req.params.categoryId) {
    return next(new NotFoundError('Category dose not exits!'));
  }
  const category = await Category.findOne({ where: { id: req.params.categoryId } });
  // exist?
  if (!category) return next(new NotFoundError('Category dose not exits!'));

  console.log(category.creator);
  if (category.creatorId !== req.session.userId) {
    return next(new AuthorizationError());
  }
  // check file / image

  if (!req.files) return next(new RequestError('Please Add a Image!'));

  const image = req.files.image as UploadedFile;
  // check type
  if (!image.mimetype.startsWith('image')) return next(new RequestError('File Must be of Type Image'));
  // check size
  if (image.size > process.env.IMAGE_UPLOAD_SIZE) {
    return next(new RequestError('Image must be less than 1 Megabit'));
  }
  // image path and name
  image.name = `Category_image_${category.id}${category.creatorId}${path.parse(image.name).ext}`;
  image.mv(`${process.env.FILE_UPLOAD_PATH}/Category/${image.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new RequestError('Problem with image Upload'));
    }
    const updatedCategory = await getConnection()
      .createQueryBuilder()
      .update(Category)
      .set({ image: image.name })
      .where('id = :id', { id: category.id })
      .returning('*')
      .execute();
    res.status(200).json({
      image: updatedCategory.raw[0].image,
    });
  });
}); // end

// @desc    Get all  Category
// @route   GET api/category
// @access  Public
export const getCategories = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  const categories = await Category.find();

  res.status(200).json({
    categories,
  });
});

// @desc    Get single  Category
// @route   GET api/category/:categoryId
// @access  Public
export const getCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.categoryId) return next(new NotFoundError('Cant found Category'));

  const category = await Category.findOne({
    where: { id: req.params.categoryId },
  });

  if (!category) return next(new NotFoundError('Cant found Category'));

  res.status(200).json({
    category,
  });
});

// @desc    Delete single  Category
// @route   DELETE api/category/:categoryId
// @access  Private/admin
export const removeCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.categoryId) return next(new NotFoundError('Cant found Category'));

  const category = await Category.findOne({
    where: { id: req.params.categoryId, creatorId: req.session.userId },
  });

  if (!category) return next(new NotFoundError('Cant found Category'));

  await Category.delete({ id: req.params.categoryId, creatorId: req.session.userId });

  res.status(200).json({
    success: true,
  });
});

// @desc    Edit single Category
// @route   PUT api/category/:categoryId
// @access  Private/admin
export const editCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.categoryId) return next(new NotFoundError('Cant found Category'));

  if (!req.body.title) return next(new RequestError('Please Add a Title'));

  const category = await Category.findOne({
    where: { id: req.params.categoryId, creatorId: req.session.userId },
  });

  if (!category) return next(new NotFoundError('Cant found Category'));

  if (category.title === req.body.title) return next(new RequestError('Please Change Title!'));

  const exitsCategory = await Category.findOne({ where: { title: req.body.title } });

  if (exitsCategory) return next(new RequestError('Category With this title already exits'));

  const editedCategory = await getConnection()
    .createQueryBuilder()
    .update(Category)
    .set({ title: req.body.title })
    .where('id = :id', { id: category.id })
    .returning('*')
    .execute();

  res.status(200).json({
    category: editedCategory.raw[0],
  });
});
