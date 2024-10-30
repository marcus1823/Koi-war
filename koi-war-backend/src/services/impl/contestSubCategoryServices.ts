import {IContestSubCategoryService} from "../IContestSubCategoryService";
import {IContestSubCategoryRepository} from "../../repositories/IContestSubCategoryRepository";
import {IContestSubCategoryResponse, mapContestSubCategoryResponse,} from "../../types/contestSubCategory";
import ContestSubCategory, {IContestSubCategory} from "../../models/contestSubCategory.model";
import ContestInstance from "../../models/contestInstance.model";
import mongoose from "mongoose";
import {IClassificationContestRule} from "../../models/classificationContestRule.model";
import {IContestInstanceServices} from "../IContestInstanceServices";

export class ContestSubCategoryServices implements IContestSubCategoryService {
    private contestSubCategoryRepository: IContestSubCategoryRepository;
    private contestInstanceServices: IContestInstanceServices;

    constructor(
        contestSubCategoryRepository: IContestSubCategoryRepository,
        contestInstanceServices: IContestInstanceServices
    ) {
        this.contestSubCategoryRepository = contestSubCategoryRepository;
        this.contestInstanceServices = contestInstanceServices;
    }

    async createContestSubCategory(
        data: any
    ): Promise<IContestSubCategoryResponse> {
        try {
            const contestInstance = await this.contestInstanceServices.getContestInstanceById(data.contestInstance);
            if (!contestInstance) {
                throw new Error("Contest instance not found");
            }

            if (contestInstance.isDisabled) {
                throw new Error("Cannot create subcategory for disabled contest instance");
            }

            const existingSubCategory = await this.contestSubCategoryRepository
                .getContestSubCategoryByNameAndInstance(data.name, data.contestInstance);
            if (existingSubCategory) {
                throw new Error("A subcategory with this name already exists in this contest instance");
            }

            const contestSubCategory = await this.contestSubCategoryRepository.createContestSubCategory(data);
            return mapContestSubCategoryResponse(contestSubCategory as IContestSubCategory & {
                _id: string;
                createdAt: Date;
                updatedAt: Date;
            });
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Failed to create contest subcategory");
        }
    }

    async getAllContestSubCategory(): Promise<IContestSubCategoryResponse[]> {
        const contestSubCategory =
            await this.contestSubCategoryRepository.getAllContestSubCategory();
        return contestSubCategory.map((contestSubCategory) =>
            mapContestSubCategoryResponse(
                contestSubCategory as IContestSubCategory & {
                    _id: string;
                    createdAt: Date;
                    updatedAt: Date;
                }
            )
        );
    }

    async getContestSubCategoryById(
        id: string
    ): Promise<IContestSubCategoryResponse | null> {
        const contestSubCategory =
            await this.contestSubCategoryRepository.getContestSubCategoryById(id);
        if (!contestSubCategory) {
            throw new Error("Contest sub category not found");
        }
        return mapContestSubCategoryResponse(
            contestSubCategory as IContestSubCategory & {
                _id: string;
                createdAt: Date;
                updatedAt: Date;
            } & IClassificationContestRule
        );
    }

    async updateContestSubCategoryById(
        id: string,
        updateData: Partial<{
            name?: string;
            description?: string;
            contestInstance?: string;
        }>
    ): Promise<IContestSubCategoryResponse | null> {
        try {
            // Kiểm tra subcategory tồn tại
            const existingSubCategory = await this.contestSubCategoryRepository.getContestSubCategoryById(id);
            if (!existingSubCategory) {
                throw new Error("Contest sub category not found");
            }

            // Xử lý contestInstance ID nếu có
            const processedData: Partial<IContestSubCategory> = {...updateData};
            if (updateData.contestInstance) {
                // Kiểm tra contestInstance tồn tại
                const contestInstance = await ContestInstance.findById(updateData.contestInstance);
                if (!contestInstance) {
                    throw new Error("Contest instance not found");
                }
                // Chuyển string ID thành ObjectId
                processedData.contestInstance = new mongoose.Types.ObjectId(updateData.contestInstance);
            }

            // Kiểm tra trùng tên nếu có cập nhật tên
            if (updateData.name) {
                const existingName = await ContestSubCategory.findOne({
                    contestInstance: existingSubCategory.contestInstance,
                    name: updateData.name,
                });
                if (existingName) {
                    throw new Error("A subcategory with this name already exists in this contest instance");
                }
            }

            const updatedSubCategory = await this.contestSubCategoryRepository.updateContestSubCategoryById(
                id,
                processedData
            );

            if (!updatedSubCategory) {
                throw new Error("Failed to update contest subcategory");
            }

            return mapContestSubCategoryResponse(updatedSubCategory as IContestSubCategory & {
                _id: string;
                createdAt: Date;
                updatedAt: Date;
            });
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Failed to update contest subcategory");
        }
    }

    async getAllContestSubCategoryByContestInstance(
        contestInstanceId: string
    ): Promise<IContestSubCategoryResponse[]> {
        const contestSubCategories =
            await this.contestSubCategoryRepository.getAllContestSubCategoryByContestInstanceId(
                contestInstanceId
            );
        return contestSubCategories.map((contestSubCategory) =>
            mapContestSubCategoryResponse(
                contestSubCategory as IContestSubCategory & {
                    _id: string;
                    createdAt: Date;
                    updatedAt: Date;
                }
            )
        );
    }

}
