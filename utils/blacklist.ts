import mongoose, { Document, Model, Schema } from "mongoose";

interface IBlacklist extends Document {
  token: string;
}

const BlacklistSchema: Schema<IBlacklist> = new Schema<IBlacklist>(
  {
    token: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const BlacklistModel: Model<IBlacklist> = mongoose.model<IBlacklist>(
  "Blacklist",
  BlacklistSchema
);
