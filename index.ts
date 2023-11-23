'use strict';

require('dotenv').config();

import express from 'express';
import { connectDB } from './models/index';
import router from './router';
import cors from 'cors';

const app = express();
// const cookieParser = require('cookie-parser');

const corsOptions = {
	origin: process.env.CLIENT_URL, // Replace with your frontend's actual origin
	credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// app.use(cookieParser());
connectDB();

app.use(cors(corsOptions));

app.use(router);

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);
});
