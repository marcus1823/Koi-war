import { Router } from "express";
import { PredictionController } from "../controllers/predictionController";

export function predictionRoutes(predictionController: PredictionController): Router {
	const router = Router();

	return router;
}