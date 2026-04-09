"use client";

import { Button, Result, Layout } from "antd";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getDashboardRoleConfig } from "@/constants/dashboard-config";

export function Forbidden({ requiredRole }) {
  const router = useRouter();
  const { activeRole } = useAuth();
  const roleConfig = getDashboardRoleConfig(requiredRole);
  const activeRoleConfig = getDashboardRoleConfig(activeRole);

  return (
    <Layout className="min-h-screen">
      <Layout.Content className="flex items-center justify-center px-4 py-8">
        <Result
          status="403"
          title="Access Denied"
          subTitle={
            <>
              <p className="mb-2">
                You don't have access to the{" "}
                <span className="font-semibold capitalize">{requiredRole}</span>{" "}
                dashboard.
              </p>
              <p className="text-sm text-gray-600">
                Your current active role is:{" "}
                <span className="font-semibold capitalize">{activeRole}</span>
              </p>
              {roleConfig && (
                <p className="mt-2 text-sm text-gray-600">
                  {roleConfig.subtitle}
                </p>
              )}
            </>
          }
          extra={
            <Button type="primary" onClick={() => router.push("/dashboard")}>
              Return to Dashboard
            </Button>
          }
        />
      </Layout.Content>
    </Layout>
  );
}
