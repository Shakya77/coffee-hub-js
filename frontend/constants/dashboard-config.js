export const dashboardRoleConfigs = {
  admin: {
    label: "Admin",
    title: "Admin Dashboard",
    subtitle: "Oversee users, roles, content, and platform health.",
    accent: "from-amber-50 via-white to-orange-50",
    stats: [
      { label: "Total Users", value: "1,234" },
      { label: "Active Roles", value: "4" },
      { label: "Transactions", value: "456" },
      { label: "Pending Reviews", value: "12" },
    ],
    actions: ["Manage Users", "View Reports", "System Settings"],
  },
  agronomist: {
    label: "Agronomist",
    title: "Agronomist Dashboard",
    subtitle: "Support farmers with advice, consultations, and resources.",
    accent: "from-emerald-50 via-white to-teal-50",
    stats: [
      { label: "Consultations", value: "8" },
      { label: "Pending Questions", value: "23" },
      { label: "Articles Published", value: "15" },
      { label: "Saved Resources", value: "9" },
    ],
    actions: ["Answer Questions", "Write Article", "View Consultations"],
  },
  farmer: {
    label: "Farmer",
    title: "Farmer Dashboard",
    subtitle: "Post tasks, review applications, and connect with workers.",
    accent: "from-lime-50 via-white to-emerald-50",
    stats: [
      { label: "Active Tasks", value: "3" },
      { label: "Pending Applications", value: "7" },
      { label: "Resources Available", value: "12" },
      { label: "Draft Posts", value: "4" },
    ],
    actions: ["Post New Task", "View Applications", "Browse Resources"],
  },
  vendor: {
    label: "Vendor",
    title: "Vendor Dashboard",
    subtitle: "Browse opportunities and manage your active applications.",
    accent: "from-sky-50 via-white to-cyan-50",
    stats: [
      { label: "Available Jobs", value: "15" },
      { label: "Applied Jobs", value: "5" },
      { label: "Completed Tasks", value: "42" },
      { label: "Saved Jobs", value: "6" },
    ],
    actions: ["Browse Jobs", "My Applications", "My Profile"],
  },
  user: {
    label: "User",
    title: "Dashboard",
    subtitle: "Your Coffee Hub workspace.",
    accent: "from-stone-50 via-white to-neutral-50",
    stats: [
      { label: "Workspace", value: "Active" },
      { label: "Roles", value: "1+" },
      { label: "Notifications", value: "0" },
      { label: "Saved Items", value: "0" },
    ],
    actions: ["Open Profile", "Explore", "Logout"],
  },
};

export const getDashboardRoleConfig = (role) =>
  dashboardRoleConfigs[role] ?? dashboardRoleConfigs.user;
