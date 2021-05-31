import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response, NextFunction } from 'express';
import { AuthorizationError } from '../utils/errors-responses/authorizationError';
import { User } from '../database/entities/User';

export const protectedRoute = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return next(new AuthorizationError());
  }

  return next();
});

export const adminRoute = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const user = await User.findOne({ where: { id: req.session.userId } });
  if (user?.role !== 2) {
    return next(new AuthorizationError());
  }

  return next();
});
