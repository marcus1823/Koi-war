export interface IContestRegistrationServices {
  registerContest(
    username: string,
    contestInstanceId: string,
    contestSubCategoryId: string,
    fishProfileId: string
  ): Promise<void>;
}
