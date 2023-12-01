"use strict";

import express from "express";
const router = express.Router();
import * as userController from "./controllers/user";
import authMiddleware from "./middleware/auth";
import * as controller from "./controllers/controller";

router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/profile", authMiddleware, userController.profile);
router.get("/profile", authMiddleware, userController.getProfile);
router.get("/logout", authMiddleware, userController.logout);

router.post("/response", authMiddleware, controller.createQuestionResponse);
router.post("/journal", authMiddleware, controller.createJournalEntry);
router.post("/gratitude", authMiddleware, controller.createGratitudeEntry);
router.get("/gratitude", authMiddleware, controller.getAllGratitudeEntries);
router.get("/response", authMiddleware, controller.getAllQuestionResponses);
router.post("/soberDate", authMiddleware, controller.saveSoberDate);
router.get("/soberDate", authMiddleware, controller.getSoberDate);
export default router;
