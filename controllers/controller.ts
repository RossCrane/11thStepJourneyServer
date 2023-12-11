'use strict';

import { Request, Response } from 'express';
import {
	QuestionResponseModel,
	IQuestionResponse,
} from '../models/QuestionAnswersModel';
import { JournalEntryModel } from '../models/JournalModel';
import { GratitudeModel, IGratitude } from '../models/GratitudeModel';
import { UserModel, IUser } from '../models/UserModel';

interface CreateQuestionResponse extends Request {
	body: {
		responses: any[];
		user: { _id: string };
	};
}

export const createQuestionResponse = async (
	req: CreateQuestionResponse,
	res: Response
): Promise<Response> => {
	try {
		const { user, responses } = req.body;

		if (!user || !responses || !Array.isArray(responses)) {
			return res.status(400).json({
				error: true,
				message: 'Invalid form fields',
			});
		}

		const newQuestionResponse = new QuestionResponseModel({
			userId: user._id,
			responses,
		});

		const savedQuestionResponse = await newQuestionResponse.save();

		await UserModel.findByIdAndUpdate(
			user._id,
			{ $push: { questions: savedQuestionResponse } },
			{ new: true }
		);

		res.status(201).json({
			success: true,
			message: 'QuestionResponse created successfully',
			data: savedQuestionResponse,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: true,
			message: 'Internal Server Error',
		});
	}
};

interface CreateJournalEntry extends Request {
	body: {
		title: string;
		content: string;
		user: { _id: string };
	};
}

export const createJournalEntry = async (
	req: CreateJournalEntry,
	res: Response
): Promise<Response> => {
	try {
		const { user, title, content } = req.body;

		if (!user || !title || !content) {
			return res.status(400).json({
				error: true,
				message: 'Invalid request body',
			});
		}

		const newJournalEntry = new JournalEntryModel({
			userId: user._id,
			title,
			content,
		});

		const savedJournalEntry = await newJournalEntry.save();
		await UserModel.findByIdAndUpdate(
			user._id,
			{ $push: { journal: savedJournalEntry } },
			{ new: true }
		);

		return res.status(201).json({
			success: true,
			message: 'Journal entry created successfully',
			data: savedJournalEntry,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: true,
			message: 'Internal Server Error',
		});
	}
};

interface CreateGratitudeEntry extends Request {
	body: {
		items: any[];
		user: { _id: string };
	};
}
export const createGratitudeEntry = async (
	req: CreateGratitudeEntry,
	res: Response
): Promise<Response> => {
	try {
		const { user, items } = req.body;

		if (!user || !items || !Array.isArray(items)) {
			return res.status(400).json({
				error: true,
				message: 'Invalid request body',
			});
		}

		const newGratitudeEntry = new GratitudeModel({
			userId: user._id,
			items,
		});

		const savedGratitudeEntry = await newGratitudeEntry.save();
		await UserModel.findByIdAndUpdate(
			user._id,
			{ $push: { gratitudeModel: savedGratitudeEntry } },
			{ new: true }
		);

		return res.status(201).json({
			success: true,
			message: 'Gratitude entry created successfully',
			data: savedGratitudeEntry,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: true,
			message: 'Internal Server Error',
		});
	}
};

interface GetAllGratitudeEntries extends Request {
	body: {
		user: { _id: string };
	};
}

export const getAllGratitudeEntries = async (
	req: GetAllGratitudeEntries,
	res: Response
): Promise<void> => {
	try {
		const userId = req.body.user?._id;

		const gratitudeEntries: IGratitude[] = await GratitudeModel.find({
			userId,
		}).exec();

		res.status(200).json({
			success: true,
			data: gratitudeEntries,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: true,
			message: 'Internal Server Error',
		});
	}
};

interface GetAllQuestionResponses extends Request {
	body: {
		user: { _id: string };
	};
}

export const getAllQuestionResponses = async (
	req: GetAllQuestionResponses,
	res: Response
): Promise<void> => {
	try {
		const userId: string = req.body.user?._id;

		const questionResponses: IQuestionResponse[] =
			await QuestionResponseModel.find({
				userId,
			}).exec();

		res.status(200).json({
			success: true,
			data: questionResponses,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: true,
			message: 'Internal Server Error',
		});
	}
};

export const saveSoberDate = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { user, soberDate } = req.body;

		if (!user || !soberDate) {
			return res.status(400).json({
				error: true,
				message: 'Invalid request body',
			});
		}

		const updatedUser = await UserModel.findByIdAndUpdate(
			user,
			{ soberDate },
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(404).json({
				error: true,
				message: 'User not found',
			});
		}

		return res.status(200).json({
			success: true,
			message: 'Sober date updated successfully',
			data: updatedUser,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: true,
			message: 'Internal Server Error',
		});
	}
};

export const updateSoberDate = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	try {
		const userId = req.body.user?._id;

		const { soberDate } = req.body;

		if (!soberDate) {
			return res.status(400).json({
				error: true,
				message: 'Invalid request body',
			});
		}

		const updatedUser: IUser | null = await UserModel.findByIdAndUpdate(
			userId,
			{ soberDate },
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(404).json({
				error: true,
				message: 'User not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Sober date updated successfully',
			data: updatedUser,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: true,
			message: 'Internal Server Error',
		});
	}
};

export const getSoberDate = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	try {
		const userId = req.body.user?._id;

		if (!userId) {
			return res.status(400).json({
				error: true,
				message: 'User ID not provided in the request',
			});
		}

		const user: IUser | null = await UserModel.findById(userId).exec();

		if (!user) {
			return res.status(404).json({
				error: true,
				message: 'User not found',
			});
		}

		const soberDate: Date | undefined = user.soberDate;

		if (!soberDate) {
			return res.status(404).json({
				error: true,
				message: 'Sober date not found for the user',
			});
		}

		res.status(200).json({ soberDate: soberDate });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: true,
			message: 'Internal Server Error',
		});
	}
};
