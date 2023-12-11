import mongoose, { Document, Model, Schema } from "mongoose";


export interface IChat extends Document {
  members: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema: Schema<IChat> = new Schema<IChat>(
  {
    members: [String],
  },
  {
    timestamps: true,
  }
);


const ChatModel: Model<IChat> = mongoose.model<IChat>("Chat", chatSchema);

export default ChatModel;
