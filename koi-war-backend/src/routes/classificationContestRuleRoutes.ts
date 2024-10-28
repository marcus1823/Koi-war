import {Router} from "express";
import {ClassificationContestRuleController} from "../controllers/classificationContestRuleController";
import {validate} from "../middleware/validateResource";
import {createClassificationContestRuleSchema} from "../schema/classificationContestRule.schema";

export function classificationContestRuleRoutes(classificationContestRuleController: ClassificationContestRuleController): Router {
    const router = Router();

    /**
     * @openapi
     * /api/classificationRule/createClassification:
     *   post:
     *     tags:
     *       - Classification Contest Rules
     *     summary: Create a new classification contest rule
     *     description: Create a new classification contest rule for a specific contest subcategory
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateClassificationContestRuleInput'
     *     responses:
     *       '201':
     *         description: Classification contest rule created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ClassificationContestRuleResponse'
     *       '400':
     *         description: Validation error
     *       '500':
     *         description: Internal server error
     */
    router.post(
        "/createClassification",
        validate(createClassificationContestRuleSchema),
        classificationContestRuleController.createClassificationContestRule
    );

    /**
     * @openapi
     * /api/classificationRule/getAllClassification:
     *   get:
     *     tags:
     *       - Classification Contest Rules
     *     summary: Get all classification contest rules
     *     description: Retrieve a list of all classification contest rules
     *     responses:
     *       '200':
     *         description: A list of classification contest rules
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ClassificationContestRuleResponse'
     *       '500':
     *         description: Internal server error
     */
    router.get(
        "/getAllClassification",
        classificationContestRuleController.getAllClassificationContestRules
    );

    /**
     * @openapi
     * /api/classificationRule/getClassificationById/{id}:
     *   get:
     *     tags:
     *       - Classification Contest Rules
     *     summary: Get a classification contest rule by ID
     *     description: Retrieve a specific classification contest rule by its ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the classification contest rule to retrieve
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
        "/getClassificationById/:id",
        classificationContestRuleController.getClassificationContestRuleById
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
        classificationContestRuleController.updateClassificationContestRuleById
    );

    return router;
}