import jwt from 'jsonwebtoken';
const privateTokenKey = process.env.JWT_PRIVATE_KEY;
export function createToken(id, email, expiresIn) {
    const payload = { id, email };
    const token = jwt.sign(payload, privateTokenKey, { expiresIn });
    return token;
}
//# sourceMappingURL=token-manager.js.map