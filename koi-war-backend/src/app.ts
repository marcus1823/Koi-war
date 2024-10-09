import express from "express";
import { connectDB } from "./configs/db";
import { userRoutes } from "./routes/userRoutes";
import { UserController } from "./controllers/userController";
import { UserRepository } from "./repositories/impl/userRepository";
import { UserService } from "./services/impl/userServices";

const app = express();
connectDB();

app.use(express.json());

app.use(
  "/api/users",
  userRoutes(new UserController(new UserService(new UserRepository())))
);

module.exports = app;
