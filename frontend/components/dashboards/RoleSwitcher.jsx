"use client";

import { Dropdown, Button } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { message } from "antd";
import { useAuth } from "@/context/AuthContext";

export function RoleSwitcher() {
  const { roles, activeRole, switchRole, addRoleToCurrentUser } = useAuth();
  const [isAddingRole, setIsAddingRole] = useState(false);

  const roleSlugs = useMemo(
    () => (roles ?? []).map((role) => role.slug),
    [roles],
  );

  const roleToAdd = useMemo(() => {
    const hasFarmer = roleSlugs.includes("farmer");
    const hasVendor = roleSlugs.includes("vendor");

    if (hasFarmer && !hasVendor) return "vendor";
    if (hasVendor && !hasFarmer) return "farmer";
    return null;
  }, [roleSlugs]);

  if (!roles || roles.length === 0) {
    return null;
  }

  const menuItems = roles.map((role) => ({
    key: role.slug,
    label: role.name || role.slug,
  }));

  return (
    <div className="flex items-center gap-2">
      {roleToAdd ? (
        <Button
          type="default"
          loading={isAddingRole}
          onClick={async () => {
            try {
              setIsAddingRole(true);
              await addRoleToCurrentUser(roleToAdd);
              message.success(`Added ${roleToAdd} role to your account`);
            } catch (err) {
              message.error(
                err?.response?.data?.message ||
                  err?.message ||
                  "Failed to add role",
              );
            } finally {
              setIsAddingRole(false);
            }
          }}
          className="capitalize"
        >
          Add {roleToAdd} Role
        </Button>
      ) : null}

      {roles.length > 1 ? (
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
      ) : null}
    </div>
  );
}
