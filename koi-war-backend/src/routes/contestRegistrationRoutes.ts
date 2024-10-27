import { Router } from "express";
import { ContestRegistrationController } from "../controllers/contestRegistration.controller";

export function contestRegistrationRoutes(
  contestRegistrationController: ContestRegistrationController
): Router {
  const router = Router();

  /**
   * @openapi
   * /api/contestRegistration/registerContest:
   *   post:
   *     tags:
   *       - Contest Registration
   *     summary: Register for a contest
   *     description: Register for a contest with a specific contest instance
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateContestRegistrationInput'
   *     responses:
   *       '201':
   *         description: Contest registration created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ContestRegistrationResponse'
   *       '400':
   *         description: Validation error
   *       '500':
   *         description: Internal server error
   */
  router.post(
    "/registerContest",
    contestRegistrationController.createContestRegistration
  );
  return router;
}
