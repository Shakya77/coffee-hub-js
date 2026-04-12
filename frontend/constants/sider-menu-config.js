import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  BookOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { normalizeRole } from "./index";
import Link from "next/link";

export const roleLabelConfig = {
  admin: "Admin",
  agronomist: "Agronomist",
  farmer: "Farmer",
  vendor: "Vendor",
  user: "User",
};

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function makeRolePath(role, userSlug, path) {
  if (!role || !userSlug) {
    return "/";
  }

  return `/${role}/${userSlug}/${path}`;
}

export const getSiderMenuForRole = (role, userSlug) => {
  const normalizedRole = normalizeRole(role);
  const dashboardPath = makeRolePath(normalizedRole, userSlug, "dashboard");

  const menuByRole = {
    admin: [
      getItem(
        <Link href={dashboardPath}>Dashboard</Link>,
        dashboardPath,
        <DashboardOutlined />,
      ),
      getItem("Users", "users", <UserOutlined />),
      getItem("Reports", "reports", <FileTextOutlined />),
      getItem("Settings", "settings", <SettingOutlined />),
    ],
    agronomist: [
      getItem(
        <Link href={dashboardPath}>Dashboard</Link>,
        dashboardPath,
        <DashboardOutlined />,
      ),
      getItem(
        <Link href={makeRolePath(normalizedRole, userSlug, "blog")}>
          Blogs
        </Link>,
        makeRolePath(normalizedRole, userSlug, "blog"),
        <FileTextOutlined />,
      ),
      getItem("Articles", "articles", <BookOutlined />),
      getItem("Resources", "resources", <ShoppingOutlined />),
    ],
    farmer: [
      getItem(
        <Link href={dashboardPath}>Dashboard</Link>,
        dashboardPath,
        <DashboardOutlined />,
      ),
    ],
    vendor: [
      getItem(
        <Link href={dashboardPath}>Dashboard</Link>,
        dashboardPath,
        <DashboardOutlined />,
      ),
      getItem("Browse Jobs", "browse-jobs", <ShoppingOutlined />),
      getItem("My Applications", "applications", <CheckCircleOutlined />),
      getItem("My Profile", "profile", <UserOutlined />),
    ],
  };

  return menuByRole[normalizedRole] || menuByRole.farmer;
};

export const getRoleLabelForRole = (role) =>
  roleLabelConfig[normalizeRole(role)] || roleLabelConfig.user;
