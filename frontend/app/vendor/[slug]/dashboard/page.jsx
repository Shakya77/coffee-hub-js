"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { useEffect } from "react";
import { VendorDashboard } from "@/components/dashboards/VendorDashboard";
import { Forbidden } from "@/components/Forbidden";

export default function VendorDashboardPage() {
  const { token, loading, roles } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push("/login");
    }
  }, [token, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" description="Loading..." />
      </div>
    );
  }

  if (!token) {
    return null;
  }

  const hasVendorRole = roles?.some((r) => r.slug === "vendor");
  if (!hasVendorRole) {
    return <Forbidden requiredRole="vendor" />;
  }

  return <VendorDashboard />;
}
