import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { COOKIE_NAME } from './constants.js';

export function createToken(id: string, email: string, expiresIn: string) {
  const privateKey = process.env.JWT_PRIVATE_KEY;

  const payload = { id, email };
  const token = jwt.sign(payload, privateKey, { expiresIn });

  return token;
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const privateKey = process.env.JWT_PRIVATE_KEY;
  const token = req.signedCookies[`${COOKIE_NAME}`];

  if (!token || token.trim() === '') {
    return res.status(401).json({ message: 'Token not received!' });
  }

  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, privateKey, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: 'Token expired!' });
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
}
