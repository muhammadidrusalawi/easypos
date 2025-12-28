import axiosInstance from "@/utils/axiosInstance.ts";
import type { ApiResponse } from "@/types/api.ts";
import type { CategoriesResponse, Category } from "@/types/category.ts";
import {type CreateCategoryForm, createCategorySchema} from "@/schemas/category/createCategorySchema.ts";
import {type UpdateCategoryForm, updateCategorySchema} from "@/schemas/category/updateCategorySchema.ts";

export const listCategoryApi = async (): Promise<
    ApiResponse<CategoriesResponse>
> => {
    const res =
        await axiosInstance.get<ApiResponse<CategoriesResponse>>("/categories");
    return res.data;
};

export const createCategoryApi = async (
    payload: CreateCategoryForm,
): Promise<ApiResponse<Category>> => {
    const parsed = createCategorySchema.parse(payload);
    const res = await axiosInstance.post<ApiResponse<Category>>(
        "/categories",
        parsed,
    );
    return res.data;
};

export const getDetailCategoryApi = async (
    id: number,
): Promise<ApiResponse<Category>> => {
    const res = await axiosInstance.get<ApiResponse<Category>>(
        `/categories/${id}`,
    );
    return res.data;
};

export const updateCategoryApi = async (
    id: number,
    payload: UpdateCategoryForm,
): Promise<ApiResponse<Category>> => {
    const parsed = updateCategorySchema.parse(payload);
    const res = await axiosInstance.put<ApiResponse<Category>>(
        `/categories/${id}`,
        parsed,
    );
    return res.data;
};

export const deleteCategoryApi = async (
    id: number,
): Promise<ApiResponse<null>> => {
    const res = await axiosInstance.delete<ApiResponse<null>>(
        `/categories/${id}`,
    );
    return res.data;
};