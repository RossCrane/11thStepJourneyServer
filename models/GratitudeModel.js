const mongoose = require('mongoose');

const gratitudeSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	date: { type: Date, default: Date.now },
	items: [
		{
			gratitudeNumber: { type: Number, required: true },
			gratitude: { type: String },
		},
	],
});

const Gratitude = mongoose.model('Gratitude', gratitudeSchema);

module.exports = Gratitude;

// const newGratitude = new Gratitude({
// 	userId: userId, // Replace with the actual user's ID
// 	items: [
// 		{ itemNumber: 1, text: 'Gratitude item 1' },
// 		{ itemNumber: 2, text: 'Gratitude item 2' },
// 		// Add more gratitude items as needed
// 	],
// });

// newGratitude.save((err) => {
// 	if (err) {
// 		console.error(err);
// 	} else {
// 		console.log('Gratitude saved successfully.');
// 	}
// });
