import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  BookOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

export const siderMenuConfig = {
  admin: [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      key: "users",
      label: "Users",
      icon: <UserOutlined />,
    },
    {
      key: "reports",
      label: "Reports",
      icon: <FileTextOutlined />,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <SettingOutlined />,
    },
  ],
  agronomist: [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      key: "consultations",
      label: "Consultations",
      icon: <CheckCircleOutlined />,
    },
    {
      key: "articles",
      label: "Articles",
      icon: <BookOutlined />,
    },
    {
      key: "resources",
      label: "Resources",
      icon: <ShoppingOutlined />,
    },
  ],
  farmer: [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      key: "post-task",
      label: "Post Task",
      icon: <PlusOutlined />,
    },
    {
      key: "applications",
      label: "Applications",
      icon: <CheckCircleOutlined />,
    },
    {
      key: "resources",
      label: "Resources",
      icon: <ShoppingOutlined />,
    },
  ],
  vendor: [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      key: "browse-jobs",
      label: "Browse Jobs",
      icon: <ShoppingOutlined />,
    },
    {
      key: "applications",
      label: "My Applications",
      icon: <CheckCircleOutlined />,
    },
    {
      key: "profile",
      label: "My Profile",
      icon: <UserOutlined />,
    },
  ],
};

export const getSiderMenuForRole = (role) =>
  siderMenuConfig[role] || siderMenuConfig.farmer;
