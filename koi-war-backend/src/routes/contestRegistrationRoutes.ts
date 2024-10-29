import {Router} from "express";
import {ContestRegistrationController} from "../controllers/contestRegistrationController";
import {validate} from "../middleware/validateResource";
import {CreateContestRegistrationInput} from "../schema/contestRegistration.schema";

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
        validate(CreateContestRegistrationInput),
        contestRegistrationController.createContestRegistration
    );

    /**
     * @openapi
     * /api/contestRegistration/getByFishId/{fishId}:
     *   get:
     *     tags:
     *       - Contest Registration
     *     summary: Get contest registration by fish id
     *     description: Get contest registration by fish id
     *     parameters:
     *       - in: path
     *         name: fishId
     *         required: true
     *         schema:
     *           type: string
     *         description: Fish id
     *     responses:
     *       '200':
     *         description: Contest registration retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ContestRegistrationResponse'
     *       '404':
     *         description: Contest registration not found
     *       '500':
     *         description: Internal server error
     */
    router.get("/getByFishId/:fishId", contestRegistrationController.getContestRegistrationByFishId);

    /**
     * @openapi
     * /api/contestRegistration/ranking/{contestSubCategoryId}:
     *   get:
     *     tags:
     *       - Contest Registration
     *     summary: Get contest registration ranking
     *     description: Get contest registration ranking by contest sub category id
     *     parameters:
     *       - in: path
     *         name: contestSubCategoryId
     *         required: true
     *         schema:
     *           type: string
     *         description: Contest sub category id
     *     responses:
     *       '200':
     *         description: Contest registration ranking retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ContestRegistrationResponse'
     *       '500':
     *         description: Internal server error
     */
    router.get("/ranking/:contestSubCategoryId", contestRegistrationController.rankingContest);

    return router;
}
