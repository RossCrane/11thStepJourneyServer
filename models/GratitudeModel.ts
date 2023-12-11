import mongoose, { Document, Schema, Model, Types } from 'mongoose';

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

export interface IGratitude extends Document {
	userId: IUser['_id'];
	date: Date;
	items: Types.Array<{
		gratitudeNumber: number;
		gratitude: string;
	}>;
}

const gratitudeSchema: Schema<IGratitude> = new Schema<IGratitude>({
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	date: { type: Date, default: Date.now },
	items: [
		{
			gratitudeNumber: { type: Number, required: true },
			gratitude: { type: String },
		},
	],
});

export const GratitudeModel: Model<IGratitude> = mongoose.model<IGratitude>(
	'Gratitude',
	gratitudeSchema
);
