"use client";

import { Dropdown, Button } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { useAuth } from "@/context/AuthContext";

export function RoleSwitcher() {
  const { roles, activeRole, switchRole } = useAuth();

  if (!roles || roles.length <= 1) {
    return null;
  }

  const menuItems = roles.map((role) => ({
    key: role.slug,
    label: role.name || role.slug,
  }));

  return (
    <Dropdown
      menu={{
        items: menuItems,
        onClick: ({ key }) => switchRole(key),
        selectedKeys: [activeRole],
      }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Button icon={<SwapOutlined />} type="primary" className="capitalize">
        Switch Role
      </Button>
    </Dropdown>
  );
}
