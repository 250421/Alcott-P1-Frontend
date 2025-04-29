import { z } from "zod"

export const editProductSchema = z.object({
    id: z.number(),
    name: z.string().min(1, {
        message: "Product name is required",
    }),
    description: z.string(),
    imageUrl: z.string(),
    stock: z.number().min(0, {
        message: "Stock cannot be negative",
    }),
    price: z.number().min(0, {
        message: "Price cannot be negative",
    }),
    category: z.string()
});

export type EditProductSchemaType = z.infer<typeof editProductSchema>;