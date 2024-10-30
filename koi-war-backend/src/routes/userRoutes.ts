import {Router} from "express";
import {UserController} from "../controllers/userController";
import {createUserSchema} from "../schema/user.schema";
import {validate} from "../middleware/validateResource";
import {verifyToken} from "../middleware/authMiddleware";
import {authorizeRole} from "../middleware/authorizeMiddleware";
import {UserRole} from "../models/user.model";

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
     * /api/users/user/{id}:
     *  get:
     *    tags:
     *      - Users
     *    description: Get a user by ID - function for admin management
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
    router.get(
        "/user/:id",
        (req, res, next) =>
            authorizeRole([UserRole.ADMIN, UserRole.STAFF], req, res, next),
        userController.getUserById
    );

    /**
     * @openapi
     * /api/users/login:
     *   post:
     *     tags:
     *       - Users
     *     description: Login a user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       '200':
     *         description: Successfully logged in
     *       '401':
     *         description: Invalid credentials
     */
    router.post("/login", userController.login);

    /**
     * @openapi
     * /api/users/me:
     *   get:
     *     tags:
     *       - Users
     *     security:
     *       - bearerAuth: []
     *     description: Get the authenticated user's details
     *     responses:
     *       '200':
     *         description: Successfully retrieved user
     *       '404':
     *         description: User not found
     */
    router.get("/me", verifyToken, userController.getUserProfile);

    return router;
}
