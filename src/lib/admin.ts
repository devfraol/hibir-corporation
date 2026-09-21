import type { AdminRole } from "@/types/database";

export const ADMIN_ROLES = ["super_admin", "admin", "editor"] as const;

export type AdminCapability = "access_admin" | "manage_content" | "manage_users";

const capabilities: Record<AdminRole, readonly AdminCapability[]> = {
  super_admin: ["access_admin", "manage_content", "manage_users"],
  admin: ["access_admin", "manage_content"],
  editor: ["access_admin", "manage_content"],
};

export const isAdminRole = (role: string): role is AdminRole =>
  (ADMIN_ROLES as readonly string[]).includes(role);

export const hasCapability = (role: AdminRole, capability: AdminCapability): boolean =>
  capabilities[role].includes(capability);

export const formatAdminRole = (role: AdminRole): string =>
  role.replace("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
