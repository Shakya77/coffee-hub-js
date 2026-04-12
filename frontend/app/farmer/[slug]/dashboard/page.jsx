"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { useEffect } from "react";
import { FarmerDashboard } from "@/components/dashboards/FarmerDashboard";
import { Forbidden } from "@/components/Forbidden";

export default function FarmerDashboardPage() {
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

  const hasFarmerRole = roles?.some((r) => r.slug === "farmer");
  if (!hasFarmerRole) {
    return <Forbidden requiredRole="farmer" />;
  }

  return <FarmerDashboard />;
}
