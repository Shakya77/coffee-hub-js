"use client";

import { Card, Row, Col, Statistic, Button } from "antd";
import { useAuth } from "@/context/AuthContext";

const vendorStats = [
  { label: "Available Jobs", value: "15" },
  { label: "Applied Jobs", value: "5" },
  { label: "Completed Tasks", value: "42" },
  { label: "Saved Jobs", value: "6" },
];

const vendorActions = ["Browse Jobs", "My Applications", "My Profile"];

export function VendorDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-semibold text-forest">
          Vendor Dashboard
        </h1>
        <p className="max-w-2xl text-base text-moss">
          Browse opportunities and manage your active applications.
        </p>
      </div>

      <Row gutter={[16, 16]} className="mb-8">
        {vendorStats.map((stat) => (
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
          {vendorActions.map((action) => (
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
          You have {vendorStats[0]?.value} available opportunities.
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
                Completed: {vendorStats[2]?.value || "42"} tasks
              </p>
              <p className="text-xs text-moss">Rating: ⭐⭐⭐⭐⭐</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
