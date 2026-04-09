"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { useEffect } from "react";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";
import { AgronomistDashboard } from "@/components/dashboards/AgronomistDashboard";
import { FarmerDashboard } from "@/components/dashboards/FarmerDashboard";
import { VendorDashboard } from "@/components/dashboards/VendorDashboard";
import { Forbidden } from "@/components/Forbidden";
import { useRoleGuard } from "@/hooks/useRoleGuard";

export default function DashboardPage() {
  const { token, loading, activeRole, roles } = useAuth();
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

  // Determine which dashboard to show
  const renderDashboard = () => {
    const role = activeRole || roles?.[0]?.slug || "user";

    // Check if user actually has this role
    const hasRole = roles?.some((r) => r.slug === role);
    if (!hasRole && role !== "user") {
      return <Forbidden requiredRole={role} />;
    }

    switch (role) {
      case "admin":
        return <AdminDashboard />;
      case "agronomist":
        return <AgronomistDashboard />;
      case "farmer":
        return <FarmerDashboard />;
      case "vendor":
        return <VendorDashboard />;
      default:
        return <FarmerDashboard />;
    }
  };

  return renderDashboard();
}
