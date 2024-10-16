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
 *          default: SubCategory Name
 *        description:
 *          type: string
 *          default: SubCategory Description
 *        contestInstance:
 *          type: string
 *          default: Contest Instance ID
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
        }),
        description: string({
            required_error: "Description is required",
        }),
        contestInstance: string({
            required_error: "Contest Instance is required",
        })
    })
})

export type ContestSubCategoryInput = TypeOf<typeof createContestSubCategorySchema>;