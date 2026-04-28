"use client";

import { useEffect, useState } from "react";
import { Layout, Button, theme, Dropdown, Modal } from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import {
  dashboardForRole,
  getUserRouteSlug,
  useAuth,
} from "@/context/AuthContext";
import { getRoleLabelForRole } from "@/constants/sider-menu-config";
import Loader from "@/components/Loader";

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
  const pathname = usePathname();
  const userSlug = getUserRouteSlug(user);
  const activeRoleLabel = getRoleLabelForRole(activeRole);
  const [isRoleSwitchModalOpen, setIsRoleSwitchModalOpen] = useState(false);
  const [selectedRoleSlug, setSelectedRoleSlug] = useState("");
  const [pendingRolePath, setPendingRolePath] = useState("");
  const [logoutStep, setLogoutStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

  useEffect(() => {
    if (isTransitioning && pendingRolePath && pathname === pendingRolePath) {
      setIsTransitioning(false);
      setPendingRolePath("");
    }
  }, [isTransitioning, pendingRolePath, pathname]);

  useEffect(() => {
    if (isRoleSwitchModalOpen) {
      setSelectedRoleSlug(activeRole || roles?.[0]?.slug || "");
    }
  }, [activeRole, isRoleSwitchModalOpen, roles]);

  const openRoleSwitchModal = () => {
    setIsRoleSwitchModalOpen(true);
  };

  const confirmRoleSwitch = () => {
    if (!selectedRoleSlug) {
      return;
    }

    const nextPath = dashboardForRole(selectedRoleSlug, userSlug);
    setIsTransitioning(true);
    setPendingRolePath(nextPath);
    setIsRoleSwitchModalOpen(false);
    switchRole(selectedRoleSlug);
    router.push(nextPath);
  };

  const openLogoutConfirm = () => {
    setLogoutStep(1);
  };

  const closeLogoutConfirm = () => {
    setLogoutStep(0);
  };

  const goToLogoutFinalConfirm = () => {
    setLogoutStep(2);
  };

  const confirmLogout = () => {
    setIsTransitioning(true);
    logout();
    setLogoutStep(0);
    router.push("/login");
  };

  const roleMenuItems =
    roles?.length > 0
      ? [
          {
            key: "switch-role",
            label: "Switch Role",
            onClick: openRoleSwitchModal,
          },
        ]
      : [];

  const menuItems = [
    ...(roleMenuItems.length > 0
      ? [...roleMenuItems, { type: "divider" }]
      : []),
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: openLogoutConfirm,
    },
  ];

  const userDisplayName = getUserDisplayName(user);
  const userEmail = getUserEmail(user);

  return (
    <>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          borderBottom: `1px solid ${colorBorderSecondary}`,
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
        }}
      >
        <div className="flex h-full items-center justify-between px-4">
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
              disabled={isTransitioning}
            />
            <div>
              <div className="text-lg font-semibold text-forest">
                Coffee Hub
              </div>
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
              disabled={isTransitioning}
            >
              <Button
                type="text"
                aria-label={`Open account menu for ${userDisplayName}`}
                className="flex h-12 w-12 items-center justify-center rounded-full p-0 hover:bg-[rgba(63,91,58,0.08)]"
                style={{ color: "#2d3f2a" }}
                icon={<UserOutlined />}
                disabled={isTransitioning}
              />
            </Dropdown>
          </div>
        </div>
      </Header>

      <Modal
        open={isRoleSwitchModalOpen}
        onCancel={() => setIsRoleSwitchModalOpen(false)}
        onOk={confirmRoleSwitch}
        okText="Switch role"
        cancelText="Cancel"
        centered
        confirmLoading={isTransitioning}
        okButtonProps={{ disabled: !selectedRoleSlug }}
        title="Switch role"
      >
        <p className="mb-4 text-sm text-forest">
          Pick the dashboard you want to open.
        </p>
        <div className="grid gap-2">
          {roles?.map((role) => {
            const isSelected = selectedRoleSlug === role.slug;

            return (
              <Button
                key={role.slug}
                type={isSelected ? "primary" : "default"}
                className="justify-start"
                onClick={() => setSelectedRoleSlug(role.slug)}
                disabled={isTransitioning}
              >
                {role.name || role.slug}
              </Button>
            );
          })}
        </div>
      </Modal>

      <Modal
        open={logoutStep === 1}
        onCancel={closeLogoutConfirm}
        onOk={goToLogoutFinalConfirm}
        okText="Continue"
        cancelText="Cancel"
        centered
        title="Sign out?"
      >
        <p className="mb-2 text-sm text-forest">
          This will end your current session on this device.
        </p>
        <p className="text-sm text-moss">
          Choose continue to open the final confirmation.
        </p>
      </Modal>

      <Modal
        open={logoutStep === 2}
        onCancel={() => setLogoutStep(1)}
        onOk={confirmLogout}
        okText="Sign out"
        cancelText="Back"
        centered
        confirmLoading={isTransitioning}
        okButtonProps={{ danger: true }}
        title="Confirm sign out"
      >
        <p className="mb-2 text-sm text-forest">
          Are you sure you want to sign out now?
        </p>
        <p className="text-sm text-moss">
          You will be taken back to the login screen.
        </p>
      </Modal>

      {isTransitioning ? <Loader /> : null}
    </>
  );
}
