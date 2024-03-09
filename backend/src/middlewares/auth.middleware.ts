import { NextFunction, Request, Response } from 'express';
import { ExpressRequest } from '../interfaces/request.interface';
import jwt from 'jsonwebtoken';



const getTokenFromHeader = (req: ExpressRequest) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;

  return parts[1];
};

const authMiddleware = (req: ExpressRequest, res: Response, next: NextFunction) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'development');
    const { username, id } = JSON.parse(JSON.stringify(decoded));
    req['user'] = { username, id };
    req['token'] = token;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired.' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: 'Invalid token.' });
    } else {
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
};

export default authMiddleware;
