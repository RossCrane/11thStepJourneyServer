import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { UserModel } from "./UserModel";

interface IUser extends Document {
  email: string;
  passwordOrToken: string;
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

interface IQuestionResponse extends Document {
  userId: IUser["_id"];
  date: Date;
  responses: Types.Array<{
    questionNumber: number;
    response: string;
  }>;
  responsesToResponse: Types.Array<string>; // Stretch goal
}

const questionResponseSchema: Schema<IQuestionResponse> =
  new Schema<IQuestionResponse>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    responses: [
      {
        questionNumber: { type: Number, required: true },
        response: { type: String },
      },
    ],
    responsesToResponse: [{ type: String }], // Stretch goal
  }); //post route

export const QuestionResponseModel: Model<IQuestionResponse> =
  mongoose.model<IQuestionResponse>("QuestionAnswer", questionResponseSchema);
