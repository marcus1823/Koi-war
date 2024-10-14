import {ContestInstanceController} from "../controllers/contestInstanceController";
import {Router} from "express";

export function contestInstanceRoutes(contestInstanceController: ContestInstanceController): Router {
    const router = Router();

    router.post("/createContestInstance", contestInstanceController.createContestInstance);


    return router;
}