import type {Order} from "@/types/order.ts";
import {useMutation, useQuery, useQueryClient, type UseQueryOptions} from "@tanstack/react-query";
import {createOrderApi, deleteOrderApi, listOrderApi} from "@/api/order.ts";
import {toast} from "react-toastify";
import type {CreateOrderPayload} from "@/schemas/order/createOrderSchema.ts";

export const orderService = {
    useList() {
        const options: UseQueryOptions<Order[], Error> = {
            queryKey: ["orders"],
            queryFn: async () => {
                const res = await listOrderApi();
                return res.data ?? [];
            },
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 30,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: true,
        };

        return useQuery(options);
    },

    useCreate() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (payload: CreateOrderPayload) => createOrderApi(payload),
            onSuccess: async (res) => {
                toast.success(res.message);
                await queryClient.invalidateQueries({ queryKey: ["orders"] });
            },
            onError: (err: any) => {
                if (err.name === "ZodError") {
                    toast.error("Data order tidak valid");
                } else {
                    toast.error(err?.response?.data?.message || "Gagal membuat order");
                }
            },
        });
    },

    useDelete() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id: string)=> deleteOrderApi(id),
            onSuccess: async (res) => {
                toast.success(res.message);
                await queryClient.invalidateQueries({ queryKey: ["orders"] });
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Gagal menghapus order");
            }
        })
    }
};