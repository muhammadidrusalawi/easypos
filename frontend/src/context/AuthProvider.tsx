import React, { useState, useEffect } from "react";
import { getCookie, setCookie, removeCookie } from "@/hooks/useCookie";
import { AuthContext } from "@/hooks/useAuth";

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    initialized: boolean;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children,}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [initialized, setInitialized] = useState<boolean>(false);

    useEffect(() => {
        const storedToken = getCookie("token");
        const storedUser = getCookie("user");

        if (storedToken && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            } catch {
                removeCookie("user");
            }
        }

        setInitialized(true);
    }, []);

    const login = (userData: User, authToken: string) => {
        setUser(userData);
        setToken(authToken);
        setCookie("token", authToken);
        setCookie("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        removeCookie("token");
        removeCookie("user");
    };

    return (
        <AuthContext.Provider
            value={{
        user,
            token,
            login,
            logout,
            initialized,
            isAuthenticated: initialized && !!token,
    }}
>
    {children}
    </AuthContext.Provider>
);
};
