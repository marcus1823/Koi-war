import { ContestController } from "../controllers/contestController";
import { Router } from "express";
import { validate } from "../middleware/validateResource";
import { createContestSchema } from "../schema/contest.schema";

export function contestRoutes(contestController: ContestController): Router {
  const router = Router();

  /**
   * @openapi
   * /api/contest/createContest:
   *   post:
   *     tags:
   *       - Contests
   *     summary: Create a new contest
   *     description: Create a new contest with a name and description
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateContestInput'
   *     responses:
   *       '201':
   *         description: Contest created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ContestResponse'
   *       '400':
   *         description: Validation error
   *       '500':
   *         description: Internal server error
   */
  router.post(
    "/createContest",
    validate(createContestSchema),
    contestController.createContest
  );

  /**
   * @openapi
   * /api/contest/getAllContests:
   *   get:
   *     tags:
   *       - Contests
   *     summary: Get all contests
   *     description: Retrieve all contests from the database
   *     responses:
   *       '200':
   *         description: A list of contests
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/ContestResponse'
   *       '500':
   *         description: Internal server error
   */
  router.get("/getAllContests", contestController.getAllContests);

  /**
   * @openapi
   * /api/contest/getContestById/{id}:
   *   get:
   *     tags:
   *       - Contests
   *     summary: Get a contest by ID
   *     description: Retrieve a specific contest by its ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the contest to retrieve
   *     responses:
   *       '200':
   *         description: The requested contest
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ContestResponse'
   *       '404':
   *         description: Contest not found
   *       '500':
   *         description: Internal server error
   */
  router.get("/getContestById/:id", contestController.getContestById);

  return router;
}