import express from "express";
import {connectDB} from "./config/db";
import {userRoutes} from "./routes/userRoutes";
import {UserController} from "./controllers/userController";
import {FishController} from "./controllers/fishController";
import {fishRoutes} from "./routes/fishRoutes";
import {varietyRoutes} from "./routes/varietyRoutes";
import {VarietyController} from "./controllers/varietyController";
import {contestRoutes} from "./routes/contestRoutes";
import {ContestController} from "./controllers/contestController";
import {contestInstanceRoutes} from "./routes/contestInstanceRoutes";
import {ContestInstanceController} from "./controllers/contestInstanceController";
import {contestSubCategoryRoutes} from "./routes/contestSubCategoryRoutes";
import {ContestSubCategoryController} from "./controllers/contestSubCategoryController";
import {ClassificationContestRuleController} from "./controllers/classificationContestRuleController";
import {classificationContestRuleRoutes} from "./routes/classificationContestRuleRoutes";
import cors from "cors";
import {contestRegistrationRoutes} from "./routes/contestRegistrationRoutes";
import {ContestRegistrationController} from "./controllers/contestRegistrationController";
import {scoreRoutes} from "./routes/scoreRoutes";
import {ScoreController} from "./controllers/scoreController";
import {CompetitionManagementServices} from "./services/impl/competitionManagementServices";
import cron from "node-cron";
import {AppContext} from "./context/appContext";
import {setupDependencies} from "./context/setupDependencies";

const app = express();
connectDB().then(() => console.log("Connected to DB"));

app.use(cors());
app.use(express.json());

// Registering the dependencies
setupDependencies();

cron.schedule("0 0 * * *", async () => {
    const competitionManagementServices =
        AppContext.get<CompetitionManagementServices>("CompetitionManagementServices");

    try {
        await competitionManagementServices.updateRankingEndedContestInstances();
        console.log("Ranking updated successfully");
    } catch (error) {
        console.error("Error updating ranking:", error);
    }
});

const userController = AppContext.get<UserController>("UserController");
app.use(
    "/api/users",
    userRoutes(userController)
);

const varietyController = AppContext.get<VarietyController>("VarietyController");
app.use(
    "/api/variety",
    varietyRoutes(varietyController)
);

const fishController = AppContext.get<FishController>("FishController");
app.use(
    "/api/fishes",
    fishRoutes(
        fishController
    )
);

const contestController = AppContext.get<ContestController>("ContestController");
app.use(
    "/api/contest",
    contestRoutes(
        contestController
    )
);

const contestInstanceController = AppContext.get<ContestInstanceController>("ContestInstanceController");
app.use(
    "/api/contestInstance",
    contestInstanceRoutes(
        contestInstanceController
    )
);

const contestSubCategoryController = AppContext.get<ContestSubCategoryController>("ContestSubCategoryController");
app.use(
    "/api/contestSubCategory",
    contestSubCategoryRoutes(
        contestSubCategoryController
    )
);

const classificationContestRuleController = AppContext.get<ClassificationContestRuleController>("ClassificationContestRuleController");
app.use(
    "/api/classificationRule",
    classificationContestRuleRoutes(
        classificationContestRuleController
    )
);

const contestRegistrationController = AppContext.get<ContestRegistrationController>("ContestRegistrationController");
app.use(
    "/api/contestRegistration",
    contestRegistrationRoutes(
        contestRegistrationController
    )
);

const scoreController = AppContext.get<ScoreController>("ScoreController");
app.use(
    "/api/score",
    scoreRoutes(
        scoreController
    )
);

module.exports = app;
