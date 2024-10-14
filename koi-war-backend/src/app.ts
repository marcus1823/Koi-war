import express from "express";
import { connectDB } from "./config/db";
import { userRoutes } from "./routes/userRoutes";
import { UserController } from "./controllers/userController";
import { UserRepository } from "./repositories/impl/userRepository";
import { UserService } from "./services/impl/userServices";
import { contestRegistrationRoutes } from "./routes/contestRegistrationRoutes";
import { ContestRegistrationController } from "./controllers/contestRegistrationController";
import { ContestRegistrationRepository } from "./repositories/impl/ContestRegistrationRepository";
import { ContestRegistrationServices } from "./services/impl/contestRegistrationServices";

const app = express();
connectDB();

app.use(express.json());

app.use(
  "/api/users",
  userRoutes(new UserController(new UserService(new UserRepository())))
);

app.use(
  "/registerContest",
  contestRegistrationRoutes(
    new ContestRegistrationController(
      new ContestRegistrationServices(new ContestRegistrationRepository())
    )
  )
);

module.exports = app;
