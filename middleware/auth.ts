import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/UserModel";
const { ACCESS_TOKEN_SECRET } = process.env;

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res
      .status(401)
      .json({ status: false, msg: "Authorization header not found" });
    return;
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1]) {
    res.status(401).json({
      status: false,
      msg: "Authorization header is malformed",
    });
    return;
  }

  const token = parts[1];

  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET, async (error, decoded: any) => {
      if (error) {
        console.error("Token verification failed", error.message);
        res.status(401).json({ status: false, error: error.message });
        return; //
      } else {
        console.log(decoded);
        const user = await UserModel.findById(decoded.id).select("-password"); // Exclude password from the user object

        console.log("retrieved user:", user);

        if (!user) {
          res.status(401).json({ status: false, msg: "User not found" });
          return;
        }

        // Attach the user object to the request
        (req as any).body.user = user;
        next(); // Proceed to the next middleware
      }
    });
  } catch (err) {
    console.error(err);
    // Differentiate between token errors and server errors
    res.status(401).json({ status: false, msg: "Invalid token" });
    return; // Exit the function after sending the response
  }
};

export default authMiddleware;
