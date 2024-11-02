import {VarietyController} from "../controllers/varietyController";
import {Router} from "express";
import {validate} from "../middleware/validateResource";
import {createVarietySchema, updateVarietySchema} from "../schema/variety.schema";
import {authorizeRole} from "../middleware/authorizeMiddleware";
import {UserRole} from "../models/user.model";

export function varietyRoutes(varietyController: VarietyController): Router {
    const router = Router();

    /**
     * @openapi
     * /api/variety/createVariety:
     *   post:
     *     tags:
     *       - Varieties
     *     summary: Create a new variety
     *     description: Create a new variety with name, images, and description
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateVarietyInput'
     *     responses:
     *       '201':
     *         description: Variety created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/VarietyResponse'
     *       '400':
     *         description: Validation error
     */
    router.post(
        "/createVariety",
        (req, res, next) =>
            authorizeRole([UserRole.ADMIN, UserRole.USER], req, res, next),
        validate(createVarietySchema),
        varietyController.createVariety
    );

    /**
     * @openapi
     * /api/variety/getVarietyById/{id}:
     *   get:
     *     tags:
     *       - Varieties
     *     summary: Get variety by ID
     *     description: Retrieve a single variety by its ID
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successfully retrieved variety
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/VarietyResponse'
     *       '404':
     *         description: Variety not found
     */
    router.get("/getVarietyById/:id", varietyController.getVarietyById);

    /**
     * @openapi
     * /api/variety/getAllVarieties:
     *   get:
     *     tags:
     *       - Varieties
     *     summary: Get all varieties
     *     description: Retrieve a list of all varieties
     *     responses:
     *       '200':
     *         description: Successfully retrieved list of varieties
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/VarietyResponse'
     */
    router.get("/getAllVarieties", varietyController.getAllVarieties);

    /**
     * @openapi
     * /api/variety/updateVarietyById/{id}:
     *   put:
     *     tags:
     *       - Varieties
     *     summary: Update variety by ID
     *     description: Update an existing variety by its ID
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
     *             $ref: '#/components/schemas/CreateVarietyInput'
     *     responses:
     *       '200':
     *         description: Variety updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/VarietyResponse'
     *       '404':
     *         description: Variety not found
     */
    router.put(
        "/updateVarietyById/:id",
        (req, res, next) =>
            authorizeRole([UserRole.ADMIN], req, res, next),
        validate(updateVarietySchema),
        varietyController.updateVarietyById
    );

    /**
     * @openapi
     * /api/variety/deleteVarietyById/{id}:
     *   delete:
     *     tags:
     *       - Varieties
     *     summary: Delete variety by ID
     *     description: Delete an existing variety by its ID
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Variety deleted successfully
     *       '404':
     *         description: Variety not found
     */
    router.delete(
        "/deleteVarietyById/:id",
        (req, res, next) =>
            authorizeRole([UserRole.ADMIN], req, res, next),
        varietyController.deleteVarietyById
    );

    return router;
}
