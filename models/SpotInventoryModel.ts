import mongoose from "mongoose";

// Will need to be altered this was made quickly DOON'T WORRY ABOUT THESES FOR NOW
const spotInventorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  resentment: {
    resentfulAt: { type: String },
    cause: { type: String },
    affects: [
      {
        type: String,
        enum: [
          "fear",
          "self-esteem",
          "security",
          "personal relations",
          "sex relations",
          "pride",
        ],
      },
    ],
    myPart: { type: String },
  },
  fear: {
    fearfulOf: { type: String },
    why: { type: String },
    affects: [
      {
        type: String,
        enum: [
          "fear",
          "self-esteem",
          "security",
          "personal relations",
          "sex relations",
          "pride",
        ],
      },
    ],
    myPart: { type: String },
  },
  harm: {
    who: { type: String },
    what: { type: String },
    affects: [
      {
        type: String,
        enum: [
          "fear",
          "self-esteem",
          "security",
          "personal relations",
          "sex relations",
          "pride",
        ],
      },
    ],
    myPart: { type: String },
  },
  relationship: {
    who: { type: String },
    what: { type: String },
    affects: [
      {
        type: String,
        enum: [
          "fear",
          "self-esteem",
          "security",
          "personal relations",
          "sex relations",
          "pride",
        ],
      },
    ],
    myPart: { type: String },
  },
});

export const SpotInventory = mongoose.model(
  "SpotInventory",
  spotInventorySchema
);
