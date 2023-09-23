import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyJWT } from '../utils/verifyJWT';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.authToken || req.headers['authorization'];
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  if (!verifyJWT(token)) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};
