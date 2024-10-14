import { IContestRegistrationRepository } from "../../repositories/IContestRegistrationRepository";
import { IContestRegistrationServices } from "../IContestRegistrationServices";

export class ContestRegistrationServices
  implements IContestRegistrationServices
{
  private contestRegistrationRepository: IContestRegistrationRepository;

  constructor(contestRegistrationRepository: IContestRegistrationRepository) {
    this.contestRegistrationRepository = contestRegistrationRepository;
  }

  registerContest(
    username: string,
    contestInstanceId: string,
    contestSubCategoryId: string,
    fishProfileId: string
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
