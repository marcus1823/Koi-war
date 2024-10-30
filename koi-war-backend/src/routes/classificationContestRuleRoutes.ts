import { Router } from "express";
import { ClassificationContestRuleController } from "../controllers/classificationContestRuleController";
import { validate } from "../middleware/validateResource";
import { createClassificationContestRuleSchema, updateClassificationContestRuleSchema } from "../schema/classificationContestRule.schema";

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
 *     CreateClassificationContestRuleInput:
 *       type: object
 *       required:
 *         - name
 *         - description
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
 *           example: "Quy tắc phân loại cá Koi 20-30cm"
 *         description:
 *           type: string
 *           minLength: 8
 *           maxLength: 1000
 *           example: "Quy tắc phân loại cho cá Koi có kích thước từ 20-30cm"
 *         contestSubCategory:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"
 *           example: "6721f38553d22c42e4c1d990"
 *         varieties:
 *           type: array
 *           items:
 *             type: string
 *             pattern: "^[0-9a-fA-F]{24}$"
 *           example: ["65f2a1b3c4d5e6f7a8b9c0e1", "65f2a1b3c4d5e6f7a8b9c0e2"]
 *         weightRange:
 *           type: object
 *           required:
 *             - min
 *             - max
 *           properties:
 *             min:
 *               type: number
 *               minimum: 0
 *               example: 0.5
 *             max:
 *               type: number
 *               minimum: 0
 *               example: 2
 *         sizeRange:
 *           type: object
 *           required:
 *             - min
 *             - max
 *           properties:
 *             min:
 *               type: number
 *               minimum: 0
 *               example: 20
 *             max:
 *               type: number
 *               minimum: 0
 *               example: 30
 *         ageRange:
 *           type: object
 *           required:
 *             - min
 *             - max
 *           properties:
 *             min:
 *               type: number
 *               minimum: 0
 *               example: 12
 *             max:
 *               type: number
 *               minimum: 0
 *               example: 24
 */

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

  return router;
}
