'use strict';

const mongoose = require('mongoose');

// May need to be altered this was made quickly
const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	passwordOrToken: { type: String, required: true },
	firstName: { type: String },
	lastName: { type: String },
	soberDate: { type: Date },
	phone: { type: String },
	anonymousFlag: { type: Boolean },
	state: { type: String },
	city: { type: String },
	aaFlag: { type: Boolean },
	caFlag: { type: Boolean },
	naFlag: { type: Boolean },
	homeGroup: { type: String }, // You may want to link this to another schema or model
});

const User = mongoose.model('User', userSchema);

module.exports = User;
