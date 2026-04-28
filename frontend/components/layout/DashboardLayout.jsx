"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { getUserRouteSlug, useAuth } from "@/context/AuthContext";
import { getSiderMenuForRole } from "@/constants/sider-menu-config";
import { usePathname } from "next/navigation";

const { Content, Sider } = Layout;

export function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { activeRole, user } = useAuth();
  const pathname = usePathname();
  const userSlug = getUserRouteSlug(user);

  const siderMenu = getSiderMenuForRole(activeRole, userSlug);

  const routeKeys = siderMenu
    .flatMap((item) => [
      item?.key,
      ...(item?.children?.map((child) => child?.key) || []),
    ])
    .filter((key) => typeof key === "string" && key.startsWith("/"));

  const selectedKey =
    routeKeys
      .filter((key) => pathname === key || pathname.startsWith(`${key}/`))
      .sort((a, b) => b.length - a.length)[0] || "";

  return (
    <Layout className="min-h-screen bg-cream">
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        className="bg-white! border-r border-forest/10"
      >
        <div className="flex items-center justify-center gap-2 border-b border-forest/10 p-4">
          <span className="text-sm font-semibold text-forest">Menu</span>
        </div>
        <Menu
          mode="vertical"
          items={siderMenu}
          selectedKeys={selectedKey ? [selectedKey] : []}
          className="border-r-0 bg-white!"
        />
      </Sider>
      <Layout className="min-h-screen">
        <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        <Content className="bg-white px-6 py-8 sm:px-8">{children}</Content>
      </Layout>
    </Layout>
  );
}
