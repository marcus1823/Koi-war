import {VarietyController} from "../controllers/varietyController";
import {Router} from "express";
import {validate} from "../middleware/validateResource";
import {createVarietySchema} from "../schema/variety.schema";


export function varietyRoutes(varietyController: VarietyController): Router {
    const router = Router();

    router.post(
        "/createVariety",
        validate(createVarietySchema),
        varietyController.createVariety
    );

    router.get("/getVarietyById/:id", varietyController.getVarietyById);
    router.get("/getAllVarieties", varietyController.getAllVarieties);

    router.put("/updateVarietyById/:id", varietyController.updateVarietyById)
    router.delete("/deleteVarietyById/:id", varietyController.deleteVarietyById);
    return router;
}