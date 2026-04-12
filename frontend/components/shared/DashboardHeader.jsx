"use client";

import { Layout, Button, theme, Avatar, Dropdown } from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import {
  dashboardForRole,
  getUserRouteSlug,
  useAuth,
} from "@/context/AuthContext";
import { getRoleLabelForRole } from "@/constants/sider-menu-config";

const { Header } = Layout;

const dropdownStyles = {
  root: {
    backgroundColor: "#fff",
    border: "1px solid rgba(45, 63, 42, 0.12)",
    borderRadius: 14,
    boxShadow: "0 18px 48px -24px rgba(45, 63, 42, 0.35)",
    overflow: "hidden",
  },
  item: {
    padding: "10px 14px",
    fontSize: 14,
  },
  itemTitle: {
    fontWeight: 500,
  },
  itemIcon: {
    color: "#3f5b3a",
    marginInlineEnd: 8,
  },
  itemContent: {
    backgroundColor: "transparent",
  },
};

function getUserDisplayName(user) {
  return (
    user?.name || user?.fullName || user?.username || user?.email || "Account"
  );
}

function getUserEmail(user) {
  return user?.email || getUserDisplayName(user);
}

export function DashboardHeader({ collapsed, setCollapsed }) {
  const router = useRouter();
  const { user, logout, activeRole, roles, switchRole } = useAuth();
  const userSlug = getUserRouteSlug(user);
  const activeRoleLabel = getRoleLabelForRole(activeRole);

  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

  const handleRoleSwitch = (roleSlug) => {
    switchRole(roleSlug);
    router.push(dashboardForRole(roleSlug, userSlug));
  };

  const roleMenuItems =
    roles?.map((role) => ({
      key: role.slug,
      label: role.name || role.slug,
      onClick: () => handleRoleSwitch(role.slug),
    })) || [];

  const menuItems = [
    ...(roleMenuItems.length > 1
      ? [
          {
            key: "role",
            label: "Switch Role",
            children: roleMenuItems,
          },
          {
            type: "divider",
          },
        ]
      : []),
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: logout,
    },
  ];

  const userDisplayName = getUserDisplayName(user);
  const userEmail = getUserEmail(user);

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        borderBottom: `1px solid ${colorBorderSecondary}`,
      }}
    >
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
            <div className="text-xs text-moss">{activeRoleLabel}</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right leading-tight">
            <div className="text-sm font-medium text-forest">{userEmail}</div>
            <div className="text-xs text-moss">{activeRoleLabel}</div>
          </div>
          <Dropdown
            menu={{ items: menuItems }}
            placement="bottomRight"
            trigger={["click"]}
            styles={dropdownStyles}
          >
            <Button
              type="text"
              aria-label={`Open account menu for ${userDisplayName}`}
              className="flex h-12 w-12 items-center justify-center rounded-full p-0 hover:bg-[rgba(63,91,58,0.08)]"
              style={{ color: "#2d3f2a" }}
              icon={<UserOutlined />}
            ></Button>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}
