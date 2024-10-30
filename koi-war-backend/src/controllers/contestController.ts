import { Request, Response } from "express";
import {IContestServices} from "../services/IContestServices";
import {CreateContestInput} from "../schema/contest.schema";
import { IContest } from "../models/contest.model";

export class ContestController {
    private contestServices: IContestServices;

    constructor(contestServices: IContestServices) {
        this.contestServices = contestServices;
    }

    createContest = async (
        req: Request<{}, {}, CreateContestInput["body"]>,
        res: Response
    ): Promise<void> => {
        try {
            const contest = await this.contestServices.createContest(req.body);
            res.status(201).json({
                success: true,
                message: "Contest created successfully",
                data: contest
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

    getAllContests = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const contests = await this.contestServices.getAllContests();
            res.status(200).json({
                success: true,
                data: contests
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch contests"
            });
        }
    }

    getContestById = async (
        req: Request<{id: string}>,
        res: Response
    ): Promise<void> => {
        try {
            const contest = await this.contestServices.getContestById(req.params.id);
            res.status(200).json({
                success: true,
                data: contest
            });
        } catch (error) {
            if (error instanceof Error && error.message === "Contest not found") {
                res.status(404).json({
                    success: false,
                    message: "Contest not found"
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Failed to fetch contest"
                });
            }
        }
    }

    updateContestById = async (
        req: Request<{id: string}, {}, Partial<IContest>>,
        res: Response
    ): Promise<void> => {
        try {
            const updatedContest = await this.contestServices.updateContestById(
                req.params.id,
                req.body
            );
            res.status(200).json({
                success: true,
                message: "Contest updated successfully",
                data: updatedContest
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Contest not found") {
                    res.status(404).json({
                        success: false,
                        message: "Contest not found"
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
                    message: "Failed to update contest"
                });
            }
        }
    }

    deleteContestById = async (
        req: Request<{id: string}>,
        res: Response
    ): Promise<void> => {
        try {
            const deletedContest = await this.contestServices.deleteContestById(req.params.id);
            res.status(200).json({
                success: true,
                message: "Contest deleted successfully",
                data: deletedContest
            });
        } catch (error) {
            if (error instanceof Error) {
                switch (error.message) {
                    case "Invalid contest ID format":
                        res.status(400).json({
                            success: false,
                            message: "Invalid contest ID format"
                        });
                        break;
                    case "Contest not found":
                        res.status(404).json({
                            success: false,
                            message: "Contest not found"
                        });
                        break;
                    case "Cannot delete contest with existing instances":
                        res.status(400).json({
                            success: false,
                            message: "Cannot delete contest with existing instances"
                        });
                        break;
                    default:
                        res.status(500).json({
                            success: false,
                            message: "Failed to delete contest"
                        });
                }
            } else {
                res.status(500).json({
                    success: false,
                    message: "Failed to delete contest"
                });
            }
        }
    }
}
