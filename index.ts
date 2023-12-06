'use strict';

require('dotenv').config();

import express from 'express';
import { connectDB } from './models/index';
import router from './router';
import cors from 'cors';
import * as http from 'http';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const httpServer = createServer();

const app = express();
// const cookieParser = require('cookie-parser');

const corsOptions = {
	origin: process.env.CLIENT_URL,
	credentials: true,
};

// app.use(cookieParser());
connectDB();

app.use(cors(corsOptions));
app.use(express.json());

app.use(router);
// console.log("working");

const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST'],
	},
});

let onlineUsers = [];

io.on('connection', (socket: Socket) => {
	console.log('New connection', socket.id);

	// Added new connection
	socket.on('addNewUser', (userId) => {
		!onlineUsers.some((user) => user.userId === userId) &&
			onlineUsers.push({
				userId,
				socketId: socket.id,
			});

		// console.log('onlineUsers', onlineUsers);
		io.emit('getOnlineUsers', onlineUsers);
	});
	// END Added new connection

	//add message
	socket.on('sendMessage', (message) => {
		console.log('message', message);
		// const user = onlineUsers.find(
		// 	(user) => user.userId === message.recipientId
		// );

		io.emit('getMessage', message);
		// notifications
		io.emit('getNotification', {
			senderId: message.senderId,
			isRead: false,
			date: new Date(),
		});

		// console.log('message here', message);
	});
	// END add message

	// Code with Santi
	// socket.on('sendMessage', (message) => {
	// 	console.log(message);

	// 	// store in db
	// 	socket.emit('recieveMessage', message);
	// });
	// END Code with Santi

	socket.on('disconnect', () => {
		onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
		io.emit('getOnlineUsers', onlineUsers);
	});
});

httpServer.listen(3001, () => {
	console.log('listening on *:3001');
});

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
