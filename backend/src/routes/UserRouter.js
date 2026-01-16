/** @format */

import { Router } from "express";
import { getUserProfile } from "../controllers/AuthController.js";
import { protect } from "../middlewares/authMiddleware.js";

const UserRouter = Router();

UserRouter.get("/profile", protect, getUserProfile);

export { UserRouter };
