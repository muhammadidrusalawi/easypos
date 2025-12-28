import type {ApiResponse} from "@/types/api.ts";
import axiosInstance from "@/utils/axiosInstance.ts";
import type {Menu, MenusResponse} from "@/types/menu.ts";
import type {createMenuForm} from "@/schemas/menus/createMenuSchema.ts";

export const listMenuApi = async (): Promise<
    ApiResponse<MenusResponse>
> => {
    const res =
        await axiosInstance.get<ApiResponse<MenusResponse>>("/menus");
    return res.data;
};

export const createMenuApi = async (
    payload: createMenuForm,
): Promise<ApiResponse<Menu>> => {

    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("price", payload.price.toString());
    formData.append("category_id", payload.category_id.toString());
    formData.append("image", payload.image);

    const res = await axiosInstance.post<ApiResponse<Menu>>(
        "/menus",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data;
};

export const deleteMenuApi = async (
    id: string,
): Promise<ApiResponse<null>> => {
    const res = await axiosInstance.delete<ApiResponse<null>>(
        `/menus/${id}`,
    );
    return res.data;
};