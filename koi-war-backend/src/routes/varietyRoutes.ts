import {VarietyController} from "../controllers/varietyController";
import {Router} from "express";
import {validate} from "../middleware/validateResource";
import {createVarietySchema} from "../schema/variety.schema";

export function varietyRoutes(varietyController: VarietyController): Router {
    const router = Router();

    /**
     * @openapi
     * /api/varieties/createVariety:
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
    router.post("/createVariety", validate(createVarietySchema), varietyController.createVariety);

    /**
     * @openapi
     * /api/varieties/getVarietyById/{id}:
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
     * /api/varieties/getAllVarieties:
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
     * /api/varieties/updateVarietyById/{id}:
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
    router.put("/updateVarietyById/:id", varietyController.updateVarietyById);

    /**
     * @openapi
     * /api/varieties/deleteVarietyById/{id}:
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
    router.delete("/deleteVarietyById/:id", varietyController.deleteVarietyById);

    return router;
}
