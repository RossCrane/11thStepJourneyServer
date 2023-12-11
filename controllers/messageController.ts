import { Request, Response } from 'express';
import MessageModel, { IMessage } from '../models/messageModel';

export const createMessage = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { chatId, senderId, text } = req.body;

	try {
		const message = new MessageModel({ chatId, senderId, text });
		const response = await message.save();
		res.status(200).json(response);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

export const getMessages = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params;

	try {
		const messages: IMessage[] = await MessageModel.find({ chatId: id });
		res.status(200).json(messages);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};
