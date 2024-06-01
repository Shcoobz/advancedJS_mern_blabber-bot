import jwt from 'jsonwebtoken';
export function createToken(id, email, expiresIn) {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn });
    return token;
}
//# sourceMappingURL=token-manager.js.map