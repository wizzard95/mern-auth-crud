import {z} from "zod";


export const registerSchema = z.object({
    username: z.string({
        required_error: 'username is required',
        invalid_type_error: 'username is required',
    }).min(1, {
        message: 'username cannot be empty',
    }),
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email is required',
    }).email({
        message: 'Invalid email',
    }),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password is required',  
    }).min(6, {
        message: 'Password must be at least 6 characters',
    }),
});

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email is required",
    }).email({
        message: "Invalid Email",
    }),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password is required",
    }).min(6, {
        message: "Password must be at least 6 characters",
    }),
});
