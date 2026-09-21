import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const ProtectedAdminRoute = () => {
  const { loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return <main className="grid min-h-screen place-items-center bg-background text-muted-foreground">Checking administrator access…</main>;
  }
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: `${location.pathname}${location.search}` }} />;
  }
  return <Outlet />;
};
