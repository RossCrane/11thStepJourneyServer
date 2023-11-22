'use strict';

require('dotenv').config();

const express = require('express');
const connectDB = require('./models/index');
const router = require('./router');
const app = express();
const cors = require('cors');
// const cookieParser = require('cookie-parser');

const corsOptions = {
	origin: 'http://localhost:5173', // Replace with your frontend's actual origin
	credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// app.use(cookieParser());
connectDB();

app.use(cors(corsOptions));

app.use(router);

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);
});
