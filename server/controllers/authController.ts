import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { RequestError } from '../utils/errors-responses/RequestError';
import { RequestValidationError } from '../utils/errors-responses/RequestValidationError';
import { NotFoundError } from '../utils/errors-responses/NotFoundError';
import { validate } from 'class-validator';
import { userInput } from '../utils/inputs/userInputs';
import UserManager from '../database/db/userManager';
import { verify } from 'argon2';

// @desc    Register  user
// @route   POST api/auth/register
// @access  Public
export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password }: userInput = req.body;

  const existingUser = await UserManager.findByEmail(email);
  if (existingUser) return next(new RequestError('User with this email already exists.'));

  const newUser = await UserManager.create({ firstName, lastName, email, password });

  const validations = await validate(newUser);
  if (validations.length > 0) {
    return next(new RequestValidationError(validations));
  }

  await UserManager.save(newUser);

  req.session.userId = newUser.id;

  res.status(201).json({
    success: true,
  });
});

// @desc    login  user
// @route   POST api/auth/login
// @access  Public
export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: userInput = req.body;

  if (!email || !password) return next(new RequestError('Please provide an email and password'));

  const user = await UserManager.findByEmail(email);

  if (!user) return next(new RequestError('Email Or Password is Wrong'));

  const isMatch = await verify(user.password, password);
  if (!isMatch) return next(new RequestError('Email Or Password is Wrong'));

  req.session.userId = user.id;

  res.status(200).json({
    success: true,
  });
});

// @desc    get user Information
// @route   GET api/auth/user
// @access  Private
export const userInfo = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.session.userId;
  const user = await UserManager.findById(id);

  if (!user) {
    return next(new NotFoundError('User can not be found'));
  }
  res.status(200).json({
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });
});

// @desc    Log out user
// @route   post api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((error) => {
    if (error) {
      return next(new RequestError('An error has occurred'));
    }
    res.clearCookie(process.env.COOKIE_NAME);
    res.status(200).json({
      success: true,
    });
  });
});
