'use strict';

import express from 'express';
const router = express.Router();
import * as userController from './controllers/user';
import authMiddleware from './middleware/auth';
import * as controller from './controllers/controller';
import * as chatController from './controllers/chatController';
import * as messageController from './controllers/messageController';

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/profile', authMiddleware, userController.profile);
router.get('/profile', authMiddleware, userController.getProfile);
router.get('/logout', authMiddleware, userController.logout);

router.post('/response', authMiddleware, controller.createQuestionResponse);
router.post('/journal', authMiddleware, controller.createJournalEntry);
router.post('/gratitude', authMiddleware, controller.createGratitudeEntry);
router.get('/gratitude', authMiddleware, controller.getAllGratitudeEntries);
router.get('/response', authMiddleware, controller.getAllQuestionResponses);
router.post('/soberDate', authMiddleware, controller.saveSoberDate);
router.get('/soberDate', authMiddleware, controller.getSoberDate);
router.put('/soberDate', authMiddleware, controller.updateSoberDate);
router.post('/chat', authMiddleware, chatController.createChat);

router.get('/userChats/:id', authMiddleware, chatController.findUserChats);
router.get('/find/:firstId/:secondId', authMiddleware, chatController.findChat);
router.post('/message', authMiddleware, messageController.createMessage);
router.get('/messages/:id', authMiddleware, messageController.getMessages);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/chats', authMiddleware, chatController.getChats);

export default router;
