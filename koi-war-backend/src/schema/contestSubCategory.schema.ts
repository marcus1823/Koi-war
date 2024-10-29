import {object, string, TypeOf} from "zod";
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateContestSubCategoryInput:
 *      type: object
 *      required:
 *        - name
 *        - description
 *        - contestInstance
 *      properties:
 *        name:
 *          type: string
 *          example: "Hạng mục cá chép"
 *        description:
 *          type: string
 *          example: "Hạng mục thi đấu cá chép"
 *        contestInstance:
 *          type: string
 *          example: "507f1f77bcf86cd799439011"
 *    ContestSubCategoryResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        contestInstance:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */


export const createContestSubCategorySchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        })
            .trim()
            .min(2, "Name must be at least 2 characters long")
            .max(150, "Name must be less than 150 characters long")
            .regex(
                /^[a-zA-Z0-9\sÀ-ỹ\-_.,!?()'"]+$/u,
                "Name can only contain letters, numbers, Vietnamese characters, spaces, and basic punctuation"
              )
              .transform(val => val.replace(/\s+/g, ' ')), // Thay thế nhiều khoảng trắng liên tiếp bằng một khoảng trắng
            
        description: string({
            required_error: "Description is required",
        })
            .trim()
            .min(8, "Description must be at least 8 characters long")
            .max(1000, "Description must be less than 1000 characters"),

        contestInstance: string({
            required_error: "Contest Instance ID is required",
        })
            .trim()
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid Contest Instance ID format")
    })
});

export const updateContestSubCategorySchema = object({
    body: object({
        name: string()
            .trim()
            .min(2, "Name must be at least 2 characters long")
            .max(150, "Name must be less than 150 characters long")
            .regex(
                /^[a-zA-Z0-9\sÀ-ỹ\-_.,!?()'"]+$/u,
                "Name can only contain letters, numbers, Vietnamese characters, spaces, and basic punctuation"
              )
              .transform(val => val.replace(/\s+/g, ' ')) // Thay thế nhiều khoảng trắng liên tiếp bằng một khoảng trắng
            .optional(),

        description: string()
            .trim()
            .min(8, "Description must be at least 8 characters long")
            .max(1000, "Description must be less than 1000 characters")
            .optional(),

        contestInstance: string()
            .trim()
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid Contest Instance ID format")
            .optional()
    })
});

export type ContestSubCategoryInput = TypeOf<typeof createContestSubCategorySchema>;
export type UpdateContestSubCategoryInput = TypeOf<typeof updateContestSubCategorySchema>;
