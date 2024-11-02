import {Router} from "express";
import {ClassificationContestRuleController} from "../controllers/classificationContestRuleController";
import {validate} from "../middleware/validateResource";
import {
    createClassificationContestRuleSchema,
    updateClassificationContestRuleSchema
} from "../schema/classificationContestRule.schema";
import {authorizeRole} from "../middleware/authorizeMiddleware";
import {UserRole} from "../models/user.model";

/**
 * @openapi
 * tags:
 *   name: Classification Contest Rules
 *   description: APIs for managing classification rules in contests
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Range:
 *       type: object
 *       required:
 *         - min
 *         - max
 *       properties:
 *         min:
 *           type: number
 *           description: Minimum value of the range
 *           example: 20
 *         max:
 *           type: number
 *           description: Maximum value of the range
 *           example: 30
 *
 *     CreateClassificationContestRuleInput:
 *       type: object
 *       required:
 *         - name
 *         - contestSubCategory
 *         - varieties
 *         - weightRange
 *         - sizeRange
 *         - ageRange
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 150
 *           description: Name of the classification rule
 *           example: "Quy tắc phân loại cá Koi 20-30cm"
 *         description:
 *           type: string
 *           description: Detailed description of the classification rule
 *           example: "Quy tắc phân loại cho cá Koi có kích thước từ 20-30cm"
 *         contestSubCategory:
 *           type: string
 *           description: ID of the contest sub-category
 *           pattern: "^[0-9a-fA-F]{24}$"
 *           example: "6721f38553d22c42e4c1d990"
 *         varieties:
 *           type: array
 *           description: List of variety IDs applicable to this rule
 *           items:
 *             type: string
 *             pattern: "^[0-9a-fA-F]{24}$"
 *           example: ["6721f38553d22c42e4c1d991", "6721f38553d22c42e4c1d992"]
 *         weightRange:
 *           $ref: '#/components/schemas/Range'
 *         sizeRange:
 *           $ref: '#/components/schemas/Range'
 *         ageRange:
 *           $ref: '#/components/schemas/Range'
 *
 *     ClassificationContestRuleResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "6721f38553d22c42e4c1d993"
 *         name:
 *           type: string
 *           example: "Quy tắc phân loại cá Koi 20-30cm"
 *         description:
 *           type: string
 *           example: "Quy tắc phân loại cho cá Koi có kích thước từ 20-30cm"
 *         contestSubCategory:
 *           $ref: '#/components/schemas/ContestSubCategoryResponse'
 *         varieties:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/VarietyResponse'
 *         weightRange:
 *           $ref: '#/components/schemas/Range'
 *         sizeRange:
 *           $ref: '#/components/schemas/Range'
 *         ageRange:
 *           $ref: '#/components/schemas/Range'
 */

export function classificationContestRuleRoutes(
    classificationContestRuleController: ClassificationContestRuleController
): Router {
    const router = Router();

    /**
     * @openapi
     * /api/classificationContestRule/create:
     *   post:
     *     tags: [Classification Contest Rules]
     *     summary: Create a new classification rule
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateClassificationContestRuleInput'
     *     responses:
     *       201:
     *         description: Classification rule created successfully
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
     *                   example: "Classification contest rule created successfully"
     *                 data:
     *                   $ref: '#/components/schemas/ClassificationContestRuleResponse'
     *       404:
     *         description: Contest subcategory or variety not found
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
     *                   example: "Contest subcategory not found"
     */
    router.post(
        "/create",
        validate(createClassificationContestRuleSchema),
        classificationContestRuleController.createClassificationContestRule
    );

    /**
     * @openapi
     * /api/classificationContestRule/getAll:
     *   get:
     *     tags: [Classification Contest Rules]
     *     summary: Get all classification rules
     *     responses:
     *       200:
     *         description: List of all classification rules
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
     *                     $ref: '#/components/schemas/ClassificationContestRuleResponse'
     */
    router.get(
        "/getAll",
        classificationContestRuleController.getAllClassificationContestRules
    );

    /**
     * @openapi
     * /api/classificationContestRule/bySubCategory/{contestSubCategoryId}:
     *   get:
     *     tags: [Classification Contest Rules]
     *     summary: Get classification rule by contest sub-category ID
     *     parameters:
     *       - name: contestSubCategoryId
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "6721f38553d22c42e4c1d990"
     *     responses:
     *       200:
     *         description: Classification rule found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ClassificationContestRuleResponse'
     *       404:
     *         description: Classification rule not found
     */
    router.get(
        "/bySubCategory/:contestSubCategoryId",
        classificationContestRuleController.getClassificationContestRuleByContestSubCategoryId
    );

    /**
     * @openapi
     * /api/classificationContestRule/update/{id}:
     *   put:
     *     tags: [Classification Contest Rules]
     *     summary: Update an existing classification rule
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "6721f38553d22c42e4c1d991"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateClassificationContestRuleInput'
     *     responses:
     *       200:
     *         description: Classification rule updated successfully
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
     *                   example: "Classification contest rule updated successfully"
     *                 data:
     *                   $ref: '#/components/schemas/ClassificationContestRuleResponse'
     *       404:
     *         description: Classification rule not found
     */
    router.put(
        "/update/:id",
        validate(updateClassificationContestRuleSchema),
        classificationContestRuleController.updateClassificationContestRuleById
    );

    /**
     * @openapi
     * /api/classificationRule/createClassification:
     *   post:
     *     tags: [Classification Contest Rules]
     *     summary: Create a new classification rule
     *     description: Creates a new classification rule for a contest sub-category with specified criteria
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateClassificationContestRuleInput'
     *           example:
     *             name: "Quy tắc phân loại cá Koi 20-30cm"
     *             description: "Quy tắc phân loại cho cá Koi có kích thước từ 20-30cm"
     *             contestSubCategory: "6721f38553d22c42e4c1d990"
     *             varieties: ["6721f38553d22c42e4c1d991"]
     *             weightRange: { min: 0.5, max: 2.0 }
     *             sizeRange: { min: 20, max: 30 }
     *             ageRange: { min: 1, max: 3 }
     *     responses:
     *       201:
     *         description: Classification rule created successfully
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
     *                   example: "Classification rule created successfully"
     *                 data:
     *                   $ref: '#/components/schemas/ClassificationContestRuleResponse'
     *       400:
     *         description: Invalid input data
     *       404:
     *         description: Contest sub-category or variety not found
     *       409:
     *         description: Rule already exists for this sub-category
     */
    router.post(
        "/createClassification",
        (req, res, next) =>
            authorizeRole([UserRole.ADMIN], req, res, next),
        validate(createClassificationContestRuleSchema),
        classificationContestRuleController.createClassificationContestRule
    );

    /**
     * @openapi
     * /api/classificationRule/getAllClassification:
     *   get:
     *     tags: [Classification Contest Rules]
     *     summary: Get all classification rules
     *     description: Retrieves a list of all classification rules with their associated sub-categories and varieties
     *     responses:
     *       200:
     *         description: List of all classification rules
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
     *                     $ref: '#/components/schemas/ClassificationContestRuleResponse'
     */
    router.get(
        "/getAllClassification",
        classificationContestRuleController.getAllClassificationContestRules
    );

    /**
     * @openapi
     * /api/classificationRule/getClassificationById/{id}:
     *   get:
     *     tags: [Classification Contest Rules]
     *     summary: Get classification rule by ID
     *     description: Retrieves detailed information about a specific classification rule
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "6721f38553d22c42e4c1d993"
     *         description: The classification rule ID
     *     responses:
     *       200:
     *         description: Classification rule found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   $ref: '#/components/schemas/ClassificationContestRuleResponse'
     *       404:
     *         description: Classification rule not found
     */
    router.get(
        "/getClassificationById/:id",
        classificationContestRuleController.getClassificationContestRuleById
    );

    /**
     * @openapi
     * /api/classificationRule/getClassificationByContestSubCategoryId/{contestSubCategoryId}:
     *   get:
     *     tags:
     *       - Classification Contest Rules
     *     summary: Get a classification contest rule by contest subcategory ID
     *     description: Retrieve a specific classification contest rule by its contest subcategory ID
     *     parameters:
     *       - in: path
     *         name: contestSubCategoryId
     *         required: true
     *         schema:
     *           type: string
     *         description: The contest subcategory ID of the classification contest rule to retrieve
     *     responses:
     *       '200':
     *         description: The requested classification contest rule
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ClassificationContestRuleResponse'
     *       '404':
     *         description: Classification contest rule not found
     *       '500':
     *         description: Internal server error
     */
    router.get(
        "/getClassificationByContestSubCategoryId/:contestSubCategoryId",
        classificationContestRuleController.getClassificationContestRuleByContestSubCategoryId
    );

    /**
     * @openapi
     * /api/classificationRule/updateClassificationById/{id}:
     *   put:
     *     tags:
     *       - Classification Contest Rules
     *     summary: Update a classification contest rule by ID
     *     description: Update a specific classification contest rule's details by its ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the classification contest rule to update
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateClassificationContestRuleInput'
     *     responses:
     *       '200':
     *         description: Classification contest rule updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ClassificationContestRuleResponse'
     *       '400':
     *         description: Validation error
     *       '404':
     *         description: Classification contest rule not found
     *       '500':
     *         description: Internal server error
     */
    router.put(
        "/updateClassificationById/:id",
        (req, res, next) =>
            authorizeRole([UserRole.ADMIN], req, res, next),
        validate(updateClassificationContestRuleSchema),
        classificationContestRuleController.updateClassificationContestRuleById
    );

    return router;
}
