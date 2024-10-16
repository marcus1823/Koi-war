import {array, number, object, string, TypeOf} from "zod";
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateFishInput:
 *      type: object
 *      required:
 *        - name
 *        - weight
 *        - length
 *        - images
 *        - variety
 *        - description
 *      properties:
 *        name:
 *          type: string
 *          default: Fish Name
 *        weight:
 *          type: number
 *          default: 5.5
 *        length:
 *          type: number
 *          default: 12.3
 *        images:
 *          type: array
 *          items:
 *            type: string
 *          default: ["image1.jpg", "image2.jpg"]
 *        variety:
 *          type: string
 *          default: Variety ID
 *        description:
 *          type: string
 *          default: A detailed description of the fish
 *    FishResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        weight:
 *          type: number
 *        length:
 *          type: number
 *        images:
 *          type: array
 *          items:
 *            type: string
 *        variety:
 *          type: string
 *        description:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */


export const createFishSchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        weight: number({
           required_error: "Weight is required",
        }),
        length: number( {
            required_error: "Length is required",
        }),
        images: array(string({
            required_error: "Image is required",
        })),
        variety: string({
            required_error: "Variety is required",
        }),

        description: string({
            required_error: "Description is required",
        }).min(8,"Description must be at least 8 characters"),
    })
})

export type CreateFishInput = TypeOf<typeof createFishSchema>;