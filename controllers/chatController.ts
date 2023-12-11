import { Request, Response } from 'express';
import ChatModel, { IChat } from '../models/chatModel';
import { UserModel } from '../models/UserModel';

export const createChat = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { firstId, secondId } = req.body;
	try {
		const chat: IChat | null = await ChatModel.findOne({
			members: { $all: [firstId, secondId] },
		});

		if (chat) {
			return res.status(200).json(chat);
		}

		const newChat = new ChatModel({
			members: [firstId, secondId],
		});

		const response: IChat = await newChat.save();
		res.status(200).json(response);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

export const findUserChats = async (
	req: Request,
	res: Response
): Promise<void> => {
	const userId: string = req.params.id;

	try {
		const chats: IChat[] = await ChatModel.find({
			members: { $in: [userId] },
		});

		res.status(200).json(chats);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

interface GetChatsRequest extends Request {
	body: {
		user: { _id: string };
	};
}

export const getChats = async (
	req: GetChatsRequest,
	res: Response
): Promise<void> => {
	const userId = req.body.user?._id;

	try {
		const chats: IChat[] = await ChatModel.find({
			members: { $in: [userId] },
		});

		const modifiedChats = [];

		for (const chat of chats) {
			const otherUserIds = chat.members.filter(
				(memberId) => memberId !== userId
			);
			const otherUsers = (await UserModel.find(
				{ _id: { $in: otherUserIds } },
				{ _id: 1, firstName: 1 }
			).lean()) as { _id: string; firstName: string }[];

			otherUsers.forEach((user) => {
				if (!user.firstName) {
					user.firstName = 'Anonymous';
				}
			});

			modifiedChats.push({
				chatId: chat._id,
				members: otherUsers,
			});
		}

		res.status(200).json(modifiedChats);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

export const findChat = async (req: Request, res: Response): Promise<void> => {
	const { firstId, secondId } = req.params;

	try {
		const chat: IChat[] = await ChatModel.find({
			members: { $all: [firstId, secondId] },
		});

		res.status(200).json(chat);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};
