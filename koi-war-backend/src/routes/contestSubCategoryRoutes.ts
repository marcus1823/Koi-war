import { ContestSubCategoryController } from "../controllers/contestSubCategoryController";
import { Router } from "express";
import { validate } from "../middleware/validateResource";
import { createContestSubCategorySchema, updateContestSubCategorySchema } from "../schema/contestSubCategory.schema";

/**
 * @openapi
 * tags:
 *   name: Contest Sub Categories
 *   description: APIs for managing contest sub-categories
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateContestSubCategoryInput:
 *       type: object
 *       required:
 *         - name
 *         - contestInstance
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 150
 *           example: "Cá Koi 20-30cm"
 *           description: Name of the sub-category
 *         description:
 *           type: string
 *           minLength: 8
 *           maxLength: 1000
 *           example: "Hạng mục dành cho cá Koi có kích thước từ 20-30cm"
 *         contestInstance:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"
 *           example: "6721e27443d22c42e4c1d989"
 *           description: ID of the parent contest instance
 */

export function contestSubCategoryRoutes(contestSubCategoryController: ContestSubCategoryController): Router {
    const router = Router();

    /**
     * @openapi
     * /api/contestSubCategory/createContestSubCategory:
     *   post:
     *     tags: [Contest Sub Categories]
     *     summary: Create a new contest sub-category
     *     description: Creates a new sub-category within a contest instance
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateContestSubCategoryInput'
     *     responses:
     *       201:
     *         description: Contest sub-category created successfully
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
     *                   example: "Contest subcategory created successfully"
     *                 data:
     *                   $ref: '#/components/schemas/ContestSubCategoryResponse'
     *       400:
     *         description: Invalid input data
     *       404:
     *         description: Contest instance not found
     *       409:
     *         description: Sub-category with this name already exists
     */
    router.post(
        "/createContestSubCategory",
        validate(createContestSubCategorySchema),
        contestSubCategoryController.createContestSubCategory
    );

    /**
     * @openapi
     * /api/contestSubCategory/getAllContestSubCategory:
     *   get:
     *     tags: [Contest Sub Categories]
     *     summary: Get all contest sub-categories
     *     description: Retrieves a list of all contest sub-categories with their associated contest instances
     *     responses:
     *       200:
     *         description: List of all contest sub-categories
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
     *                     $ref: '#/components/schemas/ContestSubCategoryResponse'
     *       500:
     *         description: Internal server error
     */
    router.get(
        "/getAllContestSubCategory",
        contestSubCategoryController.getAllContestSubCategory
    );

    /**
     * @openapi
     * /api/contestSubCategory/getContestSubCategoryById/{id}:
     *   get:
     *     tags: [Contest Sub Categories]
     *     summary: Get contest sub-category by ID
     *     description: Retrieves detailed information about a specific contest sub-category
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "6721f38553d22c42e4c1d990"
     *         description: The ID of the contest sub-category
     *     responses:
     *       200:
     *         description: Contest sub-category details retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   $ref: '#/components/schemas/ContestSubCategoryResponse'
     *       404:
     *         description: Contest sub-category not found
     */
    router.get(
        "/getContestSubCategoryById/:id",
        contestSubCategoryController.getContestSubCategoryById
    );

    /**
     * @openapi
     * /api/contestSubCategory/updateContestSubCategoryById/{id}:
     *   put:
     *     tags: [Contest Sub Categories]
     *     summary: Update contest sub-category
     *     description: Updates an existing contest sub-category's information
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "6721f38553d22c42e4c1d990"
     *         description: The ID of the contest sub-category to update
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Cá Koi 20-30cm - Cập nhật"
     *               description:
     *                 type: string
     *                 example: "Mô tả cập nhật cho hạng mục"
     *               contestInstance:
     *                 type: string
     *                 example: "6721e27443d22c42e4c1d989"
     *     responses:
     *       200:
     *         description: Contest sub-category updated successfully
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
     *                   example: "Contest subcategory updated successfully"
     *                 data:
     *                   $ref: '#/components/schemas/ContestSubCategoryResponse'
     *       400:
     *         description: Invalid input data
     *       404:
     *         description: Contest sub-category or contest instance not found
     *       409:
     *         description: Sub-category with this name already exists in this contest instance
     */
    router.put(
        "/updateContestSubCategoryById/:id",
        validate(updateContestSubCategorySchema),
        contestSubCategoryController.updateContestSubCategoryById
    );

    return router;
}