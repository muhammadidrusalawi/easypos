import {Box, LayoutGrid, UserPen} from "lucide-react";
import {NavLink} from "react-router-dom";

export function SettingsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-screen flex flex-col gap-4 p-4">
            <h2 className="text-2xl font-bold">Settings</h2>

            <div className="w-full h-full flex items-center gap-4 overflow-hidden">
                <aside className="flex w-fit h-full flex-col bg-white border rounded-xl pr-6">
                    <NavLink
                        to="/settings/account"
                        className={({ isActive }) =>
                            `flex items-center gap-4 p-4 ${
                                isActive ? "text-red-500" : ""
                            }`
                        }
                    >
                        <UserPen size={20} />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Account</span>
                            <span className="text-xs text-muted-foreground">
                                Manage your account
                            </span>
                        </div>
                    </NavLink>

                    <NavLink
                        to="/settings/categories"
                        className={({ isActive }) =>
                            `flex items-center gap-4 p-4 ${
                                isActive ? "text-red-500" : ""
                            }`
                        }
                    >
                        <LayoutGrid size={20} />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Categories</span>
                            <span className="text-xs text-muted-foreground">
                                Manage your categories
                            </span>
                        </div>
                    </NavLink>

                    <NavLink
                        to="/settings/products"
                        className={({ isActive }) =>
                            `flex items-center gap-4 p-4 ${
                                isActive ? "text-red-500" : ""
                            }`
                        }
                    >
                        <Box size={20} />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Products Management</span>
                            <span className="text-xs text-muted-foreground">
                                Manage your products, pricing, etc
                            </span>
                        </div>
                    </NavLink>
                </aside>

                <div className="flex-1 h-full flex flex-col bg-white border rounded-xl gap-4 p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}