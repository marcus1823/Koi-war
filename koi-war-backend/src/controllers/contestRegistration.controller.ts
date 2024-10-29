import {Request, Response} from "express";
import {IContestRegistrationServices} from "../services/IContestRegistrationServices";

export class ContestRegistrationController {
    private contestRegistrationService: IContestRegistrationServices;

    constructor(contestRegistrationService: IContestRegistrationServices) {
        this.contestRegistrationService = contestRegistrationService;
    }

    createContestRegistration = async (req: Request, res: Response) => {
        try {
            const contestRegistration =
                await this.contestRegistrationService.createContestRegistration(
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
            const contestRegistration = await this.contestRegistrationService.getContestRegistrationByFishId(
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
