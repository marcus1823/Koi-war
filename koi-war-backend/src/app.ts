import express from "express";
import {connectDB} from "./config/db";
import {userRoutes} from "./routes/userRoutes";
import {UserController} from "./controllers/userController";
import {UserRepository} from "./repositories/impl/userRepository";
import {UserService} from "./services/impl/userServices";
import {FishController} from "./controllers/fishController";
import {FishServices} from "./services/impl/fishServices";
import {FishRepository} from "./repositories/impl/fishRepository";
import {fishRoutes} from "./routes/fishRoutes";
import {varietyRoutes} from "./routes/varietyRoutes";
import {VarietyServices} from "./services/impl/varietyServices";
import {VarietyRepository} from "./repositories/impl/varietyRepository";
import {VarietyController} from "./controllers/varietyController";
import {contestRoutes} from "./routes/contestRoutes";
import {ContestRepository} from "./repositories/impl/contestRepository";
import {ContestController} from "./controllers/contestController";
import {ContestService} from "./services/impl/contestServices";
import {contestInstanceRoutes} from "./routes/contestInstanceRoutes";
import {ContestInstanceServices} from "./services/impl/contestInstanceServices";
import {ContestInstanceRepository} from "./repositories/impl/contestInstanceRepository";
import {ContestInstanceController} from "./controllers/contestInstanceController";
import {contestSubCategoryRoutes} from "./routes/contestSubCategoryRoutes";
import {ContestSubCategoryServices} from "./services/impl/contestSubCategoryServices";
import {ContestSubCategoryRepository} from "./repositories/impl/contestSubCategoryRepository";
import {ContestSubCategoryController} from "./controllers/contestSubCategoryController";
import {ClassificationContestRuleController} from "./controllers/classificationContestRuleController";
import {ClassificationContestRuleService} from "./services/impl/classificationContestRuleServices";
import {ClassificationContestRuleRepository} from "./repositories/impl/classificationContestRuleRepository";
import {classificationContestRuleRoutes} from "./routes/classificationContestRuleRoutes";
import cors from "cors";
import {contestRegistrationRoutes} from "./routes/contestRegistrationRoutes";
import {ContestRegistrationController} from "./controllers/contestRegistrationController";
import {ContestRegistrationServices} from "./services/impl/contestRegistrationServices";
import {ContestRegistrationRepository} from "./repositories/impl/contestRegistrationRepository";
import {scoreRoutes} from "./routes/scoreRoutes";
import {ScoreController} from "./controllers/scoreController";
import {ScoreServices} from "./services/impl/scoreServices";
import {ScoreRepository} from "./repositories/impl/scoreRepository";
import {CompetitionManagementServices} from "./services/impl/competitionManagementServices";

const app = express();
connectDB().then(() => console.log("Connected to DB"));

app.use(cors());
app.use(express.json());

app.use(
    "/api/users",
    userRoutes(new UserController(new UserService(new UserRepository())))
);
app.use(
    "/api/variety",
    varietyRoutes(
        new VarietyController(new VarietyServices(new VarietyRepository()))
    )
);
app.use(
    "/api/fishes",
    fishRoutes(
        new FishController(
            new FishServices(
                new FishRepository(),
                new UserService(new UserRepository())
            )
        )
    )
);

app.use(
    "/api/contest",
    contestRoutes(
        new ContestController(new ContestService(new ContestRepository()))
    )
);

app.use(
    "/api/contestInstance",
    contestInstanceRoutes(
        new ContestInstanceController(
            new ContestInstanceServices(new ContestInstanceRepository())
        )
    )
);
app.use(
    "/api/contestSubCategory",
    contestSubCategoryRoutes(
        new ContestSubCategoryController(
            new ContestSubCategoryServices(new ContestSubCategoryRepository())
        )
    )
);

app.use(
    "/api/classificationRule",
    classificationContestRuleRoutes(
        new ClassificationContestRuleController(
            new ClassificationContestRuleService(
                new ClassificationContestRuleRepository()
            )
        )
    )
);

app.use(
    "/api/contestRegistration",
    contestRegistrationRoutes(
        new ContestRegistrationController(
            // new ContestRegistrationServices(
            //     new ContestRegistrationRepository(),
            //     new ContestInstanceServices(new ContestInstanceRepository()),
            //     new FishServices(
            //         new FishRepository(),
            //         new UserService(new UserRepository())
            //     ),
            //     new ContestSubCategoryServices(new ContestSubCategoryRepository()),
            //     new ClassificationContestRuleService(
            //         new ClassificationContestRuleRepository()
            //     ),
            //     new ScoreServices(new ScoreRepository(), new ContestRegistrationRepository()
            //     )
            // )
            new CompetitionManagementServices(
                new ScoreServices(new ScoreRepository()),
                new ContestRegistrationServices(
                    new ContestRegistrationRepository(),
                    new ContestInstanceServices(new ContestInstanceRepository()),
                    new FishServices(
                        new FishRepository(),
                        new UserService(new UserRepository())
                    ),
                    new ContestSubCategoryServices(new ContestSubCategoryRepository()),
                    new ClassificationContestRuleService(
                        new ClassificationContestRuleRepository()
                    )
                )
            )
        )
    )
);

app.use(
    "/api/score",
    scoreRoutes(
        new ScoreController(
            new CompetitionManagementServices(
                new ScoreServices(new ScoreRepository()),
                new ContestRegistrationServices(
                    new ContestRegistrationRepository(),
                    new ContestInstanceServices(new ContestInstanceRepository()),
                    new FishServices(
                        new FishRepository(),
                        new UserService(new UserRepository())
                    ),
                    new ContestSubCategoryServices(new ContestSubCategoryRepository()),
                    new ClassificationContestRuleService(
                        new ClassificationContestRuleRepository()
                    )
                )
            )
        )
    )
);

module.exports = app;
