"use strict";

require("dotenv").config();

import express from "express";
import { connectDB } from "./models/index";
import router from "./router";
import cors from "cors";
import * as http from "http";
import * as socketIO from "socket.io";

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
console.log("working");

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
