"use client";

import { Layout, Card, Row, Col, Statistic, Button, Menu } from "antd";
import { getDashboardRoleConfig } from "@/constants/dashboard-config";
import { getSiderMenuForRole } from "@/constants/sider-menu-config";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { useAuth } from "@/context/AuthContext";

const { Content } = Layout;

export function FarmerDashboard() {
  const { user } = useAuth();
  const dashboardConfig = getDashboardRoleConfig("farmer");
  const siderMenu = getSiderMenuForRole("farmer");

  return (
    <Layout className="min-h-screen bg-linear-to-br from-lime-50 via-white to-emerald-50">
      <DashboardHeader />

      <Content className="px-4 py-6 sm:px-6">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-semibold text-forest">
            {dashboardConfig.title}
          </h1>
          <p className="max-w-2xl text-base text-moss">
            {dashboardConfig.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-8">
          <div className="lg:col-span-3">
            <Row gutter={[16, 16]}>
              {dashboardConfig.stats.map((stat) => (
                <Col xs={24} sm={12} lg={6} key={stat.label}>
                  <Card className="h-full border border-moss/10 shadow-sm bg-white/90">
                    <Statistic title={stat.label} value={stat.value} />
                  </Card>
                </Col>
              ))}
            </Row>

            <Card
              title="Quick Actions"
              className="mt-6 border border-moss/10 shadow-sm bg-white/90"
            >
              <div className="flex flex-wrap gap-3">
                {dashboardConfig.actions.map((action) => (
                  <Button key={action} type="primary" size="large">
                    {action}
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card
              title="Navigation"
              className="h-full border border-moss/10 shadow-sm bg-white/90"
            >
              <Menu
                mode="vertical"
                defaultSelectedKeys={["dashboard"]}
                items={siderMenu.slice(0, 4)}
                className="border-0"
              />
            </Card>
          </div>
        </div>

        <Card
          title="Your Active Tasks"
          className="border border-moss/10 shadow-sm bg-white/90"
        >
          <p className="text-moss">
            You have {dashboardConfig.stats[0]?.value} active tasks.
          </p>
          <Row gutter={[16, 16]} className="mt-4">
            <Col xs={24}>
              <p className="text-sm text-gray-600">
                Use the quick actions above to manage your tasks and connect
                with workers.
              </p>
            </Col>
          </Row>
        </Card>

        <Row gutter={[16, 16]} className="mt-6">
          <Col xs={24} sm={12}>
            <Card className="h-full border border-moss/10 shadow-sm bg-white/90">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-forest">
                  Your Profile
                </p>
                <p className="text-xs text-moss">Signed in as:</p>
                <p className="text-sm font-medium text-forest">{user?.email}</p>
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
