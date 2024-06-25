import jwt from 'jsonwebtoken';
import { COOKIE } from '../constants/constants.js';
export function createToken(id, email, expiresIn) {
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const payload = { id, email };
    const token = jwt.sign(payload, privateKey, { expiresIn });
    return token;
}
export async function verifyToken(req, res, next) {
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const token = req.signedCookies[`${COOKIE.NAME}`];
    if (!token || token.trim() === '') {
        return res.status(401).json({ message: 'Token not received!' });
    }
    return new Promise((resolve, reject) => {
        return jwt.verify(token, privateKey, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: 'Token expired!' });
            }
            else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
}
//# sourceMappingURL=token-manager.js.map