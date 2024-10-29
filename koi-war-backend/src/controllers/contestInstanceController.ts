import {IContestInstanceServices} from "../services/IContestInstanceServices";
import { Request, Response } from "express";
import { CreateContestInstanceInput} from "../schema/contestInstance.schema";
import { IContestInstance } from "../models/contestInstance.model";

export class ContestInstanceController {
    private contestInstanceService: IContestInstanceServices;

    constructor(contestInstanceService: IContestInstanceServices) {
        this.contestInstanceService = contestInstanceService;
    }

    createContestInstance = async (
        req: Request<{}, {}, CreateContestInstanceInput["body"]>,
        res: Response
    ): Promise<void> => {
        try {
            const contestInstance = await this.contestInstanceService.createContestInstance(req.body);
            res.status(201).json({
                success: true,
                message: "Contest instance created successfully",
                data: contestInstance
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
                    message: "Internal server error"
                });
            }
        }
    }

    getAllContestInstances = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const contestInstances = await this.contestInstanceService.getAllContestInstances();
            res.status(200).json({
                success: true,
                data: contestInstances
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    success: false,
                    message: error.message
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Failed to fetch contest instances"
                });
            }
        }
    }

    getContestInstanceById = async (
        req: Request<{id: string}>,
        res: Response
    ): Promise<void> => {
        try {
            const contestInstance = await this.contestInstanceService.getContestInstanceById(req.params.id);
            res.status(200).json({
                success: true,
                data: contestInstance
            });
        } catch (error) {
            if (error instanceof Error && error.message === "Contest instance not found") {
                res.status(404).json({
                    success: false,
                    message: "Contest instance not found"
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Failed to fetch contest instance"
                });
            }
        }
    }

    updateContestInstanceById = async (
        req: Request<{id: string}, {}, Partial<IContestInstance>>,
        res: Response
    ): Promise<void> => {
        try {
            const updatedInstance = await this.contestInstanceService.updateContestInstanceById(
                req.params.id,
                req.body
            );
            res.status(200).json({
                success: true,
                message: "Contest instance updated successfully",
                data: updatedInstance
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Contest instance not found") {
                    res.status(404).json({
                        success: false,
                        message: "Contest instance not found"
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
                    message: "Failed to update contest instance"
                });
            }
        }
    }

    disableContestInstance = async (
        req: Request<{id: string}>,
        res: Response
    ): Promise<void> => {
        try {
            const disabledInstance = await this.contestInstanceService.disableContestInstanceById(req.params.id);
            res.status(200).json({
                success: true,
                message: "Contest instance disabled successfully",
                data: disabledInstance
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Contest instance not found") {
                    res.status(404).json({
                        success: false,
                        message: "Contest instance not found"
                    });
                } else if (error.message === "Contest has already started or is ongoing, cannot disable") {
                    res.status(400).json({
                        success: false,
                        message: error.message
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        message: "Failed to disable contest instance"
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
}
