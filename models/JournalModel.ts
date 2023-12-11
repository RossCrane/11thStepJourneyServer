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

interface IJournalEntry extends Document {
	userId: IUser['_id'];
	title: string;
	timestamp: Date;
	content: string;
}

const journalEntrySchema: Schema<IJournalEntry> = new Schema<IJournalEntry>({
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	title: { type: String, required: true },
	timestamp: { type: Date, default: Date.now },
	content: { type: String, required: true },
});

export const JournalEntryModel: Model<IJournalEntry> =
	mongoose.model<IJournalEntry>('JournalEntry', journalEntrySchema);
