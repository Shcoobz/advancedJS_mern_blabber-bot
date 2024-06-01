import jwt from 'jsonwebtoken';

export function createToken(id: string, email: string, expiresIn: string) {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn });

  return token;
}
