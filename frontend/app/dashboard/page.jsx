"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Dropdown,
  Layout,
  Row,
  Col,
  Spin,
  Statistic,
  Tag,
} from "antd";
import { LogoutOutlined, SwapOutlined } from "@ant-design/icons";
import { useEffect, useMemo } from "react";
import { getDashboardRoleConfig } from "@/constants/dashboard-config";

const { Header, Content } = Layout;

export default function DashboardPage() {
  const { token, loading, user, roles, activeRole, switchRole, logout } =
    useAuth();
  const router = useRouter();

  const resolvedRole = activeRole || user?.role || roles[0]?.slug || "user";
  const dashboardConfig = useMemo(
    () => getDashboardRoleConfig(resolvedRole),
    [resolvedRole],
  );

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

  const roleMenuItems = roles.map((role) => ({
    key: role.slug,
    label: role.name || role.slug,
  }));

  return (
    <Layout className="min-h-screen bg-linear-to-br from-sand via-cream to-sand">
      <Header className="flex h-16 items-center justify-between border-b border-moss/10 bg-white/80 px-6 backdrop-blur">
        <div>
          <div className="text-lg font-semibold text-forest">Coffee Hub</div>
          <div className="text-xs text-moss">Unified role dashboard</div>
        </div>

        <div className="flex items-center gap-3">
          <Tag color="green" className="m-0 px-3 py-1 capitalize">
            {dashboardConfig.label}
          </Tag>

          {roles.length > 1 ? (
            <Dropdown
              menu={{
                items: roleMenuItems,
                onClick: ({ key }) => switchRole(key),
              }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button icon={<SwapOutlined />} type="primary">
                Switch Role
              </Button>
            </Dropdown>
          ) : (
            <Tag color="blue" className="m-0 px-3 py-1 capitalize">
              {dashboardConfig.label}
            </Tag>
          )}

          <Button icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Button>
        </div>
      </Header>

      <Content className="px-4 py-6 sm:px-6">
        <Card className="mb-6 border border-moss/10 shadow-sm">
          <div className="mb-2 text-sm uppercase tracking-[0.2em] text-moss">
            {dashboardConfig.label}
          </div>
          <h1 className="mb-2 text-3xl font-semibold text-forest">
            {dashboardConfig.title}
          </h1>
          <p className="max-w-2xl text-base text-moss">
            {dashboardConfig.subtitle}
          </p>
        </Card>

        <Row gutter={[16, 16]} className="mb-6">
          {dashboardConfig.stats.map((stat) => (
            <Col xs={24} sm={12} lg={6} key={stat.label}>
              <Card className="h-full border border-moss/10 shadow-sm">
                <Statistic title={stat.label} value={stat.value} />
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card
              title="What you can do next"
              className="h-full border border-moss/10 shadow-sm"
            >
              <div className="flex flex-wrap gap-3">
                {dashboardConfig.actions.map((action) => (
                  <Button key={action} type="primary">
                    {action}
                  </Button>
                ))}
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card
              title="Session"
              className="h-full border border-moss/10 shadow-sm"
            >
              <div className="space-y-3 text-sm text-moss">
                <p>
                  Signed in as{" "}
                  <span className="font-medium text-forest">{user?.email}</span>
                </p>
                <p>
                  Active role:{" "}
                  <span className="font-medium text-forest capitalize">
                    {resolvedRole}
                  </span>
                </p>
                <p>
                  Available roles:{" "}
                  <span className="font-medium text-forest">
                    {roles.length || 1}
                  </span>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
