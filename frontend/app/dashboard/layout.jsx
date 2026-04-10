"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { useAuth } from "@/context/AuthContext";
import { getSiderMenuForRole } from "@/constants/sider-menu-config";

const { Content, Sider } = Layout;

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { activeRole, roles } = useAuth();

  const role = activeRole || roles?.[0]?.slug || "user";
  const siderMenu = getSiderMenuForRole(role);

  return (
    <Layout className="">
      <Sider
        width={250}
        collapsible
        collapsedWidth={80}
        collapsed={collapsed}
        trigger={null}
        className="bg-white border-r border-moss/10"
        theme="light"
      >
        <div className="flex items-center justify-center gap-2 p-4">
          <span className="text-sm font-semibold text-forest">Menu</span>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={siderMenu}
          className="border-r-0"
        />
      </Sider>
      <Layout className="min-h-screen">
        <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        <Content className="px-6 py-8 sm:px-8 bg-gray-50/50">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
