import type {ApiResponse} from "@/types/api.ts";
import axiosInstance from "@/utils/axiosInstance.ts";
import type {Order, OrdersResponse} from "@/types/order.ts";
import type {CreateOrderPayload} from "@/schemas/order/createOrderSchema.ts";

export const listOrderApi = async (): Promise<
    ApiResponse<OrdersResponse>
> => {
    const res =
        await axiosInstance.get<ApiResponse<OrdersResponse>>("/orders");
    return res.data;
};

export const createOrderApi = async (
    payload: CreateOrderPayload,
): Promise<ApiResponse<Order>> => {
    const res = await axiosInstance.post<ApiResponse<Order>>(
        "/orders",
        payload
    );

    return res.data;
};

export const deleteOrderApi = async (id: string): Promise<ApiResponse<Order>> => {
    const res = await axiosInstance.delete<ApiResponse<Order>>(`/orders/${id}`);
    return res.data;
};