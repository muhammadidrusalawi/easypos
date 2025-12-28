import {
    ChartPie,
    House,
    LogOut, ReceiptText,
    Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {useAuth} from "@/hooks/useAuth.ts";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, initialized, logout } = useAuth();

  if (!initialized) return null;
  return (
      <>
        <div className="fixed inset-0 bg-black text-white flex items-center justify-center md:hidden z-50">
          <h1 className="text-xl font-semibold">
            Oops, desktop only
          </h1>
        </div>

          <div className="flex h-screen bg-gray-100 gap-4">
            <aside className="fixed left-0 h-full w-20 border bg-white">
              <nav className="flex flex-col gap-2 items-center justify-start p-4 h-full">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                      `flex p-3 rounded-md transition duration-300 ${
                          isActive
                              ? "bg-red-400 text-white"
                              : "text-gray-400 hover:bg-red-400 hover:text-white"
                      }`
                  }
                >
                    <House size={20} />
                </NavLink>

                <a className="flex text-gray-400 p-3 rounded-md hover:bg-red-400 hover:text-white transition duration-300">
                    <ChartPie size={20} />
                </a>

                <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                        `flex p-3 rounded-md transition duration-300 ${
                            isActive
                                ? "bg-red-400 text-white"
                                : "text-gray-400 hover:bg-red-400 hover:text-white"
                        }`
                    }
                >
                    <ReceiptText size={20} />
                </NavLink>

                  <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                      `flex p-3 rounded-md transition duration-300 ${
                          isActive
                              ? "bg-red-400 text-white"
                              : "text-gray-400 hover:bg-red-400 hover:text-white"
                      }`
                  }
                  >
                      <Settings size={20} />
                  </NavLink>

                  {isAuthenticated && (
                      <button
                          onClick={logout}
                          className="mt-auto flex p-3 rounded-md text-gray-400 hover:bg-red-400 hover:text-white transition duration-300"
                      >
                          <LogOut size={20} />
                      </button>
                  )}
              </nav>
          </aside>

          <main className="ml-20 flex-1 overflow-auto">{children}</main>
        </div>
      </>
  );
}
