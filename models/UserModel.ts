'use strict';

import mongoose, { Document, Schema, Model, Types } from 'mongoose';

interface IGratitude extends Document {
	userId: IUser['_id'];
	date: Date;
	items: Types.Array<{
		gratitudeNumber: number;
		gratitude: string;
	}>;
}

interface IQuestionResponse extends Document {
	userId: IUser['_id'];
	date: Date;
	responses: Types.Array<{
		questionNumber: number;
		response: string;
	}>;
	responsesToResponse: Types.Array<string>;
}

interface IJournalEntry extends Document {
	userId: IUser['_id'];
	title: string;
	timestamp: Date;
	content: string;
}

export interface IUser extends Document {
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
	aaFlag: { type: Boolean }, // Alcoholic Anonymous
	caFlag: { type: Boolean }, // Cocaine Anonymous
	naFlag: { type: Boolean }, // Narcotics Anonymous
	homeGroup: { type: String },
	gratitudeModel: [{ type: Schema.Types.ObjectId, ref: 'Gratitude' }],
	questions: [{ type: Schema.Types.ObjectId, ref: 'QuestionAnswer' }],
	journal: [{ type: Schema.Types.ObjectId, ref: 'JournalEntry' }],
});

export const UserModel: Model<IUser> = mongoose.model<IUser>(
	'User',
	userSchema
);
