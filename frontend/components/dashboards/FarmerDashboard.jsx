"use client";

import { Card, Row, Col, Statistic, Button } from "antd";
import { useAuth } from "@/context/AuthContext";

const farmerStats = [
  { label: "Active Tasks", value: "3" },
  { label: "Pending Applications", value: "7" },
  { label: "Resources Available", value: "12" },
  { label: "Draft Posts", value: "4" },
];

const farmerActions = [
  "Post New Task",
  "View Applications",
  "Browse Resources",
];

export function FarmerDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-semibold text-forest">
          Farmer Dashboard
        </h1>
        <p className="max-w-2xl text-base text-moss">
          Post tasks, review applications, and connect with workers.
        </p>
      </div>

      <Row gutter={[16, 16]} className="mb-8">
        {farmerStats.map((stat) => (
          <Col xs={24} sm={12} lg={6} key={stat.label}>
            <Card className="h-full border border-moss/10 shadow-sm">
              <Statistic title={stat.label} value={stat.value} />
            </Card>
          </Col>
        ))}
      </Row>

      <Card
        title="Quick Actions"
        className="mb-8 border border-moss/10 shadow-sm"
      >
        <div className="flex flex-wrap gap-3">
          {farmerActions.map((action) => (
            <Button key={action} type="primary" size="large">
              {action}
            </Button>
          ))}
        </div>
      </Card>

      <Card
        title="Your Active Tasks"
        className="mb-8 border border-moss/10 shadow-sm"
      >
        <p className="text-moss">
          You have {farmerStats[0]?.value} active tasks.
        </p>
        <Row gutter={[16, 16]} className="mt-4">
          <Col xs={24}>
            <p className="text-sm text-gray-600">
              Use the quick actions above to manage your tasks and connect with
              workers.
            </p>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Card className="h-full border border-moss/10 shadow-sm">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-forest">Your Profile</p>
              <p className="text-xs text-moss">Signed in as:</p>
              <p className="text-sm font-medium text-forest">{user?.email}</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
