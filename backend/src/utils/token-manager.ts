import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { COOKIE, EMPTY_STRING, ERROR } from '../constants/constants.js';
import { sendErrorResponse } from '../controllers/user-handler.js';

/**
 * Generates a JWT (JSON Web Token) for a user.
 */
export function createToken(id: string, email: string, expiresIn: string) {
  const privateKey = process.env.JWT_PRIVATE_KEY;

  const payload = { id, email };
  const token = jwt.sign(payload, privateKey, { expiresIn });

  return token;
}

/**
 * Middleware to verify JWT tokens stored in signed cookies.
 */
export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const privateKey = process.env.JWT_PRIVATE_KEY;
  const token = req.signedCookies[`${COOKIE.NAME}`];

  if (!token || token.trim() === EMPTY_STRING) {
    console.log(ERROR.SERVER.NO_TOKEN_RECEIVED);
    next();

    return;
  }

  try {
    const decoded = await jwt.verify(token, privateKey);
    res.locals.jwtData = decoded;
    next();
  } catch (err) {
    console.error(ERROR.TOKEN.VERIFICATION_FAILED, err);

    const errorResponse = sendErrorResponse(res, new Error(ERROR.TOKEN.EXPIRED), 401);

    return errorResponse;
  }
}
