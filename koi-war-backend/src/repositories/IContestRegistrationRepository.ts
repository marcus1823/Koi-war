export interface IContestRegistrationRepository {
  createContestRegistration(data: {
    fish: string;
    contestInstance: string;
    contestSubCategory: string;
  }): Promise<any>;
}
