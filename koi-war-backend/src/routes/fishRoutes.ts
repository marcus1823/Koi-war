import  {Router} from "express";
import {FishController} from "../controllers/fishController";
import {validate} from "../middleware/validateResource";
import {createFishSchema} from "../schema/fish.schema";


export function fishRoutes(fishController: FishController): Router {
    const router = Router();

    router.post(
        "/createFish",
        validate(createFishSchema),
        fishController.createFish
    );
    router.get("/getAllFishes", fishController.getAllFishes);
    router.get("/getFishByUserId/:userId", fishController.getFishByUserId);
    router.get("/getFishByVarietyId/:varietyId", fishController.getFishByVarietyId);
    router.get("/getFishByVarietyName/:varietyName", fishController.getFishByVarietyName);
    router.get("/:id", fishController.getFishById);

    router.put("/updateFishById/:id", fishController.updateFishById);
    router.delete("/deleteFishById/:id", fishController.deleteFishById);


    return router;
}


