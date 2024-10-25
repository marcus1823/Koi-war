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
     */
    router.post(
        "/createClassification",
        validate(createClassificationContestRuleSchema),
        classificationContestRuleController.createClassificationContestRule
    );

    return router;
}
