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
     */
    router.post(
        "/createContestSubCategory",
        validate(createContestSubCategorySchema),
        contestSubCategoryController.createContestSubCategory
    );

    return router;
}
