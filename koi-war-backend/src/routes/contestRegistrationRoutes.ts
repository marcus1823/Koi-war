import {Router} from "express";
import {ContestRegistrationController} from "../controllers/contestRegistrationController";
import {validate} from "../middleware/validateResource";
import {CreateContestRegistrationInput, UpdateRegistrationStatusInput} from "../schema/contestRegistration.schema";
import {authorizeRole} from "../middleware/authorizeMiddleware";
import {UserRole} from "../models/user.model";

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
        (req, res, next) =>
            authorizeRole([UserRole.USER], req, res, next),
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

    /**
     * @openapi
     * /api/contestRegistration/updateStatus/{id}:
     *   patch:
     *     tags:
     *       - Contest Registration
     *     summary: Update registration status
     *     description: Update the status of a contest registration (pending/approved/checked/rejected)
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The registration ID
     *         example: "6721f38553d22c42e4c1d991"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - status
     *             properties:
     *               status:
     *                 type: string
     *                 enum: [pending, approved, checked, rejected]
     *                 description: New status for the registration
     *                 example: "approved"
     *     responses:
     *       200:
     *         description: Registration status updated successfully
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
     *                   example: "Registration status updated successfully"
     *                 data:
     *                   $ref: '#/components/schemas/ContestRegistrationResponse'
     *       400:
     *         description: Invalid status or business rule violation
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
     *                   example: "Registration already rejected, cannot update status"
     *       404:
     *         description: Registration not found
     *       500:
     *         description: Internal server error
     */
    router.patch(
        "/updateStatus/:id",
        (req, res, next) =>
            authorizeRole([UserRole.STAFF], req, res, next),
        validate(UpdateRegistrationStatusInput),
        contestRegistrationController.updateContestRegistrationStatus
    );

    /**
     * @openapi
     * /api/contestRegistration/getAll:
     *   get:
     *     tags:
     *       - Contest Registration
     *     summary: Get all contest registrations
     *     description: Retrieve a list of all contest registrations
     *     responses:
     *       '200':
     *         description: List of contest registrations retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ContestRegistrationResponse'
     *       '500':
     *         description: Internal server error
     */
    router.get("/getAll", contestRegistrationController.getAllContestRegistrations);

    return router;
}
