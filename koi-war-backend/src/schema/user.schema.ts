import {object, string, TypeOf} from "zod";

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
 *    UserResponse:
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

const userPayload = {
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        email: string({
            required_error: "Email is required",
        }).email("Email is invalid"),
    }),
};

const params = {
    params: object({
        id: string({
            required_error: "User Id is required",
        }),
    }),
};

const passwordField = object({
    password: string({
        required_error: "Password is required",
    }).min(6, "Password must be at least 6 characters"),
});

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

export const loginUserSchema = object({
    body: object({
        username: string({
            required_error: "Username is required",
        }),
        password: string({
            required_error: "Password is required",
        }).min(6, "Password must be at least 6 characters"),
    }),
});

export const updateUserSchema = object({
    ...userPayload,
    ...params,
});

export const getUserSchema = object({
    ...params,
});

export const deleteUserSchema = object({
    ...params,
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type GetUserInput = TypeOf<typeof getUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
