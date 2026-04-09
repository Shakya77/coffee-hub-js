"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "@/lib/api";
import { getDashboardRoleConfig } from "@/constants/dashboard-config";

const AuthContext = createContext(null);

function decodeToken(token) {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function rolesFromToken(decoded) {
  if (!decoded) return [];

  const tokenRoles = Array.isArray(decoded.roles)
    ? decoded.roles
    : decoded.role
      ? [decoded.role]
      : [];

  const uniqueTokenRoles = [...new Set(tokenRoles.filter(Boolean))];
  return uniqueTokenRoles.map((slug) => ({
    slug,
    name: getDashboardRoleConfig(slug).label,
  }));
}

export function dashboardForRole(role, _slug) {
  return role === "admin" ? "/admin" : "/dashboard";
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [activeRole, setActiveRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshRoles = async (preferredRole = null) => {
    const { data } = await api.get("/auth/roles");
    const fetchedRoles = data?.roles ?? [];

    if (fetchedRoles.length === 0) {
      return [];
    }

    setRoles(fetchedRoles);

    const currentRole =
      preferredRole || activeRole || localStorage.getItem("activeRole");
    const roleExists = fetchedRoles.some(
      (roleItem) => roleItem.slug === currentRole,
    );
    const nextRole =
      (roleExists && currentRole) || fetchedRoles[0]?.slug || currentRole;

    setActiveRole(nextRole || null);
    if (nextRole) {
      localStorage.setItem("activeRole", nextRole);
    }

    return fetchedRoles;
  };

  const addRoleToCurrentUser = async (roleSlug, details = {}) => {
    if (!user?.id) {
      throw new Error("User is not available");
    }

    const rolesResponse = await api.get("/roles?isActive=true");
    const availableRoles = Array.isArray(rolesResponse?.data)
      ? rolesResponse.data
      : [];

    const targetRole = availableRoles.find((roleItem) => {
      const slugOrName = (roleItem?.slug || roleItem?.name || "")
        .toString()
        .toLowerCase();
      return slugOrName === roleSlug.toLowerCase();
    });

    if (!targetRole?.id) {
      throw new Error(`Role '${roleSlug}' not found`);
    }

    await api.post("/user-has-roles", {
      userId: user.id,
      roleId: targetRole.id,
      ...details,
    });

    await refreshRoles(activeRole || roleSlug);
    return roleSlug;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedActiveRole = localStorage.getItem("activeRole");
      const decoded = decodeToken(storedToken);
      const decodedRoles = rolesFromToken(decoded);

      setToken(storedToken);
      setUser(decoded);
      setRoles(decodedRoles);

      if (!storedToken) {
        setRoles([]);
        setActiveRole(null);
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/roles");
        const fetchedRoles = data?.roles ?? [];
        setRoles(fetchedRoles.length > 0 ? fetchedRoles : decodedRoles);

        const sourceRoles =
          fetchedRoles.length > 0 ? fetchedRoles : decodedRoles;
        const roleExists = sourceRoles.some(
          (roleItem) => roleItem.slug === storedActiveRole,
        );
        const nextRole =
          (roleExists && storedActiveRole) ||
          decoded?.role ||
          decoded?.roles?.[0] ||
          sourceRoles[0]?.slug ||
          null;

        setActiveRole(nextRole);

        if (nextRole) {
          localStorage.setItem("activeRole", nextRole);
        }
      } catch {
        const fallbackRole =
          storedActiveRole || decoded?.role || decoded?.roles?.[0] || null;
        setRoles(
          decodedRoles.length > 0
            ? decodedRoles
            : fallbackRole
              ? [
                  {
                    slug: fallbackRole,
                    name: getDashboardRoleConfig(fallbackRole).label,
                  },
                ]
              : [],
        );
        setActiveRole(fallbackRole);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (newToken) => {
    if (!newToken) return null;
    localStorage.setItem("token", newToken);
    const decoded = decodeToken(newToken);
    const decodedRoles = rolesFromToken(decoded);
    setToken(newToken);
    setUser(decoded);
    setRoles(decodedRoles);
    const initialRole =
      decoded?.role || decoded?.roles?.[0] || decodedRoles[0]?.slug;
    setActiveRole(initialRole);
    if (initialRole) {
      localStorage.setItem("activeRole", initialRole);
    }

    try {
      const { data } = await api.get("/auth/roles");
      const fetchedRoles = data?.roles ?? [];
      if (fetchedRoles.length > 0) {
        setRoles(fetchedRoles);

        const roleExists = fetchedRoles.some(
          (roleItem) => roleItem.slug === initialRole,
        );
        const nextRole =
          (roleExists && initialRole) || fetchedRoles[0]?.slug || initialRole;

        setActiveRole(nextRole);
        if (nextRole) {
          localStorage.setItem("activeRole", nextRole);
        }
      }
    } catch (err) {
      console.error("Failed to fetch user roles:", err);
    }

    return decoded;
  };

  const switchRole = (roleSlug) => {
    setActiveRole(roleSlug);
    localStorage.setItem("activeRole", roleSlug);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("activeRole");
    setToken(null);
    setUser(null);
    setRoles([]);
    setActiveRole(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      roles,
      activeRole,
      loading,
      login,
      logout,
      switchRole,
      refreshRoles,
      addRoleToCurrentUser,
    }),
    [token, user, roles, activeRole, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
