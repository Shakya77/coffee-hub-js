"use client";

import { Card, Row, Col, Statistic, Button } from "antd";
import { useAuth } from "@/context/AuthContext";

const adminStats = [
  { label: "Total Users", value: "1,234" },
  { label: "Active Roles", value: "4" },
  { label: "Transactions", value: "456" },
  { label: "Pending Reviews", value: "12" },
];

const adminActions = ["Manage Users", "View Reports", "System Settings"];

export function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-semibold text-forest">
          Admin Dashboard
        </h1>
        <p className="max-w-2xl text-base text-moss">
          Oversee users, roles, content, and platform health.
        </p>
      </div>

      <Row gutter={[16, 16]} className="mb-8">
        {adminStats.map((stat) => (
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
              {adminActions.map((action) => (
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
