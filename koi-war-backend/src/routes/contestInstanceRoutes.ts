import { ContestInstanceController } from "../controllers/contestInstanceController";
import { Router } from "express";
import { validate } from "../middleware/validateResource";
import { createContestInstanceSchema } from "../schema/contestInstance.schema";

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
     *               $ref: '#/components/schemas/ContestInstanceResponse'
     *       '400':
     *         description: Validation error
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
     *         description: A list of contest instances
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ContestInstanceResponse'
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
     *     summary: Get a contest instance by ID
     *     description: Retrieve a specific contest instance by its ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the contest instance to retrieve
     *     responses:
     *       '200':
     *         description: The requested contest instance
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ContestInstanceResponse'
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
     *     summary: Update a contest instance by ID
     *     description: Update a specific contest instance's details by its ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the contest instance to update
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
     *               $ref: '#/components/schemas/ContestInstanceResponse'
     *       '400':
     *         description: Validation error
     *       '404':
     *         description: Contest instance not found
     *       '500':
     *         description: Internal server error
     */
    router.put(
        "/updateContestInstanceById/:id",
        contestInstanceController.updateContestInstanceById
    );

    router.put(
        "/disableContestInstanceById/:id",
        contestInstanceController.disableContestInstance
    );

    return router;
}