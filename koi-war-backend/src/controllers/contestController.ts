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

    getAllContests = async (
        req: Request,
        res: Response,
    ) => {
        try {
            const contests = await this.contestServices.getAllContests();
            res.status(200).json(contests);
        } catch (error) {
            if (error instanceof Error) {
                res.status(409).send(error.message);
            }else {
                res.status(409).send("An unknown error occurred");
            }
        }
    }

    getContestById = async (
        req: Request<{id: string}>,
        res: Response,
    ) => {
        try {
            const contest = await this.contestServices.getContestById(req.params.id);
            
            if (!contest) {
                res.status(404).json({message: "Contest not found"});
            } else {
                res.status(200).json(contest);
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

