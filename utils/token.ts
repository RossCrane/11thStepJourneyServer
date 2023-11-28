import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { ACCESS_TOKEN_SECRET } = process.env;

const createAccessToken = (payload: any): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

export { createAccessToken };
