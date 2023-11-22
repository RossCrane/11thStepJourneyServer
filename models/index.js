'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

// Using MongoDB Atlas
const connectDB = async () => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
		});
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error('MongoDB connection error:', err);
	}
};

module.exports = connectDB;
