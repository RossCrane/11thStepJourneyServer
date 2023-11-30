import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createAccessToken } from "../utils/token";
import { BlacklistModel } from "../utils/blacklist";

import { UserModel } from "../models/UserModel";

interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  soberDate?: Date;
  phone?: string;
  anonymousFlag?: boolean;
  state?: string;
  city?: string;
  aaFlag?: boolean;
  caFlag?: boolean;
  naFlag?: boolean;
  homeGroup?: string;
}

export const register = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    return res.status(400).send({
      res: { data: "This email already exists!", statusCode: 400 },
      error: true,
    });
  }
  try {
    if (!email || !password) {
      return res.status(400).send({
        res: { data: "Invalid Form Fields!", statusCode: 400 },
        error: true,
      });
    }

    // Password validation
    if (password.length < 5) {
      return res.status(400).send({
        res: {
          data: "Password should be at least 5 characters!",
          statusCode: 400,
        },
        error: true,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      email,
      password: hashedPassword,
    });
    const token: string = createAccessToken({ id: user._id });
    res.status(200).json({ token, msg: "Congratulations!! Account created " });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      res: { data: "Internal Server Error!", statusCode: 500 },
      error: true,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        res: { data: "Invalid email or password", statusCode: 400 },
        error: true,
      });
    }

    const user: IUser | null = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        res: { data: "This email is not registered!", statusCode: 400 },
        error: true,
      });
    }

    console.log("Stored Hashed Password:", user.password);
    console.log("Entered Password:", password);

    const isMatch: boolean = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).send({
        res: { data: "Incorrect Password!", statusCode: 400 },
        error: true,
      });
    }

    const token: string = createAccessToken({ id: user._id });

    res
      .status(200)
      .json({ token, user, status: true, msg: "Login successful.." });
  } catch (e) {
    console.log(e);
    return res
      .status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};

export const profile = async (
  req: Request & { user: IUser },
  res: Response
): Promise<void | Response> => {
  try {
    const userId = req.body.user._id;

    const updatedUserData: Partial<IUser> = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updatedUserData,
      { new: true } // Return the updated user document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error, message: "Internal Server Error" });
  }
};

//Blacklist for Dylan's reference
export async function logout(
  req: Request,
  res: Response
): Promise<void | Response> {
  // try {
  //   const authHeader = req.headers['cookie']; // get the session cookie from request header
  //   if (!authHeader) return res.sendStatus(204); // No content
  //   const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
  //   const accessToken = cookie.split(';')[0];
  //   const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
  //   // if true, send a no content response.
  //   if (checkIfBlacklisted) return res.sendStatus(204);
  //   // otherwise blacklist token
  //   const newBlacklist = new Blacklist({
  //     token: accessToken,
  //   });
  //   await newBlacklist.save();
  //   // Also clear request cookie on client
  //   res.setHeader('Clear-Site-Data', '"cookies"');
  //   res.status(200).json({ message: 'You are logged out!' });
  // } catch (err) {
  //   res.status(500).json({
  //     status: 'error',
  //     message: 'Internal Server Error',
  //   });
  // }
  // res.end();
}
