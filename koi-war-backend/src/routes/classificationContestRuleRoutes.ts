import {Router} from "express";
import {ClassificationContestRuleController} from "../controllers/classificationContestRuleController";

export function classificationContestRuleRoutes(classificationContestRuleController: ClassificationContestRuleController): Router {
    const router = Router();

    router.post("/createClassification", classificationContestRuleController.createClassificationContestRule );


    return router;
}