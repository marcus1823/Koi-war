import { ContestSubCategoryController } from "../controllers/contestSubCategoryController";
import { Router } from "express";
import { validate } from "../middleware/validateResource";
import { createContestSubCategorySchema } from "../schema/contestSubCategory.schema";

export function contestSubCategoryRoutes(contestSubCategoryController: ContestSubCategoryController): Router {
    const router = Router();

    /**
     * @openapi
     * /api/contestSubCategory/createContestSubCategory:
     *   post:
     *     tags:
     *       - Contest SubCategories
     *     summary: Create a new contest subcategory
     *     description: Create a new subcategory under a specific contest instance
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateContestSubCategoryInput'
     *     responses:
     *       '201':
     *         description: Contest subcategory created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ContestSubCategoryResponse'
     *       '400':
     *         description: Validation error
     *       '500':
     *         description: Internal server error
     */
    router.post(
        "/createContestSubCategory",
        validate(createContestSubCategorySchema),
        contestSubCategoryController.createContestSubCategory
    );

    /**
     * @openapi
     * /api/contestSubCategory/getAllContestSubCategories:
     *   get:
     *     tags:
     *       - Contest SubCategories
     *     summary: Get all contest subcategories
     *     description: Retrieve a list of all contest subcategories
     *     responses:
     *       '200':
     *         description: A list of contest subcategories
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ContestSubCategoryResponse'
     *       '500':
     *         description: Internal server error
     */
    router.get(
        "/getAllContestSubCategories",
        contestSubCategoryController.getAllContestSubCategory
    );

    /**
     * @openapi
     * /api/contestSubCategory/getContestSubCategoryById/{id}:
     *   get:
     *     tags:
     *       - Contest SubCategories
     *     summary: Get a contest subcategory by ID
     *     description: Retrieve a specific contest subcategory by its ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the contest subcategory to retrieve
     *     responses:
     *       '200':
     *         description: The requested contest subcategory
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ContestSubCategoryResponse'
     *       '404':
     *         description: Contest subcategory not found
     *       '500':
     *         description: Internal server error
     */
    router.get(
        "/getContestSubCategoryById/:id",
        contestSubCategoryController.getContestSubCategoryById
    );

    /**
     * @openapi
     * /api/contestSubCategory/updateContestSubCategoryById/{id}:
     *   put:
     *     tags:
     *       - Contest SubCategories
     *     summary: Update a contest subcategory by ID
     *     description: Update a specific contest subcategory's details by its ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the contest subcategory to update
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateContestSubCategoryInput'
     *     responses:
     *       '200':
     *         description: Contest subcategory updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ContestSubCategoryResponse'
     *       '400':
     *         description: Validation error
     *       '404':
     *         description: Contest subcategory not found
     *       '500':
     *         description: Internal server error
     */
    router.put(
        "/updateContestSubCategoryById/:id",
        contestSubCategoryController.updateContestSubCategoryById
    );

    return router;
}