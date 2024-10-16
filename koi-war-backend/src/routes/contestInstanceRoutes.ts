import { ContestInstanceController } from "../controllers/contestInstanceController";
import { Router } from "express";
import { validate } from "../middleware/validateResource";
import { createContestInstanceSchema } from "../schema/contestInstance.schema";

export function contestInstanceRoutes(contestInstanceController: ContestInstanceController): Router {
    const router = Router();
    /**
     * @openapi
     * /api/contest-instances/createContestInstance:
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
     */


    router.post(
        "/createContestInstance",
        validate(createContestInstanceSchema),
        contestInstanceController.createContestInstance
    );

    return router;
}
