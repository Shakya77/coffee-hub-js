"use client";

import { Layout, Tag, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "@/context/AuthContext";
import { RoleSwitcher } from "@/components/dashboards/RoleSwitcher";
import { getDashboardRoleConfig } from "@/constants/dashboard-config";

const { Header } = Layout;

export function DashboardHeader() {
  const { user, logout, activeRole } = useAuth();
  const dashboardConfig = getDashboardRoleConfig(activeRole);

  return (
    <Header className="flex h-16 items-center justify-between border-b border-moss/10 bg-white/80 px-6 backdrop-blur">
      <div>
        <div className="text-lg font-semibold text-forest">Coffee Hub</div>
        <div className="text-xs text-moss">{dashboardConfig.label}</div>
      </div>

      <div className="flex items-center gap-3">
        <Tag color="green" className="m-0 px-3 py-1 capitalize">
          {dashboardConfig.label}
        </Tag>

        <RoleSwitcher />

        <Button icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Button>
      </div>
    </Header>
  );
}
