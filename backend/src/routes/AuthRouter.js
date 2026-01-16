/** @format */

import { Router } from "express";
import { signup, login, logout } from "../controllers/AuthController.js";

const AuthRouter = Router();

AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);
AuthRouter.get("/logout", logout);

export { AuthRouter };
