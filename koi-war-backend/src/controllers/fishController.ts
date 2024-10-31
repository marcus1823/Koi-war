import {Request, Response} from "express";
import {IFishService} from "../services/IFishService";
import {CreateFishInput, UpdateFishInput} from "../schema/fish.schema";
import {IFish} from "../models/fish.model";

export class FishController {
    private fishService: IFishService;

    constructor(fishService: IFishService) {
        this.fishService = fishService;
    }

    createFish = async (
        req: Request<{}, {}, CreateFishInput["body"]>,
        res: Response
    ) => {
        try {
            const fish = await this.fishService.createFish(req.body);
            res.status(201).json({
                success: true,
                message: "Fish created successfully",
                data: fish
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
                    message: "Failed to create fish"
                });
            }
        }
    }

    getFishById = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        try {
            const fish = await this.fishService.getFishById(req.params.id);
            res.status(200).json({
                success: true,
                data: fish
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Fish not found") {
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
                    message: "Failed to fetch fish"
                });
            }
        }
    }

    getAllFishes = async (req: Request, res: Response) => {
        try {
            const fishes = await this.fishService.getAllFishes();
            res.status(200).json({
                success: true,
                data: fishes
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch fishes"
            });
        }
    }

    getFishByUserId = async (
        req: Request<{ userId: string }>,
        res: Response
    ) => {
        try {
            const fishes = await this.fishService.getFishByUserId(req.params.userId);
            res.status(200).json({
                success: true,
                data: fishes
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
                    message: "Failed to fetch user's fishes"
                });
            }
        }
    }

    getFishByVarietyId = async (
        req: Request<{ varietyId: string }>,
        res: Response
    ) => {
        try {
            const fishes = await this.fishService.getFishByVarietyId(req.params.varietyId);
            res.status(200).json({
                success: true,
                data: fishes
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
                    message: "Failed to fetch fishes by variety"
                });
            }
        }
    }

    getFishByVarietyName = async (
        req: Request<{ varietyName: string }>,
        res: Response
    ) => {
        try {
            const fishes = await this.fishService.getFishByVarietyName(req.params.varietyName);
            res.status(200).json({
                success: true,
                data: fishes
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
                    message: "Failed to fetch fishes by variety name"
                });
            }
        }
    }

    updateFishById = async (
        req: Request<{ id: string }, {}, UpdateFishInput["body"]>,
        res: Response
    ) => {
        try {
            const updatedFish = await this.fishService.updateFishById(
                req.params.id,
                req.body as Partial<IFish>
            );
            res.status(200).json({
                success: true,
                message: "Fish updated successfully",
                data: updatedFish
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Fish not found") {
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
                    message: "Failed to update fish"
                });
            }
        }
    }

    deleteFishById = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        try {
            await this.fishService.deleteFishById(req.params.id);
            res.status(200).json({
                success: true,
                message: "Fish deleted successfully"
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Fish not found") {
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
                    message: "Failed to delete fish"
                });
            }
        }
    }

    getAllMyFishes = async (req: Request, res: Response) => {
        try {
            const fishes = await this.fishService.getFishByUserId(req.body.user.id);
            res.status(200).json({
                success: true,
                data: fishes
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
                    message: "Failed to fetch your fishes"
                });
            }
        }
    }

}