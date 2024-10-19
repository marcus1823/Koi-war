import  {Router} from "express";
import {FishController} from "../controllers/fishController";
import {validate} from "../middleware/validateResource";
import {createFishSchema} from "../schema/fish.schema";
import {verifyToken} from "../middleware/authMiddleware";

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

    return router;
}
