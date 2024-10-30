import {IFishProfileResponse, mapFishProfileResponse} from "./fish";
import {IContestSubCategoryResponse, mapContestSubCategoryResponse,} from "./contestSubCategory";
import {IScoreResponse, mapScoreResponse} from "./score";
import {IRegistration, RegistrationStatus} from "../models/registration.model";
import {IScore} from "../models/score.model";
import {IFish} from "../models/fish.model";
import {IContestSubCategory} from "../models/contestSubCategory.model";

export interface IContestRegistrationResponse {
    id: string;
    fish: IFishProfileResponse;
    scores: IScoreResponse[];
    contestSubCategory: IContestSubCategoryResponse;
    status: RegistrationStatus;
}

export function mapContestRegistrationResponse(
    data: IRegistration & { _id: string }
): IContestRegistrationResponse {
    return {
        id: data._id,
        fish: mapFishProfileResponse(
            data.fish as IFish & { _id: string; createdAt: Date; updatedAt: Date }
        ),
        scores: data.scores
            ? (
                data.scores as (IScore & {
                    _id: string;
                    createdAt: Date;
                    updatedAt: Date;
                })[]
            ).map(mapScoreResponse)
            : [],
        contestSubCategory: mapContestSubCategoryResponse(
            data.contestSubCategory as IContestSubCategory & {
                _id: string;
                createdAt: Date;
                updatedAt: Date;
            }
        ),
        status: data.status,
    };
}
