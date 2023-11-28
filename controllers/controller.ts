"use strict";

import { Request, Response } from "express";
import { QuestionResponseModel } from "../models/QuestionAnswersModel";
import { JournalEntryModel } from "../models/JournalModel";
import { GratitudeModel } from "../models/GratitudeModel";
import { UserModel } from "../models/UserModel";

export const createQuestionResponse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId, responses } = req.body;

    // Validate req body
    if (!userId || !responses || !Array.isArray(responses)) {
      return res.status(400).json({
        error: true,
        message: "Invalid form fields",
      });
    }

    const newQuestionResponse = new QuestionResponseModel({
      userId,
      responses,
    });

    // Save to db
    const savedQuestionResponse = await newQuestionResponse.save();

    await UserModel.findByIdAndUpdate(
      userId,
      { $push: { questions: savedQuestionResponse } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "QuestionResponse created successfully",
      data: savedQuestionResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const createJournalEntry = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId, title, content } = req.body;

    // Validate the request body
    if (!userId || !title || !content) {
      return res.status(400).json({
        error: true,
        message: "Invalid request body",
      });
    }

    const newJournalEntry = new JournalEntryModel({
      userId,
      title,
      content,
    });

    const savedJournalEntry = await newJournalEntry.save();
    await UserModel.findByIdAndUpdate(
      userId,
      { $push: { journal: savedJournalEntry } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Journal entry created successfully",
      data: savedJournalEntry,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const createGratitudeEntry = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId, items } = req.body;

    if (!userId || !items || !Array.isArray(items)) {
      return res.status(400).json({
        error: true,
        message: "Invalid request body",
      });
    }

    const newGratitudeEntry = new GratitudeModel({
      userId,
      items,
    });

    const savedGratitudeEntry = await newGratitudeEntry.save();
    await UserModel.findByIdAndUpdate(
      userId,
      { $push: { gratitudeModel: savedGratitudeEntry } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Gratitude entry created successfully",
      data: savedGratitudeEntry,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const saveSoberDate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId, soberDate } = req.body;

    // Validate the request body
    if (!userId || !soberDate) {
      return res.status(400).json({
        error: true,
        message: "Invalid request body",
      });
    }

    // Update the user's soberDate field
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { soberDate },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sober date updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};
