import type {LoginForm} from "@/schemas/auth/login.ts";
import {loginApi} from "@/api/auth.ts";

export const loginService = async (payload: LoginForm) => {
    const res = await loginApi(payload);
    return res;
};