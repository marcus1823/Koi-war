import {ContestController} from "../controllers/contestController";
import {Router} from "express";
import {validate} from "../middleware/validateResource";
import {createContestSchema, updateContestSchema} from "../schema/contest.schema";
import {authorizeRole} from "../middleware/authorizeMiddleware";
import {UserRole} from "../models/user.model";

/**
 * @openapi
 * tags:
 *   name: Contests
 *   description: Contest management APIs
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateContestInput:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 150
 *           example: "Giải Đấu Cá Koi Miền Bắc 2024"
 *         description:
 *           type: string
 *           minLength: 8
 *           maxLength: 1000
 *           example: "Giải đấu cá Koi lớn nhất Miền Bắc năm 2024, quy tụ những con cá Koi đẹp nhất từ các nhà nuôi cá chuyên nghiệp"
 *
 *     UpdateContestInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 150
 *           example: "Giải Đấu Cá Koi Miền Bắc 2024 - Cập nhật"
 *         description:
 *           type: string
 *           minLength: 8
 *           maxLength: 1000
 *           example: "Mô tả cập nhật cho giải đấu cá Koi lớn nhất Miền Bắc năm 2024"
 *
 *     ContestResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "672100e85eaba638c1ff4e0b"
 *         name:
 *           type: string
 *           example: "Giải Đấu Cá Koi Miền Bắc 2024"
 *         description:
 *           type: string
 *           example: "Giải đấu cá Koi lớn nhất Miền Bắc năm 2024"
 *         contestInstances:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ContestInstanceResponse'
 *           example: []
 *
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/ContestResponse'
 *             - type: array
 *               items:
 *                 $ref: '#/components/schemas/ContestResponse'
 */

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
     *             name: "Giải Đấu Cá Koi Miền Bắc 2024"
     *             description: "Giải đấu cá Koi lớn nhất Miền Bắc năm 2024"
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
     *         description: Bad request
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
        (req, res, next) =>
            authorizeRole([UserRole.ADMIN], req, res, next),
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
     *             example:
     *               success: true
     *               data: [
     *                 {
     *                   id: "672100e85eaba638c1ff4e0b",
     *                   name: "Giải Đấu Cá Koi Miền Bắc 2024",
     *                   description: "Giải đấu cá Koi lớn nhất Miền Bắc năm 2024",
     *                   contestInstances: []
     *                 }
     *               ]
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
     *     tags: [Contests]
     *     summary: Get contest by ID
     *     description: Retrieve contest details by its ID
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "672100e85eaba638c1ff4e0b"
     *         description: The contest ID
     *     responses:
     *       200:
     *         description: Contest found successfully
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
     *                   example: "Contest found successfully"
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
     *                   example: "Internal server error"
     */
    router.get("/getContestById/:id", contestController.getContestById);

    /**
     * @openapi
     * /api/contest/updateContestById/{id}:
     *   get:
     *     tags:
     *       - Contests
     *     summary: Get contest by ID
     *     description: Retrieve a contest by its ID
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "672100e85eaba638c1ff4e0b"
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
     *
     *   put:
     *     tags:
     *       - Contests
     *     summary: Update contest by ID
     *     description: Update an existing contest's information
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "672100e85eaba638c1ff4e0b"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateContestInput'
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
     *
     *   delete:
     *     tags:
     *       - Contests
     *     summary: Delete contest by ID
     *     description: Delete a contest if it has no contest instances
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "672100e85eaba638c1ff4e0b"
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
     *         description: Bad request
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
     */
    router.put(
        "/updateContestById/:id",
        (req, res, next) =>
            authorizeRole([UserRole.ADMIN], req, res, next),
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
    router.delete(
        "/deleteContestById/:id",
        (req, res, next) =>
            authorizeRole([UserRole.ADMIN], req, res, next),
        contestController.deleteContestById
    );

    return router;
}
