import { ContestInstanceController } from "../controllers/contestInstanceController";
import { Router } from "express";
import { validate } from "../middleware/validateResource";
import { createContestInstanceSchema, updateContestInstanceSchema } from "../schema/contestInstance.schema";
import { authorizeRole } from "../middleware/authorizeMiddleware";
import { UserRole } from "../models/user.model";

/**
 * @openapi
 * tags:
 *   name: Contest Instances
 *   description: Contest instance management APIs
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateContestInstanceInput:
 *       type: object
 *       required:
 *         - name
 *         - contest
 *         - startDate
 *         - endDate
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 150
 *           example: "Mùa Đông 2024"
 *         contest:
 *           type: string
 *           description: ID of the parent contest
 *           example: "672100e85eaba638c1ff4e0b"
 *         startDate:
 *           type: string
 *           format: date
 *           example: "02-11-2024"
 *         endDate:
 *           type: string
 *           format: date
 *           example: "07-12-2024"
 *         description:
 *           type: string
 *           example: "Giải đấu mùa Đông, tổ chức tại TP.HCM"
 *         rules:
 *           type: string
 *           example: "Di chuyển vào HCM để tham gia"
 *         images:
 *           type: string
 *           example: "https://example.com/image.jpg"
 *         isActive:
 *           type: boolean
 *           default: false
 *         isDisabled:
 *           type: boolean
 *           default: false
 *
 *     ContestInstanceResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "6721e27443d22c42e4c1d989"
 *         contest:
 *           $ref: '#/components/schemas/ContestResponse'
 *         name:
 *           type: string
 *           example: "Mùa Đông 2024"
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: "2024-11-02T00:00:00.000Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: "2024-12-07T00:00:00.000Z"
 *         isActive:
 *           type: boolean
 *           example: false
 *         description:
 *           type: string
 *           example: "Giải đấu mùa Đông, tổ chức tại TP.HCM"
 *         rules:
 *           type: string
 *           example: "Di chuyển vào HCM để tham gia"
 *         images:
 *           type: string
 *           example: "https://example.com/image.jpg"
 *         isDisabled:
 *           type: boolean
 *           example: false
 *         contestSubCategories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ContestSubCategoryResponse'
 */

export function contestInstanceRoutes(contestInstanceController: ContestInstanceController): Router {
    const router = Router();

    /**
     * @openapi
     * /api/contestInstance/createContestInstance:
     *   post:
     *     tags:
     *       - Contest Instances
     *     summary: Create a new contest instance
     *     description: Create a new instance of an existing contest with specific dates and details
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateContestInstanceInput'
     *     responses:
     *       201:
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
     *                   example: "Contest instance created successfully"
     *                 data:
     *                   $ref: '#/components/schemas/ContestInstanceResponse'
     *       400:
     *         description: Invalid input
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
     *                   example: "Invalid date format. Use dd-MM-yyyy"
     */
    router.post(
        "/createContestInstance",
        (req, res, next) =>
            authorizeRole([UserRole.ADMIN], req, res, next),
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
     *     description: Retrieve a list of all contest instances with their details
     *     responses:
     *       200:
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
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "6721e27443d22c42e4c1d989"
     *     responses:
     *       200:
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
     *       404:
     *         description: Contest instance not found
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
     *     summary: Update contest instance
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               startDate:
     *                 type: string
     *               endDate:
     *                 type: string
     *               description:
     *                 type: string
     *               rules:
     *                 type: string
     *               images:
     *                 type: string
     *               isActive:
     *                 type: boolean
     *           example:
     *             name: "Mùa Đông 2024 - Cập nhật"
     *             description: "Mô tả cập nhật cho giải đấu mùa đông"
     *     responses:
     *       200:
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
     *                   example: "Contest instance updated successfully"
     *                 data:
     *                   $ref: '#/components/schemas/ContestInstanceResponse'
     */
    router.put(
        "/updateContestInstanceById/:id",
        (req, res, next) =>
            authorizeRole([UserRole.ADMIN], req, res, next),
        validate(updateContestInstanceSchema),
        contestInstanceController.updateContestInstanceById
    );

    /**
     * @openapi
     * /api/contestInstance/disableContestInstanceById/{id}:
     *   put:
     *     tags:
     *       - Contest Instances
     *     summary: Disable a contest instance
     *     description: Disable a contest instance if it hasn't started yet
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "6721e27443d22c42e4c1d989"
     *     responses:
     *       200:
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
     *                   example: "Contest instance disabled successfully"
     *                 data:
     *                   $ref: '#/components/schemas/ContestInstanceResponse'
     *       400:
     *         description: Cannot disable contest instance
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
     *                   example: "Contest has already started or is ongoing, cannot disable"
     */
    router.put(
        "/disableContestInstanceById/:id",
        (req, res, next) =>
            authorizeRole([UserRole.ADMIN], req, res, next),
        contestInstanceController.disableContestInstance
    );

    /**
     * @openapi
     * /api/contestInstance/deleteContestInstanceById/{id}:
     *   delete:
     *     tags:
     *       - Contest Instances
     *     summary: Delete a contest instance
     *     description: Delete a contest instance by ID
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Contest instance deleted successfully
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
     *                   example: "Contest instance deleted successfully"
     *                 data:
     *                   $ref: '#/components/schemas/ContestInstanceResponse'
     *       404:   
     *         description: Contest instance not found
     */              
    router.delete(
        "/deleteContestInstanceById/:id",
        (req, res, next) =>
            authorizeRole([UserRole.ADMIN], req, res, next),
        contestInstanceController.deleteContestInstanceById
    );

    return router;
}
