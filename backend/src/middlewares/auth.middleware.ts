import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // const token = req.headers['authorization']?.split(' ')[1];
  // if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  // try {
  //   const decoded = jwt.verify(token, `${process.env.JWT_SECRET || 'development'}`);
  //   next();
  // } catch (ex) {
  //   return res.status(400).json({ message: 'Invalid token.' });
  // }
  next();
};

export default authMiddleware;
