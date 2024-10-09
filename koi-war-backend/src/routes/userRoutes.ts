import { Router } from "express";
import { UserController } from "../controllers/userController";

export function userRoutes(userController: UserController): Router {
  const router = Router();

  router.post("/register", userController.registerUser);
  router.get("/:id", userController.getUserById);

  return router;
}
