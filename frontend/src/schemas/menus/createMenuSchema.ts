import {z} from "zod";

export const createMenuSchema = z.object({
    name: z
        .string()
        .min(1, "Menu name is required")
        .max(100, "Menu name must be at most 100 characters long"),

    price: z .number() .min(1, "Price must be greater than 0"),

    image: z
        .instanceof(File, { message: "Image is required" }),

    category_id: z
        .number()
        .min(1, "Category is required"),
})

export type createMenuForm = z.infer<typeof createMenuSchema>