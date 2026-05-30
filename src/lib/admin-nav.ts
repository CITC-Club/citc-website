import type { LucideIcon } from "lucide-react";
import { Calendar, Layers, LayoutDashboard, Users } from "lucide-react";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

/** Order matches setup workflow: teams → members → events */
export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    description: "Overview and shortcuts",
  },
  {
    label: "Teams",
    href: "/admin/teams",
    icon: Layers,
    description: "Set up groups per academic year",
  },
  {
    label: "Members",
    href: "/admin/members",
    icon: Users,
    description: "Add people to teams",
  },
  {
    label: "Events",
    href: "/admin/events",
    icon: Calendar,
    description: "Workshops and competitions",
  },
];

export function isAdminNavActive(pathname: string, href: string): boolean {
  if (href === "/admin") {
    return pathname === "/admin";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
