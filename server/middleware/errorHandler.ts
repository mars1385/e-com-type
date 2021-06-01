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

  if (err.message.includes('invalid input syntax for type uuid')) {
    return res.status(404).json({
      errors: [
        {
          message: 'Invalid Id',
        },
      ],
    });
  }
  console.log(err.message);
  res.status(500).json({
    errors: [{ message: 'Something went wrong' }],
  });
  next();
};
