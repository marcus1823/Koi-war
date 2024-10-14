import {ContestController} from "../controllers/contestController";
import {Router} from "express";
import {validate} from "../middleware/validateResource";
import {createContestSchema} from "../schema/contest.schema";


export function contestRoutes(contestController: ContestController ): Router {
    const router = Router();

    router.post(
        "/createContest",
        validate(createContestSchema),
        contestController.createContest
    )

    return router;
}