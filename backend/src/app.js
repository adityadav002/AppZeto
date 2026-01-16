/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

import { AuthRouter } from "./routes/AuthRouter.js";
import { AdminRouter } from "./routes/AdminRouter.js";
import { UserRouter } from "./routes/UserRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", AuthRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/user", UserRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Your server is running on http://localhost:${PORT}`);
  connectDB();
});
