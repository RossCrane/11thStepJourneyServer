import { Request as ExpressRequest } from "express";

import { UserModel } from "./models/UserModel";

interface IUser extends Document {
  id: string;
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

declare module "express" {
  interface Request {
    user?: IUser; // Add your custom properties here
  }
}
