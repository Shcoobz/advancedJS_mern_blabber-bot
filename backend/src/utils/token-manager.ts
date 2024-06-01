import jwt from 'jsonwebtoken';

const privateTokenKey = process.env.JWT_PRIVATE_KEY;

export function createToken(id: string, email: string, expiresIn: string) {
  const payload = { id, email };
  const token = jwt.sign(payload, privateTokenKey, { expiresIn });

  return token;
}
