import { Request, Response } from "express";
import {IVarietyService} from "../services/IVarietyService";
import {CreateVarietyInput} from "../schema/variety.schema";
import {GetUserInput} from "../schema/user.schema";
import {IVariety} from "../models/variety.model";

export class VarietyController {
    private varietyServices: IVarietyService;

    constructor(varietyServices: IVarietyService) {
        this.varietyServices = varietyServices;
    }

    createVariety = async (
        req: Request<{}, {}, CreateVarietyInput>,
        res: Response
    ) => {
        try {
            const variety = await this.varietyServices.createVariety(req.body);

            res.status(201).json(variety);
        } catch (error) {
            if (error instanceof Error) {
                res.status(409).send(error.message);
            } else {
                res.status(409).send("An unknown error occurred");
            }
        }
    }

    getVarietyById = async (
        req: Request<{id: string}>,
        res: Response
    )=> {
        try {
            const variety = await this.varietyServices.getVarietyById(req.params.id);

            if (!variety) {
                res.status(404).json({ message: "Variety not found" });
            } else {
                res.status(200).json(variety);
            }
        }catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            }else {
                res.status(500).send("An unknown error occurred");
            }
        }
    }

    getAllVarieties = async (req: Request, res: Response) => {
        try {
            const varieties = await this.varietyServices.getAllVarieties();
            if (varieties.length > 0) {
                res.status(200).json(varieties);
            }else {
                res.status(404).json({ message: "Varieties not found" });
            }
        }catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            }else {
                res.status(500).send("An unknown error occurred");
            }
        }
    }

    updateVarietyById = async (
        req: Request<{id: string, updateData: Partial<IVariety>}>,
        res: Response
    )=> {
        try {
            const updateVariety = await this.varietyServices.updateVarietyById(req.params.id, req.body);

            if (!updateVariety) {
                res.status(404).json({ message: "Variety not found" });
            } else {
                res.status(200).json({
                    message: "Variety updated successfully",
                    variety: updateVariety
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("An unknown error occurred");
            }
        }
    }

    deleteVarietyById = async (
        req: Request<{id: string}>,
        res: Response
    )=> {
        try {
            const deleteVariety = await this.varietyServices.deleteVarietyById(req.params.id);
            if (!deleteVariety) {
                res.status(404).json({ message: "Variety not found" });
            } else {
                res.status(200).json({
                    message: "Variety deleted successfully",
                    variety: deleteVariety
                })
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            }else {
                res.status(500).send("An unknown error occurred");
            }
        }
    }

}