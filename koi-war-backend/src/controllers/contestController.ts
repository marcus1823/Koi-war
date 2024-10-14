import { Request, Response } from "express";
import {IContestServices} from "../services/IContestServices";
import {CreateContestInput} from "../schema/contest.schema";

export class ContestController {
    private contestServices: IContestServices;

    constructor(contestServices: IContestServices) {
        this.contestServices = contestServices;
    }

    createContest = async (
        req: Request<{}, {}, CreateContestInput>,
        res: Response,
    ) => {
        try {
            const contest = await this.contestServices.createContest(req.body);
            res.status(201).json(contest);
        } catch (error) {
            if (error instanceof Error) {
                res.status(409).send(error.message);
            }else {
                res.status(409).send("An unknown error occurred");
            }
        }
    }
}

