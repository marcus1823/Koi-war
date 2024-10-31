import {Router} from "express";
import {FishController} from "../controllers/fishController";
import {validate} from "../middleware/validateResource";
import {createFishSchema, updateFishSchema} from "../schema/fish.schema";
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
 *         - variety
 *         - images
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 150
 *           example: "Kohaku A1"
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
 *         variety:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"
 *           example: "6721f38553d22c42e4c1d990"
 *           description: ID of the fish variety
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             format: uri
 *           minItems: 1
 *           example: ["https://example.com/fish1.jpg"]
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
 *           example: "Kohaku A1"
 *         weight:
 *           type: number
 *           example: 2.5
 *         length:
 *           type: number
 *           example: 35
 *         variety:
 *           $ref: '#/components/schemas/VarietyResponse'
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example: ["https://example.com/fish1.jpg"]
 *         description:
 *           type: string
 *           example: "Cá Koi Kohaku màu trắng đỏ, 2 tuổi"
 *         user:
 *           $ref: '#/components/schemas/UserResponse'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export function fishRoutes(fishController: FishController): Router {
    const router = Router();

    /**
     * @openapi
     * /api/fishes/createFish:
     *   post:
     *     tags: [Fishes]
     *     summary: Create a new fish
     *     description: Creates a new fish profile with the provided details
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
     *         description: Invalid input data
     *       401:
     *         description: Unauthorized - Token missing or invalid
     *       404:
     *         description: Variety not found
     */
    router.post(
        "/createFish",
        (req, res, next) =>
            authorizeRole([UserRole.USER], req, res, next),
        validate(createFishSchema),
        verifyToken,
        fishController.createFish
    );

    /**
     * @openapi
     * /api/fishes/getAllFishes:
     *   get:
     *     tags: [Fishes]
     *     summary: Get all fishes
     *     description: Retrieves a list of all fish profiles
     *     responses:
     *       200:
     *         description: List of all fishes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/FishResponse'
     */
    router.get("/getAllFishes",  fishController.getAllFishes);

    /**
     * @openapi
     * /api/fishes/getFishByUserId/{userId}:
     *   get:
     *     tags: [Fishes]
     *     summary: Get fishes by user ID
     *     description: Retrieves all fish profiles owned by a specific user
     *     parameters:
     *       - name: userId
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "6721f38553d22c42e4c1d992"
     *     responses:
     *       200:
     *         description: List of user's fishes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/FishResponse'
     *       404:
     *         description: User not found
     */
    router.get("/getFishByUserId/:userId", fishController.getFishByUserId);

    /**
     * @openapi
     * /api/fishes/getFishByVarietyId/{varietyId}:
     *   get:
     *     tags: [Fishes]
     *     summary: Get fishes by variety ID
     *     description: Retrieves all fish profiles of a specific variety
     *     parameters:
     *       - name: varietyId
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "6721f38553d22c42e4c1d990"
     *     responses:
     *       200:
     *         description: List of fishes of the specified variety
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/FishResponse'
     *       404:
     *         description: Variety not found
     */
    router.get("/getFishByVarietyId/:varietyId", fishController.getFishByVarietyId);

    /**
     * @openapi
     * /api/fishes/getFishByVarietyName/{varietyName}:
     *   get:
     *     tags: [Fishes]
     *     summary: Get fishes by variety name
     *     description: Retrieves all fish profiles of a specific variety name
     *     parameters:
     *       - name: varietyName
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "Kohaku"
     *     responses:
     *       200:
     *         description: List of fishes of the specified variety
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/FishResponse'
     *       404:
     *         description: Variety not found
     */
    router.get("/getFishByVarietyName/:varietyName", fishController.getFishByVarietyName);

    /**
     * @openapi
     * /api/fishes/{id}:
     *   get:
     *     tags: [Fishes]
     *     summary: Get fish by ID
     *     description: Retrieves detailed information about a specific fish
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "6721f38553d22c42e4c1d991"
     *     responses:
     *       200:
     *         description: Fish details retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/FishResponse'
     *       404:
     *         description: Fish not found
     */
    router.get("/:id", fishController.getFishById);

/**
     * @openapi
     * /api/fishes/updateFishById/{id}:
     *   put:
     *     tags: [Fishes]
     *     summary: Update a fish by ID
     *     description: Update fish information. Only authenticated users can update their own fish.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         description: ID of the fish to update
     *         required: true
     *         schema:
     *           type: string
     *           example: "6721f38553d22c42e4c1d991"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Updated Kohaku A1"
     *               weight:
     *                 type: number
     *                 example: 3.5
     *               length:
     *                 type: number
     *                 example: 40
     *               variety:
     *                 type: string
     *                 example: "6721f38553d22c42e4c1d990"
     *               images:
     *                 type: array
     *                 items:
     *                   type: string
     *                 example: ["https://example.com/updated-fish1.jpg"]
     *               description:
     *                 type: string
     *                 example: "Updated description for Kohaku"
     *     responses:
     *       200:
     *         description: Fish updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: "Fish updated successfully"
     *                 data:
     *                   $ref: '#/components/schemas/FishResponse'
     *       400:
     *         description: Invalid input data
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Invalid input data"
     *       401:
     *         description: Unauthorized - Token missing or invalid
     *       403:
     *         description: Forbidden - User doesn't have permission to update this fish
     *       404:
     *         description: Fish not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Fish not found"
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Failed to update fish"
     */ 
    router.put('/updateFishById/:id', 
        (req, res, next) => authorizeRole([UserRole.USER], req, res, next),
        validate(updateFishSchema),
        fishController.updateFishById
    );

   /**
     * @openapi
     * /api/fishes/deleteFishById/{id}:
     *   delete:
     *     tags: [Fishes]
     *     summary: Delete a fish by ID
     *     description: Delete a fish. Only authenticated users can delete their own fish.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         description: ID of the fish to delete
     *         required: true
     *         schema:
     *           type: string
     *           example: "6721f38553d22c42e4c1d991"
     *     responses:
     *       200:
     *         description: Fish deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: "Fish deleted successfully"
     *                 data:
     *                   $ref: '#/components/schemas/FishResponse'
     *       401:
     *         description: Unauthorized - Token missing or invalid
     *       403:
     *         description: Forbidden - User doesn't have permission to delete this fish
     *       404:
     *         description: Fish not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Fish not found"
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Failed to delete fish"
     */
    router.delete('/deleteFishById/:id', 
        (req, res, next) => authorizeRole([UserRole.USER], req, res, next),
        fishController.deleteFishById
    );

    /**
     * @openapi
     * /api/fishes/myFishes:
     *   get:
     *     tags: [Fishes]
     *     summary: Get current user's fishes
     *     description: Retrieves all fish profiles owned by the authenticated user
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
     *         description: Unauthorized - Token missing or invalid
     */
    router.get("/myFishes", verifyToken, 
        (req, res, next) => authorizeRole([UserRole.USER], req, res, next), 
        fishController.getAllMyFishes
    );


    return router;
}
