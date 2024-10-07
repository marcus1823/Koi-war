import { Router } from "express";
import { userController } from "../controllers/userController";

const userRoutes = Router();

userRoutes.get("/", (req, res) => {
  res.send("Hello World!");
});

userRoutes.post("/register", userController.registerUser);

export default userRoutes;
