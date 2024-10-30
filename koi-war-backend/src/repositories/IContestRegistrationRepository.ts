import { RegistrationStatus } from "../models/registration.model";

export interface IContestRegistrationRepository {
  createContestRegistration(data: {
    fish: string;
    contestInstance: string;
    contestSubCategory: string;
  }): Promise<any>;

  getContestRegistrationById(id: string): Promise<any>;

  getContestRegistrationByFishId(fishId: string): Promise<any>;

  getContestRegistrationsBySubCategoryId(contestSubCategoryId: string): Promise<any[]>;

  updateContestRegistrationStatus(id: string, status: RegistrationStatus): Promise<any>;
}
