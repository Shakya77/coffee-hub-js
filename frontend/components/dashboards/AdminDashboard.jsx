"use client";

import { Card, Row, Col, Statistic, Button } from "antd";
import { getDashboardRoleConfig } from "@/constants/dashboard-config";
import { useAuth } from "@/context/AuthContext";

export function AdminDashboard() {
  const { user } = useAuth();
  const dashboardConfig = getDashboardRoleConfig("admin");

  return (
    <div>
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
    </div>
  );
}
