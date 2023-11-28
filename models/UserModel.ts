"use strict";

import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { QuestionResponseModel } from "./QuestionAnswersModel";
// import { JournalEntry } from "./JournalModel";
// import { Gratitude } from "./GratitudeModel";

interface IGratitude extends Document {
  userId: IUser["_id"];
  date: Date;
  items: Types.Array<{
    gratitudeNumber: number;
    gratitude: string;
  }>;
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

interface IJournalEntry extends Document {
  userId: IUser["_id"];
  title: string;
  timestamp: Date;
  content: string;
}

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
  gratitudeModel: Types.Array<IGratitude>;
  questions: Types.Array<IQuestionResponse>;
  journal: Types.Array<IJournalEntry>;
}

// May need to be altered this was made quickly
const userSchema: Schema<IUser> = new Schema<IUser>({
  id: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  soberDate: { type: Date },
  phone: { type: String },
  anonymousFlag: { type: Boolean },
  state: { type: String },
  city: { type: String },
  aaFlag: { type: Boolean }, //alcoholic Anonymous
  caFlag: { type: Boolean }, // cocaine anonymous
  naFlag: { type: Boolean }, // narcotics anonymous
  homeGroup: { type: String }, // You may want to link this to another schema or model
  gratitudeModel: [{ type: Schema.Types.ObjectId, ref: "Gratitude" }],
  questions: [{ type: Schema.Types.ObjectId, ref: "QuestionAnswer" }],
  journal: [{ type: Schema.Types.ObjectId, ref: "JournalEntry" }],
  //questions, journal, spotInventory
});

export const UserModel: Model<IUser> = mongoose.model<IUser>(
  "User",
  userSchema
);
