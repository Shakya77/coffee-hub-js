"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";
import { usePathname } from "next/navigation";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { getUserRouteSlug, useAuth } from "@/context/AuthContext";
import { getSiderMenuForRole } from "@/constants/sider-menu-config";

const { Content, Sider } = Layout;

export function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { activeRole, user } = useAuth();
  const pathname = usePathname();
  const userSlug = getUserRouteSlug(user);

  const siderMenu = getSiderMenuForRole(activeRole, userSlug);

  const siderStyle = {
    overflow: "auto",
    height: "100vh",
    position: "sticky",
    insetInlineStart: 0,
    top: 0,
  };

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
    <Layout className="">
      <Sider
        width={250}
        collapsible
        collapsedWidth={80}
        collapsed={collapsed}
        trigger={null}
        className="bg-white border-r border-moss/10"
        theme="light"
        style={siderStyle}
      >
        <div className="flex items-center justify-center gap-2 p-4">
          <span className="text-sm font-semibold text-forest">Menu</span>
        </div>
        <Menu
          mode="inline"
          items={siderMenu}
          selectedKeys={selectedKey ? [selectedKey] : []}
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
