import {IContestSubCategoryService} from "../services/IContestSubCategoryService";
import {ContestSubCategoryInput} from "../schema/contestSubCategory.schema";
import {Request, Response} from "express";
export class ContestSubCategoryController {
    private contestSubCategoryService: IContestSubCategoryService;

    constructor(contestSubCategoryService: IContestSubCategoryService) {
        this.contestSubCategoryService = contestSubCategoryService;
    }

    createContestSubCategory = async (
        req: Request<{}, {}, ContestSubCategoryInput>,
        res: Response
    ) => {
        try {
            const contestSubCategory = await this.contestSubCategoryService.createContestSubCategory(req.body);
            res.status(201).json(contestSubCategory);
        } catch (error) {
            if (error instanceof Error) {
                res.status(409).send(error.message);
            }else  {
                res.status(409).send("An unknown error occurred");
            }
        }
    }
}