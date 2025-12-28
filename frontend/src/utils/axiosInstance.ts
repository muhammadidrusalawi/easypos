import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { getCookie } from "@/hooks/useCookie.ts";

const baseUrl = import.meta.env.VITE_API_SERVER_URL;

if (!baseUrl) {
    throw new Error("VITE_API_SERVER_URL is not defined");
}

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getCookie("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosInstance;