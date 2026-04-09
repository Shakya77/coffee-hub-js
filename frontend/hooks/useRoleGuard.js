import { useAuth } from "@/context/AuthContext";

export function useRoleGuard(requiredRole) {
  const { activeRole, roles, user } = useAuth();

  const isAuthorized = () => {
    if (!activeRole) return false;
    if (!requiredRole) return true;

    // If requiredRole is an array, check if activeRole is in it
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(activeRole);
    }

    // If requiredRole is a string, check direct match
    return activeRole === requiredRole;
  };

  const userHasRole = (role) => {
    if (!roles || roles.length === 0) return false;
    return roles.some((r) => r.slug === role);
  };

  return {
    isAuthorized: isAuthorized(),
    activeRole,
    roles,
    user,
    userHasRole,
  };
}
