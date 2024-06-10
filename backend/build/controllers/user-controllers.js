import { hash, compare } from 'bcrypt';
import { handleUserCookie } from '../utils/cookie-manager.js';
import User from '../models/User.js';
import { COOKIE_NAME } from '../utils/constants.js';
export async function getAllUsers(req, res, next) {
    try {
        const users = await User.find();
        return res.status(200).json({ message: 'getAllUsers successful!', users });
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
        return res
            .status(201)
            .json({ message: 'Successfully registered!', name: user.name, email: user.email });
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
        return res
            .status(201)
            .json({ message: 'Successfully logged in!', name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Error', cause: error.message });
    }
}
export async function verifyUser(req, res, next) {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User not registered or token malfunction!');
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match!");
        }
        return res
            .status(201)
            .json({ message: 'User verified!', name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Error', cause: error.message });
    }
}
export async function userLogout(req, res, next) {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User not registered or token malfunction!');
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match!");
        }
        // TODO: make into reusable function
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: 'localhost',
            signed: true,
            path: '/',
        });
        return res
            .status(201)
            .json({ message: 'User verified!', name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Error', cause: error.message });
    }
}
//# sourceMappingURL=user-controllers.js.map