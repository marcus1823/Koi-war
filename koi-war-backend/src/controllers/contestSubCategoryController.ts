import {IContestSubCategoryService} from "../services/IContestSubCategoryService";
import {ContestSubCategoryInput, UpdateContestSubCategoryInput} from "../schema/contestSubCategory.schema";
import {Request, Response} from "express";

export class ContestSubCategoryController {
    private contestSubCategoryService: IContestSubCategoryService;

    constructor(contestSubCategoryService: IContestSubCategoryService) {
        this.contestSubCategoryService = contestSubCategoryService;
    }

    createContestSubCategory = async (
        req: Request<{}, {}, ContestSubCategoryInput["body"]>,
        res: Response
    ) => {
        try {
            const contestSubCategory = await this.contestSubCategoryService.createContestSubCategory(req.body);
            res.status(201).json({
                success: true,
                message: "Contest subcategory created successfully",
                data: contestSubCategory
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Contest instance not found") {
                    res.status(404).json({
                        success: false,
                        message: error.message
                    });
                } else if (error.message.includes("already exists")) {
                    res.status(409).json({
                        success: false,
                        message: error.message
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: error.message
                    });
                }
            } else {
                res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }
        }
    }

    getAllContestSubCategory = async (
        req: Request,
        res: Response,
    ) => {
        try {
            const contestSubCategories = await this.contestSubCategoryService.getAllContestSubCategory();
            res.status(200).json({
                success: true,
                data: contestSubCategories
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch contest subcategories"
            });
        }
    }

    getContestSubCategoryById = async (
        req: Request<{ id: string }>,
        res: Response,
    ) => {
        try {
            const contestSubCategory = await this.contestSubCategoryService.getContestSubCategoryById(req.params.id);
            res.status(200).json({
                success: true,
                data: contestSubCategory
            });
        } catch (error) {
            if (error instanceof Error && error.message === "Contest sub category not found") {
                res.status(404).json({
                    success: false,
                    message: "Contest subcategory not found"
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Failed to fetch contest subcategory"
                });
            }
        }
    }

    updateContestSubCategoryById = async (
        req: Request<{ id: string }, {}, UpdateContestSubCategoryInput["body"]>,
        res: Response,
    ) => {
        try {
            const updatedSubCategory = await this.contestSubCategoryService.updateContestSubCategoryById(
                req.params.id,
                req.body
            );
            res.status(200).json({
                success: true,
                message: "Contest subcategory updated successfully",
                data: updatedSubCategory
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Contest sub category not found") {
                    res.status(404).json({
                        success: false,
                        message: "Contest subcategory not found"
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: error.message
                    });
                }
            } else {
                res.status(500).json({
                    success: false,
                    message: "Failed to update contest subcategory"
                });
            }
        }
    }
}
