import { IContestInstance } from "../models/contestInstance.model";
import { IContest } from "../models/contest.model";

export interface IContestInstanceResponse {
  id: string;
  contest: IContest;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  description?: string;
  rules?: string;
  images?: string;
}
export function mapContestInstanceResponse(
  contestInstance: IContestInstance & {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
  }
): IContestInstanceResponse {
  return {
    id: contestInstance._id,
    contest: contestInstance.contest,
    name: contestInstance.name,
    startDate: contestInstance.startDate,
    endDate: contestInstance.endDate,
    isActive: contestInstance.isActive,
    description: contestInstance.description ?? "",
    rules: contestInstance.rules ?? "",
    images: contestInstance.images ? contestInstance.images[0] : "",
  };
}
