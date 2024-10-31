import {Request, Response} from "express";
import {IVarietyService} from "../services/IVarietyService";
import {CreateVarietyInput, UpdateVarietyInput} from "../schema/variety.schema";
import {IVariety} from "../models/variety.model";

export class VarietyController {
    private varietyServices: IVarietyService;

    constructor(varietyServices: IVarietyService) {
        this.varietyServices = varietyServices;
    }

    createVariety = async (
        req: Request<{}, {}, CreateVarietyInput["body"]>,
        res: Response
    ) => {
        try {
            const variety = await this.varietyServices.createVariety(req.body);
            res.status(201).json({
                success: true,
                message: "Variety created successfully",
                data: variety
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({
                    success: false,
                    message: error.message
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Failed to create variety"
                });
            }
        }
    }

    getVarietyById = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        try {
            const variety = await this.varietyServices.getVarietyById(req.params.id);
            res.status(200).json({
                success: true,
                data: variety
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Variety not found") {
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
                    message: "Failed to fetch variety"
                });
            }
        }
    }

    getAllVarieties = async (req: Request, res: Response) => {
        try {
            const varieties = await this.varietyServices.getAllVarieties();
            res.status(200).json({
                success: true,
                data: varieties
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch varieties"
            });
        }
    }

    updateVarietyById = async (
        req: Request<{ id: string }, {}, UpdateVarietyInput["body"]>,
        res: Response
    ) => {
        try {
            const updatedVariety = await this.varietyServices.updateVarietyById(
                req.params.id,
                req.body as Partial<IVariety>
            );
            res.status(200).json({
                success: true,
                message: "Variety updated successfully",
                data: updatedVariety
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Variety not found") {
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
                    message: "Failed to update variety"
                });
            }
        }
    }

    deleteVarietyById = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        try {
            await this.varietyServices.deleteVarietyById(req.params.id);
            res.status(200).json({
                success: true,
                message: "Variety deleted successfully"
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Variety not found") {
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
                    message: "Failed to delete variety"
                });
            }
        }
    }
}