"use strict";

import express from "express";
const router = express.Router();
import * as userController from "./controllers/user";
import authMiddleware from "./middleware/auth";
import * as controller from "./controllers/controller";

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", authMiddleware, userController.profile);
router.post("/logout", authMiddleware, userController.logout);

router.post("/response", authMiddleware, controller.createQuestionResponse);
router.post("/journal", authMiddleware, controller.createJournalEntry);
router.post("/gratitude", authMiddleware, controller.createGratitudeEntry);
router.post("/soberDate", authMiddleware, controller.saveSoberDate);
export default router;
