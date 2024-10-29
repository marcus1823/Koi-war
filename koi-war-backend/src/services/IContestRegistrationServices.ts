import { IContestRegistrationResponse } from "../types/contestRegistration";

export interface IContestRegistrationServices {
  createContestRegistration(data: any): Promise<any>;
  getContestRegistrationById(id: string): Promise<any>;
  getContestRegistrationByFishId(
    fishId: string
  ): Promise<IContestRegistrationResponse>;
}
