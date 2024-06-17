import { Request, Response, NextFunction } from 'express';
import { hash, compare } from 'bcrypt';

import { handleUserCookie } from '../utils/cookie-manager.js';

import User from '../models/User.js';
import { COOKIE_NAME } from '../utils/constants.js';

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.find();

    return res.status(200).json({ message: 'getAllUsers successful!', users });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Error', cause: error.message });
  }
}

export async function userSignup(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(409).send('User already registered!');

    const hashedPassword = await hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    handleUserCookie(res, user);

    return res
      .status(201)
      .json({ message: 'Successfully registered!', name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error', cause: error.message });
  }
}

export async function userLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('User not registered!');
    }

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send('Incorrect Password!');
    }

    handleUserCookie(res, user);

    return res
      .status(200)
      .json({ message: 'Successfully logged in!', name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error', cause: error.message });
  }
}

export async function userLogout(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).send('User not registered or token malfunction!');
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(403).send("Permissions didn't match!");
    }

    // TODO: make into reusable function
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: 'localhost',
      signed: true,
      path: '/',
    });

    return res
      .status(200)
      .json({ message: 'User verified!', name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error', cause: error.message });
  }
}

export async function verifyUser(req: Request, res: Response, next: NextFunction) {
  // try {
  //   const user = await User.findById(res.locals.jwtData.id);

  //   if (!user) {
  //     return res.status(401).send('User not registered or token malfunction!');
  //   }

  //   if (user._id.toString() !== res.locals.jwtData.id) {
  //     return res.status(403).send("Permissions didn't match!");
  //   }

  //   return res
  //     .status(200)
  //     .json({ message: 'User verified!', name: user.name, email: user.email });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).json({ message: 'Error', cause: error.message });
  // }

  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json({ isAuthenticated: false });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(403).json({ isAuthenticated: false });
    }

    return res.status(200).json({ isAuthenticated: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error', cause: error.message });
  }
}

export async function getUserData(req: Request, res: Response) {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ email: user.email, name: user.name });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}
