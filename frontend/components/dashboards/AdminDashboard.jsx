"use client";

import { useState } from "react";
import { Layout, Menu, Card, Row, Col, Statistic, Button } from "antd";
import { getDashboardRoleConfig } from "@/constants/dashboard-config";
import { getSiderMenuForRole } from "@/constants/sider-menu-config";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { useAuth } from "@/context/AuthContext";

const { Content, Sider } = Layout;

export function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const dashboardConfig = getDashboardRoleConfig("admin");
  const siderMenu = getSiderMenuForRole("admin");

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="min-h-screen">
      <DashboardHeader />

      <Layout className="flex-1">
        <Sider
          width={200}
          collapsible
          collapsedWidth={80}
          collapsed={collapsed}
          onCollapse={setCollapsed}
          className="bg-white border-r border-moss/10"
          theme="light"
        >
          <div className="flex items-center justify-center gap-2 p-4">
            {!collapsed && (
              <span className="text-sm font-semibold text-forest">Menu</span>
            )}
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            items={siderMenu}
            className="border-r-0"
          />
        </Sider>

        <Content className="px-6 py-8 sm:px-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-semibold text-forest">
              {dashboardConfig.title}
            </h1>
            <p className="max-w-2xl text-base text-moss">
              {dashboardConfig.subtitle}
            </p>
          </div>

          <Row gutter={[16, 16]} className="mb-8">
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
                    <span className="font-medium text-forest">
                      {user?.email}
                    </span>
                  </p>
                  <p>
                    Role:{" "}
                    <span className="font-medium text-forest capitalize">
                      admin
                    </span>
                  </p>
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
