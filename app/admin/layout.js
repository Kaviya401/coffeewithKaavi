"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { adminLogout } from "../../store/authSlice";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage && !authenticated) router.replace("/admin/login");
  }, [authenticated, isLoginPage, router]);

  if (isLoginPage) return children;
  if (!authenticated) return <div className="admin-loading">Checking your owner access…</div>;

  return (
    <div className="admin-layout">
      <AdminSidebar onLogout={() => {
        dispatch(adminLogout());
        router.replace("/admin/login");
      }} />
      <main className="admin-main">{children}</main>
    </div>
  );
}
