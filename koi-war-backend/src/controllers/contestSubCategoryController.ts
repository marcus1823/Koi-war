import {IContestSubCategoryService} from "../services/IContestSubCategoryService";
import {ContestSubCategoryInput} from "../schema/contestSubCategory.schema";
import {Request, Response} from "express";
import { IContestSubCategory } from "../models/contestSubCategory.model";
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

    getAllContestSubCategory = async (
        req: Request,
        res: Response,
        ) => {
        try {
            const contestSubCategory = await this.contestSubCategoryService.getAllContestSubCategory();
            res.status(200).json(contestSubCategory);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(5000).send("An unknown error occurred");
            }
        }
    }

    getContestSubCategoryById = async ( 
        req: Request<{id: string}>,
        res: Response,
    ) => {
        try {
            const contestSubCategory = await this.contestSubCategoryService.getContestSubCategoryById(req.params.id);
            res.status(200).json(contestSubCategory);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("An unknown error occurred");
            }
        }   
    }

    updateContestSubCategoryById = async (  
        req: Request<{id: string}, {}, Partial<IContestSubCategory>>,
        res: Response,
    ) => {
        try {
            const updateContestSubCategory = await this.contestSubCategoryService.updateContestSubCategoryById(req.params.id, req.body);
            res.status(200).json(updateContestSubCategory);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("An unknown error occurred");
            }
        }   
    }
}