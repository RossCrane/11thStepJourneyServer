'use strict';

require('dotenv').config();

import mongoose from 'mongoose';
const uri = process.env.MONGODB_URI;

// Using MongoDB Atlas
export const connectDB = async () => {
	try {
		await mongoose.connect(uri, {});
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error('MongoDB connection error:', err);
	}
};
