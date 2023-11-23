import mongoose from 'mongoose';

const journalEntrySchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	title: { type: String, required: true },
	timestamp: { type: Date, default: Date.now },
	content: { type: String, required: true },
});

export const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

// const newJournalEntry = new JournalEntry({
// 	userId: userId, // Replace with the actual user's ID
// 	title: 'My Journal Entry Title',
// 	content: 'This is the content of my journal entry...',
// });

// newJournalEntry.save((err) => {
// 	if (err) {
// 		console.error(err);
// 	} else {
// 		console.log('Journal entry saved successfully.');
// 	}
// });
