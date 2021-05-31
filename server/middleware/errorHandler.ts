// ----------------import------------------
import { ErrorResponse } from '../utils/ErrorResponse';
import { Response, Request, NextFunction } from 'express';
// ----------------end--------------------
// custom error handler
export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorResponse) {
    return res.status(err.statusCode).json({
      errors: err.errorMessage(),
    });
  }
  console.log(err.message);
  res.status(500).json({
    errors: [{ message: 'Something went wrong' }],
  });
  next();
};
