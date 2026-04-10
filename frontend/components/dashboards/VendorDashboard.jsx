"use client";

import { Card, Row, Col, Statistic, Button } from "antd";
import { getDashboardRoleConfig } from "@/constants/dashboard-config";
import { useAuth } from "@/context/AuthContext";

export function VendorDashboard() {
  const { user } = useAuth();
  const dashboardConfig = getDashboardRoleConfig("vendor");

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

      <Card
        title="Opportunities"
        className="mb-8 border border-moss/10 shadow-sm"
      >
        <div className="flex flex-wrap gap-3">
          {dashboardConfig.actions.map((action) => (
            <Button key={action} type="primary" size="large">
              {action}
            </Button>
          ))}
        </div>
      </Card>

      <Card
        title="Job Opportunities for You"
        className="mb-8 border border-moss/10 shadow-sm"
      >
        <p className="text-moss">
          You have {dashboardConfig.stats[0]?.value} available opportunities.
        </p>
        <Row gutter={[16, 16]} className="mt-4">
          <Col xs={24}>
            <p className="text-sm text-gray-600">
              Browse and apply for jobs that match your skills and interests.
            </p>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Card className="h-full border border-moss/10 shadow-sm">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-forest">Account</p>
              <p className="text-xs text-moss">Logged in as:</p>
              <p className="text-sm font-medium text-forest">{user?.email}</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card className="h-full border border-moss/10 shadow-sm">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-forest">Stats</p>
              <p className="text-xs text-moss">
                Completed: {dashboardConfig.stats[2]?.value || "42"} tasks
              </p>
              <p className="text-xs text-moss">Rating: ⭐⭐⭐⭐⭐</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
