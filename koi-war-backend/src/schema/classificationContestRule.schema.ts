import {array, object, string, TypeOf} from "zod";
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateClassificationContestRuleInput:
 *      type: object
 *      required:
 *        - name
 *        - description
 *        - contestSubCategory
 *        - varieties
 *      properties:
 *        name:
 *          type: string
 *          default: Classification Name
 *        description:
 *          type: string
 *          default: Classification Description
 *        contestSubCategory:
 *          type: string
 *          default: Contest SubCategory ID
 *        varieties:
 *          type: array
 *          items:
 *            type: string
 *          default: ["Variety1", "Variety2"]
 *    ClassificationContestRuleResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        contestSubCategory:
 *          type: string
 *        varieties:
 *          type: array
 *          items:
 *            type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */


export const createClassificationContestRuleSchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        description: string({
            required_error: "Description is required",
        }),
        contestSubCategory: string({
            required_error: "Contest Sub Category is required",
        }),
        varieties: array(string({
            required_error: "Varieties is required",
        }))
    })
})


export type ClassificationContestRuleInput = TypeOf<typeof createClassificationContestRuleSchema>;