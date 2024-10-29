export interface IContestRegistrationRepository {
  createContestRegistration(data: {
    fish: string;
    contestInstance: string;
    contestSubCategory: string;
  }): Promise<any>;

  getContestRegistrationById(id: string): Promise<any>;

  getContestRegistrationByFishId(fishId: string): Promise<any>;
}
