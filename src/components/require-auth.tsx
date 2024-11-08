// require-auth.tsx
import { useAppContext } from "@/hooks/use-auth-context";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type RequireAuthProps = {
    children: ReactNode
}

export function RequireAuth({ children }: RequireAuthProps) {
    const { isAuthenticated } = useAppContext();

    if (!isAuthenticated) {
        return <Navigate to="/manager/login" />; // Redireciona para a página de login se não autenticado
    }

    return <>{children}</>;
}