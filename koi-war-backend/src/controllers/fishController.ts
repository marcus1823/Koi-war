import { Request, Response } from "express";
import {IFishService} from "../services/IFishService";
import {CreateFishInput} from "../schema/fish.schema";
import {GetUserInput} from "../schema/user.schema";
import {IFish} from "../models/fish.model";

export class FishController {
    private fishService: IFishService;

    constructor(fishService: IFishService) {
        this.fishService = fishService;
    }

    createFish = async (
        req: Request<{}, {}, CreateFishInput>,
        res: Response
    ) =>{
        try {
            console.log("Create Fish Request", req.body);
            const fish = await this.fishService.createFish(req.body);
            res.status(201).json(fish);
        } catch (error) {
            if (error instanceof Error) {
                res.status(409).json({ error: error.message });
            } else {
                res.status(409).json({ error: "An unknown error occurred" });
            }
        }
    }

    getFishById = async (req: Request<GetUserInput["params"]>, res: Response) => {
        try {
            const fish = await this.fishService.getFishById(req.params.id);
            if (fish) {
                res.status(200).json(fish);
            } else {
                res.status(404).json({ message: "Fish not found" });
            }
        }  catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unknown error occurred" });
            }
        }
    }

    getAllFishes = async (req: Request, res: Response) => {
        try {
            const fishes = await  this.fishService.getAllFishes();
            res.status(200).json(fishes);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unknown error occurred" });
            }
        }
    }

    getFishByUserId = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const fishes = await  this.fishService.getFishByUserId(userId);

            if (fishes.length > 0) {
                res.status(200).json(fishes);
            } else {
                res.status(404).json({ message: "Fish not found" });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unknown error occurred" });
            }
        }
    }

    getFishByVarietyId = async (
        req: Request<{ varietyId: string }>,
        res: Response
    )=> {
        try {
            const fishes = await this.fishService.getFishByVarietyId(req.params.varietyId);
            res.status(200).json(fishes);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unknown error occurred" });
            }
        }

    }

    getFishByVarietyName = async (
        req: Request<{ varietyName: string }>,
        res: Response
    ) => {
        try {
            const fishes = await this.fishService.getFishByVarietyName(req.params.varietyName);
            res.status(200).json(fishes);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unknown error occurred" });
            }
        }
    }

    deleteFishById = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        try {
            const deleteFish = await this.fishService.deleteFishById(req.params.id);

            if(!deleteFish) {
                res.status(404).json({ message: "Fish not found" });
            }
            res.status(200).json({
                message: "Fish deleted successfully",
                fish: deleteFish
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unknown error occurred" });
            }
        }
    }

    updateFishById = async (
        req: Request<{ id: string, updateData: Partial<IFish> }>,
        res: Response
    )=> {
        try {
            const updateFish = await this.fishService.updateFishById(req.params.id, req.body);

            if(!updateFish) {
                res.status(404).json({ message: "Fish not found" });
            } else {
                res.status(200).json({
                    message: "Fish updated successfully",
                    fish: updateFish
                })
            }
        }catch(error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unknown error occurred" });
            }
        }
    }

    getAllMyFishes = async (req: Request, res: Response) => {
        const requestUser = req.body.user;
        try {
            const fishes = await this.fishService.getFishByUserId(requestUser.id);
            res.status(200).json(fishes);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unknown error occurred" });
            }
        }
    }

}