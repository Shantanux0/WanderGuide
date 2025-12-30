import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function RequireNonAdmin({ children }: { children: JSX.Element }) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (user && user.role === "admin") {
        return <Navigate to="/admin" replace />;
    }

    return children;
}
