import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { auth } from "../middleware/auth.js";
import User from "../models/User.js";

dotenv.config();

import { register, login } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);


export default userRouter;
