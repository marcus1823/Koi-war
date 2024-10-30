import {Router} from "express";
import {ScoreController} from "../controllers/scoreController";
import {validate} from "../middleware/validateResource";
import {CreateScoreInput} from "../schema/score.schema";
import {authorizeRole} from "../middleware/authorizeMiddleware";
import {UserRole} from "../models/user.model";

export function scoreRoutes(scoreController: ScoreController): Router {
    const router = Router();

    /**
     * @openapi
     * /api/score/create:
     *  post:
     *    tags:
     *      - Scores
     *    description: Create a new score
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/schemas/CreateScoreInput'
     *    responses:
     *      '201':
     *        description: Score created successfully
     *        content:
     *          application/json:
     *           schema:
     *            $ref: '#/schemas/CreateScoreResponse'
     */
    router.post(
        "/create",
        (req, res, next) =>
            authorizeRole([UserRole.ADMIN, UserRole.REFEREE], req, res, next),
        validate(CreateScoreInput),
        scoreController.createScore
    );

    return router;
}
