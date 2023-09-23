import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyJWT } from '../utils/verifyJWT';

export const getUserIfExist = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.authToken || req.headers['authorization'];
  if (!token) {
    req.user = undefined;
    next();
    return;
  }

  if (!verifyJWT(token)) {
    req.user = undefined;
    next();
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  if (!decoded) {
    req.user = undefined;
    next();
    return;
  }
  req.user = decoded;
  next();
};
