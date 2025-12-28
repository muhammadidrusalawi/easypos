import {z} from "zod";

export const createOrderSchema = z.object({
    customer_name: z
        .string()
        .min(1, "Customer name is required")
        .max(100, "Customer name must be at most 100 characters long"),
})

export type CreateOrderForm = z.infer<typeof createOrderSchema>

export interface CreateOrderPayload {
    customer_name: string;
    order_items: {
        menu_id: string;
        quantity: number;
    }[];
}