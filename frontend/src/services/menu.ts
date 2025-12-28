import type {Menu} from "@/types/menu.ts";
import {useMutation, useQuery, useQueryClient, type UseQueryOptions} from "@tanstack/react-query";
import {createMenuApi, deleteMenuApi, listMenuApi} from "@/api/menu.ts";
import {toast} from "react-toastify";
import type {createMenuForm} from "@/schemas/menus/createMenuSchema.ts";

export const menuService = {
    useList() {
        const options: UseQueryOptions<Menu[], Error> = {
            queryKey: ["menus"],
            queryFn: async () => {
                const res = await listMenuApi();
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
            mutationFn: (payload: createMenuForm) => createMenuApi(payload),
            onSuccess: async (res) => {
                toast.success(res.message);
                await queryClient.invalidateQueries({ queryKey: ["menus"] });
            },
            onError: (err: any) => {
                if (err.name === "ZodError") {
                    toast.error("Data menu tidak valid");
                } else {
                    toast.error(err?.response?.data?.message || "Gagal menu kategori");
                }
            },
        });
    },

    useDelete() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id: string) => deleteMenuApi(id),
            onSuccess: async (res) => {
                toast.success(res.message);
                await queryClient.invalidateQueries({ queryKey: ["menus"] });
            },

            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Gagal hapus menu");
            },
        });
    },
};