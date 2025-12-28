import type {LoginResponse} from "@/types/auth.ts";
import type {ApiResponse} from "@/types/api.ts";
import axiosInstance from "@/utils/axiosInstance.ts";
import {type LoginForm, loginSchema} from "@/schemas/auth/login.ts";

export const loginApi = async (
    payload: LoginForm,
): Promise<ApiResponse<LoginResponse>> => {
    const parsed = loginSchema.parse(payload);

    const res = await axiosInstance.post<ApiResponse<LoginResponse>>(
        "/auth/login",
        parsed,
    );
    return res.data;
};