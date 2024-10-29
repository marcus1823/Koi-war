import {Request, Response} from "express";
import {ICompetitionManagementServices} from "../services/ICompetitionManagementServices";

export class ScoreController {
    private competitionManagementServices: ICompetitionManagementServices;

    constructor(competitionManagementServices: ICompetitionManagementServices) {
        this.competitionManagementServices = competitionManagementServices;
    }

    createScore = async (req: Request, res: Response) => {
        try {
            const userId = req.body.user.id;
            const score = await this.competitionManagementServices.scoreRegistration({
                ...req.body,
                referee: userId,
            });
            res.status(201).json(score);
        } catch (error) {
            if (error instanceof Error) {
                res.status(409).send(error.message);
            } else {
                res.status(409).send("An unknown error occurred");
            }
        }
    };
}
