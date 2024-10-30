import {IClassificationContestRuleServices} from "../services/IClassificationContestRuleServices";
import {Request, Response} from "express";
import {ClassificationContestRuleInput} from "../schema/classificationContestRule.schema";

export class ClassificationContestRuleController {
    private classificationContestRuleService: IClassificationContestRuleServices;

    constructor(classificationContestRuleService: IClassificationContestRuleServices) {
        this.classificationContestRuleService = classificationContestRuleService;
    }

    createClassificationContestRule = async (
        req: Request<{}, {}, ClassificationContestRuleInput["body"]>,
        res: Response
    ) => {
        try {
            const rule = await this.classificationContestRuleService
                .createClassificationContestRule(req.body);
            res.status(201).json({
                success: true,
                message: "Classification contest rule created successfully",
                data: rule
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes("not found")) {
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
    };

    getAllClassificationContestRules = async (
        req: Request,
        res: Response
    ) => {
        try {
            const rules = await this.classificationContestRuleService.getAllClassificationContestRules();
            res.status(200).json({
                success: true,
                data: rules
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch classification contest rules"
            });
        }
    };

    getClassificationContestRuleById = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        try {
            const rule = await this.classificationContestRuleService
                .getClassificationContestRuleById(req.params.id);
            res.status(200).json({
                success: true,
                data: rule
            });
        } catch (error) {
            if (error instanceof Error && error.message.includes("not found")) {
                res.status(404).json({
                    success: false,
                    message: error.message
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Failed to fetch classification contest rule"
                });
            }
        }
    };

    getClassificationContestRuleByContestSubCategoryId = async (
        req: Request<{ contestSubCategoryId: string }>,
        res: Response
    ) => {
        try {
            const classificationContestRule =
                await this.classificationContestRuleService.getClassificationContestRuleByContestSubCategoryId(
                    req.params.contestSubCategoryId
                );
            res.status(200).json(classificationContestRule);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("An unknown error occurred");
            }
        }
    };

    updateClassificationContestRuleById = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        try {
            const updatedRule = await this.classificationContestRuleService
                .updateClassificationContestRuleById(req.params.id, req.body);
            res.status(200).json({
                success: true,
                message: "Classification contest rule updated successfully",
                data: updatedRule
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes("not found")) {
                    res.status(404).json({
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
                    message: "Failed to update classification contest rule"
                });
            }
        }
    };
}
