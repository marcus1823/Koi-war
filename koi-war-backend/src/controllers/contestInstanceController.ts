import {IContestInstanceServices} from "../services/IContestInstanceServices";
import { Request, Response } from "express";
import {ContestInstanceInput} from "../schema/contestInstance.schema";

export class ContestInstanceController {
    private contestInstanceService: IContestInstanceServices;

    constructor(contestInstanceService: IContestInstanceServices) {
        this.contestInstanceService = contestInstanceService;
    }

    createContestInstance = async (
        req: Request<{}, {}, ContestInstanceInput>,
        res: Response,
    )=> {
        try {
            const contestInstance = await this.contestInstanceService.createContestInstance(req.body);
            res.status(201).json(contestInstance);
        } catch (error) {
            if (error instanceof Error) {
                res.status(409).send(error.message);
            } else {
                res.status(409).send("An unknown error occurred");
            }
        }
    }

    getAllContestInstances = async (
        req: Request,
        res: Response
    )=> {
        try {
            const contestInstances = await this.contestInstanceService.getAllContestInstances();
            res.status(200).json(contestInstances);
        }catch(error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("An unknown error occurred");
            }
        }
    }

    getContestInstanceById = async (
        req: Request<{id: string}>,
        res: Response,
    ) => {
        try {
            const contestInstance = await this.contestInstanceService.getContestInstanceById(req.params.id);
            if (!contestInstance) {
                res.status(404).json({message: "Contest instance not found"});
            } else {
                res.status(200).json(contestInstance);
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
