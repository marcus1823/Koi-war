import  {Router} from "express";
import {FishController} from "../controllers/fishController";
import {validate} from "../middleware/validateResource";
import {createFishSchema} from "../schema/fish.schema";
import {verifyToken} from "../middleware/authMiddleware";
import {authorizeRole} from "../middleware/authorizeMiddleware";
import {UserRole} from "../models/user.model";

/**
 * @openapi
 * tags:
 *   name: Fishes
 *   description: Fish management APIs
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateFishInput:
 *       type: object
 *       required:
 *         - name
 *         - weight
 *         - length
 *         - images
 *         - variety
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 150
 *           example: "Koi Kohaku A1"
 *           description: Name of the fish
 *         weight:
 *           type: number
 *           minimum: 0.1
 *           example: 2.5
 *           description: Weight in kilograms
 *         length:
 *           type: number
 *           minimum: 1
 *           example: 35
 *           description: Length in centimeters
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             format: uri
 *           minItems: 1
 *           example: ["https://example.com/fish1.jpg"]
 *         variety:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"
 *           example: "6721f38553d22c42e4c1d990"
 *           description: ID of the fish variety
 *         description:
 *           type: string
 *           minLength: 8
 *           maxLength: 1000
 *           example: "Cá Koi Kohaku màu trắng đỏ, 2 tuổi"
 *     
 *     FishResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "6721f38553d22c42e4c1d991"
 *         name:
 *           type: string
 *           example: "Koi Kohaku A1"
 *         weight:
 *           type: number
 *           example: 2.5
 *         length:
 *           type: number
 *           example: 35
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example: ["https://example.com/fish1.jpg"]
 *         variety:
 *           $ref: '#/components/schemas/VarietyResponse'
 *         user:
 *           $ref: '#/components/schemas/UserResponse'
 *         description:
 *           type: string
 *           example: "Cá Koi Kohaku màu trắng đỏ, 2 tuổi"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @openapi
 * /api/fish/createFish:
 *   post:
 *     tags: [Fishes]
 *     summary: Create a new fish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFishInput'
 *     responses:
 *       201:
 *         description: Fish created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FishResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *
 * /api/fish/getAllFishes:
 *   get:
 *     tags: [Fishes]
 *     summary: Get all fishes
 *     responses:
 *       200:
 *         description: List of all fishes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FishResponse'
 *
 * /api/fish/myFishes:
 *   get:
 *     tags: [Fishes]
 *     summary: Get current user's fishes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's fishes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FishResponse'
 *       401:
 *         description: Unauthorized
 *
 * /api/fish/{id}:
 *   get:
 *     tags: [Fishes]
 *     summary: Get fish by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "6721f38553d22c42e4c1d991"
 *     responses:
 *       200:
 *         description: Fish details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FishResponse'
 *       404:
 *         description: Fish not found
 *
 * /api/fish/variety/{varietyId}:
 *   get:
 *     tags: [Fishes]
 *     summary: Get fishes by variety ID
 *     parameters:
 *       - name: varietyId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "6721f38553d22c42e4c1d990"
 *     responses:
 *       200:
 *         description: List of fishes of specified variety
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FishResponse'
 *
 * /api/fish/update/{id}:
 *   put:
 *     tags: [Fishes]
 *     summary: Update fish by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "6721f38553d22c42e4c1d991"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFishInput'
 *     responses:
 *       200:
 *         description: Fish updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Fish updated successfully"
 *                 fish:
 *                   $ref: '#/components/schemas/FishResponse'
 *       404:
 *         description: Fish not found
 *       401:
 *         description: Unauthorized
 *
 * /api/fish/delete/{id}:
 *   delete:
 *     tags: [Fishes]
 *     summary: Delete fish by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "6721f38553d22c42e4c1d991"
 *     responses:
 *       200:
 *         description: Fish deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Fish deleted successfully"
 *                 fish:
 *                   $ref: '#/components/schemas/FishResponse'
 *       404:
 *         description: Fish not found
 *       401:
 *         description: Unauthorized
 */

export function fishRoutes(fishController: FishController): Router {
    const router = Router();

    /**
     * @openapi
     * /api/fishes/createFish:
     *   post:
     *     tags:
     *       - Fishes
     *     summary: Create a new fish entry
     *     description: Create a new fish with name, weight, length, images, variety, and description
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateFishInput'
     *     responses:
     *       '201':
     *         description: Fish created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/FishResponse'
     *       '400':
     *         description: Validation error
     */
    router.post("/createFish", validate(createFishSchema), verifyToken, fishController.createFish);

    /**
     * @openapi
     * /api/fishes/getAllFishes:
     *   get:
     *     tags:
     *       - Fishes
     *     summary: Get all fishes
     *     description: Retrieve a list of all fishes
     *     responses:
     *       '200':
     *         description: Successfully retrieved list of fishes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/FishResponse'
     */
    router.get("/getAllFishes", fishController.getAllFishes);

    /**
     * @openapi
     * /api/fishes/getFishByUserId/{userId}:
     *   get:
     *     tags:
     *       - Fishes
     *     summary: Get fishes by user ID
     *     description: Retrieve a list of fishes based on the user ID
     *     parameters:
     *       - name: userId
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successfully retrieved fishes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/FishResponse'
     */
    router.get("/getFishByUserId/:userId", fishController.getFishByUserId);

    /**
     * @openapi
     * /api/fishes/getFishByVarietyId/{varietyId}:
     *   get:
     *     tags:
     *       - Fishes
     *     summary: Get fishes by variety ID
     *     description: Retrieve fishes by variety ID
     *     parameters:
     *       - name: varietyId
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successfully retrieved fishes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/FishResponse'
     */
    router.get("/getFishByVarietyId/:varietyId", fishController.getFishByVarietyId);

    /**
     * @openapi
     * /api/fishes/getFishByVarietyName/{varietyName}:
     *   get:
     *     tags:
     *       - Fishes
     *     summary: Get fishes by variety name
     *     description: Retrieve fishes by variety name
     *     parameters:
     *       - name: varietyName
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successfully retrieved fishes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/FishResponse'
     */
    router.get("/getFishByVarietyName/:varietyName", fishController.getFishByVarietyName);

    /**
     * @openapi
     * /api/fishes/{id}:
     *   get:
     *     tags:
     *       - Fishes
     *     summary: Get fish by ID
     *     description: Retrieve a fish by its ID
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successfully retrieved fish
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/FishResponse'
     *       '404':
     *         description: Fish not found
     */
    router.get("/:id", fishController.getFishById);

    /**
     * @openapi
     * /api/fishes/updateFishById/{id}:
     *   put:
     *     tags:
     *       - Fishes
     *     summary: Update fish by ID
     *     description: Update an existing fish by its ID
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateFishInput'
     *     responses:
     *       '200':
     *         description: Fish updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/FishResponse'
     *       '404':
     *         description: Fish not found
     */
    router.put("/updateFishById/:id", fishController.updateFishById);

    /**
     * @openapi
     * /api/fishes/deleteFishById/{id}:
     *   delete:
     *     tags:
     *       - Fishes
     *     summary: Delete fish by ID
     *     description: Delete an existing fish by its ID
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Fish deleted successfully
     *       '404':
     *         description: Fish not found
     */
    router.delete("/deleteFishById/:id", fishController.deleteFishById);

    router.get("/myFishes", verifyToken, (req, res, next) =>
        authorizeRole([UserRole.USER], req, res, next), fishController.getAllMyFishes);

    return router;
}
