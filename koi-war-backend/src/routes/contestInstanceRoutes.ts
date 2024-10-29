import { ContestInstanceController } from "../controllers/contestInstanceController";
import { Router } from "express";
import { validate } from "../middleware/validateResource";
import { createContestInstanceSchema, updateContestInstanceSchema } from "../schema/contestInstance.schema";

export function contestInstanceRoutes(contestInstanceController: ContestInstanceController): Router {
    const router = Router();

    /**
     * @openapi
     * /api/contestInstance/createContestInstance:
     *   post:
     *     tags:
     *       - Contest Instances
     *     summary: Create a new contest instance
     *     description: Create a new instance of a contest with start and end dates, rules, and other details
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateContestInstanceInput'
     *     responses:
     *       '201':
     *         description: Contest instance created successfully
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
     *                   example: Contest instance created successfully
     *                 data:
     *                   $ref: '#/components/schemas/ContestInstanceResponse'
     *       '400':
     *         description: Bad request - Invalid input data
     *       '500':
     *         description: Internal server error
     */
    router.post(
        "/createContestInstance",
        validate(createContestInstanceSchema),
        contestInstanceController.createContestInstance
    );
    
    /**
     * @openapi
     * /api/contestInstance/getAllContestInstances:
     *   get:
     *     tags:
     *       - Contest Instances
     *     summary: Get all contest instances
     *     description: Retrieve a list of all contest instances
     *     responses:
     *       '200':
     *         description: List of contest instances retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/ContestInstanceResponse'
     *       '500':
     *         description: Internal server error
     */
    router.get(
        "/getAllContestInstances",
        contestInstanceController.getAllContestInstances
    );

    /**
     * @openapi
     * /api/contestInstance/getContestInstanceById/{id}:
     *   get:
     *     tags:
     *       - Contest Instances
     *     summary: Get contest instance by ID
     *     description: Retrieve a specific contest instance by its ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Contest instance ID
     *     responses:
     *       '200':
     *         description: Contest instance retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   $ref: '#/components/schemas/ContestInstanceResponse'
     *       '404':
     *         description: Contest instance not found
     *       '500':
     *         description: Internal server error
     */
    router.get(
        "/getContestInstanceById/:id",
        contestInstanceController.getContestInstanceById
    );

    /**
     * @openapi
     * /api/contestInstance/updateContestInstanceById/{id}:
     *   put:
     *     tags:
     *       - Contest Instances
     *     summary: Update contest instance by ID
     *     description: Update a specific contest instance's details
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Contest instance ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateContestInstanceInput'
     *     responses:
     *       '200':
     *         description: Contest instance updated successfully
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
     *                   example: Contest instance updated successfully
     *                 data:
     *                   $ref: '#/components/schemas/ContestInstanceResponse'
     *       '400':
     *         description: Bad request - Invalid input data
     *       '404':
     *         description: Contest instance not found
     *       '500':
     *         description: Internal server error
     */
    router.put(
        "/updateContestInstanceById/:id",
        validate(updateContestInstanceSchema),
        contestInstanceController.updateContestInstanceById
    );

    /**
     * @openapi
     * /api/contestInstance/disableContestInstanceById/{id}:
     *   put:
     *     tags:
     *       - Contest Instances
     *     summary: Disable contest instance
     *     description: Disable a specific contest instance if it hasn't started yet
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Contest instance ID
     *     responses:
     *       '200':
     *         description: Contest instance disabled successfully
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
     *                   example: Contest instance disabled successfully
     *                 data:
     *                   $ref: '#/components/schemas/ContestInstanceResponse'
     *       '400':
     *         description: Contest has already started or is ongoing
     *       '404':
     *         description: Contest instance not found
     *       '500':
     *         description: Internal server error
     */
    router.put(
        "/disableContestInstanceById/:id",
        contestInstanceController.disableContestInstance
    );

    return router;
}
