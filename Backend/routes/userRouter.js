import express from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  updatePassword,
  updateUserProfile,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";
export const userRouter = express.Router();

// PUBLIC LINKS
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// PRIVATE LINKS protect also
userRouter.get("/me",authMiddleware, getCurrentUser);
userRouter.put("/profile",authMiddleware, updateUserProfile);
userRouter.put("/password",authMiddleware, updatePassword);

