"use client";

import { Button, Result, Layout } from "antd";
import { useRouter } from "next/navigation";
import {
  dashboardForRole,
  getUserRouteSlug,
  useAuth,
} from "@/context/AuthContext";

export function Forbidden({ requiredRole }) {
  const router = useRouter();
  const { activeRole, user } = useAuth();
  const userSlug = getUserRouteSlug(user);

  return (
    <Layout className="min-h-screen">
      <Layout.Content className="flex items-center justify-center px-4 py-8">
        <Result
          status="403"
          title="Access Denied"
          subTitle={
            <>
              <p className="mb-2">
                You don&apos;t have access to the{" "}
                <span className="font-semibold capitalize">{requiredRole}</span>{" "}
                dashboard.
              </p>
              <p className="text-sm text-gray-600">
                Your current active role is:{" "}
                <span className="font-semibold capitalize">{activeRole}</span>
              </p>
            </>
          }
          extra={
            <Button
              type="primary"
              onClick={() =>
                router.push(dashboardForRole(activeRole, userSlug))
              }
            >
              Return to Dashboard
            </Button>
          }
        />
      </Layout.Content>
    </Layout>
  );
}
