import {ContestSubCategoryController} from "../controllers/contestSubCategoryController";
import {Router} from "express";

export function contestSubCategoryRoutes(contestSubCategoryController: ContestSubCategoryController): Router {
    const router = Router();

    router.post("/createContestSubCategory", contestSubCategoryController.createContestSubCategory);


    return router;
}