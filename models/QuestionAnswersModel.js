const mongoose = require('mongoose');

// May need to be altered this was made quickly
const questionAnswerSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	date: { type: Date, default: Date.now },
	responses: [
		{
			questionNumber: { type: Number, required: true },
			response: { type: String },
		},
	],
	responsesToResponse: [{ type: String }], // Stretch goal
});

const QuestionAnswer = mongoose.model('QuestionAnswer', questionAnswerSchema);

module.exports = QuestionAnswer;

// const newQuestionAnswer = new QuestionAnswer({
// 	userId: userId, // Replace with the actual user's ID
// 	responses: [
// 		{ questionNumber: 1, response: 'Response to question 1' },
// 		{ questionNumber: 2, response: 'Response to question 2' },
// 		// Add more responses as needed
// 	],
// 	// Other fields (responsesToResponse, gratitudes, etc.)
// });

// newQuestionAnswer.save((err) => {
// 	if (err) {
// 		console.error(err);
// 	} else {
// 		console.log('QuestionAnswer saved successfully.');
// 	}
// });
