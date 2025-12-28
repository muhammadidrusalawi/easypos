import { z } from "zod";

export const updateCategorySchema = z.object({
    id: z.number().int().positive("Category id is invalid"),
    name: z.string().min(1, "Category name is required").max(100),
});

export type UpdateCategoryForm = z.infer<typeof updateCategorySchema>;