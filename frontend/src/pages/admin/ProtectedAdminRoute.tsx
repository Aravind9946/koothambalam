
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

type AuthState = "checking" | "authenticated" | "unauthenticated";

export default function ProtectedAdminRoute() {
  const [authState, setAuthState] = useState<AuthState>("checking");

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/me",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (cancelled) return;

        setAuthState(response.ok ? "authenticated" : "unauthenticated");
      } catch {
        if (!cancelled) {
          setAuthState("unauthenticated");
        }
      }
    }

    checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  if (authState === "checking") {
    return (
      <main className="admin-auth-loading">
        <p>Verifying your session…</p>
      </main>
    );
  }

  if (authState === "unauthenticated") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
