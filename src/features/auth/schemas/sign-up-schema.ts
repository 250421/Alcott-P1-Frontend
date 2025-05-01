import { z } from "zod"

export const signupSchema = z.object({
    username: z.string().email( {
        message: "Invalid email address",
    }).min(1, {
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }).regex(new RegExp(`^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,25}$`), {
        message: "Password must contain at least 8 characters, one special character, and one number",
    })
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
