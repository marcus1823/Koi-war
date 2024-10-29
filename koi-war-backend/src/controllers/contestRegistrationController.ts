import {Request, Response} from "express";
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

    getContestRegistrationByFishId = async (req: Request, res: Response) => {
        try {
            const contestRegistration = await this.competitionManagementServices.getContestRegistrationByFishId(
                req.params.fishId
            );

            if (!contestRegistration) {
                res.status(404).json({message: "Contest registration not found"});
            } else {
                res.status(200).json(contestRegistration);
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("An unknown error occurred");
            }
        }
    }

}
