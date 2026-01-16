/** @format */

import { Router } from "express";
import { getAllUsers } from "../controllers/AuthController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
import { deleteUser } from "../controllers/AuthController.js";

const AdminRouter = Router();

AdminRouter.get("/users", protect, isAdmin, getAllUsers);
AdminRouter.delete("/users/:id", protect, isAdmin, deleteUser);

export { AdminRouter };
