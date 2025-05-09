import { z } from "zod"

export const signinSchema = z.object({
    username: z.string().email( {
        message: "Invalid email address",
    }).min(1, {
        message: "Username is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});

export type SignInSchemaType = z.infer<typeof signinSchema>;
