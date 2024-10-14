import { IFish } from "../models/fish.model";
import {IVariety} from "../models/variety.model";
import {IUser} from "../models/user.model";

export interface IFishProfileResponse {
  name: string;
  weight: number;
  length: number;
  variety: IVariety;
  description: string;
  images?: string[];
  _id: string;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export function mapFishProfileResponse(
  fishProfile: IFish & { _id: string; createdAt: Date; updatedAt: Date }
): IFishProfileResponse {
  return {
    name: fishProfile.name,
    weight: fishProfile.weight,
    length: fishProfile.length,
    variety: fishProfile.variety,
    description: fishProfile.description ?? "",
    images: fishProfile.images,
    _id: fishProfile._id,
    user: fishProfile.user,
    createdAt: fishProfile.createdAt,
    updatedAt: fishProfile.updatedAt,
  };
}
