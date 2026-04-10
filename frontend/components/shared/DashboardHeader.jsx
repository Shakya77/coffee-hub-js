"use client";

import { Layout, Button, theme } from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/context/AuthContext";
import { RoleSwitcher } from "@/components/dashboards/RoleSwitcher";
import { getDashboardRoleConfig } from "@/constants/dashboard-config";

const { Header } = Layout;

export function DashboardHeader({ collapsed, setCollapsed }) {
  const { user, logout, activeRole } = useAuth();
  const dashboardConfig = getDashboardRoleConfig(activeRole);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div>
            <div className="text-lg font-semibold text-forest">Coffee Hub</div>
            <div className="text-xs text-moss">{dashboardConfig.label}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <RoleSwitcher />
          <Button icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </Header>
  );
}
