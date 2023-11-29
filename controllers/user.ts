import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createAccessToken } from "../utils/token";

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
    await UserModel.create({
      email,
      password: hashedPassword,
    });

    res.status(200).json({ msg: "Congratulations!! Account created " });
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
    const { _id, firstName, lastName } = req.user;
    const user = { _id, firstName, lastName };
    res.status(200).send(user);
  } catch (error) {
    return res.status(404).send({ error, message: "Resource not found" });
  }
};

export const logout = async (
  req: Request & { user: IUser },
  res: Response
): Promise<void | Response> => {
  res.clearCookie("jwtToken");
  res.status(200).json({ message: "Logged out successfully" });
};
