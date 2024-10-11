import { Router } from "express";
import { UserController } from "../controllers/userController";
import { createUserSchema } from "../schema/user.schema";
import { validate } from "../middleware/validateResource";

export function userRoutes(userController: UserController): Router {
  const router = Router();

  /**
   * @openapi
   * /api/users/register:
   *  post:
   *    tags:
   *      - Users
   *    description: Register a new user account
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/schemas/CreateUserInput'
   *    responses:
   *      '201':
   *        description: User account created successfully
   *        content:
   *          application/json:
   *           schema:
   *            $ref: '#/schemas/CreateUserResponse'
   */
  router.post(
    "/register",
    validate(createUserSchema),
    userController.registerUser
  );

  /**
   * @openapi
   * /api/users/{id}:
   *  get:
   *    tags:
   *      - Users
   *    description: Get a user by ID
   *    parameters:
   *      - name: id
   *        in: path
   *        required: true
   *        schema:
   *          type: string
   *    responses:
   *      '200':
   *        description: Successfully retrieved user
   *      '404':
   *        description: User not found
   */
  router.get("/:id", userController.getUserById);

  router.post("/login", userController.login);

  return router;
}
