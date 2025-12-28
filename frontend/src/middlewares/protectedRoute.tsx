import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { user, isAuthenticated, initialized } = useAuth();

    if (!initialized) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
