import {UserRepository} from "../repositories/impl/userRepository";
import {AppContext} from "./appContext";
import {UserService} from "../services/impl/userServices";
import {UserController} from "../controllers/userController";
import {ContestRepository} from "../repositories/impl/contestRepository";
import {ContestService} from "../services/impl/contestServices";
import {ContestController} from "../controllers/contestController";
import {ContestInstanceRepository} from "../repositories/impl/contestInstanceRepository";
import {ContestInstanceServices} from "../services/impl/contestInstanceServices";
import {ContestInstanceController} from "../controllers/contestInstanceController";
import {ContestSubCategoryRepository} from "../repositories/impl/contestSubCategoryRepository";
import {ContestSubCategoryServices} from "../services/impl/contestSubCategoryServices";
import {ContestSubCategoryController} from "../controllers/contestSubCategoryController";
import {ContestRegistrationRepository} from "../repositories/impl/contestRegistrationRepository";
import {ContestRegistrationServices} from "../services/impl/contestRegistrationServices";
import {ContestRegistrationController} from "../controllers/contestRegistrationController";
import {ScoreRepository} from "../repositories/impl/scoreRepository";
import {ScoreServices} from "../services/impl/scoreServices";
import {ScoreController} from "../controllers/scoreController";
import {CompetitionManagementServices} from "../services/impl/competitionManagementServices";
import {ClassificationContestRuleRepository} from "../repositories/impl/classificationContestRuleRepository";
import {ClassificationContestRuleService} from "../services/impl/classificationContestRuleServices";
import {ClassificationContestRuleController} from "../controllers/classificationContestRuleController";
import {FishRepository} from "../repositories/impl/fishRepository";
import {FishServices} from "../services/impl/fishServices";
import {FishController} from "../controllers/fishController";
import {VarietyRepository} from "../repositories/impl/varietyRepository";
import {VarietyServices} from "../services/impl/varietyServices";
import {VarietyController} from "../controllers/varietyController";

export function setupDependencies(): void {

    // Registering the dependencies for repositories
    const userRepository = new UserRepository();
    AppContext.register('UserRepository', userRepository);

    const contestRepository = new ContestRepository();
    AppContext.register('ContestRepository', contestRepository);

    const contestInstanceRepository = new ContestInstanceRepository();
    AppContext.register('ContestInstanceRepository', contestInstanceRepository);

    const contestSubCategoryRepository = new ContestSubCategoryRepository();
    AppContext.register('ContestSubCategoryRepository', contestSubCategoryRepository);

    const varietyRepository = new VarietyRepository();
    AppContext.register('VarietyRepository', varietyRepository);

    const fishRepository = new FishRepository();
    AppContext.register('FishRepository', fishRepository);

    const classificationContestRuleRepository = new ClassificationContestRuleRepository();
    AppContext.register('ClassificationContestRuleRepository', classificationContestRuleRepository);

    const contestRegistrationRepository = new ContestRegistrationRepository();
    AppContext.register('ContestRegistrationRepository', contestRegistrationRepository);

    const scoreRepository = new ScoreRepository();
    AppContext.register('ScoreRepository', scoreRepository);


    // Registering the dependencies for services
    const userService = new UserService(userRepository);
    AppContext.register('UserService', userService);

    const contestService = new ContestService(contestRepository);
    AppContext.register('ContestService', contestService);

    const contestInstanceService = new ContestInstanceServices(contestInstanceRepository, contestService);
    AppContext.register('ContestInstanceService', contestInstanceService);

    const contestSubCategoryService = new ContestSubCategoryServices(contestSubCategoryRepository, contestInstanceService);
    AppContext.register('ContestSubCategoryService', contestSubCategoryService);

    const varietyService = new VarietyServices(varietyRepository);
    AppContext.register('VarietyService', varietyService);

    const fishService = new FishServices(fishRepository, userService, varietyRepository);
    AppContext.register('FishService', fishService);

    const classificationContestRuleService = new ClassificationContestRuleService(classificationContestRuleRepository, contestSubCategoryService, varietyService);
    AppContext.register('ClassificationContestRuleService', classificationContestRuleService);

    const contestRegistrationService = new ContestRegistrationServices(contestRegistrationRepository, contestInstanceService, fishService, contestSubCategoryService, classificationContestRuleService);
    AppContext.register('ContestRegistrationService', contestRegistrationService);

    const scoreService = new ScoreServices(scoreRepository);
    AppContext.register('ScoreService', scoreService);

    const competitionManagementServices = new CompetitionManagementServices(scoreService, contestRegistrationService, contestInstanceService, contestSubCategoryService);
    AppContext.register('CompetitionManagementServices', competitionManagementServices);

    // Registering the dependencies for controllers
    const userController = new UserController(userService);
    AppContext.register('UserController', userController);

    const contestController = new ContestController(contestService);
    AppContext.register('ContestController', contestController);

    const contestInstanceController = new ContestInstanceController(contestInstanceService);
    AppContext.register('ContestInstanceController', contestInstanceController);

    const contestSubCategoryController = new ContestSubCategoryController(contestSubCategoryService);
    AppContext.register('ContestSubCategoryController', contestSubCategoryController);

    const varietyController = new VarietyController(varietyService);
    AppContext.register('VarietyController', varietyController);

    const fishController = new FishController(fishService);
    AppContext.register('FishController', fishController);

    const classificationContestRuleController = new ClassificationContestRuleController(classificationContestRuleService);
    AppContext.register('ClassificationContestRuleController', classificationContestRuleController);

    const contestRegistrationController = new ContestRegistrationController(competitionManagementServices);
    AppContext.register('ContestRegistrationController', contestRegistrationController);

    const scoreController = new ScoreController(competitionManagementServices);
    AppContext.register('ScoreController', scoreController);

}