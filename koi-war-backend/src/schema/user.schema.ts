import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - username
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        name:
 *          type: string
 *          default: Jane Doe
 *        username:
 *          type: string
 *          default: janedoe
 *        password:
 *          type: string
 *          default: stringPassword123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        username:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    username: string({
      required_error: "Username is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Email is invalid"),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password must be at least 6 characters"),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
