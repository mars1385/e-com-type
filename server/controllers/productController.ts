import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { RequestError } from '../utils/errors-responses/RequestError';
import { RequestValidationError } from '../utils/errors-responses/RequestValidationError';
import { NotFoundError } from '../utils/errors-responses/NotFoundError';
import { validate } from 'class-validator';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import ProductManager from '../database/db/ProductManager';
import CategoryManager from '../database/db/CategoryManager';

// @desc    Get All Product
// @route   GET api/product
// @access  Public
export const getProducts = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  // const page = req.body.page ? req.body.page : 1;
  // const limit = req.body.limit ? req.body.limit + 1 : 10;
  // const skip = (page - 1) * limit;

  const products = await ProductManager.getAll({ categoryTitle: req.body.category });

  res.status(200).json({ products });
});

// @desc    Get single Product
// @route   GET api/product/:productId
// @access  Public
export const getProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.productId) {
    return next(new NotFoundError('Product dose not exits!'));
  }

  const product = await ProductManager.findById(req.params.productId);

  if (!product) {
    return next(new NotFoundError('Product dose not exits!'));
  }

  res.status(200).json({
    product,
  });
});

// @desc    Add Product to Category
// @route   POST api/category/:categoryId/product
// @access  Private Admin Access
export const createProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre, price } = req.body;

  if (!req.params.categoryId) return next(new NotFoundError('Cant found Category'));

  const category = await CategoryManager.findById(req.params.categoryId);

  if (!category) return next(new NotFoundError('Cant found Category'));

  const existingCategoryProduct = await ProductManager.findByTitle(title);

  if (existingCategoryProduct) {
    return next(new RequestError('Product with this title already exists.'));
  }

  const product = await ProductManager.create({
    title,
    genre,
    price,
    categoryId: category.id,
  });

  const validations = await validate(product);
  if (validations.length > 0) {
    return next(new RequestValidationError(validations));
  }

  await ProductManager.save(product);

  res.status(201).json({
    product,
  });
});

// @desc    Edit Product
// @route   PUT api/product/:productId
// @access  Private/admin
export const editProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.productId) {
    return next(new NotFoundError('Product dose not exist!'));
  }

  const product = await ProductManager.findById(req.params.productId);

  if (!product) {
    return next(new NotFoundError('Product dose not exist!'));
  }

  const { title, genre, price } = req.body;

  if (!title || !genre || !price) {
    return next(new RequestError('All * flied need to fill'));
  }

  const existProduct = title !== product.title ? await ProductManager.findByTitle(title) : '';

  if (existProduct) {
    return next(new RequestError('Product with this title already exist'));
  }

  const editedProduct = await ProductManager.update({ title, price, genre }, product.id);

  res.status(200).json({
    product: editedProduct,
  });
});

// @desc    Remove Product
// @route   DELETE api/product/:productId
// @access  Private/admin
export const removeProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.productId) {
    return next(new NotFoundError('Product dose not exist!'));
  }

  const product = await ProductManager.findById(req.params.productId);

  if (!product) {
    return next(new NotFoundError('Product dose not exist!'));
  }

  await ProductManager.remove(product.id);

  res.status(200).json({
    success: true,
  });
});

// @desc    Upload Image for product
// @route   PUT api/product/image/:productId
// @access  Private/admin
export const imageUpload = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // find product
  if (!req.params.productId) {
    return next(new NotFoundError('Product dose not exits!'));
  }
  const product = await ProductManager.findById(req.params.productId);
  // exist?
  if (!product) return next(new NotFoundError('Product dose not exits!'));

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
  image.name = `Product_image_${product.id}${product.categoryId}${path.parse(image.name).ext}`;
  image.mv(`${process.env.FILE_UPLOAD_PATH}/Category/${image.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new RequestError('Problem with image Upload'));
    }
    const updatedProduct = await ProductManager.update({ image: image.name }, product.id);
    res.status(200).json({
      image: updatedProduct.image,
    });
  });
}); // end
