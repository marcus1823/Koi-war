import { Router } from "express";
import { ContestRegistrationController } from "../controllers/contestRegistrationController";

export function contestRegistrationRoutes(
  contestRegistrationController: ContestRegistrationController
): Router {
  const router = Router();

  router.post(
    "/register?contestInstanceId={contestInstanceId}&contestSubCategoryId={contestSubCategoryId}&fishProfileId={fishProfileId}",
    contestRegistrationController.registerContest
  );

  return router;
}
