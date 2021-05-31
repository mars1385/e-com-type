import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (myFn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(myFn(req, res, next)).catch(next);
