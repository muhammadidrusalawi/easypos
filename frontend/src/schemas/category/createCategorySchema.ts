import { z } from "zod";

export const createCategorySchema = z.object({
    name: z
        .string()
        .min(1, "Category name is required")
        .max(100, "Category name must be at most 100 characters long"),
});

export type CreateCategoryForm = z.infer<typeof createCategorySchema>;