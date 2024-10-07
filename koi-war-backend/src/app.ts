import express from "express";
import userRoutes from "./routes/userRoutes";
import { connectDB } from "./configs/db";

const app = express();
connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);

module.exports = app;
