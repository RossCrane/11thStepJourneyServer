import mongoose, { Document, Model } from "mongoose";

export interface IMessage extends Document {
  chatId: string;
  senderId: string;
  text: string;
}

const messageSchema = new mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    text: String,
  },
  { timestamps: true }
);

const MessageModel: Model<IMessage> = mongoose.model<IMessage>(
  "Message",
  messageSchema
);

export default MessageModel;
