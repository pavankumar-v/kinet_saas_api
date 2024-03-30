import { NextFunction } from 'express';

export type RequestHandlerv1 = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
