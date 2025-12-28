import {useMutation, useQuery, useQueryClient, type UseQueryOptions} from "@tanstack/react-query";
import {
    listCategoryApi,
    deleteCategoryApi,
    createCategoryApi,
    updateCategoryApi,
    getDetailCategoryApi,
} from "@/api/category";
import type { Category } from "@/types/category";
import { toast } from "react-toastify";
import type {CreateCategoryForm} from "@/schemas/category/createCategorySchema.ts";
import type {UpdateCategoryForm} from "@/schemas/category/updateCategorySchema.ts";

export const categoryService = {
    // Query list categories
    useList() {
        const options: UseQueryOptions<Category[], Error> = {
            queryKey: ["categories"],
            queryFn: async () => {
                const res = await listCategoryApi();
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

    // Mutation create category
    useCreate() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (payload: CreateCategoryForm) => createCategoryApi(payload),
            onSuccess: async (res) => {
                toast.success(res.message);
                await queryClient.invalidateQueries({ queryKey: ["categories"] });
            },
            onError: (err: any) => {
                if (err.name === "ZodError") {
                    toast.error("Data kategori tidak valid");
                } else {
                    toast.error(err?.response?.data?.message || "Gagal tambah kategori");
                }
            },
        });
    },

    // Query detail category
    useDetail(id: number) {
        return useQuery({
            queryKey: ["categories", id],
            queryFn: async (): Promise<Category> => {
                const res = await getDetailCategoryApi(id);
                return res.data;
            },
            enabled: !!id,
            staleTime: 1000 * 60 * 5,
        });
    },

    // Mutation update category
    useUpdate() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({id, payload,}: {
                id: number;
                payload: UpdateCategoryForm;
            }) => updateCategoryApi(id, payload),
            onSuccess: (res) => {
                toast.success(res.message);
                queryClient
                    .invalidateQueries({ queryKey: ["categories"] })
                    .catch(() => {});
            },

            onError: (err: any) => {
                if (err.name === "ZodError") {
                    toast.error("Data kategori tidak valid");
                } else {
                    toast.error(err?.response?.data?.message || "Gagal update kategori");
                }
            },
        });
    },

    // Mutation delete category
    useDelete() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id: number) => deleteCategoryApi(id),
            onSuccess: async (res) => {
                toast.success(res.message);
                await queryClient.invalidateQueries({ queryKey: ["categories"] });
            },

            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Gagal hapus kategori");
            },
        });
    },
};