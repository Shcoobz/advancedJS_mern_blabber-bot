import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { COOKIE, EMPTY_STRING, ERROR } from '../constants/constants.js';
import { sendErrorResponse } from '../controllers/user-handler.js';

/**
 * Generates a JWT (JSON Web Token) for a user.
 *
 * @param {string} id - The user ID to be included in the token payload.
 * @param {string} email - The user email to be included in the token payload.
 * @param {string} expiresIn - The expiration time for the token (e.g., '1h', '7d').
 * @returns {string} - The signed JWT.
 *
 * @throws {Error} - Throws an error if the private key is not defined in the environment variables.
 */
export function createToken(id: string, email: string, expiresIn: string) {
  const privateKey = process.env.JWT_PRIVATE_KEY;

  const payload = { id, email };
  const token = jwt.sign(payload, privateKey, { expiresIn });

  return token;
}

/**
 * Middleware to verify JWT tokens stored in signed cookies.
 *
 * @param {Request} req - The request object, which should contain a signed cookie with the JWT token.
 * @param {Response} res - The response object used to send responses back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const privateKey = process.env.JWT_PRIVATE_KEY;
  const token = req.signedCookies[`${COOKIE.NAME}`];

  if (!token || token.trim() === EMPTY_STRING) {
    return sendErrorResponse(res, new Error(ERROR.TOKEN.NOT_RECEIVED), 401);
  }

  try {
    const decoded = await jwt.verify(token, privateKey);
    res.locals.jwtData = decoded;
    next();
  } catch (err) {
    console.error(ERROR.TOKEN.VERIFICATION_FAILED, err);

    return sendErrorResponse(res, new Error(ERROR.TOKEN.EXPIRED), 401);
  }
}
