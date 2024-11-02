import {NextFunction, Request, Response} from "express";
import {ICompetitionManagementServices} from "../services/ICompetitionManagementServices";

export class ContestRegistrationController {
    private competitionManagementServices: ICompetitionManagementServices;

    constructor(competitionManagementServices: ICompetitionManagementServices) {
        this.competitionManagementServices = competitionManagementServices;
    }

    createContestRegistration = async (req: Request, res: Response) => {
        try {
            const contestRegistration =
                await this.competitionManagementServices.createContestRegistration(
                    req.body
                );
            res.status(201).json(contestRegistration);
        } catch (error) {
            if (error instanceof Error) {
                res.status(409).send(error.message);
            } else {
                res.status(409).send("An unknown error occurred");
            }
        }
    };

    getContestRegistrationById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const contestRegistration = await this.competitionManagementServices.getContestRegistrationById(req.params.id);
            res.status(200).json(contestRegistration);
        } catch (error) {
            next(error);
        }
    }

    getContestRegistrationByFishId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const contestRegistration = await this.competitionManagementServices.getContestRegistrationByFishId(
                req.params.fishId
            );

            res.status(200).json(contestRegistration);
        } catch (error) {
            next(error);
        }
    }

    rankingContest = async (req: Request, res: Response) => {
        try {
            const ranking = await this.competitionManagementServices.rankingContestRegistration(
                req.params.contestSubCategoryId
            );
            res.status(200).json(ranking);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("An unknown error occurred");
            }
        }
    }

    updateContestRegistrationStatus = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const {status} = req.body;
            const updatedRegistration = await this.competitionManagementServices.updateContestRegistrationStatus(id, status);
            res.status(200).json({
                success: true,
                message: "Registration status updated successfully",
                data: updatedRegistration
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
                    message: "An unknown error occurred"
                });
            }
        }
    }

    getAllContestRegistrations = async (req: Request, res: Response) => {
        try {
            const registrations = await this.competitionManagementServices.getAllContestRegistrations();
            res.status(200).json(registrations);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("An unknown error occurred");
            }
        }
    }

}
