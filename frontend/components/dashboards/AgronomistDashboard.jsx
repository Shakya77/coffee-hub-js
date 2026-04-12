"use client";

import { Card, Row, Col, Statistic, Button } from "antd";
import { useAuth } from "@/context/AuthContext";

const agronomistStats = [
  { label: "Consultations", value: "8" },
  { label: "Pending Questions", value: "23" },
  { label: "Articles Published", value: "15" },
  { label: "Saved Resources", value: "9" },
];

const agronomistActions = [
  "Answer Questions",
  "Write Article",
  "View Consultations",
];

export function AgronomistDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-semibold text-forest">
          Agronomist Dashboard
        </h1>
        <p className="max-w-2xl text-base text-moss">
          Support farmers with advice, consultations, and resources.
        </p>
      </div>

      <Row gutter={[16, 16]} className="mb-8">
        {agronomistStats.map((stat) => (
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
              {agronomistActions.map((action) => (
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
                  agronomist
                </span>
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
