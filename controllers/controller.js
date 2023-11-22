'use strict';

const User = require('../models/usermodel');

const fubar = async (req, res) => {
	res.set('Access-Control-Allow-Origin', process.env.CLIENT_URL);

	try {
		const response = await fetch();

		res.send();
	} catch (e) {
		console.error(e);
		res.status(500).send('error');
	}
};

module.exports = { fubar };
