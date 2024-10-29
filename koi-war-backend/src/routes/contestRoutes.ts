import { ContestController } from "../controllers/contestController";
import { Router } from "express";
import { validate } from "../middleware/validateResource";
import { createContestSchema, updateContestSchema } from "../schema/contest.schema";

export function contestRoutes(contestController: ContestController): Router {
  const router = Router();

  /**
   * @openapi
   * /api/contest/createContest:
   *   post:
   *     tags:
   *       - Contests
   *     summary: Create a new contest
   *     description: Create a new contest with name and description
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateContestInput'
   *           example:
   *             name: "Summer Fishing Contest"
   *             description: "Annual summer fishing competition"
   *     responses:
   *       201:
   *         description: Contest created successfully
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
   *                   example: "Contest created successfully"
   *                 data:
   *                   $ref: '#/components/schemas/ContestResponse'
   *       400:
   *         description: Bad request - Invalid input data
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
   *                   example: "Name must be at least 2 characters long"
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
   *                   example: "Internal server error"
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
   *     description: Retrieve a list of all contests with their contest instances
   *     responses:
   *       200:
   *         description: List of contests retrieved successfully
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
   *                     $ref: '#/components/schemas/ContestResponse'
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
   *                   example: "Failed to fetch contests"
   */
  router.get("/getAllContests", contestController.getAllContests);

  /**
   * @openapi
   * /api/contest/getContestById/{id}:
   *   get:
   *     tags:
   *       - Contests
   *     summary: Get contest by ID
   *     description: Retrieve a specific contest by its ID with associated contest instances
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The contest ID
   *         example: "64f5b3d12c064589a3c8c459"
   *     responses:
   *       200:
   *         description: Contest retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/ContestResponse'
   *       404:
   *         description: Contest not found
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
   *                   example: "Contest not found"
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
   *                   example: "Failed to fetch contest"
   */
  router.get("/getContestById/:id", contestController.getContestById);

  /**
   * @openapi
   * /api/contest/updateContestById/{id}:
   *   put:
   *     tags:
   *       - Contests
   *     summary: Update contest by ID
   *     description: Update a specific contest's details by its ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The contest ID
   *         example: "64f5b3d12c064589a3c8c459"
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateContestInput'
   *           example:
   *             name: "Updated Contest Name"
   *             description: "Updated contest description"
   *     responses:
   *       200:
   *         description: Contest updated successfully
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
   *                   example: "Contest updated successfully"
   *                 data:
   *                   $ref: '#/components/schemas/ContestResponse'
   *       400:
   *         description: Bad request - Invalid input data
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
   *                   example: "Name must be at least 2 characters long"
   *       404:
   *         description: Contest not found
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
   *                   example: "Contest not found"
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
   *                   example: "Failed to update contest"
   */
  router.put(
    "/updateContestById/:id",
    validate(updateContestSchema),
    contestController.updateContestById
  );

  /**
   * @openapi
   * /api/contest/deleteContestById/{id}:
   *   delete:
   *     tags:
   *       - Contests
   *     summary: Delete contest by ID
   *     description: Delete a specific contest by its ID. Cannot delete if contest has existing instances
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The contest ID
   *         example: "64f5b3d12c064589a3c8c459"
   *     responses:
   *       200:
   *         description: Contest deleted successfully
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
   *                   example: "Contest deleted successfully"
   *                 data:
   *                   $ref: '#/components/schemas/ContestResponse'
   *       400:
   *         description: Cannot delete contest with existing instances
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
   *                   example: "Cannot delete contest with existing instances"
   *       404:
   *         description: Contest not found
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
   *                   example: "Contest not found"
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
   *                   example: "Failed to delete contest"
   */
  router.delete("/deleteContestById/:id", contestController.deleteContestById);

  return router;
}
