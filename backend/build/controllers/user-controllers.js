import { hash, compare } from 'bcrypt';
import { handleUserCookie } from '../utils/cookie-manager.js';
import User from '../models/User.js';
export async function getAllUsers(req, res, next) {
    try {
        const users = await User.find();
        return res.status(200).json({ message: 'OK', users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Error', cause: error.message });
    }
}
export async function userSignup(req, res, next) {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).send('User already registered!');
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        handleUserCookie(res, user);
        return res.status(201).json({ message: 'OK', id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Error', cause: error.message });
    }
}
export async function userLogin(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('User not registered!');
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send('Incorrect Password!');
        }
        handleUserCookie(res, user);
        return res.status(201).json({ message: 'OK', id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Error', cause: error.message });
    }
}
//# sourceMappingURL=user-controllers.js.map